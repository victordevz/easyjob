import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import test, { after, before } from "node:test";

const templateRoot = new URL("../", import.meta.url);
const projectRoot = fileURLToPath(templateRoot);
const testUrl = "http://127.0.0.1:4173";
let previewServer;

before(async () => {
  previewServer = spawn(
    fileURLToPath(new URL("../node_modules/.bin/next", import.meta.url)),
    ["start", "--port", "4173", "--hostname", "127.0.0.1"],
    {
      cwd: projectRoot,
      env: { ...process.env, NODE_ENV: "production" },
      stdio: "ignore",
    },
  );

  for (let attempt = 0; attempt < 50; attempt += 1) {
    try {
      const response = await fetch(testUrl);
      if (response.ok) return;
    } catch {
      // The server is still starting.
    }
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  throw new Error("The Easy Job preview server did not start in time.");
});

after(() => {
  previewServer?.kill("SIGTERM");
});

async function render() {
  return fetch(testUrl, {
    headers: { accept: "text/html" },
  });
}

test("server-renders the Easy Job landing page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Easy Job — Sua busca de emprego pronta<\/title>/i);
  assert.match(html, /Entre.*sem nada\./s);
  assert.match(html, /Saia com sua busca de emprego pronta\./);
  assert.match(html, /easy-job-fox-mascot\.png/);
  assert.match(html, /favicon-fox\.png/);
  assert.match(html, /Um passo de cada vez\./);
  assert.match(html, /name="whatsapp"/);
  assert.match(html, /name="consent"/);
  assert.match(html, /DADOS ILUSTRATIVOS/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i);
});

test("keeps the landing accessible and mobile-first", async () => {
  const [page, form, css, layout] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/beta-signup-form.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
  ]);

  assert.match(layout, /lang="pt-BR"/);
  assert.match(page, /aria-label="Navegação principal"/);
  assert.match(form, /aria-invalid=/);
  assert.match(form, /role="alert"/);
  assert.match(css, /@media \(min-width: 680px\)/);
  assert.match(css, /@media \(max-width: 350px\)/);
  assert.match(css, /prefers-reduced-motion: reduce/);
  assert.doesNotMatch(page, /Evolution|Resend|scrap/i);
});

test("ships the branded social image and favicon", async () => {
  const socialImage = new URL("../public/og.png", import.meta.url);
  const favicon = new URL("../public/favicon-fox.png", import.meta.url);
  const { stat } = await import("node:fs/promises");
  const [socialStat, faviconStat] = await Promise.all([
    stat(socialImage),
    stat(favicon),
  ]);
  assert.ok(socialStat.size > 10_000);
  assert.ok(faviconStat.size > 10_000);
  assert.ok(templateRoot);
});

test("uses the Node-compatible Railway production runtime", async () => {
  const [packageJson, signupRoute] = await Promise.all([
    readFile(new URL("../package.json", import.meta.url), "utf8"),
    readFile(
      new URL("../app/api/beta-signups/route.ts", import.meta.url),
      "utf8",
    ),
  ]);

  assert.match(packageJson, /"build": "next build"/);
  assert.match(packageJson, /"start": "next start --hostname 0\.0\.0\.0"/);
  assert.match(signupRoute, /export const runtime = "nodejs"/);
  assert.doesNotMatch(signupRoute, /cloudflare:workers|drizzle-orm\/d1/);
});
