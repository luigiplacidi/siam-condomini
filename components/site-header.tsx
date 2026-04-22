"use client";

import { Mail, MapPin, Menu, Phone, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { contactInfo, navItems } from "@/lib/site-content";
import { cn } from "@/lib/utils";
import { ModalTriggerButton, RawModalTrigger } from "@/components/modal/modal-trigger-button";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 14);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const transparentNav = pathname === "/" && !isScrolled;

  return (
    <header className="sticky top-0 z-50">
      <div
        className={cn(
          "border-b transition-colors",
          transparentNav ? "border-white/20 bg-primary/90 text-white" : "border-primary/20 bg-primary text-white"
        )}
      >
        <div className="mx-auto flex h-11 max-w-6xl items-center justify-between gap-3 px-4 text-xs sm:text-sm">
          <div className="hidden items-center gap-5 sm:flex">
            <a href={`tel:${contactInfo.phone}`} className="inline-flex items-center gap-2 text-white/95 hover:text-white">
              <Phone className="h-3.5 w-3.5" />
              {contactInfo.phoneDisplay}
            </a>
            <a
              href={`mailto:${contactInfo.email}`}
              className="inline-flex items-center gap-2 text-white/95 hover:text-white"
            >
              <Mail className="h-3.5 w-3.5" />
              {contactInfo.email}
            </a>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contactInfo.address)}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-white/95 hover:text-white"
            >
              <MapPin className="h-3.5 w-3.5" />
              L'Aquila
            </a>
          </div>

          <div className="ml-auto flex items-center gap-2 sm:hidden">
            <a
              href={`tel:${contactInfo.phone}`}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/12"
              aria-label="Chiama SIAM"
            >
              <Phone className="h-4 w-4" />
            </a>
            <a
              href={`mailto:${contactInfo.email}`}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/12"
              aria-label="Scrivi a SIAM"
            >
              <Mail className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      <div
        className={cn(
          "border-b transition-all",
          transparentNav
            ? "border-white/35 bg-white/65 backdrop-blur-md"
            : "border-border bg-white/95 shadow-[0_8px_20px_rgba(14,35,58,0.08)] backdrop-blur-md"
        )}
      >
        <div className="mx-auto flex h-20 max-w-6xl items-center justify-between gap-4 px-4">
          <Link href="/" className="inline-flex items-center">
            <Image src="/images/brand/logo-siam.png" alt="SIAM Condomini" width={112} height={42} className="h-10 w-auto" priority />
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-semibold text-muted-foreground transition hover:text-primary",
                  pathname === item.href && "text-primary"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <ModalTriggerButton modalId="contactModal" variant="secondary">
              Contattaci
            </ModalTriggerButton>
            <ModalTriggerButton modalId="quoteModal">Richiedi preventivo</ModalTriggerButton>
          </div>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-white md:hidden"
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
                    pathname === item.href && "bg-secondary/80 text-primary"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="mt-3 grid gap-2">
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
      </div>
    </header>
  );
}
