import AboutLetter from "./components/AboutLetter";
import SiteShell from "./components/SiteShell";

export default function Home() {
  return (
    <SiteShell active="about">
      <AboutLetter />
    </SiteShell>
  );
}
