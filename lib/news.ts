import { prisma } from "@/lib/prisma";
import { staticNewsPosts, type NewsArticle } from "@/lib/site-content";

function mapDate(date: Date | string) {
  return typeof date === "string" ? date : date.toISOString().slice(0, 10);
}

function sortByDateDesc(posts: NewsArticle[]) {
  return [...posts].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export async function getNewsPosts(): Promise<NewsArticle[]> {
  if (!process.env.DATABASE_URL) {
    return sortByDateDesc(staticNewsPosts);
  }

  try {
    const posts = await prisma.newsPost.findMany({
      orderBy: { publishedAt: "desc" }
    });

    if (!posts.length) {
      return sortByDateDesc(staticNewsPosts);
    }

    const dbPosts = posts.map((post) => ({
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

    const missingStaticPosts = staticNewsPosts.filter(
      (staticPost) => !dbPosts.some((dbPost) => dbPost.slug === staticPost.slug)
    );

    return sortByDateDesc([...dbPosts, ...missingStaticPosts]);
  } catch {
    return sortByDateDesc(staticNewsPosts);
  }
}

export async function getNewsPostBySlug(slug: string): Promise<NewsArticle | null> {
  const posts = await getNewsPosts();
  return posts.find((post) => post.slug === slug) ?? null;
}
