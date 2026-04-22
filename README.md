# SIAM Condomini

Prima versione del nuovo sito web SIAM Condomini realizzata con Next.js, pronta per deploy su Vercel e uso database Neon via Prisma.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS
- Framer Motion
- React Hook Form + Zod
- Prisma ORM + Neon Postgres

## Setup locale

1. Installa dipendenze:

```bash
npm install
```

2. Crea env locale:

```bash
cp .env.example .env.local
```

3. Aggiorna `DATABASE_URL` con la connessione Neon.

4. Genera schema DB:

```bash
npm run db:push
```

5. (Opzionale) semina news iniziali:

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

## Modali globali

Le CTA aprono modali riutilizzabili con validazione form e invio a `POST /api/lead`.
