import fallbackPosts from "../lib/substack-fallback.json";
import type { SubstackPost } from "../lib/substack-types";
import SiteShell from "../components/SiteShell";
import WritingList from "../components/WritingList";

export default function WritingPage() {
  return (
    <SiteShell active="writing">
      <WritingList posts={fallbackPosts as SubstackPost[]} />
    </SiteShell>
  );
}
