import type { ReactNode } from "react";

export type SitePost = {
  slug: string;
  title: string;
  publishedAt: string;
  excerpt: string;
  body: ReactNode;
};

export const sitePosts: SitePost[] = [
  {
    slug: "asking-aristotle-a-question",
    title: "Asking Aristotle a question",
    publishedAt: "Fri, 02 Oct 2026 16:00:00 GMT",
    excerpt:
      "In 1985, Steve Jobs gave a talk at Lund University in Sweden and described a tool that didn't exist yet.",
    body: (
      <>
        <p>
          In 1985, Steve Jobs gave{" "}
          <a
            href="https://www.youtube.com/watch?v=2qLuerYx2IA"
            target="_blank"
            rel="noreferrer"
            className="work-link"
          >
            a talk at Lund University
          </a>{" "}
          in Sweden and described a tool that didn&apos;t exist yet. He hoped that one day we could
          capture a great thinker&apos;s worldview in a computer, so that a student could &ldquo;not
          only read the words Aristotle wrote, but ask Aristotle a question and get an answer.&rdquo;
        </p>
        <p>
          At the time, that sounded like science fiction. Forty years later, it&apos;s an ordinary
          Tuesday. I can talk to a computer, push back on its reasoning, and ask follow-up questions
          until something finally makes sense. It&apos;s the mentor Jobs was describing, available to
          anyone with a laptop.
        </p>
        <p>I&apos;m very excited to live in that reality, and to make my own contributions.</p>
      </>
    ),
  },
];

export function findSitePost(slug: string) {
  return sitePosts.find((post) => post.slug === slug);
}

export function sitePostFromPath(pathname: string) {
  const match = /^\/writing\/([^/]+)\/?$/.exec(pathname);
  return match ? findSitePost(match[1]) : undefined;
}
