"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Caveat } from "next/font/google";
import { Globe } from "lucide-react";
import { projects } from "@/data/projects";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { ProjectGallery } from "@/components/ui/ProjectGallery";

const handwriting = Caveat({ subsets: ["latin"], weight: "500", display: "swap" });

export function Projects() {
  const [open, setOpen] = useState<Set<string>>(() => new Set());
  const rowRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    // Keep all content available without scroll-driven changes for reduced motion
    // and older browsers; the buttons still allow manual opening and closing.
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    ) {
      setOpen(new Set(projects.map((project) => project.slug)));
      return;
    }

    // Restore the continuous row observation from the recovered deployment.
    // Rows open on entering the trigger zone and reset when leaving below it.
    const observers = rowRefs.current.map((row, index) => {
      if (!row) return null;
      const slug = projects[index].slug;
      const observer = new IntersectionObserver(
        ([entry]) => {
          // Keep content open after it has scrolled off the top of the screen.
          if (!entry.isIntersecting && entry.boundingClientRect.top < 0) return;
          setOpen((previous) => {
            if (previous.has(slug) === entry.isIntersecting) return previous;
            const next = new Set(previous);
            if (entry.isIntersecting) next.add(slug);
            else next.delete(slug);
            return next;
          });
        },
        { rootMargin: "0px 0px -50% 0px", threshold: 0.1 }
      );
      observer.observe(row);
      return observer;
    });

    return () => observers.forEach((observer) => observer?.disconnect());
  }, []);

  function toggleProject(slug: string) {
    setOpen((previous) => {
      const next = new Set(previous);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });
  }

  return (
    <section id="projects" className="portfolio-section">
      <SectionReveal className="mb-12">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="section-title max-w-[620px]">A few things I&apos;ve built.</h2>
          <a
            href="https://github.com/tombryson"
            target="_blank"
            rel="noopener noreferrer"
            className="text-link shrink-0 self-start sm:self-auto"
          >
            My GitHub ↗
          </a>
        </div>
      </SectionReveal>

      <div className="border-t-2 border-[#202020]">
        {projects.map((project, index) => {
          const isOpen = open.has(project.slug);
          const HeadingControl = project.liveUrl ? "a" : "button";
          return (
            <article
              key={project.slug}
              ref={(row) => { rowRefs.current[index] = row; }}
              className="border-b border-[#202020]/30"
            >
              <h3>
                <HeadingControl
                  id={`project-toggle-${project.slug}`}
                  data-project-slug={project.slug}
                  {...(project.liveUrl ? {
                    href: project.liveUrl,
                    target: "_blank",
                    rel: "noopener noreferrer",
                    "aria-label": `Open ${project.name} (new tab)`,
                  } : {
                    type: "button" as const,
                    onClick: () => toggleProject(project.slug),
                    "aria-expanded": isOpen,
                    "aria-controls": `project-detail-${project.slug}`,
                  })}
                  className="group flex w-full cursor-pointer items-center gap-4 py-7 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#262626] md:gap-6 md:py-9"
                >
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center border border-[#202020] font-mono text-xs text-[#202020] transition-colors ${isOpen ? "bg-[#ffe54c]" : "bg-transparent group-hover:bg-[#e9e9e5]"}`}
                    aria-hidden="true"
                  >
                    {project.index}
                  </span>
                  <span className="min-w-0 flex-1">
                    {project.tagline && <span className="mb-2 block font-mono text-xs font-normal text-[#595959] sm:text-[13px]">
                      {project.tagline}
                    </span>}
                    <span
                      className={`block text-[clamp(1.6rem,3.7vw,3rem)] leading-tight font-bold tracking-[-0.045em] text-[#202020] ${project.liveUrl ? "decoration-2 underline-offset-8 group-hover:underline group-focus-visible:underline" : ""}`}
                      style={{ fontFamily: "var(--font-space)" }}
                    >
                      {project.name}
                    </span>
                  </span>
                  <span
                    className="flex h-11 w-11 shrink-0 items-center justify-center border border-[#202020]/40 text-2xl font-normal text-[#262626] transition-colors group-hover:bg-[#e9e9e5]"
                    aria-hidden="true"
                  >
                    {project.liveUrl ? "↗" : isOpen ? "−" : "+"}
                  </span>
                </HeadingControl>
              </h3>

              <div
                id={`project-detail-${project.slug}`}
                className="accordion-grid"
                data-open={String(isOpen)}
                aria-labelledby={`project-toggle-${project.slug}`}
                aria-hidden={!isOpen}
                inert={!isOpen}
              >
                <div className="overflow-hidden">
                  <div className="grid gap-8 pr-1 pb-10 md:pl-[60px] lg:grid-cols-2 lg:gap-12">
                    <div>
                      <p className="mb-4 max-w-xl text-[17px] leading-relaxed text-[#202020]">
                        {project.description}
                      </p>
                      <p className="mb-6 max-w-xl text-base leading-relaxed text-[#595959]">
                        {project.implementation}
                      </p>
                      {project.slug === "burning-airlines" && (
                        <figure className="mb-7 ml-auto max-w-[22rem] pl-4 text-right">
                          <blockquote className={`${handwriting.className} -rotate-2 text-[28px] leading-tight text-[#202020]`}>
                            “P.S., interface you’ve designed in the screenshot looks pretty slick.”
                          </blockquote>
                          <figcaption className="mt-3 text-xs leading-relaxed text-[#595959]">
                            <span className="font-medium text-[#202020]">Alec Thorpe, OAG</span>
                          </figcaption>
                        </figure>
                      )}
                      <p className="mb-6 font-mono text-xs leading-relaxed text-[#595959]">
                        {project.tags.join(" · ")}
                      </p>
                      <div className="flex flex-wrap gap-3">
                        {project.links.map((link) => (
                          <a
                            key={link.label}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={project.liveUrl ? "inline-flex h-11 w-11 items-center justify-center rounded-sm text-[#202020] transition-colors hover:bg-[#202020] hover:text-white" : "project-link"}
                            aria-label={project.liveUrl ? `${project.name} on ${link.label} (new tab)` : undefined}
                            title={project.liveUrl ? `${project.name} on ${link.label}` : undefined}
                          >
                            {project.liveUrl && link.label === "GitHub" ? (
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                <path d="M12 .297C5.37.297 0 5.67 0 12.297c0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.043-1.61-4.043-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729 1.205.084 1.838 1.237 1.838 1.237 1.07 1.835 2.809 1.305 3.495.998.108-.776.418-1.305.762-1.605-2.665-.3-5.467-1.334-5.467-5.93 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.52 11.52 0 0 1 12 6.099c1.02.005 2.045.138 3.003.404 2.291-1.552 3.297-1.23 3.297-1.23.654 1.652.243 2.873.12 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.625-5.479 5.921.43.372.823 1.102.823 2.222 0 1.606-.015 2.898-.015 3.293 0 .322.216.694.825.576C20.565 22.092 24 17.596 24 12.297c0-6.627-5.373-12-12-12" />
                              </svg>
                            ) : <>{link.label} ↗</>}
                          </a>
                        ))}
                        {project.liveUrl && (
                          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                            aria-label={`Open ${project.name} live app (new tab)`}
                            title={`Open ${project.name}`}
                            className="inline-flex h-11 w-11 items-center justify-center rounded-sm text-[#202020] transition-colors hover:bg-[#202020] hover:text-white">
                            <Globe size={24} aria-hidden="true" />
                          </a>
                        )}
                      </div>
                    </div>
                    <div className="min-w-0 self-start space-y-6">
                      {project.screenshots ? (
                        <ProjectGallery name={project.name} screenshots={project.screenshots} />
                      ) : project.image ? (
                        <figure className="self-start border border-[#202020] bg-[#e9e9e5] p-2 shadow-[4px_4px_0_#202020]">
                          <div className="relative aspect-video overflow-hidden border border-[#202020]/20">
                            <Image
                              src={project.image}
                              alt={`${project.name} application interface`}
                              fill
                              className="object-cover object-top"
                              sizes="(max-width: 1024px) 90vw, 40vw"
                            />
                          </div>
                          <figcaption className="px-1 pt-2 pb-1 font-mono text-[11px] text-[#262626]">
                            {project.name} / a look inside
                          </figcaption>
                        </figure>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
