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
      <p className="mt-4 text-sm text-muted-foreground">Ultimo aggiornamento: 7 maggio 2026</p>

      <div className="mt-8 space-y-6 rounded-3xl border border-border bg-white p-8 shadow-soft">
        <div>
          <h2 className="text-xl font-semibold text-primary">1. Titolare del trattamento</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Il titolare del trattamento e SIAM Condomini, con sede in {contactInfo.address}. Per richieste
            relative alla privacy e all'esercizio dei diritti puoi scrivere a{" "}
            <a className="font-semibold text-primary underline underline-offset-2" href={`mailto:${contactInfo.email}`}>
              {contactInfo.email}
            </a>
            .
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-primary">2. Dati che raccogliamo</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Il sito raccoglie i dati che inserisci volontariamente nei moduli di contatto, richiesta preventivo,
            segnalazione guasto e richiesta documentazione. Possiamo trattare nome e cognome, email, telefono,
            riferimenti del condominio, descrizione della richiesta e consenso privacy.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-primary">3. Finalita del trattamento</h2>
          <ul className="mt-2 grid gap-2 text-sm leading-relaxed text-muted-foreground">
            <li>- Gestire la tua richiesta e risponderti in modo puntuale.</li>
            <li>- Organizzare preventivi, assistenza, segnalazioni e richieste documentali.</li>
            <li>- Adempiere ad obblighi di legge e difendere diritti del titolare, se necessario.</li>
            <li>- Inviare conferme automatiche e notifiche operative tramite SMTP Aruba o altro provider SMTP configurato.</li>
            <li>- Misurare traffico e utilizzo del sito con Google Analytics 4, solo previo consenso analytics.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-primary">4. Base giuridica</h2>
          <ul className="mt-2 grid gap-2 text-sm leading-relaxed text-muted-foreground">
            <li>- Esecuzione di misure precontrattuali o riscontro a una tua richiesta.</li>
            <li>- Consenso, quando richiesto per i cookie non tecnici e per eventuali strumenti opzionali.</li>
            <li>- Adempimento di obblighi legali e legittimo interesse alla sicurezza del servizio.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-primary">5. Modalita di trattamento e conservazione</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            I dati sono trattati con strumenti informatici e misure di sicurezza adeguate. Le richieste inviate
            tramite sito vengono conservate per il tempo necessario a gestire il contatto, fornire assistenza,
            inviare eventuali risposte via email e adempiere agli obblighi previsti dalla normativa applicabile.
            Le preferenze cookie vengono conservate per 12 mesi, salvo revoca anticipata.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-primary">6. Destinatari e fornitori tecnici</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            I dati possono essere trattati da fornitori tecnici che supportano il sito e i suoi servizi:
            hosting e deploy su Vercel, database PostgreSQL su Neon tramite Prisma, invio email tramite Aruba
            o provider SMTP configurato, e misurazione statistica tramite Google Analytics 4 quando autorizzata.
            Questi soggetti operano come responsabili del trattamento o fornitori autonomi secondo i ruoli
            contrattualmente previsti.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-primary">7. Trasferimenti e sicurezza</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Alcuni fornitori tecnologici, inclusi Vercel, Neon e Google, possono trattare dati anche fuori dallo
            Spazio Economico Europeo. In tali casi SIAM si affida, ove necessario, agli strumenti e alle garanzie
            previsti dalla normativa applicabile. Adottiamo inoltre misure tecniche e organizzative ragionevoli
            per proteggere i dati trattati dal sito.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-primary">8. Diritti dell'interessato</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Puoi esercitare i diritti previsti dagli artt. 15-22 del GDPR, tra cui accesso, rettifica, cancellazione,
            limitazione, opposizione e portabilita, scrivendo a{" "}
            <a className="font-semibold text-primary underline underline-offset-2" href={`mailto:${contactInfo.email}`}>
              {contactInfo.email}
            </a>
            . Hai inoltre il diritto di proporre reclamo al Garante per la protezione dei dati personali.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-primary">9. Cookie e strumenti di tracciamento</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Per i cookie tecnici, il salvataggio del consenso e l'eventuale attivazione di strumenti opzionali
            analytics/marketing, inclusi Google Analytics 4 e l'eventuale Meta Pixel se configurato, consulta la{" "}
            <Link className="font-semibold text-primary underline underline-offset-2" href="/cookie-policy">
              Cookie Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
