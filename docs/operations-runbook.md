# Runbook operativo e manutenzione

## Comandi base

```bash
npm install
npm run dev
npm run lint
npm run build
```

## Incidenti comuni

### 1) Form modali non inviano

Controlli:
- Console browser e Network tab su `POST /api/lead`
- Validazione zod in `lib/form-schemas.ts`
- Disponibilita Blob (`BLOB_READ_WRITE_TOKEN` valida)
- Configurazione email (`SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM`, `SMTP_LEAD_TO`)
- Configurazione anti-spam (`LEAD_CHALLENGE_SECRET`, opzionale se `SMTP_PASS` e gia presente)

Azioni:
- Se `BLOB_READ_WRITE_TOKEN` manca o Blob non risponde, le email vengono comunque tentate; risolvere Blob per ripristinare il salvataggio lead
- Se payload invalido, adeguare schema o campi modale
- Se le email non partono, verificare credenziali SMTP Aruba/provider e mittente autorizzato

### 2) Lead non salvati su Blob

Controlli:
- `BLOB_READ_WRITE_TOKEN` presente in ambiente Vercel
- Log Vercel con eventi `blob_not_configured` o `blob_save_failed`
- Store Blob collegato al progetto Vercel corretto

Nota:
- Anche se Blob fallisce, l'API tenta comunque l'invio SMTP per non perdere il contatto operativo.

### 3) Build Vercel fallita

Controlli:
- Variabili env su Vercel
- Errori TypeScript/ESLint
- Compatibilita TypeScript, dipendenze e variabili env

Azioni:
- Riprodurre in locale con `npm run build`
- Aprire fix branch e patchare

## Manutenzione periodica

Cadenza consigliata: settimanale.

Checklist:
- Verifica lead salvati in Blob sotto `leads/YYYY/MM/DD/`
- Verifica stato email nei JSON salvati e nei log `smtp_send_success` / `smtp_send_failed`
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
