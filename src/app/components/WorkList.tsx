import Image from "next/image";
import { highlightProjects, projects, type Project } from "@/app/lib/site";

function ProjectLinks({ project }: { project: Project }) {
  return (
    <p className="font-ui mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm">
      {project.links.map((link) => (
        <a
          key={link.url}
          href={link.url}
          target="_blank"
          rel="noreferrer"
          className="work-link"
        >
          {link.label}
        </a>
      ))}
    </p>
  );
}

function HighlightCard({ project }: { project: Project }) {
  const primary = project.links[0];
  const imageFit = project.imageFit ?? "cover";

  return (
    <article className="border-b border-[var(--line)] pb-8 last:border-b-0 last:pb-0">
      <div className="relative mb-4 aspect-[16/9] overflow-hidden rounded-xl bg-[#ece7dc]">
        <Image
          src={project.imageUrl}
          alt=""
          fill
          sizes="(min-width: 640px) 38rem, 100vw"
          className={imageFit === "contain" ? "object-contain p-6" : "object-cover object-center"}
          priority
        />
      </div>
      <p className="font-ui text-[11px] uppercase tracking-[0.18em] text-[var(--accent)]">
        {project.eyebrow}
      </p>
      {primary ? (
        <a href={primary.url} target="_blank" rel="noreferrer">
          <h2 className="mt-1 text-[1.7rem] leading-tight tracking-[-0.03em] hover:text-[var(--accent)] sm:text-[1.9rem]">
            {project.title}
          </h2>
        </a>
      ) : (
        <h2 className="mt-1 text-[1.7rem] leading-tight tracking-[-0.03em] sm:text-[1.9rem]">
          {project.title}
        </h2>
      )}
      <p className="mt-2 text-[1.02rem] leading-7 text-[var(--foreground)]/80">{project.description}</p>
      <ProjectLinks project={project} />
    </article>
  );
}

function OtherProject({ project }: { project: Project }) {
  const primary = project.links[0];
  const imageFit = project.imageFit ?? "cover";

  return (
    <article className="flex items-start gap-4 py-5 first:pt-0 last:pb-0">
      <div className="relative h-[3.75rem] w-[5.75rem] shrink-0 overflow-hidden rounded-lg bg-[#ece7dc] sm:h-[4.25rem] sm:w-[6.75rem]">
        <Image
          src={project.imageUrl}
          alt=""
          fill
          sizes="108px"
          className={imageFit === "contain" ? "object-contain p-1.5" : "object-cover object-center"}
        />
      </div>
      <div className="min-w-0 flex-1">
        <p className="font-ui text-[11px] uppercase tracking-[0.18em] text-[var(--muted)]">
          {project.eyebrow}
        </p>
        {primary ? (
          <a href={primary.url} target="_blank" rel="noreferrer">
            <h3 className="mt-1 text-[1.25rem] leading-tight tracking-[-0.03em] hover:text-[var(--accent)] sm:text-[1.35rem]">
              {project.title}
            </h3>
          </a>
        ) : (
          <h3 className="mt-1 text-[1.25rem] leading-tight tracking-[-0.03em] sm:text-[1.35rem]">
            {project.title}
          </h3>
        )}
        <p className="mt-1.5 text-[0.95rem] leading-6 text-[var(--foreground)]/75">{project.description}</p>
        <ProjectLinks project={project} />
      </div>
    </article>
  );
}

export default function WorkList() {
  return (
    <div>
      <section>
        <p className="font-ui mb-5 text-[11px] uppercase tracking-[0.2em] text-[var(--muted)]">
          Highlights
        </p>
        <div className="space-y-8">
          {highlightProjects.map((project) => (
            <HighlightCard key={project.title} project={project} />
          ))}
        </div>
      </section>

      <section className="mt-12">
        <p className="font-ui mb-4 text-[11px] uppercase tracking-[0.2em] text-[var(--muted)]">
          Other work
        </p>
        <div className="divide-y divide-[var(--line)]">
          {projects.map((project) => (
            <OtherProject key={project.title} project={project} />
          ))}
        </div>
      </section>
    </div>
  );
}
