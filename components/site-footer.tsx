import Link from "next/link";

import { contactInfo, navItems } from "@/lib/site-content";
import { ModalTriggerButton } from "@/components/modal/modal-trigger-button";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-slate-50">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-3">
        <div>
          <p className="text-lg font-semibold text-primary">SIAM Condomini</p>
          <p className="mt-3 text-sm text-muted-foreground">
            Amministratori di condomini a L'Aquila. Organizzazione professionale, trasparente,
            competente e all'avanguardia.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <ModalTriggerButton modalId="contactModal" size="sm">
              Contattaci
            </ModalTriggerButton>
            <ModalTriggerButton modalId="quoteModal" size="sm" variant="secondary">
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
          <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Contatti</p>
          <ul className="mt-3 grid gap-2 text-sm">
            <li>
              Telefono: <a href={`tel:${contactInfo.phone}`}>{contactInfo.phoneDisplay}</a>
            </li>
            <li className="font-semibold text-danger">
              Urgenze: <a href={`tel:${contactInfo.emergencyPhone}`}>{contactInfo.emergencyPhoneDisplay}</a>
            </li>
            <li>
              Email: <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
            </li>
            <li>{contactInfo.address}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border/80 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-4 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>Copyright 2026 © SIAM Condomini</p>
          <p>
            Tel: {contactInfo.phoneDisplay} | Urgenze: {contactInfo.emergencyPhoneDisplay}
          </p>
        </div>
      </div>
    </footer>
  );
}
