import PortfolioPage from "../components/PortfolioPage";
import fallbackPosts from "../lib/substack-fallback.json";
import type { SubstackPost } from "../lib/substack-types";

export default function ProfilePage() {
  return <PortfolioPage blogPosts={fallbackPosts as SubstackPost[]} />;
}
