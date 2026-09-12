import AboutLetter from "../components/AboutLetter";
import SiteShell from "../components/SiteShell";

export default function ProfilePage() {
  return (
    <SiteShell active="about">
      <AboutLetter />
    </SiteShell>
  );
}
