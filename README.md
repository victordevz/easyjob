# Easy Job

Landing page mobile-first para a lista de espera do beta fechado da Easy Job.

## Rodar localmente

Requer Node.js `>=22.13.0`.

```bash
npm install
npm run dev
```

Acesse `http://localhost:3000`.

## Validação

```bash
npm test
npm run lint
npx tsc --noEmit
```

## Banco local

As inscrições do beta são persistidas em Cloudflare D1 local. A tabela e seus
índices são inicializados na primeira inscrição; a migração versionada está em
`drizzle/`.

Para atualizar as migrações depois de uma mudança no schema:

```bash
npm run db:generate
```

O formulário coleta nome, e-mail, WhatsApp e consentimento. Nesta etapa, o
e-mail serve apenas como identificação e as comunicações acontecem pelo
WhatsApp.
