# Onboarding sviluppatori

## Obiettivo

Portare una nuova persona a eseguire il progetto in locale e fare il primo contributo in meno di 30 minuti.

## Prerequisiti

- Node.js 20+
- npm 10+
- Accesso al repository GitHub
- Accesso progetto Vercel (per env condivise)
- Accesso Vercel Blob o env `BLOB_READ_WRITE_TOKEN`

## Setup locale

1. Clona repository:

```bash
git clone https://github.com/luigiplacidi/siam-condomini.git
cd siam-condomini
```

2. Installa dipendenze:

```bash
npm install
```

3. Crea file env locale:

```bash
cp .env.example .env.local
```

4. Inserisci in `.env.local` i valori reali:
- `BLOB_READ_WRITE_TOKEN`
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
- `NEXT_PUBLIC_GA_MEASUREMENT_ID` e `NEXT_PUBLIC_META_PIXEL_ID` solo se attivi gli script opzionali

7. Avvia app:

```bash
npm run dev
```

## Verifica veloce

- Home: `http://localhost:3000`
- News index: `http://localhost:3000/news`
- Form modale: submit da CTA (es. "Contattaci")
- Email test: verifica `POST /api/lead` con SMTP configurato

## Primo contributo consigliato

- Aggiornare un testo in `lib/site-content.ts`
- Eseguire `npm run lint` e `npm run build`
- Aprire PR
