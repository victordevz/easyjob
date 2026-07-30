export type BetaSignupInput = {
  name?: unknown;
  email?: unknown;
  whatsapp?: unknown;
  consent?: unknown;
  website?: unknown;
};

export type BetaSignupValues = {
  name: string;
  email: string;
  whatsapp: string;
  consent: true;
};

export type BetaSignupErrors = Partial<
  Record<"name" | "email" | "whatsapp" | "consent" | "form", string>
>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function compactSpaces(value: string) {
  return value.trim().replace(/\s+/g, " ");
}

export function normalizeBrazilianWhatsapp(value: string) {
  let digits = value.replace(/\D/g, "");

  if (digits.startsWith("55") && (digits.length === 12 || digits.length === 13)) {
    digits = digits.slice(2);
  }

  if (digits.length !== 10 && digits.length !== 11) {
    return null;
  }

  const areaCode = Number(digits.slice(0, 2));
  const subscriber = digits.slice(2);

  if (areaCode < 11 || areaCode > 99 || subscriber.startsWith("0")) {
    return null;
  }

  return `+55${digits}`;
}

export function validateBetaSignup(input: BetaSignupInput): {
  values?: BetaSignupValues;
  errors: BetaSignupErrors;
  isBot: boolean;
} {
  const isBot =
    typeof input.website === "string" && input.website.trim().length > 0;

  if (isBot) {
    return {
      errors: { form: "Não foi possível processar o cadastro." },
      isBot: true,
    };
  }

  const errors: BetaSignupErrors = {};
  const name = typeof input.name === "string" ? compactSpaces(input.name) : "";
  const email =
    typeof input.email === "string" ? input.email.trim().toLowerCase() : "";
  const rawWhatsapp =
    typeof input.whatsapp === "string" ? input.whatsapp.trim() : "";
  const whatsapp = normalizeBrazilianWhatsapp(rawWhatsapp);

  if (name.length < 2) {
    errors.name = "Informe seu nome.";
  } else if (name.length > 80) {
    errors.name = "Use no máximo 80 caracteres.";
  }

  if (!emailPattern.test(email) || email.length > 254) {
    errors.email = "Digite um e-mail válido.";
  }

  if (!whatsapp) {
    errors.whatsapp = "Digite um WhatsApp brasileiro com DDD.";
  }

  if (input.consent !== true) {
    errors.consent = "Confirme que podemos falar com você pelo WhatsApp.";
  }

  if (Object.keys(errors).length > 0 || !whatsapp) {
    return { errors, isBot: false };
  }

  return {
    values: {
      name,
      email,
      whatsapp,
      consent: true,
    },
    errors: {},
    isBot: false,
  };
}
