"use client";

import { FormEvent, useState } from "react";

type FieldName = "name" | "email" | "whatsapp" | "consent";
type FormErrors = Partial<Record<FieldName | "form", string>>;

const initialValues = {
  name: "",
  email: "",
  whatsapp: "",
  website: "",
  consent: false,
};

function formatWhatsapp(value: string) {
  const digits = value.replace(/\D/g, "").replace(/^55/, "").slice(0, 11);

  if (digits.length <= 2) {
    return digits ? `(${digits}` : "";
  }

  if (digits.length <= 6) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  }

  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }

  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

export function BetaSignupForm() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success">(
    "idle",
  );

  function updateField(
    field: "name" | "email" | "whatsapp" | "website",
    value: string,
  ) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined, form: undefined }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrors({});
    setStatus("submitting");

    try {
      const response = await fetch("/api/beta-signups", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(values),
      });

      const payload = (await response.json()) as {
        ok?: boolean;
        errors?: FormErrors;
        message?: string;
      };

      if (!response.ok || !payload.ok) {
        setErrors(
          payload.errors ?? {
            form:
              payload.message ??
              "Não foi possível concluir seu cadastro. Tente novamente.",
          },
        );
        setStatus("idle");
        return;
      }

      setStatus("success");
      setValues(initialValues);
    } catch {
      setErrors({
        form:
          "A conexão falhou. Seus dados continuam aqui para você tentar novamente.",
      });
      setStatus("idle");
    }
  }

  if (status === "success") {
    return (
      <div className="signup-card success-card" role="status" aria-live="polite">
        <span className="success-mark" aria-hidden="true">✓</span>
        <p className="form-kicker">Cadastro recebido</p>
        <h3>Você está na lista.</h3>
        <p>
          Quando abrirmos uma vaga para a primeira turma, a Easy Job falará com
          você pelo WhatsApp.
        </p>
        <button
          className="text-button"
          type="button"
          onClick={() => setStatus("idle")}
        >
          Cadastrar outra pessoa
        </button>
      </div>
    );
  }

  return (
    <form className="signup-card" onSubmit={handleSubmit} noValidate>
      <div className="form-heading">
        <div>
          <p className="form-kicker">Lista de espera</p>
          <h3>Quero testar primeiro.</h3>
        </div>
        <span aria-hidden="true">↘</span>
      </div>

      <div className="field-group">
        <label htmlFor="name">Seu nome</label>
        <input
          id="name"
          name="name"
          autoComplete="name"
          value={values.name}
          onChange={(event) => updateField("name", event.target.value)}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "name-error" : undefined}
          placeholder="Como podemos chamar você?"
        />
        {errors.name && (
          <span className="field-error" id="name-error">
            {errors.name}
          </span>
        )}
      </div>

      <div className="field-group">
        <label htmlFor="email">E-mail</label>
        <input
          id="email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          value={values.email}
          onChange={(event) => updateField("email", event.target.value)}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "email-error email-help" : "email-help"}
          placeholder="voce@exemplo.com"
        />
        <small id="email-help">
          Será usado como identificação para uma futura credencial.
        </small>
        {errors.email && (
          <span className="field-error" id="email-error">
            {errors.email}
          </span>
        )}
      </div>

      <div className="field-group">
        <label htmlFor="whatsapp">WhatsApp</label>
        <div className="phone-input">
          <span aria-hidden="true">+55</span>
          <input
            id="whatsapp"
            name="whatsapp"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={values.whatsapp}
            onChange={(event) =>
              updateField("whatsapp", formatWhatsapp(event.target.value))
            }
            aria-invalid={Boolean(errors.whatsapp)}
            aria-describedby={errors.whatsapp ? "whatsapp-error" : undefined}
            placeholder="(81) 99999-9999"
          />
        </div>
        {errors.whatsapp && (
          <span className="field-error" id="whatsapp-error">
            {errors.whatsapp}
          </span>
        )}
      </div>

      <div className="honeypot" aria-hidden="true">
        <label htmlFor="website">Seu site</label>
        <input
          id="website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={(event) => updateField("website", event.target.value)}
        />
      </div>

      <div className="consent-group">
        <input
          id="consent"
          name="consent"
          type="checkbox"
          checked={values.consent}
          onChange={(event) => {
            setValues((current) => ({
              ...current,
              consent: event.target.checked,
            }));
            setErrors((current) => ({
              ...current,
              consent: undefined,
              form: undefined,
            }));
          }}
          aria-invalid={Boolean(errors.consent)}
          aria-describedby={errors.consent ? "consent-error" : undefined}
        />
        <label htmlFor="consent">
          Quero receber pelo WhatsApp notícias e o convite para o beta da Easy
          Job. Posso cancelar a qualquer momento.
        </label>
      </div>
      {errors.consent && (
        <span className="field-error consent-error" id="consent-error">
          {errors.consent}
        </span>
      )}

      {errors.form && (
        <div className="form-error" role="alert">
          {errors.form}
        </div>
      )}

      <button
        className="button button-primary form-submit"
        type="submit"
        disabled={status === "submitting"}
      >
        {status === "submitting" ? "Enviando..." : "Entrar na lista do beta"}
        <span aria-hidden="true">{status === "submitting" ? "…" : "↗"}</span>
      </button>

      <p className="privacy-copy">
        Seu e-mail não será usado para marketing. As novidades desta etapa serão
        enviadas somente pelo WhatsApp.
      </p>
    </form>
  );
}
