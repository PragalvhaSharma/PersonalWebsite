import PortfolioPage from "../components/PortfolioPage";
import { getRecentSubstackPosts } from "../lib/substack";

export default async function ProfilePage() {
  const blogPosts = await getRecentSubstackPosts();

  return <PortfolioPage blogPosts={blogPosts} />;
}
