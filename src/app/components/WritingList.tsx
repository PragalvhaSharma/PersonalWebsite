import type { SubstackPost } from "@/app/lib/substack-types";

function formatPostDate(value: string) {
  const parsedDate = new Date(value);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Recent";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(parsedDate);
}

function formatExcerpt(value: string) {
  const firstSentence = value.split(/(?<=[.!?])\s+/)[0]?.trim() ?? value.trim();
  const cleaned = firstSentence.replace(/\.\.\.$/, "").trim();

  if (cleaned.length <= 110) {
    return cleaned;
  }

  return `${cleaned.slice(0, 107).trimEnd()}...`;
}

export default function WritingList({ posts }: { posts: SubstackPost[] }) {
  if (posts.length === 0) {
    return (
      <p className="leading-8">
        Writing lives on{" "}
        <a
          href="https://pragalvha.substack.com"
          target="_blank"
          rel="noreferrer"
          className="text-[var(--accent)] underline underline-offset-4"
        >
          Substack
        </a>
        . Posts will show up here once the feed loads.
      </p>
    );
  }

  return (
    <div className="divide-y divide-[var(--line)]">
      {posts.map((post) => (
        <a
          key={post.url}
          href={post.url}
          target="_blank"
          rel="noreferrer"
          className="block py-5 first:pt-0 last:pb-0"
        >
          <h2 className="text-[1.55rem] leading-tight tracking-[-0.03em] hover:text-[var(--accent)]">
            {post.title}
          </h2>
          <p className="font-ui mt-2 text-xs uppercase tracking-[0.16em] text-[var(--muted)]">
            {formatPostDate(post.publishedAt)}
          </p>
          <p className="mt-2 text-[0.98rem] leading-7 text-[var(--foreground)]/75">
            {formatExcerpt(post.excerpt)}
          </p>
        </a>
      ))}
    </div>
  );
}
