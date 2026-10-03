import type { SitePost } from "@/app/lib/posts";

function formatPostDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "America/Toronto",
  }).format(new Date(value));
}

export default function WritingPost({ post, onBack }: { post: SitePost; onBack: () => void }) {
  return (
    <article>
      <button
        type="button"
        onClick={onBack}
        className="font-ui cursor-pointer border-0 bg-transparent p-0 text-sm text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
      >
        &larr; all writing
      </button>
      <h1 className="mt-6 text-[2rem] leading-tight tracking-[-0.03em]">{post.title}</h1>
      <p className="font-ui mt-2 text-xs uppercase tracking-[0.16em] text-[var(--muted)]">
        {formatPostDate(post.publishedAt)}
      </p>
      <div className="mt-6 space-y-5 text-[1.05rem] leading-8">{post.body}</div>
    </article>
  );
}
