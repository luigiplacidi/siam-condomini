"use client";

import { AlertTriangle, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { contactInfo, navItems, reservedAreaUrl } from "@/lib/site-content";
import { cn } from "@/lib/utils";
import { ModalTriggerButton, RawModalTrigger } from "@/components/modal/modal-trigger-button";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="sticky top-0 z-50 border-b border-danger/20 bg-danger/10">
        <div className="mx-auto flex h-11 max-w-6xl items-center justify-between px-4 text-xs font-medium text-danger sm:text-sm">
          <span className="inline-flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            Numero urgenze sempre attivo
          </span>
          <a href={`tel:${contactInfo.emergencyPhone}`} className="font-semibold underline underline-offset-4">
            {contactInfo.emergencyPhoneDisplay}
          </a>
        </div>
      </div>
      <header className="sticky top-11 z-40 border-b border-border/80 bg-white/85 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-6xl items-center justify-between gap-4 px-4">
          <Link href="/" className="text-xl font-semibold tracking-tight text-primary">
            SIAM Condomini
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-medium text-muted-foreground transition hover:text-foreground",
                  pathname === item.href && "text-foreground"
                )}
              >
                {item.label}
              </Link>
            ))}
            <a
              href={reservedAreaUrl}
              className="rounded-xl border border-border px-3 py-2 text-sm font-semibold text-foreground hover:bg-secondary"
              target="_blank"
              rel="noreferrer"
            >
              Area condomini
            </a>
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <ModalTriggerButton modalId="contactModal" variant="secondary">
              Contattaci
            </ModalTriggerButton>
            <ModalTriggerButton modalId="quoteModal">Richiedi preventivo</ModalTriggerButton>
          </div>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border md:hidden"
            onClick={() => setOpen((value) => !value)}
            aria-label="Apri menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {open ? (
          <div className="border-t border-border bg-white px-4 py-4 md:hidden">
            <div className="grid gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground",
                    pathname === item.href && "bg-secondary text-foreground"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="mt-3 grid gap-2">
              <a
                href={reservedAreaUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-lg border border-border px-3 py-2 text-center text-sm font-semibold"
              >
                Area condomini
              </a>
              <RawModalTrigger
                modalId="contactModal"
                className="rounded-lg border border-border px-3 py-2 text-sm font-semibold"
                onClick={() => setOpen(false)}
              >
                Contattaci
              </RawModalTrigger>
              <RawModalTrigger
                modalId="quoteModal"
                className="rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-white"
                onClick={() => setOpen(false)}
              >
                Richiedi preventivo
              </RawModalTrigger>
            </div>
          </div>
        ) : null}
      </header>
    </>
  );
}
