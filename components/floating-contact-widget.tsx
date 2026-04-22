"use client";

import { Mail, Phone, Wrench } from "lucide-react";

import { contactInfo } from "@/lib/site-content";
import { RawModalTrigger } from "@/components/modal/modal-trigger-button";

export function FloatingContactWidget() {
  return (
    <div className="fixed bottom-5 right-4 z-50 flex flex-col items-end gap-2 sm:bottom-6 sm:right-6">
      <a
        href={`tel:${contactInfo.phone}`}
        className="group inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white shadow-lg transition hover:scale-105 hover:bg-primary/90"
        aria-label="Chiama SIAM"
      >
        <Phone className="h-5 w-5" />
        <span className="pointer-events-none absolute right-14 rounded-lg bg-slate-900 px-2 py-1 text-xs font-medium text-white opacity-0 transition group-hover:opacity-100">
          Chiama
        </span>
      </a>

      <a
        href={`mailto:${contactInfo.email}`}
        className="group inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent text-white shadow-lg transition hover:scale-105 hover:bg-accent/90"
        aria-label="Invia email"
      >
        <Mail className="h-5 w-5" />
        <span className="pointer-events-none absolute right-14 rounded-lg bg-slate-900 px-2 py-1 text-xs font-medium text-white opacity-0 transition group-hover:opacity-100">
          Email
        </span>
      </a>

      <RawModalTrigger
        modalId="faultReportModal"
        className="group inline-flex h-12 w-12 items-center justify-center rounded-full bg-danger text-white shadow-lg transition hover:scale-105 hover:bg-danger/90"
        aria-label="Segnala guasto"
      >
        <Wrench className="h-5 w-5" />
        <span className="pointer-events-none absolute right-14 rounded-lg bg-slate-900 px-2 py-1 text-xs font-medium text-white opacity-0 transition group-hover:opacity-100">
          Guasto
        </span>
      </RawModalTrigger>
    </div>
  );
}
