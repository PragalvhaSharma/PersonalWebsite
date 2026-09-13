"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import fallbackPosts from "@/app/lib/substack-fallback.json";
import type { SubstackPost } from "@/app/lib/substack-types";
import { navItems } from "@/app/lib/site";
import AboutLetter from "./AboutLetter";
import WorkList from "./WorkList";
import WritingList from "./WritingList";

type SiteSection = "about" | "work" | "writing";

function sectionFromPath(pathname: string): SiteSection {
  if (pathname === "/work" || pathname.startsWith("/work/")) return "work";
  if (pathname === "/writing" || pathname.startsWith("/writing/")) return "writing";
  return "about";
}

function hrefForSection(section: SiteSection) {
  if (section === "work") return "/work";
  if (section === "writing") return "/writing";
  return "/";
}

export default function SiteTabs() {
  const pathname = usePathname();
  const router = useRouter();
  const [section, setSection] = useState<SiteSection>(() => sectionFromPath(pathname));

  useEffect(() => {
    setSection(sectionFromPath(pathname));
  }, [pathname]);

  return (
    <>
      <nav className="font-ui mt-8 flex gap-5 border-b border-[var(--line)] pb-3 text-sm">
        {navItems.map((item) => {
          const itemSection = sectionFromPath(item.href);
          const isActive = section === itemSection;
          const className = isActive
            ? "text-[var(--accent)]"
            : "text-[var(--muted)] transition-colors hover:text-[var(--foreground)]";

          if (isActive) {
            return (
              <span key={item.name} className={className}>
                {item.name.toLowerCase()}
              </span>
            );
          }

          return (
            <a
              key={item.name}
              href={item.href}
              className={className}
              onClick={(event) => {
                if (
                  event.metaKey ||
                  event.ctrlKey ||
                  event.shiftKey ||
                  event.altKey ||
                  event.button !== 0
                ) {
                  return;
                }

                event.preventDefault();
                setSection(itemSection);
                router.push(hrefForSection(itemSection), { scroll: false });
              }}
            >
              {item.name.toLowerCase()}
            </a>
          );
        })}
      </nav>

      <main className="pt-8">
        {section === "about" ? <AboutLetter /> : null}
        {section === "work" ? <WorkList /> : null}
        {section === "writing" ? (
          <WritingList posts={fallbackPosts as SubstackPost[]} />
        ) : null}
      </main>
    </>
  );
}
