"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import {
  buildCookieConsent,
  COOKIE_CONSENT_EVENT,
  COOKIE_PREFERENCES_EVENT,
  emitCookieConsentUpdate,
  readCookieConsent,
  writeCookieConsent,
  type CookieConsentPreferences
} from "@/lib/cookie-consent";
import { Button } from "@/components/ui/button";

type ConsentDraft = {
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
};

const initialDraft: ConsentDraft = {
  analytics: false,
  marketing: false,
  preferences: false
};

export function CookieBanner() {
  const [consent, setConsent] = useState<CookieConsentPreferences | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [draft, setDraft] = useState<ConsentDraft>(initialDraft);

  useEffect(() => {
    const currentConsent = readCookieConsent();
    setConsent(currentConsent);
    if (currentConsent) {
      setDraft({
        analytics: currentConsent.analytics,
        marketing: currentConsent.marketing,
        preferences: currentConsent.preferences
      });
    }
    setIsLoaded(true);

    const openPreferences = () => setShowPreferences(true);
    const syncConsent = () => {
      const value = readCookieConsent();
      setConsent(value);
      if (value) {
        setDraft({
          analytics: value.analytics,
          marketing: value.marketing,
          preferences: value.preferences
        });
      }
    };

    window.addEventListener(COOKIE_PREFERENCES_EVENT, openPreferences);
    window.addEventListener(COOKIE_CONSENT_EVENT, syncConsent);

    return () => {
      window.removeEventListener(COOKIE_PREFERENCES_EVENT, openPreferences);
      window.removeEventListener(COOKIE_CONSENT_EVENT, syncConsent);
    };
  }, []);

  if (!isLoaded) {
    return null;
  }

  const saveConsent = (nextDraft: ConsentDraft) => {
    const nextConsent = buildCookieConsent(nextDraft);
    writeCookieConsent(nextConsent);
    setConsent(nextConsent);
    setDraft(nextDraft);
    setShowPreferences(false);
    emitCookieConsentUpdate(nextConsent);
  };

  return (
    <>
      {!consent ? (
        <div className="fixed inset-x-0 bottom-0 z-[80] border-t border-border bg-white/95 p-4 backdrop-blur-md">
          <div className="mx-auto max-w-6xl">
            <p className="text-sm text-foreground">
              Usiamo cookie tecnici necessari e, solo con il tuo consenso, cookie analytics/marketing.
              Leggi la
              <Link href="/privacy-policy" className="font-semibold text-primary underline underline-offset-2">
                {" "}Privacy Policy{" "}
              </Link>
              e la
              <Link href="/cookie-policy" className="font-semibold text-primary underline underline-offset-2">
                {" "}Cookie Policy
              </Link>
              .
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Button variant="secondary" onClick={() => saveConsent(initialDraft)}>
                Rifiuta non necessari
              </Button>
              <Button variant="ghost" className="border border-border" onClick={() => setShowPreferences(true)}>
                Personalizza
              </Button>
              <Button
                variant="success"
                onClick={() => saveConsent({ analytics: true, marketing: true, preferences: true })}
              >
                Accetta tutti
              </Button>
            </div>
          </div>
        </div>
      ) : null}

      {consent ? (
        <button
          type="button"
          onClick={() => setShowPreferences(true)}
          className="fixed bottom-6 left-4 z-[70] rounded-full border border-border bg-white px-3 py-2 text-xs font-semibold text-foreground shadow-soft transition hover:bg-secondary sm:left-6"
        >
          Preferenze cookie
        </button>
      ) : null}

      {showPreferences ? (
        <div
          className="fixed inset-0 z-[90] flex items-end justify-center bg-slate-900/45 p-4 sm:items-center"
          onClick={() => setShowPreferences(false)}
        >
          <div
            className="w-full max-w-xl rounded-2xl border border-border bg-white p-6 shadow-soft"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Preferenze cookie"
          >
            <h3 className="text-xl font-semibold text-primary">Preferenze cookie</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              I cookie tecnici sono sempre attivi. Puoi scegliere quali categorie opzionali autorizzare.
            </p>

            <div className="mt-4 space-y-3">
              <PreferenceRow
                title="Tecnici necessari"
                description="Essenziali per sicurezza, navigazione e funzionalita base del sito."
                checked
                disabled
                onToggle={() => undefined}
              />
              <PreferenceRow
                title="Preferenze"
                description="Memorizzano impostazioni utente, ad esempio preferenze di visualizzazione."
                checked={draft.preferences}
                onToggle={() => setDraft((current) => ({ ...current, preferences: !current.preferences }))}
              />
              <PreferenceRow
                title="Analytics"
                description="Misurano traffico e utilizzo in forma aggregata per migliorare il sito."
                checked={draft.analytics}
                onToggle={() => setDraft((current) => ({ ...current, analytics: !current.analytics }))}
              />
              <PreferenceRow
                title="Marketing"
                description="Usati per campagne e contenuti promozionali di terze parti."
                checked={draft.marketing}
                onToggle={() => setDraft((current) => ({ ...current, marketing: !current.marketing }))}
              />
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              <Button variant="secondary" onClick={() => saveConsent(initialDraft)}>
                Rifiuta non necessari
              </Button>
              <Button variant="success" onClick={() => saveConsent(draft)}>
                Salva preferenze
              </Button>
              <Button
                variant="ghost"
                className="border border-border"
                onClick={() => saveConsent({ analytics: true, marketing: true, preferences: true })}
              >
                Accetta tutti
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

type PreferenceRowProps = {
  title: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onToggle: () => void;
};

function PreferenceRow({ title, description, checked, disabled = false, onToggle }: PreferenceRowProps) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-xl border border-border bg-secondary/45 p-3">
      <div>
        <p className="text-sm font-semibold text-foreground">{title}</p>
        <p className="mt-1 text-xs text-muted-foreground">{description}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={title}
        disabled={disabled}
        onClick={onToggle}
        className={`relative h-7 w-12 rounded-full border transition ${
          checked ? "border-accent bg-accent" : "border-border bg-white"
        } ${disabled ? "cursor-not-allowed opacity-70" : ""}`}
      >
        <span
          className={`absolute top-0.5 h-[1.35rem] w-[1.35rem] rounded-full bg-white transition ${
            checked ? "left-6" : "left-0.5"
          }`}
        />
      </button>
    </div>
  );
}
