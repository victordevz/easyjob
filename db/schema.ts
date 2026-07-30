import { sql } from "drizzle-orm";
import { integer, sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core";

export const betaSignups = sqliteTable(
  "beta_signups",
  {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull(),
    whatsapp: text("whatsapp").notNull(),
    consent: integer("consent", { mode: "boolean" }).notNull(),
    consentAt: text("consent_at").notNull(),
    createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
    status: text("status").notNull().default("waiting"),
  },
  (table) => [
    uniqueIndex("beta_signups_email_unique").on(table.email),
    uniqueIndex("beta_signups_whatsapp_unique").on(table.whatsapp),
  ],
);
