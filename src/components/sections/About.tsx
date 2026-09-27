import { SectionReveal } from "@/components/ui/SectionReveal";

const skills = [
  { domain: "Applied AI", items: ["LLM integration", "Prompt design", "Live voice", "OCR"] },
  { domain: "Languages", items: ["Go", "Python", "TypeScript", "Ruby", "JavaScript"] },
  { domain: "Frontend", items: ["React", "Next.js", "HTMX", "Preact", "Tailwind"] },
  { domain: "Backend", items: ["Rails", "Flask", "Node.js", "PostgreSQL", "SQLite"] },
  { domain: "Delivery", items: ["Docker", "Fly.io", "GitHub Actions", "Git"] },
];

export function About() {
  return (
    <section id="about" className="portfolio-section border-t border-[#202020]/30">
      <div className="grid grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-20">
        <SectionReveal>
          <h2 className="section-title mb-7">About me</h2>
          <p className="mb-4 text-lg leading-relaxed text-[#202020]">
            I&apos;m a software engineer based in Melbourne. I design, build and
            deploy applications, with AI integration and automation now a
            substantial part of my work. That shift has changed both what I
            build and how I build it.
          </p>
          <p className="text-base leading-relaxed text-[#595959]">
            Working with changing models and APIs is already part of my
            day-to-day work. I handle the architecture, integration, testing and
            deployment, including checking output quality and managing running
            costs.
          </p>

          <div className="mt-9 border-t border-[#202020]/30 pt-6">
            <p className="section-kicker mb-5">What I work with</p>
            <dl className="space-y-4">
              {skills.map((group) => (
                <div key={group.domain} className="grid grid-cols-[80px_1fr] items-baseline gap-4">
                  <dt className="font-mono text-xs text-[#262626]">{group.domain}</dt>
                  <dd className="text-sm leading-relaxed text-[#595959]">
                    {group.items.join(", ")}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </SectionReveal>

        <SectionReveal delay={80}>
          <div className="border border-[#202020] bg-[#efefeb] p-6 shadow-[5px_5px_0_#202020] md:p-8">
            <p className="section-kicker mb-7">Experience</p>
            <div>
              <p className="mb-2 font-mono text-xs text-[#262626]">2023–present</p>
              <h3 className="text-xl font-semibold tracking-tight text-[#202020]" style={{ fontFamily: "var(--font-space)" }}>
                Avanade
              </h3>
              <div className="mt-5">
                <h4 className="font-semibold text-[#202020]">DevOps Architect — Major government department</h4>
                <p className="mt-2 text-sm leading-relaxed text-[#595959]">
                  Designed and maintained the DevOps environment for a government department project, including pipelines, branching strategy and developer support.
                </p>
                <ul className="mt-4 list-disc space-y-4 pl-5 text-sm leading-relaxed text-[#595959]">
                  <li><strong className="font-semibold text-[#202020]">Pipeline design:</strong> Developed reusable YAML pipelines and templates, separating pull-request validation, versioning and packaging, and environment deployment into distinct workflows.</li>
                  <li><strong className="font-semibold text-[#202020]">Quality and security:</strong> Implemented automated checks covering secret scanning, dependency vulnerabilities, linting, tests, code coverage and build validation to catch issues before release.</li>
                  <li><strong className="font-semibold text-[#202020]">Release automation:</strong> Built automated versioning, tagging and packaging workflows using Azure Artifacts Universal Packages, with release notes, checksums and provenance metadata to improve traceability.</li>
                  <li><strong className="font-semibold text-[#202020]">Deployment controls:</strong> Implemented and maintained deployment pipelines across lower and higher environments, including environment-specific configuration, validation and approval gates.</li>
                  <li><strong className="font-semibold text-[#202020]">Troubleshooting and integration:</strong> Investigated build failures, repository and trigger configuration, pipeline conditions and deployment issues, working across development and DevOps teams to resolve delivery blockers.</li>
                </ul>
              </div>
              <div className="mt-6">
                <h4 className="font-semibold text-[#202020]">DevOps Engineer — Major supermarket</h4>
                <p className="mt-2 text-sm leading-relaxed text-[#595959]">
                  Led development of a Terraform-based alerting system with a small team. Delivered ahead of schedule and received client praise for leadership and code quality.
                </p>
              </div>
            </div>
            <div className="mt-7 border-t border-[#262626]/30 pt-6">
              <h3 className="text-lg font-semibold tracking-tight text-[#202020]" style={{ fontFamily: "var(--font-space)" }}>
                Alongside my professional work
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#595959]">
                I developed <strong className="font-semibold text-[#202020]">Alpha Edge, Russian Arcade and Burning Airlines</strong>, extending my experience across full-stack development, API integration, data modelling and AI-enabled applications.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-[#595959]">
                I built each application independently and continue to maintain it, handling requirements, architectural decisions, integration, review and verification.
              </p>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
