# Deploy Vercel + Neon

## Obiettivo

Pubblicare in sicurezza mantenendo allineati codice, env e schema DB.

## Checklist pre-deploy

1. Branch aggiornata da `main`
2. Build locale ok:

```bash
npm run lint
npm run build
```

3. Env presenti su Vercel:
- `DATABASE_URL`
- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_RESERVED_AREA_URL`

4. Prisma schema allineato al DB target:

```bash
npm run db:push
```

## Primo collegamento progetto Vercel (una volta)

```bash
vercel link
```

Poi pull env locale:

```bash
vercel env pull .env.local --yes
```

## Deploy

### Opzione A: deploy automatico

- Push su `main`
- Vercel builda e pubblica automaticamente

### Opzione B: deploy manuale CLI

```bash
vercel --prod
```

## Post-deploy smoke test

- Homepage caricata
- Navigazione pagine principali
- Apertura modali e invio form
- Pagina news e dettaglio articolo
- Numero urgenze visibile in header/footer

## Rollback

Se una release rompe funzionalita:

1. Promuovere precedente deployment da dashboard Vercel
2. Aprire issue con causa, impatto e fix plan
3. Preparare patch in branch dedicata
