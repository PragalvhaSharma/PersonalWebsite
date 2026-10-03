"use client";

import { useEffect, useState } from "react";
import fallbackPosts from "@/app/lib/substack-fallback.json";
import type { SubstackPost } from "@/app/lib/substack-types";
import { sitePostFromPath, sitePosts, type SitePost } from "@/app/lib/posts";
import { navItems } from "@/app/lib/site";
import AboutLetter from "./AboutLetter";
import WorkList from "./WorkList";
import WritingList from "./WritingList";
import WritingPost from "./WritingPost";
import PragApi from "./PragApi";

type SiteSection = "about" | "work" | "writing" | "prag-api";

const writingPosts: SubstackPost[] = [
  ...sitePosts.map((post) => ({
    title: post.title,
    url: `/writing/${post.slug}`,
    publishedAt: post.publishedAt,
    excerpt: post.excerpt,
  })),
  ...(fallbackPosts as SubstackPost[]),
].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

function sectionFromPath(pathname: string): SiteSection {
  if (pathname === "/work" || pathname.startsWith("/work/")) return "work";
  if (pathname === "/writing" || pathname.startsWith("/writing/")) return "writing";
  if (pathname === "/prag-api" || pathname.startsWith("/prag-api/")) return "prag-api";
  return "about";
}

export default function SiteTabs() {
  const [section, setSection] = useState<SiteSection>("about");
  const [openPost, setOpenPost] = useState<SitePost | null>(null);

  const closePost = () => {
    setOpenPost(null);
    if (window.location.pathname.startsWith("/writing/")) {
      window.history.replaceState(null, "", "/writing");
    }
  };

  useEffect(() => {
    setSection(sectionFromPath(window.location.pathname));
    setOpenPost(sitePostFromPath(window.location.pathname) ?? null);

    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) {
        return;
      }

      const link = target.closest("a");
      if (!link) {
        return;
      }

      const href = link.getAttribute("href");
      if (href !== "/" && href !== "/work" && href !== "/writing" && href !== "/prag-api") {
        return;
      }

      event.preventDefault();
      event.stopPropagation();
      closePost();
      setSection(sectionFromPath(href));
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

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
                closePost();
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
          {openPost ? (
            <WritingPost post={openPost} onBack={closePost} />
          ) : (
            <WritingList posts={writingPosts} />
          )}
        </div>
        <div hidden={section !== "prag-api"}>
          <PragApi />
        </div>
      </main>
    </>
  );
}
