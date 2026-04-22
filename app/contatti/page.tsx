import type { Metadata } from "next";
import { Clock3, Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";

import { ModalTriggerButton } from "@/components/modal/modal-trigger-button";
import { contactInfo } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Contatti | SIAM Condomini",
  description: "Contatti di SIAM Condomini: telefono, email e indirizzo."
};

export default function ContactPage() {
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contactInfo.address)}`;

  return (
    <section className="section-shell pt-14 pb-20">
      <p className="kicker">Contatti</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-primary sm:text-5xl">
        Mettiti in contatto con SIAM
      </h1>
      <p className="mt-4 max-w-3xl text-sm text-muted-foreground">
        Chiamaci, scrivici o invia una richiesta rapida tramite le modali del sito.
      </p>

      <div className="mt-10 grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
        <article className="rounded-3xl border border-border bg-white p-6 shadow-soft">
          <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Contatti diretti</p>
          <ul className="mt-5 grid gap-4 text-sm">
            <li className="flex items-start gap-3">
              <Phone className="mt-0.5 h-4 w-4 text-primary" />
              <span>
                Telefono: <a href={`tel:${contactInfo.phone}`}>{contactInfo.phoneDisplay}</a>
              </span>
            </li>
            <li className="flex items-start gap-3 text-danger">
              <Clock3 className="mt-0.5 h-4 w-4" />
              <span>
                Urgenze: <a href={`tel:${contactInfo.emergencyPhone}`}>{contactInfo.emergencyPhoneDisplay}</a>
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Mail className="mt-0.5 h-4 w-4 text-primary" />
              <span>
                Email: <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
              </span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 text-primary" />
              <a href={mapsUrl} target="_blank" rel="noreferrer">
                {contactInfo.address}
              </a>
            </li>
          </ul>
        </article>

        <article className="overflow-hidden rounded-3xl border border-border bg-white shadow-soft">
          <div className="relative h-56">
            <Image src="/images/stock/building.jpg" alt="Edificio condominiale" fill className="object-cover" />
          </div>
          <div className="bg-gradient-to-br from-primary to-accent p-6 text-white">
            <p className="text-sm font-semibold uppercase tracking-wide text-white/90">Azioni rapide</p>
            <div className="mt-5 grid gap-3">
              <ModalTriggerButton modalId="contactModal" variant="secondary" className="w-full justify-start">
                Contattaci
              </ModalTriggerButton>
              <ModalTriggerButton
                modalId="quoteModal"
                variant="ghost"
                className="w-full justify-start border border-white/30 text-white hover:bg-white/15"
              >
                Richiedi preventivo
              </ModalTriggerButton>
              <ModalTriggerButton modalId="faultReportModal" variant="danger" className="w-full justify-start">
                Segnala guasto
              </ModalTriggerButton>
            </div>
          </div>
        </article>
      </div>

      <p className="mt-6 text-xs text-muted-foreground">
        Acconsento al trattamento dei dati personali come specificato nella Privacy Policy.
      </p>
    </section>
  );
}
