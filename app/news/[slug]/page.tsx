import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getNewsPostBySlug, getNewsPosts } from "@/lib/news";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = await getNewsPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getNewsPostBySlug(slug);

  if (!post) {
    return { title: "Articolo non trovato | SIAM Condomini" };
  }

  return {
    title: `${post.title} | SIAM Condomini`,
    description: post.excerpt
  };
}

export default async function NewsArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getNewsPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="section-shell pt-20 pb-20">
      <Link href="/news" className="text-sm font-semibold text-primary underline underline-offset-4">
        Torna alle news
      </Link>
      <p className="mt-8 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {post.category} - {post.publishedAt}
      </p>
      <h1 className="mt-3 max-w-4xl text-4xl font-semibold tracking-tight text-primary sm:text-5xl">
        {post.title}
      </h1>
      {post.intro ? <p className="mt-6 text-base text-foreground">{post.intro}</p> : null}
      <div className="mt-6 grid gap-4 text-sm leading-relaxed text-muted-foreground">
        {post.body.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      {post.externalLinks?.length ? (
        <div className="mt-10 rounded-2xl border border-border bg-white p-5 shadow-soft">
          <p className="text-sm font-semibold text-foreground">Link utili</p>
          <ul className="mt-3 grid gap-2 text-sm">
            {post.externalLinks.map((link) => (
              <li key={link.url}>
                <a className="text-primary underline underline-offset-4" href={link.url} target="_blank" rel="noreferrer">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </article>
  );
}
