# Gestione contenuti e pagine

## Dove modificare i contenuti

### Contenuti statici di base

File: `lib/site-content.ts`

Qui trovi:
- Brand, contatti, navigazione
- Definizione modali e campi
- Gruppi servizi
- News statiche fallback

### News da database

Tabella: `NewsPost` (Prisma)

Quando il DB e attivo, il sito usa i record DB prima del fallback statico.

## Procedura: aggiungere una news

1. Inserisci record in `NewsPost` (db script o client DB).
2. Verifica `slug` univoco.
3. Verifica rendering su `/news` e `/news/[slug]`.

Nota: in assenza DB, aggiungere anche a `staticNewsPosts` per sviluppo offline.

## Procedura: aggiungere una nuova modale

1. Estendi tipo `ModalId` in `lib/site-content.ts`.
2. Aggiungi configurazione modale in `modalDefinitions`.
3. Crea schema zod in `lib/form-schemas.ts`.
4. Aggiungi mapping in:
- `modalSchemaMap`
- `leadTypeMap`
5. Aggiorna enum `RequestType` in `prisma/schema.prisma` se necessario.
6. Esegui `npm run db:push` e testa submit.

## Regole copy

- Tone professionale, chiaro, istituzionale ma non freddo.
- CTA brevi e orientate ad azione.
- Numero urgenze sempre visibile e coerente.
