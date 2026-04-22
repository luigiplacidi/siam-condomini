# Onboarding sviluppatori

## Obiettivo

Portare una nuova persona a eseguire il progetto in locale e fare il primo contributo in meno di 30 minuti.

## Prerequisiti

- Node.js 20+
- npm 10+
- Accesso al repository GitHub
- Accesso progetto Vercel (per env condivise)
- Database Neon (o URL DB condiviso)

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
- `DATABASE_URL`
- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_RESERVED_AREA_URL`

5. Allinea schema DB:

```bash
npm run db:push
```

6. Carica dati iniziali news (opzionale ma consigliato):

```bash
npm run db:seed
```

7. Avvia app:

```bash
npm run dev
```

## Verifica veloce

- Home: `http://localhost:3000`
- News index: `http://localhost:3000/news`
- Form modale: submit da CTA (es. "Contattaci")

## Primo contributo consigliato

- Aggiornare un testo in `lib/site-content.ts`
- Eseguire `npm run lint` e `npm run build`
- Aprire PR
