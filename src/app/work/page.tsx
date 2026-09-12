import SiteShell from "../components/SiteShell";
import WorkList from "../components/WorkList";

export default function WorkPage() {
  return (
    <SiteShell active="work">
      <WorkList />
    </SiteShell>
  );
}
