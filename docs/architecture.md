# Architettura applicativa

## Stack tecnico

- Next.js App Router (TypeScript)
- Tailwind CSS
- Framer Motion
- React Hook Form + Zod
- Vercel Blob per salvataggio richieste lead
- Prisma ORM solo per eventuale gestione news da database opzionale

## Struttura cartelle

- `app/`: routing e pagine
- `app/api/lead/route.ts`: endpoint per invio richieste da modali
- `lib/lead-storage.ts`: salvataggio JSON privato dei lead su Vercel Blob
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
5. API valida payload, invia email di notifica/conferma tramite Resend e salva un JSON privato su Vercel Blob.

## Modello dati

### Lead JSON su Blob

File JSON privato per richieste da modali sito.

Campi principali:
- `type` (`CONTACT | QUOTE | FAULT | DOCUMENT`)
- `data` con campi inviati dal form validato
- `email` con esito invio interno/conferma
- `createdAt`
- path Blob: `leads/YYYY/MM/DD/<lead-id>.json`

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
- I dati validi vengono salvati come JSON privato in Vercel Blob se `BLOB_READ_WRITE_TOKEN` e disponibile.
- `lib/email.ts` compone due email:
  - notifica interna verso SIAM s.r.l.
  - conferma automatica verso l'utente
- L'invio usa Resend solo se `RESEND_API_KEY` e disponibile.

Questa strategia evita blocchi in sviluppo e mantiene il sito funzionante anche in bootstrap.
