import { ArrowRight, ExternalLink, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { NewsCarousel, type NewsCarouselItem } from "@/components/home/news-carousel";
import { ModalTriggerButton } from "@/components/modal/modal-trigger-button";
import { Reveal } from "@/components/ui/reveal";
import { getNewsPosts } from "@/lib/news";
import { brand, punctualityHighlights, serviceGroups, staticNewsPosts, trustBullets } from "@/lib/site-content";

const serviceImages: Record<string, string> = {
  gestione: "/images/stock/building.jpg",
  consulenza: "/images/stock/meeting.jpg",
  "pratiche-condominiali": "/images/stock/documents.jpg"
};

const editorialSpotlightSlugs = [
  "prevenzione-incendi-condominio-regole-e-adempimenti",
  "verifica-cancelli-automatizzati-impianti-e-documentazione",
  "potabilita-dell-acqua-in-condominio-controlli-e-responsabilita",
  "convivenza-in-condominio-regole-pratiche",
  "assicurazione-del-fabbricato-e-tutela-del-condominio"
] as const;

function formatNewsDate(value: string) {
  return new Intl.DateTimeFormat("it-IT", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  }).format(new Date(`${value}T00:00:00`));
}

export default async function HomePage() {
  const latestNews = (await getNewsPosts()).slice(0, 2);
  const spotlightPosts = editorialSpotlightSlugs
    .map((slug) => staticNewsPosts.find((post) => post.slug === slug))
    .filter((post): post is (typeof staticNewsPosts)[number] => Boolean(post));

  const newsCarouselItems: NewsCarouselItem[] = [
    ...latestNews.map((post) => ({
      kind: "article" as const,
      label: post.category,
      title: post.title,
      excerpt: post.excerpt,
      href: `/news/${post.slug}`,
      meta: formatNewsDate(post.publishedAt)
    })),
    ...spotlightPosts.slice(0, 3).map((post) => ({
      kind: "article" as const,
      label: "Approfondimento",
      title: post.title,
      excerpt: post.excerpt,
      href: `/news/${post.slug}`,
      meta: formatNewsDate(post.publishedAt)
    })),
    {
      kind: "resource" as const,
      label: "Riferimento",
      title: "CondominioWeb",
      excerpt:
        "Norme, sentenze e guide per amministratori, avvocati, tecnici e condòmini. Una risorsa esterna da consultare quando serve un approfondimento autorevole.",
      href: "https://www.condominioweb.com/",
      meta: "25 anni di autorevolezza",
      external: true
    }
  ].filter(
    (item, index, items) => index === items.findIndex((candidate) => candidate.href === item.href)
  );

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
                <p className="text-xs uppercase tracking-[0.14em] text-white/85">SIAM s.r.l.</p>
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
                Il rapporto di fiducia tra amministratore e condomini e il fondamento del metodo SIAM s.r.l.
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
          <div className="space-y-8">
            <div>
              <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <p className="kicker">Editoriale SIAM s.r.l.</p>
                  <h2 className="mt-3 text-3xl font-semibold text-primary">News e Approfondimenti normativi</h2>
                  <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">
                    Un carosello che scorre con gli ultimi articoli, i focus normativi piu utili e una risorsa
                    editoriale esterna da consultare quando serve un riferimento in piu.
                  </p>
                </div>
                <Link
                  href="/news"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-primary underline underline-offset-4"
                >
                  Vai a tutte le news <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="mt-6">
                <NewsCarousel items={newsCarouselItems} />
              </div>
            </div>

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
                    <p className="text-sm font-semibold text-primary">Perché visitarlo</p>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      Per trovare rapidamente approfondimenti chiari su norme, sentenze e questioni pratiche del
                      condominio, con un taglio autorevole e operativo.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-border bg-secondary/45 p-5">
                    <p className="text-sm font-semibold text-primary">Cosa ci trovi</p>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      Una raccolta ampia di articoli, guide e commenti utili per chi vuole capire meglio un tema
                      prima di prendere una decisione o affrontare un problema concreto.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-border bg-secondary/45 p-5">
                    <p className="text-sm font-semibold text-primary">Vai quando vuoi</p>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      Un accesso semplice e immediato a un punto di riferimento esterno, utile quando ti serve un
                      approfondimento in più.
                    </p>
                  </div>
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
              Contatta SIAM s.r.l. oppure richiedi un preventivo direttamente dal sito.
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
