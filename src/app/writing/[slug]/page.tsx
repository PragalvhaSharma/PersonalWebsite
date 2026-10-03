import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { findSitePost, sitePosts } from "@/app/lib/posts";

export const dynamicParams = false;

export function generateStaticParams() {
  return sitePosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const post = findSitePost((await params).slug);
  if (!post) return {};

  const title = `${post.title} | Pragalvha Sharma`;
  return {
    title,
    description: post.excerpt,
    openGraph: {
      type: "article",
      siteName: "Pragalvha Sharma",
      title,
      description: post.excerpt,
      url: `/writing/${post.slug}`,
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Pragalvha Sharma" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: post.excerpt,
      creator: "@Pragalvha",
      images: ["/og-image.png"],
    },
  };
}

export default async function WritingPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  if (!findSitePost((await params).slug)) notFound();
  return null;
}
