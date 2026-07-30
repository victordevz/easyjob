import { env } from "cloudflare:workers";
import { drizzle } from "drizzle-orm/d1";
import * as schema from "./schema";

let schemaInitialization: Promise<unknown> | undefined;

function getD1Binding() {
  const d1 = (env as unknown as { DB?: D1Database }).DB;

  if (!d1) {
    throw new Error(
      "Cloudflare D1 binding `DB` is unavailable. Set the `d1` field in .openai/hosting.json to `DB` before using the database.",
    );
  }

  return d1;
}

export function ensureBetaSignupSchema() {
  const d1 = getD1Binding();

  schemaInitialization ??= d1.batch([
    d1.prepare(`
      CREATE TABLE IF NOT EXISTS beta_signups (
        id TEXT PRIMARY KEY NOT NULL,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        whatsapp TEXT NOT NULL,
        consent INTEGER NOT NULL,
        consent_at TEXT NOT NULL,
        created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
        status TEXT NOT NULL DEFAULT 'waiting'
      )
    `),
    d1.prepare(
      "CREATE UNIQUE INDEX IF NOT EXISTS beta_signups_email_unique ON beta_signups (email)",
    ),
    d1.prepare(
      "CREATE UNIQUE INDEX IF NOT EXISTS beta_signups_whatsapp_unique ON beta_signups (whatsapp)",
    ),
  ]);

  return schemaInitialization;
}

export function getDb() {
  return drizzle(getD1Binding(), { schema });
}
