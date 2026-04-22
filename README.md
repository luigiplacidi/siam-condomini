# SIAM Condomini

Prima versione del nuovo sito web SIAM Condomini realizzata con Next.js, pronta per deploy su Vercel con database Neon tramite Prisma.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS
- Framer Motion
- React Hook Form + Zod
- Prisma ORM + Neon Postgres

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

4. Allinea schema DB:

```bash
npm run db:push
```

5. (Opzionale) carica news iniziali:

```bash
npm run db:seed
```

6. Avvia progetto:

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

- `POST /api/lead`: riceve submit dei form modali e salva su `LeadRequest`.

## Documentazione team

- Hub documentazione: [`docs/README.md`](docs/README.md)
- Onboarding: [`docs/onboarding.md`](docs/onboarding.md)
- Architettura: [`docs/architecture.md`](docs/architecture.md)
- Deploy: [`docs/deploy-vercel-neon.md`](docs/deploy-vercel-neon.md)
- Runbook manutenzione: [`docs/operations-runbook.md`](docs/operations-runbook.md)
- Contributing: [`CONTRIBUTING.md`](CONTRIBUTING.md)
