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
      <p className="mt-4 text-sm text-muted-foreground">Ultimo aggiornamento: 23 aprile 2026</p>

      <div className="mt-8 space-y-6 rounded-3xl border border-border bg-white p-8 shadow-soft">
        <div>
          <h2 className="text-xl font-semibold text-primary">1. Cosa sono i cookie</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            I cookie sono piccoli file di testo memorizzati nel browser durante la navigazione. Possono essere
            necessari al funzionamento del sito oppure usati per finalita opzionali (es. analytics/marketing).
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-primary">2. Categorie usate su questo sito</h2>
          <ul className="mt-2 grid gap-2 text-sm leading-relaxed text-muted-foreground">
            <li>
              - <span className="font-semibold text-foreground">Tecnici necessari</span>: sempre attivi,
              indispensabili al funzionamento del sito e alla gestione delle preferenze di consenso.
            </li>
            <li>
              - <span className="font-semibold text-foreground">Preferenze</span>: opzionali, attivi solo con
              consenso.
            </li>
            <li>
              - <span className="font-semibold text-foreground">Analytics</span>: opzionali, attivi solo con
              consenso preventivo.
            </li>
            <li>
              - <span className="font-semibold text-foreground">Marketing</span>: opzionali, attivi solo con
              consenso preventivo.
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-primary">3. Consenso e blocco preventivo</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            I cookie non tecnici e gli script di tracciamento opzionali sono bloccati di default e vengono attivati
            solo dopo consenso esplicito tramite banner cookie. In qualsiasi momento puoi modificare o revocare il
            consenso dal pulsante "Preferenze cookie" presente nel sito.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-primary">4. Conservazione del consenso</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            La scelta viene salvata in un cookie tecnico e in local storage per 12 mesi, salvo revoca anticipata.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-primary">5. Gestione da browser</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Puoi eliminare o bloccare i cookie anche dalle impostazioni del browser. La disabilitazione dei cookie
            tecnici potrebbe compromettere alcune funzionalita del sito.
          </p>
        </div>
      </div>
    </section>
  );
}
