# SIAM s.r.l.

Prima versione del nuovo sito web SIAM s.r.l. realizzata con Next.js, pronta per deploy su Vercel con salvataggio lead su Vercel Blob.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS
- Framer Motion
- React Hook Form + Zod
- Vercel Blob per salvataggio richieste lead
- Resend per invio email transazionali

## Quick Start

1. Installa dipendenze:

```bash
npm install
```

2. Crea env locale:

```bash
cp .env.example .env.local
```

3. Aggiorna `BLOB_READ_WRITE_TOKEN` con il token Vercel Blob.
4. Se vuoi attivare l'invio email, imposta anche `RESEND_API_KEY`, `RESEND_FROM`, `RESEND_LEAD_TO` e `LEAD_CHALLENGE_SECRET`.

5. Avvia progetto:

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

- `POST /api/lead`: riceve submit dei form modali, salva un JSON privato su Vercel Blob e invia email tramite Resend.
  Se Blob non e configurato o fallisce, l'API prova comunque a inviare le email e registra log strutturati.
- `GET /api/lead/challenge`: genera la challenge anti-spam firmata lato server.

## Variabili ambiente principali

- `BLOB_READ_WRITE_TOKEN`
- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_RESERVED_AREA_URL`
- `RESEND_API_KEY`
- `RESEND_FROM`
- `RESEND_LEAD_TO`
- `LEAD_CHALLENGE_SECRET`
- `NEXT_PUBLIC_GA_MEASUREMENT_ID` e `NEXT_PUBLIC_META_PIXEL_ID` solo se vuoi attivare gli script opzionali con consenso

Le notifiche lead interne vengono inviate a `RESEND_LEAD_TO`; se la variabile non e configurata, il fallback e `info@siamcondomini.com`.

## Documentazione team

- Hub documentazione: [`docs/README.md`](docs/README.md)
- Onboarding: [`docs/onboarding.md`](docs/onboarding.md)
- Architettura: [`docs/architecture.md`](docs/architecture.md)
- Deploy: [`docs/deploy-vercel-neon.md`](docs/deploy-vercel-neon.md)
- Runbook manutenzione: [`docs/operations-runbook.md`](docs/operations-runbook.md)
- Contributing: [`CONTRIBUTING.md`](CONTRIBUTING.md)
