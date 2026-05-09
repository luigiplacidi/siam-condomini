import type { Metadata } from "next";
import Link from "next/link";

import { getNewsPosts } from "@/lib/news";

export const metadata: Metadata = {
  title: "News | SIAM s.r.l.",
  description: "Aggiornamenti e articoli pubblicati da SIAM s.r.l.",
  openGraph: {
    title: "News | SIAM s.r.l.",
    description: "Aggiornamenti e articoli pubblicati da SIAM s.r.l.",
    type: "website"
  },
  twitter: {
    card: "summary",
    title: "News | SIAM s.r.l.",
    description: "Aggiornamenti e articoli pubblicati da SIAM s.r.l."
  }
};

export default async function NewsPage() {
  const posts = await getNewsPosts();

  return (
    <section className="section-shell pt-20 pb-20">
      <p className="kicker">Aggiornamenti</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-primary sm:text-5xl">News</h1>
      <p className="mt-4 max-w-3xl text-sm text-muted-foreground">
        Approfondimenti e informazioni utili sul mondo condominiale.
      </p>

      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {posts.map((post) => (
          <article key={post.slug} className="rounded-3xl border border-border bg-white p-6 shadow-soft">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              {post.category} - {post.publishedAt}
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-primary">{post.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{post.excerpt}</p>
            <Link
              href={`/news/${post.slug}`}
              className="mt-4 inline-flex items-center text-sm font-semibold text-primary underline underline-offset-4"
            >
              Leggi articolo
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
