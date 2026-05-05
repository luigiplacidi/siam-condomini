import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy | SIAM Condomini",
  description: "Informativa cookie e gestione del consenso per il sito SIAM Condomini."
};

export default function CookiePolicyPage() {
  return (
    <section className="section-shell pt-14 pb-20">
      <p className="kicker">Informative legali</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-primary sm:text-5xl">Cookie Policy</h1>
      <p className="mt-4 text-sm text-muted-foreground">Ultimo aggiornamento: 5 maggio 2026</p>

      <div className="mt-8 space-y-6 rounded-3xl border border-border bg-white p-8 shadow-soft">
        <div>
          <h2 className="text-xl font-semibold text-primary">1. Cosa sono i cookie</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            I cookie sono piccoli file di testo salvati nel browser. Alcuni sono tecnici e servono al funzionamento
            del sito; altri sono opzionali e possono essere usati, solo con consenso, per finalita di analytics o
            marketing.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-primary">2. Cookie e dati tecnici che utilizziamo</h2>
          <ul className="mt-2 grid gap-2 text-sm leading-relaxed text-muted-foreground">
            <li>- Cookie tecnici necessari: sempre attivi, indispensabili per il funzionamento del sito.</li>
            <li>- Cookie di preferenza: salvano le scelte del banner e le impostazioni opzionali.</li>
            <li>- Cookie analytics: attivati solo se autorizzi la categoria e se viene configurato lo script.</li>
            <li>- Cookie marketing: attivati solo se autorizzi la categoria e se viene configurato lo script.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-primary">3. Come funziona il consenso</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Al primo accesso compare un banner che ti permette di accettare tutti i cookie non necessari, rifiutare
            quelli opzionali oppure scegliere categoria per categoria. Le preferenze vengono salvate in un cookie
            tecnico e nel local storage per 12 mesi, salvo revoca anticipata.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-primary">4. Blocco preventivo degli script opzionali</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Gli script di analytics e marketing non vengono caricati finche non esprimi un consenso esplicito. Se
            in futuro saranno attivati servizi come Google Analytics o Meta Pixel, verranno caricati solo dopo
            autorizzazione nella categoria corrispondente.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-primary">5. Gestione delle preferenze</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Puoi modificare o revocare il consenso in qualsiasi momento tramite il pulsante "Preferenze cookie"
            presente nel sito. Puoi anche intervenire dalle impostazioni del browser, ma la disabilitazione dei
            cookie tecnici potrebbe compromettere alcune funzionalita.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-primary">6. Stato attuale del sito</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Ad oggi il sito utilizza solo cookie tecnici necessari al funzionamento, cookie di preferenza per
            salvare le scelte del banner e il cookie di consenso. Non sono attivi cookie di analytics o marketing,
            né altri strumenti di profilazione, salvo una futura attivazione esplicita e coerente con il consenso
            raccolto.
          </p>
        </div>
      </div>
    </section>
  );
}
