import {
  type BetaSignupInput,
  validateBetaSignup,
} from "../../../lib/beta-signup";

export const runtime = "nodejs";

type SheetsMirrorConfig = {
  url: string;
  secret: string;
};

type SheetsMirrorPayload = {
  id: string;
  name: string;
  email: string;
  whatsapp: string;
  consent: true;
  consentedAt: string;
  createdAt: string;
  status: string;
};

function isExternalOrigin(request: Request) {
  const origin = request.headers.get("origin");

  if (!origin) {
    return false;
  }

  try {
    const requestHost =
      request.headers.get("x-forwarded-host")?.split(",")[0]?.trim() ||
      request.headers.get("host") ||
      new URL(request.url).host;

    return new URL(origin).host !== requestHost;
  } catch {
    return true;
  }
}

function getSheetsConfig(): SheetsMirrorConfig | null {
  if (
    !process.env.GOOGLE_SHEETS_WEBHOOK_URL ||
    !process.env.GOOGLE_SHEETS_WEBHOOK_SECRET
  ) {
    return null;
  }

  return {
    url: process.env.GOOGLE_SHEETS_WEBHOOK_URL,
    secret: process.env.GOOGLE_SHEETS_WEBHOOK_SECRET,
  };
}

async function saveSignupToGoogleSheets(payload: SheetsMirrorPayload) {
  const config = getSheetsConfig();

  if (!config) {
    throw new Error("Google Sheets não está configurado.");
  }

  const response = await fetch(config.url, {
    method: "POST",
    headers: {
      "Content-Type": "text/plain;charset=UTF-8",
    },
    body: JSON.stringify({
      ...payload,
      secret: config.secret,
    }),
    redirect: "follow",
    signal: AbortSignal.timeout(10_000),
  });

  if (!response.ok) {
    throw new Error(`Google Sheets respondeu com HTTP ${response.status}.`);
  }

  const result = (await response.json()) as {
    ok?: boolean;
    error?: string;
    alreadyRegistered?: boolean;
  };

  if (!result.ok) {
    throw new Error(
      `Google Sheets recusou a inscrição: ${result.error ?? "erro desconhecido"}.`,
    );
  }

  return {
    alreadyRegistered: result.alreadyRegistered === true,
  };
}

export async function POST(request: Request) {
  if (isExternalOrigin(request)) {
    return Response.json(
      { ok: false, message: "Origem não permitida." },
      { status: 403 },
    );
  }

  let input: BetaSignupInput;

  try {
    input = (await request.json()) as BetaSignupInput;
  } catch {
    return Response.json(
      {
        ok: false,
        errors: { form: "Envie os dados do formulário em formato válido." },
      },
      { status: 400 },
    );
  }

  const validation = validateBetaSignup(input);

  if (validation.isBot) {
    return Response.json(
      { ok: false, errors: validation.errors },
      { status: 422 },
    );
  }

  if (!validation.values) {
    return Response.json(
      { ok: false, errors: validation.errors },
      { status: 400 },
    );
  }

  try {
    const now = new Date().toISOString();
    const signupId = crypto.randomUUID();
    const result = await saveSignupToGoogleSheets({
      id: signupId,
      name: validation.values.name,
      email: validation.values.email,
      whatsapp: validation.values.whatsapp,
      consent: true,
      consentedAt: now,
      createdAt: now,
      status: "Aguardando",
    });

    return Response.json(
      {
        ok: true,
        alreadyRegistered: result.alreadyRegistered,
      },
      { status: result.alreadyRegistered ? 200 : 201 },
    );
  } catch (error) {
    console.error(
      "Não foi possível salvar a inscrição.",
      error instanceof Error ? error.message : "Erro desconhecido.",
    );

    return Response.json(
      {
        ok: false,
        errors: {
          form:
            "Não foi possível salvar seu cadastro agora. Tente novamente em instantes.",
        },
      },
      { status: 500 },
    );
  }
}
