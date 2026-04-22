import { ArrowRight, FileText, ShieldCheck, Wrench } from "lucide-react";
import Link from "next/link";

import { ModalTriggerButton } from "@/components/modal/modal-trigger-button";
import { getNewsPosts } from "@/lib/news";
import { brand, punctualityHighlights, serviceGroups, trustBullets } from "@/lib/site-content";

export default async function HomePage() {
  const latestNews = (await getNewsPosts()).slice(0, 2);

  return (
    <>
      <section className="section-shell pt-20">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div>
            <p className="kicker">Amministrazione condominiale a L'Aquila</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-primary sm:text-5xl">
              {brand.headline}
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-muted-foreground">{brand.subheadline}</p>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">{brand.aboutShort}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ModalTriggerButton modalId="contactModal" size="lg">
                Richiedi informazioni
              </ModalTriggerButton>
              <ModalTriggerButton modalId="quoteModal" size="lg" variant="secondary">
                Richiedi preventivo
              </ModalTriggerButton>
              <ModalTriggerButton modalId="faultReportModal" size="lg" variant="ghost">
                Segnala un guasto
              </ModalTriggerButton>
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-white p-8 shadow-soft">
            <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Perche sceglierci</p>
            <ul className="mt-5 grid gap-4">
              {trustBullets.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-foreground">
                  <ShieldCheck className="mt-0.5 h-4 w-4 text-accent" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section-shell pt-6">
        <div className="grid gap-5 md:grid-cols-3">
          {serviceGroups.map((group) => (
            <article key={group.id} className="rounded-3xl border border-border bg-white p-6 shadow-soft">
              <h2 className="text-2xl font-semibold text-primary">{group.title}</h2>
              <p className="mt-3 text-sm text-muted-foreground">{group.description}</p>
              <ul className="mt-5 grid gap-2 text-sm text-foreground">
                {group.items.slice(0, 4).map((item) => (
                  <li key={item}>- {item}</li>
                ))}
              </ul>
              <Link
                href={`/chi-siamo#${group.id}`}
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary"
              >
                Vai al dettaglio <ArrowRight className="h-4 w-4" />
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell">
        <div className="rounded-3xl border border-border bg-white p-8 shadow-soft">
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <p className="kicker">Interventi e supporto</p>
              <h2 className="mt-3 text-3xl font-semibold text-primary">Affidabilita, trasparenza e rapidita</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Il rapporto di fiducia tra amministratore e condomini e il fondamento del metodo SIAM.
                Chiarezza, disponibilita, mediazione e rapidita di intervento sono i tratti distintivi del
                servizio.
              </p>
            </div>
            <ul className="grid gap-3 text-sm text-foreground">
              {punctualityHighlights.map((highlight) => (
                <li key={highlight} className="rounded-xl border border-border bg-secondary/50 px-4 py-3">
                  {highlight}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
          <div className="rounded-3xl border border-border bg-white p-8 shadow-soft">
            <p className="kicker">Accesso e documentazione</p>
            <h2 className="mt-3 text-3xl font-semibold text-primary">Comunicazione e documenti</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              I condomini possono segnalare guasti, richiedere documentazione, consultare avvisi e scadenze e
              contattare direttamente l'amministratore.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ModalTriggerButton modalId="documentRequestModal" variant="secondary">
                Richiedi documentazione
              </ModalTriggerButton>
              <ModalTriggerButton modalId="faultReportModal" variant="ghost">
                Segnala guasto
              </ModalTriggerButton>
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-primary p-8 text-primary-foreground shadow-soft">
            <p className="text-sm font-semibold uppercase tracking-wide">News</p>
            <ul className="mt-5 grid gap-4">
              {latestNews.map((post) => (
                <li key={post.slug} className="rounded-2xl bg-white/10 p-4">
                  <p className="text-xs uppercase tracking-wide opacity-85">{post.publishedAt}</p>
                  <h3 className="mt-2 text-lg font-semibold">{post.title}</h3>
                  <p className="mt-2 text-sm opacity-90">{post.excerpt}</p>
                  <Link
                    href={`/news/${post.slug}`}
                    className="mt-3 inline-flex items-center gap-2 text-sm font-semibold"
                  >
                    Leggi articolo <ArrowRight className="h-4 w-4" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section-shell pb-20">
        <div className="rounded-3xl border border-border bg-gradient-to-r from-primary to-accent p-8 text-white shadow-soft">
          <h2 className="text-3xl font-semibold">Hai bisogno di informazioni o stai cercando un nuovo amministratore?</h2>
          <p className="mt-3 max-w-3xl text-sm text-white/90">
            Contatta SIAM oppure richiedi un preventivo direttamente dal sito.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <ModalTriggerButton modalId="contactModal" variant="secondary" size="lg">
              Contattaci
            </ModalTriggerButton>
            <ModalTriggerButton modalId="quoteModal" variant="ghost" size="lg" className="border border-white/30 text-white hover:bg-white/15">
              Richiedi preventivo
            </ModalTriggerButton>
            <ModalTriggerButton modalId="faultReportModal" variant="danger" size="lg">
              Segnala un guasto
            </ModalTriggerButton>
          </div>
        </div>
      </section>
    </>
  );
}
