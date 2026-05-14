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
