import type { Metadata } from "next";

import { ModalTriggerButton } from "@/components/modal/modal-trigger-button";
import { brand, serviceGroups } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Chi siamo | SIAM Condomini",
  description:
    "Scopri SIAM Condomini, amministratori di condomini a L'Aquila: gestione, consulenza e pratiche condominiali."
};

export default function AboutPage() {
  return (
    <>
      <section className="section-shell pt-20">
        <p className="kicker">Chi siamo</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-primary sm:text-5xl">
          SIAM al servizio del tuo condominio
        </h1>
        <p className="mt-5 max-w-3xl text-base leading-relaxed text-muted-foreground">{brand.aboutShort}</p>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          Tramite il sito web favoriamo la comunicazione con i condomini, l'accesso alla documentazione e la
          trasparenza della gestione. Per chi cerca un nuovo amministratore e sempre possibile richiedere un
          preventivo rapido.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <ModalTriggerButton modalId="quoteModal" size="lg">
            Richiedi preventivo
          </ModalTriggerButton>
          <ModalTriggerButton modalId="documentRequestModal" size="lg" variant="secondary">
            Richiedi documentazione
          </ModalTriggerButton>
        </div>
      </section>

      <section className="section-shell pt-4 pb-20">
        <div className="grid gap-6">
          {serviceGroups.map((service) => (
            <article
              key={service.id}
              id={service.id}
              className="scroll-mt-40 rounded-3xl border border-border bg-white p-8 shadow-soft"
            >
              <h2 className="text-3xl font-semibold text-primary">{service.title}</h2>
              <p className="mt-3 text-sm text-muted-foreground">{service.description}</p>
              <ul className="mt-5 grid gap-3 text-sm leading-relaxed text-foreground sm:grid-cols-2">
                {service.items.map((item) => (
                  <li key={item} className="rounded-xl border border-border bg-secondary/45 px-4 py-3">
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
