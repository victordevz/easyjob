import assert from "node:assert/strict";
import test from "node:test";
import {
  normalizeBrazilianWhatsapp,
  validateBetaSignup,
} from "../lib/beta-signup.ts";

const validInput = {
  name: "  Ana   Souza ",
  email: " ANA@EXAMPLE.COM ",
  whatsapp: "(81) 99999-9999",
  consent: true,
  website: "",
};

test("normalizes a valid beta signup", () => {
  const result = validateBetaSignup(validInput);

  assert.deepEqual(result.errors, {});
  assert.equal(result.values?.name, "Ana Souza");
  assert.equal(result.values?.email, "ana@example.com");
  assert.equal(result.values?.whatsapp, "+5581999999999");
});

test("accepts Brazilian WhatsApp formats with or without country code", () => {
  assert.equal(normalizeBrazilianWhatsapp("81 99999-9999"), "+5581999999999");
  assert.equal(
    normalizeBrazilianWhatsapp("+55 (81) 99999-9999"),
    "+5581999999999",
  );
  assert.equal(normalizeBrazilianWhatsapp("(11) 3333-4444"), "+551133334444");
});

test("rejects missing and invalid fields", () => {
  const result = validateBetaSignup({
    name: "",
    email: "email-invalido",
    whatsapp: "123",
    consent: false,
    website: "",
  });

  assert.equal(result.values, undefined);
  assert.match(result.errors.name ?? "", /nome/i);
  assert.match(result.errors.email ?? "", /e-mail válido/i);
  assert.match(result.errors.whatsapp ?? "", /WhatsApp brasileiro/i);
  assert.match(result.errors.consent ?? "", /Confirme/i);
});

test("rejects honeypot submissions", () => {
  const result = validateBetaSignup({
    ...validInput,
    website: "https://spam.example",
  });

  assert.equal(result.isBot, true);
  assert.equal(result.values, undefined);
});
