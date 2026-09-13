import { socialLinks } from "@/app/lib/site";
import SiteTabs from "./SiteTabs";

export default function SiteShell() {
  return (
    <div className="mx-auto max-w-[38rem] px-5 pb-16 pt-10 sm:px-6 sm:pt-14">
      <header className="flex items-start gap-4 sm:gap-5">
        <div className="relative h-[5.25rem] w-[4.15rem] shrink-0 overflow-hidden rounded-md sm:h-[6.5rem] sm:w-[5.15rem]">
          <img
            src="/Profile.png"
            alt="Prag"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="min-w-0 pt-0.5">
          <p className="font-display text-[2rem] leading-none tracking-[-0.04em] sm:text-[2.35rem]">
            Prag
          </p>
          <p className="font-ui mt-2 text-sm leading-6 text-[var(--muted)]">
            Tools, products, and side projects.
          </p>
          <div className="font-ui mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="text-[var(--foreground)] underline decoration-[var(--line)] underline-offset-4 transition-colors hover:text-[var(--accent)] hover:decoration-[var(--accent)]"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </header>

      <SiteTabs />
    </div>
  );
}
