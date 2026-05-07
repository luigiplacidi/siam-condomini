# Runbook operativo e manutenzione

## Comandi base

```bash
npm install
npm run dev
npm run lint
npm run build
npm run db:push
npm run db:seed
```

## Incidenti comuni

### 1) Form modali non inviano

Controlli:
- Console browser e Network tab su `POST /api/lead`
- Validazione zod in `lib/form-schemas.ts`
- Disponibilita DB (`DATABASE_URL` valida)
- Configurazione email (`SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM`, `SMTP_LEAD_TO`)
- Configurazione anti-spam (`LEAD_CHALLENGE_SECRET`, opzionale se `SMTP_PASS` e gia presente)

Azioni:
- Se DB down, risolvere connessione Neon
- Se payload invalido, adeguare schema o campi modale
- Se le email non partono, verificare credenziali SMTP Aruba/provider e mittente autorizzato

### 2) News non visibili da DB

Controlli:
- `DATABASE_URL` presente in ambiente
- Tabelle create con `npm run db:push`
- Record presenti in `NewsPost`

Nota:
- Con DB non disponibile, il fallback statico mantiene il sito operativo.

### 3) Build Vercel fallita

Controlli:
- Variabili env su Vercel
- Errori TypeScript/ESLint
- Compatibilita prisma client/schema

Azioni:
- Riprodurre in locale con `npm run build`
- Aprire fix branch e patchare

## Manutenzione periodica

Cadenza consigliata: settimanale.

Checklist:
- Verifica lead raccolti in `LeadRequest`
- Verifica stato email dei lead (`new`, `emailed`, `email_failed`)
- Verifica link esterni news
- Verifica pagina contatti e recapiti
- Verifica deploy stato green su Vercel
- Aggiorna dipendenze con patch/minor sicure

## Regole team

- Ogni modifica passa da branch + PR
- Nessun secret in repository
- Ogni PR deve includere:
  - contesto
  - cambiamenti
  - test eseguiti
  - eventuali rischi
