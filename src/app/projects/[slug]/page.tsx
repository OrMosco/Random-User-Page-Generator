import { notFound } from "next/navigation";
import Link from "next/link";
import { projects } from "@/data/projects";

const MAX_RELATED_PROJECTS = 3;

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: `${project.title} — Blueprint Lab`,
    description: project.desc,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  /* find related projects (share at least one tag) */
  const related = projects
    .filter(
      (p) =>
        p.slug !== project.slug &&
        p.tags.some((t) => project.tags.includes(t))
    )
    .slice(0, MAX_RELATED_PROJECTS);

  return (
    <div
      className="min-h-screen pt-24 pb-20 px-6 md:px-16"
      style={{ background: "var(--background)" }}
    >
      <div className="mx-auto max-w-3xl">
        {/* ── Back ── */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase mb-10 transition-colors hover:opacity-70"
          style={{ color: "var(--muted)" }}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Back to home
        </Link>

        {/* ── Header ── */}
        <span
          className="font-mono text-xs tracking-[0.3em] uppercase"
          style={{ color: project.color }}
        >
          {project.year}
        </span>
        <h1
          className="mt-3 mb-4 text-4xl md:text-6xl font-bold tracking-tight leading-tight"
          style={{ color: "var(--foreground)" }}
        >
          {project.title}
        </h1>

        {/* ── Tags ── */}
        <div className="flex flex-wrap gap-2 mb-10">
          {project.tags.map((t) => (
            <span
              key={t}
              className="font-mono text-[11px] tracking-widest uppercase px-3 py-1 rounded-full border"
              style={{ borderColor: project.color, color: project.color }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* ── Links ── */}
        {(project.liveUrl || project.githubUrl) && (
          <div className="flex flex-wrap gap-3 mb-10">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-mono tracking-widest uppercase transition-all duration-200 hover:scale-105"
                style={{ background: project.color, color: "#fff" }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
                Live site
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-mono tracking-widest uppercase border transition-all duration-200 hover:scale-105"
                style={{ borderColor: project.color, color: project.color }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.73.083-.73 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.31.468-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.3 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222 0 1.606-.015 2.898-.015 3.293 0 .322.216.694.825.576C20.565 21.796 24 17.298 24 12c0-6.63-5.37-12-12-12z" />
                </svg>
                GitHub
              </a>
            )}
          </div>
        )}

        {/* ── Colour stripe ── */}
        <div
          className="h-1 w-24 rounded-full mb-10"
          style={{ background: project.color }}
        />

        {/* ── Description ── */}
        <p
          className="text-lg md:text-xl leading-relaxed"
          style={{ color: "var(--muted)" }}
        >
          {project.desc}
        </p>

        {/* ── Placeholder sections ── */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          <InfoCard title="Stack">
            <ul className="flex flex-col gap-1.5">
              {project.tags.map((t) => (
                <li
                  key={t}
                  className="font-mono text-sm flex items-center gap-2"
                  style={{ color: "var(--foreground)" }}
                >
                  <span
                    className="inline-block w-1.5 h-1.5 rounded-full"
                    style={{ background: project.color }}
                  />
                  {t}
                </li>
              ))}
            </ul>
          </InfoCard>
          <InfoCard title="Year">
            <p
              className="font-mono text-4xl font-bold"
              style={{ color: project.color }}
            >
              {project.year}
            </p>
          </InfoCard>
        </div>

        {/* ── Related projects ── */}
        {related.length > 0 && (
          <section className="mt-20">
            <span
              className="font-mono text-xs tracking-[0.3em] uppercase"
              style={{ color: "var(--accent)" }}
            >
              Related
            </span>
            <h2
              className="mt-3 mb-8 text-2xl font-bold tracking-tight"
              style={{ color: "var(--foreground)" }}
            >
              More projects
            </h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/projects/${r.slug}`}
                  className="group rounded-xl p-4 border transition-all duration-200 hover:scale-[1.02]"
                  style={{
                    background: "var(--card)",
                    borderColor: "var(--border)",
                  }}
                >
                  <span
                    className="block font-mono text-[10px] tracking-widest uppercase mb-1"
                    style={{ color: r.color }}
                  >
                    {r.year}
                  </span>
                  <span
                    className="block text-sm font-semibold leading-snug"
                    style={{ color: "var(--foreground)" }}
                  >
                    {r.title}
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

function InfoCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="rounded-xl p-5 border"
      style={{ background: "var(--card)", borderColor: "var(--border)" }}
    >
      <span
        className="font-mono text-[10px] tracking-widest uppercase mb-4 block"
        style={{ color: "var(--muted)" }}
      >
        {title}
      </span>
      {children}
    </div>
  );
}
