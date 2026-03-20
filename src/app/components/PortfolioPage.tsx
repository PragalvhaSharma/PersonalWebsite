"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { SubstackPost } from "@/app/lib/substack";

type SocialLink = {
  name: string;
  url: string;
};

type ProjectLink = {
  label: string;
  url: string;
  variant?: "primary" | "secondary" | "accent";
};

type Project = {
  title: string;
  description: string;
  imageUrl: string;
  eyebrow: string;
  links: ProjectLink[];
  staggerClassName?: string;
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const socialLinks: SocialLink[] = [
  { name: "GitHub", url: "https://github.com/PragalvhaSharma" },
  { name: "LinkedIn", url: "https://www.linkedin.com/in/pragalvha-sharma-389499204/" },
  { name: "X", url: "https://x.com/pragalvha" },
  { name: "Substack", url: "https://pragalvha.substack.com" },
];

const projects: Project[] = [
  {
    title: "GrokHunt",
    description:
      "Grok-powered talent hunter that finds high-signal people on X, reasons through their background, and sends personalized outreach with an AI interviewer flow.",
    imageUrl: "/Grok.jpeg",
    eyebrow: "Hackathon / Agents",
    links: [
      { label: "Result", url: "https://twitter.com/xai/status/1997875261669621787", variant: "primary" },
      { label: "GitHub", url: "https://github.com/PragalvhaSharma/XaiHackthon", variant: "secondary" },
    ],
  },
  {
    title: "Self Evolving MCP Server",
    description:
      "A self-improving MCP server demo built to show how an agentic system can inspect, extend, and evolve its own capabilities over time.",
    imageUrl: "/MCP Server.avif",
    eyebrow: "Infrastructure / AI",
    links: [
      {
        label: "Demo",
        url: "https://www.loom.com/share/edccf270519d4a47bb0b23e0ff23f0c6?sid=254bb5a9-ca00-453d-8011-50342875b783#Activity",
        variant: "primary",
      },
    ],
    staggerClassName: "md:mt-24",
  },
  {
    title: "NASA/NSS Space Settlement Contest",
    description:
      "First-place global finish in the NASA/NSS contest, beating 26,725 students across 19 countries with a future habitat submission.",
    imageUrl: "/NASA.png",
    eyebrow: "Competition / Research",
    links: [
      { label: "Project", url: "https://github.com/Mehtab-Cheema26/Space-Settlement", variant: "primary" },
      {
        label: "INsauga",
        url: "https://www.insauga.com/brampton-students-win-international-competition-hosted-by-nasa-and-national-space-society/",
      },
      { label: "NASA/NSS", url: "https://nss.org/settlement/nasa/Contest/Results/2023/" },
      {
        label: "Guardian",
        url: "https://www.bramptonguardian.com/news/2-brampton-student-teams-win-prestigious-science-award/article_159bb547-7aaf-517c-ad5d-ccc43bfbcebe.html",
      },
    ],
    staggerClassName: "md:-mt-10",
  },
  {
    title: "M3Drop-PY",
    description:
      "A Python implementation of the M3Drop package, tied to research work that pushes an older tool into a more usable modern workflow.",
    imageUrl: "/M3Drop.png",
    eyebrow: "Research / Python",
    links: [
      { label: "GitHub", url: "https://github.com/PragalvhaSharma/M3Drop-PY", variant: "primary" },
      { label: "Paper", url: "https://academic.oup.com/bioinformatics/article/35/16/2865/5258099", variant: "accent" },
      { label: "PyPI", url: "https://pypi.org/project/M3Drop/" },
    ],
    staggerClassName: "md:mt-20",
  },
  {
    title: "Catholic School Finder",
    description:
      "A location-based search experience for finding Catholic universities nearby without digging through scattered school lists.",
    imageUrl: "/catholic.png",
    eyebrow: "Search / Utility",
    links: [
      { label: "Live site", url: "https://catholic-web-app-bbop.vercel.app", variant: "primary" },
      {
        label: "Demo",
        url: "https://www.loom.com/share/ffddd4e868404112a989c07b8050dcdd",
        variant: "accent",
      },
    ],
  },
  {
    title: "LLM Monitoring",
    description:
      "Monitoring and observability for AI agents, with ingest, metrics, and dashboards built around how real teams debug model behavior.",
    imageUrl: "/LLmMonitoring.png",
    eyebrow: "Observability / Platform",
    links: [
      { label: "GitHub", url: "https://github.com/PragalvhaSharma/LLMmonitoring", variant: "primary" },
      { label: "Deployment", url: "https://next-js-dashboard-pied-tau.vercel.app/", variant: "secondary" },
      {
        label: "Demo",
        url: "https://www.loom.com/share/ceb7d97c76e84651beeaebaa69b74c90?sid=95bd9916-806e-4838-b5c1-d20578a6e7ec",
        variant: "accent",
      },
    ],
    staggerClassName: "md:-mt-12",
  },
  {
    title: "Blanc AI ERP Generator",
    description:
      "An agentic framework for generating custom enterprise software from a prompt, aimed at shrinking the gap from workflow to internal tool.",
    imageUrl: "/erpPrev.png",
    eyebrow: "Enterprise / Agents",
    links: [
      {
        label: "Demo",
        url: "https://drive.google.com/file/d/1jgjvSjjuLevfB16wOxpOCwFEepZ5Xg3C/view",
        variant: "primary",
      },
    ],
    staggerClassName: "md:mt-16",
  },
  {
    title: "Blanc AI Quoting Tool",
    description:
      "A contractor SaaS flow that automatically sourced materials and generated quotes, used across more than 5,000 quote runs.",
    imageUrl: "/quoting.png",
    eyebrow: "Startup / SaaS",
    links: [
      { label: "Demo", url: "https://www.youtube.com/watch?v=d_4CJmvCbWo", variant: "primary" },
      { label: "Deployment", url: "https://www.blancai.ca", variant: "secondary" },
      {
        label: "Accelerator",
        url: "https://entrepreneurship.uwo.ca/accelerator/our-venture-directory/past-cohorts/winter-2025-cohort/blancai/",
        variant: "accent",
      },
    ],
    staggerClassName: "md:-mt-14",
  },
  {
    title: "Ivey Contribution Bingo Leaderboard",
    description:
      "A live leaderboard built during accounting class to track contribution in the Ivey community, more useful than the joke premise suggests.",
    imageUrl: "/ivey.jpeg",
    eyebrow: "Experiment / Community",
    links: [
      { label: "Live site", url: "https://section6.vercel.app/", variant: "primary" },
      { label: "GitHub", url: "https://github.com/PragalvhaSharma/IveyContributionBingo", variant: "secondary" },
    ],
    staggerClassName: "md:mt-12",
  },
  {
    title: "Text to SQL Agent",
    description:
      "An AI agent that converts plain English into SQL for a Postgres database and was deployed for a real client workflow.",
    imageUrl: "/TextToSql.png",
    eyebrow: "Data / AI",
    links: [
      { label: "GitHub", url: "https://github.com/PragalvhaSharma/SQL-Agent", variant: "primary" },
    ],
    staggerClassName: "md:-mt-10",
  },
  {
    title: "Cloudflare AI Chatbot",
    description:
      "A lightweight chatbot with tool calling and context handling built on Cloudflare's Agents SDK using Llama 3.3 7B.",
    imageUrl: "/cloudFlare.jpg",
    eyebrow: "Edge / Conversational AI",
    links: [
      { label: "Deployment", url: "https://agents-starter.pragalvhasharma.workers.dev/", variant: "primary" },
      { label: "GitHub", url: "https://github.com/PragalvhaSharma/cf_ai_PragalvhaSharma", variant: "secondary" },
    ],
    staggerClassName: "md:mt-14",
  },
];

function MotionSection({
  id,
  className,
  children,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <motion.section
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-120px" }}
      variants={fadeUp}
      className={className}
    >
      {children}
    </motion.section>
  );
}

function LinkPill({ link }: { link: ProjectLink }) {
  const isPrimary = link.variant === "primary";
  const variantClassName = isPrimary
    ? "bg-[var(--color-text-strong)] hover:bg-[var(--color-accent)]"
    : "border-white/12 hover:border-white/30 hover:text-[var(--color-text-strong)]";

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      style={isPrimary ? { color: "#000000" } : undefined}
      className={`rounded-full border px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.22em] transition-colors ${isPrimary ? "" : "text-[var(--color-text)]"} ${variantClassName}`}
    >
      {link.label}
    </a>
  );
}

function formatBlogDate(value: string) {
  const parsedDate = new Date(value);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Recent post";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(parsedDate);
}

export default function PortfolioPage({ blogPosts = [] }: { blogPosts?: SubstackPost[] }) {
  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-text)]">
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-white/6 bg-[color:rgba(8,8,8,0.74)] backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-5 sm:px-8">
          <a href="#top" className="font-headline text-lg font-extrabold tracking-[-0.08em] text-[var(--color-text-strong)] sm:text-xl">
            PRAG
          </a>
          <div className="hidden items-center gap-8 md:flex">
            {["Work", "Blogs", "About", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="font-label text-[11px] uppercase tracking-[0.28em] text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text-strong)]"
              >
                {item}
              </a>
            ))}
          </div>
          <a
            href={socialLinks[1].url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-label text-[11px] uppercase tracking-[0.28em] text-[var(--color-accent)] transition-opacity hover:opacity-80"
          >
            LinkedIn
          </a>
        </div>
      </nav>

      <main id="top">
        <section className="hero-shell relative overflow-hidden px-5 pb-20 pt-32 sm:px-8 sm:pb-24 sm:pt-40">
          <div className="hero-glow hero-glow-left" />
          <div className="hero-glow hero-glow-right" />
          <div className="mx-auto flex min-h-[calc(100vh-8rem)] max-w-7xl flex-col justify-center">
            <motion.h1
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="font-headline text-[22vw] font-extrabold leading-[0.8] tracking-[-0.11em] text-[var(--color-text-strong)] sm:text-[18vw] lg:text-[13rem]"
            >
              Prag.
            </motion.h1>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              transition={{ delay: 0.15 }}
              className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,2.1fr)_minmax(260px,0.9fr)] lg:items-end"
            >
              <div className="max-w-3xl space-y-6">
                <p className="max-w-2xl font-body text-2xl font-light leading-tight text-[var(--color-text)] sm:text-4xl">
                  I like building cool stuff on the web — tools, products, side projects when the idea won&apos;t leave me alone.
                </p>
                <div className="flex flex-wrap items-center gap-4 pt-4">
                  <a
                    href="#work"
                    style={{ color: "#000000" }}
                    className="rounded-full bg-[var(--color-text-strong)] px-6 py-3 font-label text-[11px] uppercase tracking-[0.3em] transition-colors hover:bg-[var(--color-accent)]"
                  >
                    View Work
                  </a>
                  <a
                    href={socialLinks[0].url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-white/12 px-6 py-3 font-label text-[11px] uppercase tracking-[0.3em] text-[var(--color-text)] transition-colors hover:border-white/30 hover:text-[var(--color-text-strong)]"
                  >
                    GitHub
                  </a>
                </div>
              </div>

              <div className="grid gap-5 border-l border-white/8 pl-0 lg:pl-8">
                <div>
                  <p className="font-label text-[10px] uppercase tracking-[0.28em] text-[var(--color-text-muted)]">
                    Based In
                  </p>
                  <p className="mt-2 font-headline text-2xl text-[var(--color-text-strong)]">
                    London, ON
                  </p>
                </div>
                <div>
                  <p className="font-label text-[10px] uppercase tracking-[0.28em] text-[var(--color-text-muted)]">
                    School
                  </p>
                  <p className="mt-2 font-headline text-2xl text-[var(--color-text-strong)]">
                    Western + Ivey
                  </p>
                </div>
                <div>
                  <p className="font-label text-[10px] uppercase tracking-[0.28em] text-[var(--color-text-muted)]">
                    Recent Win
                  </p>
                  <p className="mt-2 font-headline text-2xl text-[var(--color-text-strong)]">
                    2nd at xAI Hackathon
                  </p>
                </div>
                <div>
                  <p className="font-label text-[10px] uppercase tracking-[0.28em] text-[var(--color-text-muted)]">
                    Track Record
                  </p>
                  <p className="mt-2 font-headline text-2xl text-[var(--color-text-strong)]">
                    NASA global first place
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <MotionSection id="work" className="section-band px-5 py-24 sm:px-8 md:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="mb-16 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div className="space-y-4">
                <span className="font-label text-[11px] uppercase tracking-[0.32em] text-[var(--color-text-muted)]">
                  01 / Selected Work
                </span>
                <h2 className="font-headline text-5xl font-bold tracking-[-0.06em] text-[var(--color-text-strong)] md:text-6xl">
                  Built fast.
                  <br />
                  Shipped with intent.
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-x-10 gap-y-16 md:grid-cols-2">
              {projects.map((project, index) => (
                <motion.article
                  key={project.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={fadeUp}
                  transition={{ delay: index * 0.03 }}
                  className={`group space-y-6 ${project.staggerClassName ?? ""}`}
                >
                  <div className="relative overflow-hidden rounded-[28px] border border-white/8 bg-black/30 shadow-[0_30px_100px_rgba(0,0,0,0.3)]">
                    <div className="relative aspect-[4/3]">
                      <Image
                        src={project.imageUrl}
                        alt={project.title}
                        fill
                        sizes="(min-width: 768px) 50vw, 100vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.035]"
                        priority={index < 2}
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <span className="font-label text-[10px] uppercase tracking-[0.28em] text-[var(--color-accent)]">
                      {project.eyebrow}
                    </span>
                    <h3 className="font-headline text-3xl font-bold tracking-[-0.05em] text-[var(--color-text-strong)] sm:text-4xl">
                      {project.title}
                    </h3>
                    <p className="max-w-xl font-body text-sm leading-7 text-[var(--color-text)] sm:text-base">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {project.links.map((link) => (
                        <LinkPill key={`${project.title}-${link.label}`} link={link} />
                      ))}
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </MotionSection>

        <MotionSection id="blogs" className="px-5 py-24 sm:px-8 md:py-28">
          <div className="mx-auto max-w-6xl">
            <div className="mb-14 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div className="space-y-4">
                <span className="font-label text-[11px] uppercase tracking-[0.32em] text-[var(--color-text-muted)]">
                  02 / Blogs
                </span>
                <h2 className="font-headline text-5xl font-bold tracking-[-0.06em] text-[var(--color-text-strong)] md:text-6xl">
                  Recent writing.
                </h2>
                <p className="max-w-2xl font-body text-sm leading-7 text-[var(--color-text)] sm:text-base">
                  Essays, notes, and half-formed ideas that were worth publishing anyway.
                </p>
              </div>
              <a
                href={socialLinks[3].url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-label text-[11px] uppercase tracking-[0.28em] text-[var(--color-accent)] transition-opacity hover:opacity-80"
              >
                Visit Substack
              </a>
            </div>
            {blogPosts.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-3">
                {blogPosts.map((post, index) => (
                  <motion.a
                    key={post.url}
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeUp}
                    transition={{ delay: index * 0.08 }}
                    className="group rounded-[24px] border border-white/8 bg-white/4 p-8 backdrop-blur-sm transition-colors hover:border-[var(--color-accent)]/40 hover:bg-white/6"
                  >
                    <p className="font-label text-[10px] uppercase tracking-[0.28em] text-[var(--color-accent)]">
                      {formatBlogDate(post.publishedAt)}
                    </p>
                    <p className="mt-5 font-headline text-2xl font-semibold tracking-[-0.04em] text-[var(--color-text-strong)] transition-colors group-hover:text-[var(--color-accent)]">
                      {post.title}
                    </p>
                    <p className="mt-5 font-body text-sm leading-7 text-[var(--color-text)]">
                      {post.excerpt}
                    </p>
                    <p className="mt-8 font-label text-[11px] uppercase tracking-[0.28em] text-[var(--color-text-muted)] transition-colors group-hover:text-[var(--color-text-strong)]">
                      Read post
                    </p>
                  </motion.a>
                ))}
              </div>
            ) : (
              <div className="rounded-[24px] border border-white/8 bg-white/4 p-8 backdrop-blur-sm">
                <p className="font-headline text-2xl font-semibold tracking-[-0.04em] text-[var(--color-text-strong)]">
                  Substack posts will show up here.
                </p>
                <p className="mt-5 max-w-2xl font-body text-sm leading-7 text-[var(--color-text)]">
                  The site could not load the feed during build, so the fallback is a direct link to the publication.
                </p>
                <a
                  href={socialLinks[3].url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex rounded-full border border-white/10 px-6 py-3 font-label text-[11px] uppercase tracking-[0.28em] text-[var(--color-text-strong)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
                >
                  Open Substack
                </a>
              </div>
            )}
          </div>
        </MotionSection>

        <MotionSection id="about" className="section-band px-5 py-24 sm:px-8 md:py-28">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[minmax(280px,0.9fr)_minmax(0,1.1fr)] lg:items-center">
            <div className="relative mx-auto w-full max-w-md">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[32px] border border-white/10 bg-[var(--color-panel)]">
                <Image
                  src="/Profile.png"
                  alt="Portrait of Prag"
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 60vw, 100vw"
                  className="object-cover grayscale-[0.1] contrast-110"
                  priority
                />
              </div>
              <div className="absolute -bottom-6 -right-4 hidden rounded-full border border-[var(--color-accent)]/30 bg-[color:rgba(8,8,8,0.74)] px-6 py-8 text-center backdrop-blur-md md:block">
                <p className="font-label text-[10px] uppercase tracking-[0.3em] text-[var(--color-accent)]">
                  Always down to meet interesting people
                </p>
              </div>
            </div>

            <div className="space-y-8">
              <span className="font-label text-[11px] uppercase tracking-[0.32em] text-[var(--color-text-muted)]">
                03 / About
              </span>
              <h2 className="font-headline text-4xl font-bold leading-tight tracking-[-0.06em] text-[var(--color-text-strong)] md:text-6xl">
                I like cool stuff.
              </h2>
              <div className="space-y-5 font-body text-base leading-8 text-[var(--color-text)]">
                <p>I try my best to be useful.</p>
                <p>
                  I&apos;ve tinkered with internal tools, search, data-ish side quests, and whatever else sounded fun or useful. If it&apos;s a neat problem or a clean interface, I&apos;m probably interested.
                </p>
              </div>
            </div>
          </div>
        </MotionSection>

        <MotionSection id="contact" className="px-5 py-24 sm:px-8 md:py-32">
          <div className="mx-auto max-w-4xl text-center">
            <span className="font-label text-[11px] uppercase tracking-[0.32em] text-[var(--color-text-muted)]">
              04 / Contact
            </span>
            <h2 className="mt-6 font-headline text-6xl font-black tracking-[-0.09em] text-[var(--color-text-strong)] md:text-8xl">
              Let&apos;s{" "}
              <span className="line-through opacity-45 decoration-current">build</span>{" "}
              vibe.
            </h2>
            <p className="mx-auto mt-6 max-w-2xl font-body text-lg leading-8 text-[var(--color-text)]">
              If you&apos;re working on something interesting, send a note or find me where I already write and ship.
            </p>
            <div className="mt-12 flex flex-wrap justify-center gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-white/10 px-6 py-3 font-label text-[11px] uppercase tracking-[0.28em] text-[var(--color-text-strong)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </MotionSection>
      </main>

      <footer className="border-t border-white/6 px-5 py-8 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="font-headline text-lg font-bold tracking-[-0.05em] text-[var(--color-text-strong)]">
            Prag
          </p>
          <p className="font-label text-[10px] uppercase tracking-[0.28em] text-[var(--color-text-muted)]">
            Tools, products, side projects.
          </p>
        </div>
      </footer>
    </div>
  );
}
