import { ensureBetaSignupSchema, getDb } from "../../../db";
import { betaSignups } from "../../../db/schema";
import {
  type BetaSignupInput,
  validateBetaSignup,
} from "../../../lib/beta-signup";

function isExternalOrigin(request: Request) {
  const origin = request.headers.get("origin");

  if (!origin) {
    return false;
  }

  try {
    return new URL(origin).host !== new URL(request.url).host;
  } catch {
    return true;
  }
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
    await ensureBetaSignupSchema();
    const db = getDb();
    const now = new Date().toISOString();
    const inserted = await db
      .insert(betaSignups)
      .values({
        id: crypto.randomUUID(),
        name: validation.values.name,
        email: validation.values.email,
        whatsapp: validation.values.whatsapp,
        consent: true,
        consentAt: now,
        createdAt: now,
        status: "waiting",
      })
      .onConflictDoNothing()
      .returning({ id: betaSignups.id });

    return Response.json(
      {
        ok: true,
        alreadyRegistered: inserted.length === 0,
      },
      { status: inserted.length === 0 ? 200 : 201 },
    );
  } catch {
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
