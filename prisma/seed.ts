import { prisma } from "../lib/prisma";
import { staticNewsPosts } from "../lib/site-content";

async function main() {
  for (const post of staticNewsPosts) {
    await prisma.newsPost.upsert({
      where: { slug: post.slug },
      create: {
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        category: post.category,
        publishedAt: new Date(post.publishedAt),
        author: post.author,
        intro: post.intro,
        body: post.body,
        externalLinks: post.externalLinks ?? []
      },
      update: {
        title: post.title,
        excerpt: post.excerpt,
        category: post.category,
        publishedAt: new Date(post.publishedAt),
        author: post.author,
        intro: post.intro,
        body: post.body,
        externalLinks: post.externalLinks ?? []
      }
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
