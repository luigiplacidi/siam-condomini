import { ArrowRight, ExternalLink } from "lucide-react";
import Link from "next/link";

type NewsCarouselItem = {
  kind: "article" | "resource";
  label: string;
  title: string;
  excerpt: string;
  href: string;
  meta: string;
  external?: boolean;
};

type NewsCarouselProps = {
  items: NewsCarouselItem[];
};

const cardToneClasses = {
  article: "from-primary/10 via-white to-secondary/25",
  resource: "from-accent/10 via-white to-secondary/25"
} as const;

export function NewsCarousel({ items }: NewsCarouselProps) {
  const loopedItems = [...items, ...items];

  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-border bg-white shadow-soft">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-white to-transparent lg:w-20" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-white to-transparent lg:w-20" />

      <div className="overflow-hidden">
        <div className="news-marquee-track flex w-max gap-5 px-5 py-5">
          {loopedItems.map((item, index) => {
            const card = (
              <article
                className={`flex h-full min-h-[19rem] w-[19rem] flex-col rounded-[1.75rem] border border-border bg-gradient-to-br p-5 shadow-[0_10px_30px_rgba(14,39,66,0.08)] sm:w-[20.5rem] lg:w-[21.5rem] ${cardToneClasses[item.kind]}`}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-primary">
                    {item.label}
                  </span>
                  <span className="text-[0.72rem] uppercase tracking-[0.16em] text-muted-foreground">
                    {item.meta}
                  </span>
                </div>

                <h3 className="mt-5 text-xl font-semibold leading-tight text-primary">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.excerpt}</p>

                <div className="mt-auto pt-6">
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
                    {item.external ? "Vai al sito" : "Leggi articolo"}
                    {item.external ? <ExternalLink className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
                  </span>
                </div>
              </article>
            );

            return item.external ? (
              <a
                key={`${item.href}-${index}`}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="shrink-0"
              >
                {card}
              </a>
            ) : (
              <Link key={`${item.href}-${index}`} href={item.href as never} className="shrink-0">
                {card}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export type { NewsCarouselItem };
