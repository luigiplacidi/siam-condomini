import type { Metadata } from "next";
import Link from "next/link";

import { contactInfo } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Privacy Policy | SIAM Condomini",
  description: "Informativa sul trattamento dei dati personali per il sito SIAM Condomini."
};

export default function PrivacyPolicyPage() {
  return (
    <section className="section-shell pt-14 pb-20">
      <p className="kicker">Informative legali</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-primary sm:text-5xl">Privacy Policy</h1>
      <p className="mt-4 text-sm text-muted-foreground">Ultimo aggiornamento: 23 aprile 2026</p>

      <div className="mt-8 space-y-6 rounded-3xl border border-border bg-white p-8 shadow-soft">
        <div>
          <h2 className="text-xl font-semibold text-primary">1. Titolare del trattamento</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Il titolare del trattamento e SIAM Condomini, con sede in {contactInfo.address}. Per richieste privacy
            puoi scrivere a <a className="font-semibold text-primary" href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
            .
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-primary">2. Dati trattati</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Trattiamo i dati inseriti volontariamente nei moduli di contatto, richiesta preventivo, segnalazione
            guasto e richiesta documentazione (es. nome, email, telefono, messaggio e riferimenti condominio).
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-primary">3. Finalita e base giuridica</h2>
          <ul className="mt-2 grid gap-2 text-sm leading-relaxed text-muted-foreground">
            <li>- Gestione delle richieste inviate dall'utente (misure precontrattuali / richiesta dell'interessato).</li>
            <li>- Organizzazione del servizio e assistenza clienti/condomini.</li>
            <li>- Adempimenti legali e difesa di diritti del titolare, ove necessario.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-primary">4. Modalita di trattamento e conservazione</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            I dati sono trattati con misure tecniche e organizzative adeguate. La conservazione avviene per il tempo
            necessario alla gestione della richiesta e agli obblighi di legge, con revisione periodica dei tempi di
            retention.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-primary">5. Destinatari dei dati</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            I dati possono essere trattati da fornitori tecnici nominati responsabili del trattamento (hosting,
            infrastruttura cloud, assistenza tecnica), nei limiti strettamente necessari all'erogazione del servizio.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-primary">6. Diritti dell'interessato</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Puoi esercitare i diritti previsti dagli artt. 15-22 GDPR (accesso, rettifica, cancellazione, limitazione,
            opposizione, portabilita) scrivendo a {contactInfo.email}. Resta salvo il diritto di reclamo al Garante
            per la protezione dei dati personali.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-primary">7. Cookie e tracciamento</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Per dettagli su cookie tecnici e cookie opzionali (analytics/marketing), consulta la
            <Link className="font-semibold text-primary" href="/cookie-policy"> Cookie Policy</Link>.
          </p>
        </div>
      </div>
    </section>
  );
}
