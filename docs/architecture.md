# Architettura applicativa

## Stack tecnico

- Next.js App Router (TypeScript)
- Tailwind CSS
- Framer Motion
- React Hook Form + Zod
- Prisma ORM + PostgreSQL (Neon)

## Struttura cartelle

- `app/`: routing e pagine
- `app/api/lead/route.ts`: endpoint per invio richieste da modali
- `lib/email.ts` e `lib/resend.ts`: composizione e invio email Resend
- `components/`: UI riutilizzabile (header, footer, modali, button)
- `lib/`: contenuti statici, utility, schemi form, accesso dati
- `prisma/`: schema DB e seed
- `docs/`: documentazione progetto

## Routing principale

- `/`
- `/chi-siamo`
- `/news`
- `/news/[slug]`
- `/contatti`

## Flusso modali e richieste

1. Le CTA aprono modali globali via `ModalProvider`.
2. I form sono definiti in `lib/site-content.ts` (campi UI).
3. Le regole di validazione sono in `lib/form-schemas.ts`.
4. Submit verso `POST /api/lead`.
5. API valida payload, salva in `LeadRequest` e prova a inviare email di notifica e conferma tramite Resend.

## Modello dati

### `LeadRequest`

Tabella per richieste da modali sito.

Campi principali:
- `type` (`CONTACT | QUOTE | FAULT | DOCUMENT`)
- `fullName`, `email`, `phone`
- campi specifici (`buildingType`, `building`, `faultType`, `documentType`)
- `message`, `privacyConsent`, `status`, `createdAt`
- `status` puo essere aggiornato a `emailed` o `email_failed` in base all'esito dell'invio

### `NewsPost`

Tabella articoli news.

Campi principali:
- `slug` univoco
- `title`, `excerpt`, `category`, `publishedAt`, `author`
- `intro`
- `body` (JSON array di paragrafi)
- `externalLinks` (JSON)

## Strategia contenuti news

- Se `DATABASE_URL` non e presente o DB non risponde: fallback su `staticNewsPosts` in `lib/site-content.ts`.
- Se DB e disponibile con dati: priorita al contenuto in `NewsPost`.

## Flusso email

- Le richieste dei moduli passano da `POST /api/lead`.
- I dati validi vengono salvati nel DB.
- `lib/email.ts` compone due email:
  - notifica interna verso SIAM
  - conferma automatica verso l'utente
- L'invio usa Resend solo se `RESEND_API_KEY` e disponibile.

Questa strategia evita blocchi in sviluppo e mantiene il sito funzionante anche in bootstrap.
