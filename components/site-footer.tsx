import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { contactInfo, navItems } from "@/lib/site-content";
import { ModalTriggerButton, RawModalTrigger } from "@/components/modal/modal-trigger-button";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-[#eef2f4]">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-3">
        <div>
          <div className="inline-flex items-center gap-3">
            <Image src="/images/brand/logo-siam.png" alt="SIAM s.r.l." width={112} height={42} className="h-10 w-auto" />
            <p className="text-lg font-semibold text-primary">SIAM s.r.l.</p>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Amministratori di condomini a L'Aquila. Organizzazione professionale, trasparente, competente
            e all'avanguardia.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <ModalTriggerButton modalId="contactModal" size="sm">
              Contattaci
            </ModalTriggerButton>
            <ModalTriggerButton modalId="quoteModal" size="sm" variant="success">
              Preventivo
            </ModalTriggerButton>
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Navigazione</p>
          <ul className="mt-3 grid gap-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link className="text-sm text-foreground hover:text-primary" href={item.href}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Contatti e dati societari</p>
          <div className="mt-3 rounded-lg border border-border bg-white/70 p-4 text-sm text-foreground">
            <ul className="grid gap-3">
              <li className="inline-flex items-start gap-2">
                <Phone className="mt-0.5 h-4 w-4 text-primary" />
                <a href={`tel:${contactInfo.phone}`}>{contactInfo.phoneDisplay}</a>
              </li>
              <li className="inline-flex items-start gap-2">
                <Mail className="mt-0.5 h-4 w-4 text-primary" />
                <RawModalTrigger modalId="contactModal" className="text-left text-foreground hover:text-primary">
                  {contactInfo.email}
                </RawModalTrigger>
              </li>
              <li className="inline-flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 text-primary" />
                <span>{contactInfo.address}</span>
              </li>
            </ul>
            <div className="mt-4 border-t border-border/80 pt-4">
              <p className="font-semibold text-primary">{contactInfo.legalName}</p>
              <p className="mt-1">P.IVA {contactInfo.vatNumber}</p>
              <p className="mt-1">Codice SDI {contactInfo.sdiCode}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-border/80 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-4 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>Copyright 2026 © SIAM s.r.l.</p>
          <p>Tel: {contactInfo.phoneDisplay} | Email: {contactInfo.email}</p>
          <p className="inline-flex items-center gap-2">
            <Link className="underline underline-offset-2 hover:text-primary" href="/privacy-policy">
              Privacy Policy
            </Link>
            <span>|</span>
            <Link className="underline underline-offset-2 hover:text-primary" href="/cookie-policy">
              Cookie Policy
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
