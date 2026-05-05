import { ArrowRight, ExternalLink, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { ModalTriggerButton } from "@/components/modal/modal-trigger-button";
import { Reveal } from "@/components/ui/reveal";
import { getNewsPosts } from "@/lib/news";
import { brand, punctualityHighlights, serviceGroups, trustBullets } from "@/lib/site-content";

const serviceImages: Record<string, string> = {
  gestione: "/images/stock/building.jpg",
  consulenza: "/images/stock/meeting.jpg",
  "pratiche-condominiali": "/images/stock/documents.jpg"
};

export default async function HomePage() {
  const latestNews = (await getNewsPosts()).slice(0, 2);

  return (
    <>
      <Reveal>
        <section className="section-shell pt-14">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <p className="kicker">Amministrazione condominiale a L'Aquila</p>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight text-primary sm:text-5xl">
                {brand.headline}
              </h1>
              <p className="mt-5 max-w-2xl text-lg text-muted-foreground">{brand.subheadline}</p>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">{brand.aboutShort}</p>
            </div>

            <div className="relative h-[360px] overflow-hidden rounded-[2rem] border border-border shadow-soft">
              <Image
                src="/images/stock/property.jpg"
                alt="Condominio moderno"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/75 via-primary/20 to-transparent" />
              <div className="absolute bottom-0 p-6 text-white">
                <p className="text-xs uppercase tracking-[0.14em] text-white/85">SIAM Condomini</p>
                <p className="mt-2 max-w-sm text-base font-medium leading-relaxed">
                  Gestione trasparente, risposte rapide e comunicazione semplice per il tuo condominio.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3 md:flex-nowrap">
            <ModalTriggerButton modalId="contactModal" size="md" className="shrink-0">
              Richiedi informazioni
            </ModalTriggerButton>
            <ModalTriggerButton modalId="quoteModal" size="md" variant="success" className="shrink-0">
              Richiedi preventivo
            </ModalTriggerButton>
            <ModalTriggerButton modalId="faultReportModal" size="md" variant="danger" className="shrink-0">
              Segnala un guasto
            </ModalTriggerButton>
          </div>
        </section>
      </Reveal>

      <section className="section-shell pt-6">
        <div className="grid gap-5 md:auto-rows-fr md:grid-cols-3">
          {serviceGroups.map((group, index) => (
            <Reveal key={group.id} delay={0.08 * index} className="h-full">
              <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-white shadow-soft transition hover:-translate-y-1 hover:shadow-xl">
                <div className="relative h-40">
                  <Image
                    src={serviceImages[group.id] ?? "/images/stock/building.jpg"}
                    alt={group.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/65 to-transparent" />
                  <p className="absolute bottom-3 left-4 text-sm font-semibold uppercase tracking-wide text-white/90">
                    {group.title}
                  </p>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-sm text-muted-foreground">{group.description}</p>
                  <ul className="mt-5 grid gap-2 text-sm text-foreground">
                    {group.items.slice(0, 4).map((item) => (
                      <li key={item}>- {item}</li>
                    ))}
                  </ul>
                  <Link
                    href={`/chi-siamo#${group.id}`}
                    className="mt-auto pt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary"
                  >
                    Vai al dettaglio <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <Reveal>
        <section className="section-shell">
          <div className="grid gap-8 rounded-3xl border border-border bg-white p-8 shadow-soft lg:grid-cols-[0.95fr_1.05fr]">
            <div>
              <p className="kicker">Interventi e supporto</p>
              <h2 className="mt-3 text-3xl font-semibold text-primary">Affidabilita, trasparenza e rapidita</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Il rapporto di fiducia tra amministratore e condomini e il fondamento del metodo SIAM.
                Chiarezza, disponibilita, mediazione e rapidita di intervento sono i tratti distintivi del
                servizio.
              </p>
              <ul className="mt-6 grid gap-3 text-sm text-foreground">
                {trustBullets.map((item) => (
                  <li
                    key={item}
                    className="inline-flex items-start gap-3 rounded-xl border border-border bg-secondary/45 px-4 py-3"
                  >
                    <ShieldCheck className="mt-0.5 h-4 w-4 text-accent" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative min-h-[360px] overflow-hidden rounded-2xl border border-border">
              <Image src="/images/stock/meeting.jpg" alt="Riunione condominiale" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/70 to-transparent" />
              <ul className="absolute bottom-0 grid gap-3 p-6 text-sm text-white">
                {punctualityHighlights.map((highlight) => (
                  <li key={highlight} className="rounded-xl bg-black/25 px-4 py-3 backdrop-blur-sm">
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal>
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
                <ModalTriggerButton modalId="faultReportModal" variant="danger">
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
      </Reveal>

      <Reveal>
        <section className="section-shell pt-2">
          <div className="rounded-3xl border border-border bg-white p-8 shadow-soft">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="kicker">Approfondimenti normativi</p>
                <h2 className="mt-3 text-3xl font-semibold text-primary">
                  Tre letture utili per chi amministra o vive il condominio
                </h2>
                <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">
                  Una selezione di articoli tecnici SIAM e una risorsa esterna autorevole per consultare norme,
                  sentenze e guide operative quando serve un riferimento in più.
                </p>
              </div>
              <Link
                href="/news"
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary underline underline-offset-4"
              >
                Vai a tutte le news <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-3">
              <article className="flex h-full flex-col rounded-2xl border border-border bg-secondary/35 p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-primary/80">Normativa</p>
                <h3 className="mt-3 text-xl font-semibold text-primary">Prevenzione incendi e adempimenti</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Regole, gestione quotidiana e documentazione per tenere sotto controllo i principali obblighi
                  antincendio del condominio.
                </p>
                <Link
                  href="/news/prevenzione-incendi-condominio-regole-e-adempimenti"
                  className="mt-auto pt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary"
                >
                  Leggi articolo <ArrowRight className="h-4 w-4" />
                </Link>
              </article>

              <article className="flex h-full flex-col rounded-2xl border border-border bg-secondary/35 p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-primary/80">Impianti</p>
                <h3 className="mt-3 text-xl font-semibold text-primary">Verifica cancelli automatizzati</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Impianti, documenti di conformita e controlli periodici quando il condominio ha automazioni o
                  basculanti motorizzate.
                </p>
                <Link
                  href="/news/verifica-cancelli-automatizzati-impianti-e-documentazione"
                  className="mt-auto pt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary"
                >
                  Leggi articolo <ArrowRight className="h-4 w-4" />
                </Link>
              </article>

              <article className="flex h-full flex-col rounded-2xl border border-border bg-secondary/35 p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-primary/80">Riferimenti</p>
                <h3 className="mt-3 text-xl font-semibold text-primary">CondominioWeb</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Norme, sentenze e guide operative per amministratori, tecnici e condòmini. Un supporto utile da
                  consultare insieme alle fonti ufficiali.
                </p>
                <a
                  href="https://www.condominioweb.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-auto pt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary"
                >
                  Vai al sito <ExternalLink className="h-4 w-4" />
                </a>
              </article>
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="section-shell">
          <div className="overflow-hidden rounded-3xl border border-border bg-white shadow-soft">
            <div className="grid gap-0 lg:grid-cols-[0.95fr_1.05fr]">
              <div className="bg-gradient-to-br from-primary via-primary to-accent p-8 text-white">
                <p className="kicker text-white/80">Risorsa editoriale</p>
                <h2 className="mt-3 text-3xl font-semibold leading-tight">
                  Problemi di condominio? Una biblioteca di riferimento sempre utile.
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-white/90">
                  Diritto condominiale, norme, sentenze e guide per amministratori, avvocati, tecnici e condòmini.
                  Oltre 15.000 articoli e 25 anni di autorevolezza.
                </p>
                <a
                  href="https://www.condominioweb.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-semibold text-primary transition hover:bg-white/90"
                >
                  Vai a CondominioWeb <ExternalLink className="h-4 w-4" />
                </a>
              </div>

              <div className="grid gap-4 p-8">
                <div className="rounded-2xl border border-border bg-secondary/45 p-5">
                  <p className="text-sm font-semibold text-primary">Quando usarlo</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    Per approfondire temi tecnici o giuridici, verificare orientamenti giurisprudenziali e trovare
                    guide operative utili alla gestione quotidiana del condominio.
                  </p>
                </div>
                <div className="rounded-2xl border border-border bg-secondary/45 p-5">
                  <p className="text-sm font-semibold text-primary">Come lo integriamo qui</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    Lo trattiamo come risorsa esterna di approfondimento, affiancata agli articoli SIAM e ai
                    riferimenti normativi ufficiali.
                  </p>
                </div>
                <div className="rounded-2xl border border-border bg-secondary/45 p-5">
                  <p className="text-sm font-semibold text-primary">Accesso rapido</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    Un collegamento visibile ma discreto, utile per chi cerca subito casi pratici, sentenze e
                    aggiornamenti.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal>
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
              <ModalTriggerButton modalId="quoteModal" variant="success" size="lg">
                Richiedi preventivo
              </ModalTriggerButton>
              <ModalTriggerButton modalId="faultReportModal" variant="danger" size="lg">
                Segnala un guasto
              </ModalTriggerButton>
            </div>
          </div>
        </section>
      </Reveal>
    </>
  );
}
