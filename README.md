# SIAM Condomini

Prima versione del nuovo sito web SIAM Condomini realizzata con Next.js, pronta per deploy su Vercel con database Neon tramite Prisma.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS
- Framer Motion
- React Hook Form + Zod
- Prisma ORM + Neon Postgres
- SMTP Aruba/provider compatibile per invio email transazionali

## Quick Start

1. Installa dipendenze:

```bash
npm install
```

2. Crea env locale:

```bash
cp .env.example .env.local
```

3. Aggiorna `DATABASE_URL` con la connessione Neon.
4. Se vuoi attivare l'invio email, imposta anche `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM`, `SMTP_LEAD_TO` e `LEAD_CHALLENGE_SECRET`.

5. Allinea schema DB:

```bash
npm run db:push
```

6. (Opzionale) carica news iniziali:

```bash
npm run db:seed
```

7. Avvia progetto:

```bash
npm run dev
```

## Rotte principali

- `/`
- `/chi-siamo`
- `/news`
- `/news/[slug]`
- `/contatti`

## API

- `POST /api/lead`: riceve submit dei form modali, salva su `LeadRequest` e invia email tramite SMTP.

## Variabili ambiente principali

- `DATABASE_URL`
- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_RESERVED_AREA_URL`
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_SECURE`
- `SMTP_USER`
- `SMTP_PASS`
- `SMTP_FROM`
- `SMTP_LEAD_TO`
- `LEAD_CHALLENGE_SECRET`
- `NEXT_PUBLIC_GA_MEASUREMENT_ID` e `NEXT_PUBLIC_META_PIXEL_ID` solo se vuoi attivare gli script opzionali con consenso

Le notifiche lead interne vengono inviate a `SMTP_LEAD_TO`; se la variabile non e configurata, il fallback e `siam.condomini@gmail.com`.

## Documentazione team

- Hub documentazione: [`docs/README.md`](docs/README.md)
- Onboarding: [`docs/onboarding.md`](docs/onboarding.md)
- Architettura: [`docs/architecture.md`](docs/architecture.md)
- Deploy: [`docs/deploy-vercel-neon.md`](docs/deploy-vercel-neon.md)
- Runbook manutenzione: [`docs/operations-runbook.md`](docs/operations-runbook.md)
- Contributing: [`CONTRIBUTING.md`](CONTRIBUTING.md)
