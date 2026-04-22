# Contributing

Grazie per contribuire al progetto SIAM Condomini.

## Workflow

1. Crea branch da `main`:

```bash
git checkout -b feat/nome-feature
```

2. Esegui modifiche.
3. Verifica prima del commit:

```bash
npm run lint
npm run build
```

4. Commit con messaggi chiari:

```bash
git commit -m "feat: descrizione breve"
```

5. Push e apri PR.

## Standard minimi PR

- Scope chiaro (cosa cambia)
- Motivazione (perche)
- Test eseguiti
- Note deploy o db se presenti

## Convenzioni tecniche

- TypeScript strict
- Componenti riutilizzabili in `components/`
- Contenuti in `lib/site-content.ts` se statici
- Validazioni form in `lib/form-schemas.ts`
- Evitare dipendenze non necessarie

## Sicurezza

- Non committare `.env.local`
- Non esporre segreti nei log o screenshot
- Validare input API lato server
