"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
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

export default function SiteTabs() {
  const pathname = usePathname();
  const [section, setSection] = useState<SiteSection>(() => sectionFromPath(pathname));

  return (
    <>
      <nav className="font-ui mt-8 flex gap-5 border-b border-[var(--line)] pb-3 text-sm">
        {navItems.map((item) => {
          const itemSection = sectionFromPath(item.href);
          const isActive = section === itemSection;

          return (
            <button
              key={item.name}
              type="button"
              aria-current={isActive ? "page" : undefined}
              className={
                isActive
                  ? "cursor-pointer border-0 bg-transparent p-0 font-inherit text-[var(--accent)]"
                  : "cursor-pointer border-0 bg-transparent p-0 font-inherit text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
              }
              onClick={() => {
                setSection(itemSection);
              }}
            >
              {item.name.toLowerCase()}
            </button>
          );
        })}
      </nav>

      <main className="pt-8">
        <div hidden={section !== "about"}>
          <AboutLetter />
        </div>
        <div hidden={section !== "work"}>
          <WorkList />
        </div>
        <div hidden={section !== "writing"}>
          <WritingList posts={fallbackPosts as SubstackPost[]} />
        </div>
      </main>
    </>
  );
}
