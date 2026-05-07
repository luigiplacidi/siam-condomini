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
      <p className="mt-4 text-sm text-muted-foreground">Ultimo aggiornamento: 7 maggio 2026</p>

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
            <li>- Cookie e local storage di preferenza: salvano le scelte del banner e le impostazioni opzionali.</li>
            <li>- Dati tecnici anti-spam: token temporaneo della challenge, usato solo per verificare l'invio del modulo.</li>
            <li>- Cookie analytics Google Analytics 4: attivati solo se autorizzi la categoria analytics.</li>
            <li>- Cookie marketing: non attivi di default; caricati solo se autorizzi la categoria e se viene configurato lo script.</li>
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
            Gli script di analytics e marketing non vengono caricati finche non esprimi un consenso esplicito.
            Google Analytics 4 viene caricato solo dopo consenso alla categoria analytics e solo se il relativo
            ID di misurazione e configurato. L'eventuale Meta Pixel viene caricato solo dopo consenso alla categoria
            marketing e solo se configurato.
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
          <h2 className="text-xl font-semibold text-primary">6. Cookie specifici</h2>
          <div className="mt-3 overflow-x-auto rounded-2xl border border-border">
            <table className="w-full border-collapse text-left text-sm text-muted-foreground">
              <thead className="bg-secondary/70 text-foreground">
                <tr>
                  <th className="p-3 font-semibold">Nome</th>
                  <th className="p-3 font-semibold">Categoria</th>
                  <th className="p-3 font-semibold">Durata</th>
                  <th className="p-3 font-semibold">Finalita</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-border">
                  <td className="p-3 font-semibold text-foreground">siam_cookie_consent</td>
                  <td className="p-3">Tecnico / preferenze</td>
                  <td className="p-3">12 mesi</td>
                  <td className="p-3">Memorizza le scelte espresse nel banner cookie.</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="p-3 font-semibold text-foreground">localStorage siam_cookie_consent_v1</td>
                  <td className="p-3">Tecnico / preferenze</td>
                  <td className="p-3">12 mesi o fino a cancellazione del browser</td>
                  <td className="p-3">Mantiene sincronizzate le preferenze cookie nel browser.</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="p-3 font-semibold text-foreground">challengeToken</td>
                  <td className="p-3">Tecnico / sicurezza</td>
                  <td className="p-3">Temporaneo, non salvato come cookie</td>
                  <td className="p-3">Verifica anti-spam dei moduli tramite token firmato lato server.</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="p-3 font-semibold text-foreground">_ga</td>
                  <td className="p-3">Analytics</td>
                  <td className="p-3">Fino a 2 anni</td>
                  <td className="p-3">Google Analytics 4: distingue gli utenti in forma statistica.</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="p-3 font-semibold text-foreground">_ga_{"<container-id>"}</td>
                  <td className="p-3">Analytics</td>
                  <td className="p-3">Fino a 2 anni</td>
                  <td className="p-3">Google Analytics 4: conserva lo stato della sessione.</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="p-3 font-semibold text-foreground">_fbp, _fbc</td>
                  <td className="p-3">Marketing</td>
                  <td className="p-3">Variabile secondo Meta</td>
                  <td className="p-3">Eventuali cookie Meta Pixel, solo se configurato e autorizzato.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-primary">7. Stato attuale del sito</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Il sito utilizza cookie tecnici necessari, cookie di preferenza per salvare le scelte del banner e,
            se configurato, Google Analytics 4 dopo consenso esplicito alla categoria analytics. Non vengono
            caricati strumenti marketing o profilazione senza consenso nella categoria corrispondente. L'invio
            dei moduli usa una challenge anti-spam tecnica che non richiede cookie di profilazione.
          </p>
        </div>
      </div>
    </section>
  );
}
