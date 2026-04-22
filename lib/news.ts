import { prisma } from "@/lib/prisma";
import { staticNewsPosts, type NewsArticle } from "@/lib/site-content";

function mapDate(date: Date | string) {
  return typeof date === "string" ? date : date.toISOString().slice(0, 10);
}

export async function getNewsPosts(): Promise<NewsArticle[]> {
  if (!process.env.DATABASE_URL) {
    return staticNewsPosts;
  }

  try {
    const posts = await prisma.newsPost.findMany({
      orderBy: { publishedAt: "desc" }
    });

    if (!posts.length) {
      return staticNewsPosts;
    }

    return posts.map((post) => ({
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      category: post.category,
      publishedAt: mapDate(post.publishedAt),
      author: post.author,
      intro: post.intro ?? undefined,
      body: Array.isArray(post.body) ? (post.body as string[]) : [],
      externalLinks: Array.isArray(post.externalLinks)
        ? (post.externalLinks as { label: string; url: string }[])
        : undefined
    }));
  } catch {
    return staticNewsPosts;
  }
}

export async function getNewsPostBySlug(slug: string): Promise<NewsArticle | null> {
  const posts = await getNewsPosts();
  return posts.find((post) => post.slug === slug) ?? null;
}
