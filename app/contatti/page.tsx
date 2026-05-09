import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { ModalTriggerButton } from "@/components/modal/modal-trigger-button";
import { StructuredData } from "@/components/seo/structured-data";
import { brand, contactInfo } from "@/lib/site-content";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  title: "Contatti | SIAM s.r.l.",
  description: "Contatti di SIAM s.r.l.: telefono, email, indirizzo e richieste rapide.",
  openGraph: {
    title: "Contatti | SIAM s.r.l.",
    description: "Contatti di SIAM s.r.l.: telefono, email, indirizzo e richieste rapide.",
    type: "website",
    url: `${siteUrl}/contatti`
  },
  twitter: {
    card: "summary",
    title: "Contatti | SIAM s.r.l.",
    description: "Contatti di SIAM s.r.l.: telefono, email, indirizzo e richieste rapide."
  }
};

export default function ContactPage() {
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contactInfo.address)}`;

  return (
    <section className="section-shell pt-14 pb-20">
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: "Contatti SIAM s.r.l.",
          description: "Contatti di SIAM s.r.l.: telefono, email, indirizzo e richieste rapide.",
          url: `${siteUrl}/contatti`,
          mainEntity: {
            "@type": "LocalBusiness",
            name: brand.name,
            url: siteUrl,
            telephone: contactInfo.phone,
            email: contactInfo.email,
            address: {
              "@type": "PostalAddress",
              streetAddress: contactInfo.address,
              addressLocality: "L'Aquila",
              addressCountry: "IT"
            }
          }
        }}
      />
      <p className="kicker">Contatti</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-primary sm:text-5xl">
        Mettiti in contatto con SIAM s.r.l.
      </h1>
      <p className="mt-4 max-w-3xl text-sm text-muted-foreground">
        Chiamaci, scrivici o invia una richiesta rapida tramite le modali del sito.
      </p>

      <div className="mt-10 grid gap-5 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
        <article className="rounded-3xl border border-border bg-white p-6 shadow-soft">
          <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Intestazione societaria</p>
          <div className="mt-4 rounded-2xl border border-border bg-secondary/35 px-4 py-4 text-sm text-foreground">
            <p className="font-semibold text-primary">{contactInfo.legalName}</p>
            <p className="mt-1">{contactInfo.address}</p>
            <p className="mt-1">P.IVA {contactInfo.vatNumber}</p>
            <p className="mt-1">Codice SDI {contactInfo.sdiCode}</p>
          </div>

          <p className="mt-6 text-sm font-semibold uppercase tracking-wide text-muted-foreground">Contatti diretti</p>
          <ul className="mt-5 grid gap-4 text-sm">
            <li className="flex items-start gap-3 rounded-2xl border border-border bg-secondary/35 px-4 py-3">
              <Phone className="mt-0.5 h-4 w-4 text-primary" />
              <span>
                Telefono: <a href={`tel:${contactInfo.phone}`}>{contactInfo.phoneDisplay}</a>
              </span>
            </li>
            <li className="flex items-start gap-3 rounded-2xl border border-border bg-secondary/35 px-4 py-3">
              <Mail className="mt-0.5 h-4 w-4 text-primary" />
              <span>
                Email: <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
              </span>
            </li>
            <li className="flex items-start gap-3 rounded-2xl border border-border bg-secondary/35 px-4 py-3">
              <MapPin className="mt-0.5 h-4 w-4 text-primary" />
              <a href={mapsUrl} target="_blank" rel="noreferrer">
                {contactInfo.address}
              </a>
            </li>
          </ul>
        </article>

        <article className="overflow-hidden rounded-3xl border border-border bg-white shadow-soft">
          <div className="relative min-h-[19rem] overflow-hidden">
            <Image src="/images/brand/old-site.jpg" alt="SIAM s.r.l." fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/82 via-primary/25 to-transparent" />
            <div className="absolute bottom-0 p-6 text-white">
              <p className="text-xs uppercase tracking-[0.14em] text-white/80">SIAM s.r.l.</p>
              <p className="mt-2 max-w-sm text-lg font-semibold leading-tight">
                SIAM s.r.l. al servizio del tuo condominio
              </p>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-white/90">
                Contattaci per informazioni, documentazione o segnalazioni rapide: rispondiamo in modo chiaro e
                diretto.
              </p>
            </div>
          </div>
          <div className="bg-gradient-to-br from-primary to-accent p-6 text-white">
            <p className="text-sm font-semibold uppercase tracking-wide text-white/90">Azioni rapide</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              <ModalTriggerButton modalId="contactModal" variant="secondary" className="w-full justify-start">
                Contattaci
              </ModalTriggerButton>
              <ModalTriggerButton
                modalId="quoteModal"
                variant="success"
                className="w-full justify-start"
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
        Proseguendo con l'invio, dichiari di aver letto la{" "}
        <Link className="font-semibold text-primary underline underline-offset-2" href="/privacy-policy">
          Privacy Policy
        </Link>{" "}
        e la{" "}
        <Link className="font-semibold text-primary underline underline-offset-2" href="/cookie-policy">
          Cookie Policy
        </Link>
        .
      </p>
    </section>
  );
}
