import HeroScene from "@/components/HeroSceneDynamic";
import Link from "next/link";
import { projects } from "@/data/projects";

const skills = [
  { name: "React / Next.js", level: 95 },
  { name: "TypeScript", level: 90 },
  { name: "Three.js / R3F", level: 85 },
  { name: "Node.js", level: 80 },
  { name: "WebGL / GLSL", level: 75 },
  { name: "Python", level: 70 },
];

export default function Home() {
  return (
    <>
      {/* ── HERO ───────────────────────────────────────── */}
      <section
        id="hero"
        className="relative flex min-h-screen w-full items-center justify-center overflow-hidden"
        style={{ background: "var(--background)" }}
      >
        {/* Three.js canvas fills the section */}
        <HeroScene />

        {/* Overlay text */}
        <div className="relative z-10 w-full flex flex-col items-center gap-6 px-6 text-center pointer-events-none select-none">
          <span
            className="font-mono text-xs tracking-[0.3em] uppercase"
            style={{ color: "var(--accent)" }}
          >
            Available for work
          </span>
          <h1
            className="text-5xl md:text-7xl font-bold leading-tight tracking-tight"
            style={{ color: "var(--foreground)" }}
          >
            I build things
            <br />
            <span style={{ color: "var(--accent)" }}>on the web</span>
            <br />
            — and in 3D.
          </h1>
          <p
            className="max-w-md text-base md:text-lg font-mono"
            style={{ color: "var(--muted)" }}
          >
            Full-stack developer & creative technologist. Crafting interactive
            experiences with React, Three.js, and modern web tech.
          </p>
          <div className="pointer-events-auto flex gap-4 pt-2">
            <a
              href="#work"
              className="rounded-full px-6 py-3 text-sm font-mono tracking-widest uppercase transition-all duration-200 hover:scale-105"
              style={{
                background: "var(--accent)",
                color: "#fff",
              }}
            >
              See my work
            </a>
            <a
              href="#contact"
              className="rounded-full px-6 py-3 text-sm font-mono tracking-widest uppercase border transition-all duration-200 hover:scale-105"
              style={{
                borderColor: "var(--border)",
                color: "var(--foreground)",
              }}
            >
              Hire me
            </a>
          </div>
          {/* node hint */}
          <p
            className="font-mono text-[10px] tracking-[0.25em] uppercase"
            style={{ color: "var(--muted)", opacity: 0.6 }}
          >
            ↗ click a node to explore a project
          </p>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 z-10 pointer-events-none animate-bounce">
          <span
            className="font-mono text-[10px] tracking-widest uppercase"
            style={{ color: "var(--muted)" }}
          >
            scroll
          </span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            style={{ color: "var(--muted)" }}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </section>

      {/* ── WORK ───────────────────────────────────────── */}
      <section
        id="work"
        className="py-24 px-6 md:px-16"
        style={{ background: "var(--background)" }}
      >
        <div className="mx-auto max-w-5xl">
          <SectionLabel>Selected Work</SectionLabel>
          <h2
            className="mt-3 mb-12 text-3xl md:text-5xl font-bold tracking-tight"
            style={{ color: "var(--foreground)" }}
          >
            Things I&apos;ve built
          </h2>

          <div className="grid gap-6 sm:grid-cols-2">
            {projects.map((p) => (
              <Link
                key={p.slug}
                href={`/projects/${p.slug}`}
                className="group relative rounded-2xl p-6 border transition-all duration-300 cursor-pointer hover:scale-[1.02]"
                style={{
                  background: "var(--card)",
                  borderColor: "var(--border)",
                }}
              >
                <div className="flex items-start justify-between mb-3">
                  <h3
                    className="text-lg font-semibold"
                    style={{ color: "var(--foreground)" }}
                  >
                    {p.title}
                  </h3>
                  <span
                    className="font-mono text-xs"
                    style={{ color: "var(--muted)" }}
                  >
                    {p.year}
                  </span>
                </div>
                <p
                  className="text-sm leading-relaxed mb-4"
                  style={{ color: "var(--muted)" }}
                >
                  {p.desc}
                </p>
                <div className="flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="font-mono text-[10px] tracking-widest uppercase px-2 py-0.5 rounded-full border"
                      style={{
                        borderColor: "var(--accent)",
                        color: "var(--accent)",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── SKILLS ─────────────────────────────────────── */}
      <section
        id="skills"
        className="py-24 px-6 md:px-16"
        style={{ background: "var(--card)" }}
      >
        <div className="mx-auto max-w-3xl">
          <SectionLabel>Tech Stack</SectionLabel>
          <h2
            className="mt-3 mb-12 text-3xl md:text-5xl font-bold tracking-tight"
            style={{ color: "var(--foreground)" }}
          >
            What I work with
          </h2>

          <div className="flex flex-col gap-5">
            {skills.map((s) => (
              <div key={s.name}>
                <div className="flex justify-between mb-1">
                  <span
                    className="font-mono text-sm"
                    style={{ color: "var(--foreground)" }}
                  >
                    {s.name}
                  </span>
                  <span
                    className="font-mono text-xs"
                    style={{ color: "var(--muted)" }}
                  >
                    {s.level}%
                  </span>
                </div>
                <div
                  className="h-1.5 rounded-full overflow-hidden"
                  style={{ background: "var(--border)" }}
                >
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${s.level}%`,
                      background: "var(--accent)",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ──────────────────────────────────────── */}
      <section
        id="about"
        className="py-24 px-6 md:px-16"
        style={{ background: "var(--background)" }}
      >
        <div className="mx-auto max-w-3xl">
          <SectionLabel>About</SectionLabel>
          <h2
            className="mt-3 mb-6 text-3xl md:text-5xl font-bold tracking-tight"
            style={{ color: "var(--foreground)" }}
          >
            Who I am
          </h2>
          <p
            className="text-base md:text-lg leading-relaxed"
            style={{ color: "var(--muted)" }}
          >
            I&apos;m a full-stack developer and creative technologist with a
            passion for building things that live at the intersection of code
            and visual art. I specialise in interactive 3D experiences, modern
            web applications, and algorithmic design — always with a focus on
            performance, accessibility, and craft.
          </p>
          <p
            className="mt-4 text-base md:text-lg leading-relaxed"
            style={{ color: "var(--muted)" }}
          >
            Open to full-time roles, freelance projects, and research
            collaborations in frontend engineering, creative technology, and
            WebGL / Three.js work.
          </p>
          <a
            href="#contact"
            className="mt-8 inline-block rounded-full px-6 py-3 text-sm font-mono tracking-widest uppercase transition-all duration-200 hover:scale-105"
            style={{ background: "var(--accent)", color: "#fff" }}
          >
            Get in touch
          </a>
        </div>
      </section>

      {/* ── CONTACT ────────────────────────────────────── */}
      <section
        id="contact"
        className="py-24 px-6 md:px-16"
        style={{ background: "var(--card)" }}
      >
        <div className="mx-auto max-w-xl">
          <SectionLabel>Contact</SectionLabel>
          <h2
            className="mt-3 mb-8 text-3xl md:text-5xl font-bold tracking-tight"
            style={{ color: "var(--foreground)" }}
          >
            Let&apos;s talk
          </h2>

          <form className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Name"
              className="w-full rounded-xl px-4 py-3 font-mono text-sm outline-none transition-colors focus:ring-1"
              style={{
                background: "var(--background)",
                color: "var(--foreground)",
                border: "1px solid var(--border)",
              }}
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full rounded-xl px-4 py-3 font-mono text-sm outline-none transition-colors focus:ring-1"
              style={{
                background: "var(--background)",
                color: "var(--foreground)",
                border: "1px solid var(--border)",
              }}
            />
            <select
              className="w-full rounded-xl px-4 py-3 font-mono text-sm outline-none transition-colors"
              style={{
                background: "var(--background)",
                color: "var(--muted)",
                border: "1px solid var(--border)",
              }}
            >
              <option value="">Subject</option>
              <option>Job Opportunity</option>
              <option>Project Inquiry</option>
              <option>Collaboration</option>
              <option>Other</option>
            </select>
            <textarea
              rows={5}
              placeholder="Message"
              className="w-full rounded-xl px-4 py-3 font-mono text-sm outline-none transition-colors resize-none focus:ring-1"
              style={{
                background: "var(--background)",
                color: "var(--foreground)",
                border: "1px solid var(--border)",
              }}
            />
            <button
              type="submit"
              className="rounded-full px-6 py-3 text-sm font-mono tracking-widest uppercase transition-all duration-200 hover:scale-105 self-start"
              style={{ background: "var(--accent)", color: "#fff" }}
            >
              Send message
            </button>
          </form>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────── */}
      <footer
        className="py-8 px-6 text-center font-mono text-xs tracking-widest uppercase"
        style={{
          background: "var(--background)",
          borderTop: "1px solid var(--border)",
          color: "var(--muted)",
        }}
      >
        Blueprint Lab &copy; {new Date().getFullYear()} — Built with Next.js &amp; Three.js
      </footer>
    </>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="font-mono text-xs tracking-[0.3em] uppercase"
      style={{ color: "var(--accent)" }}
    >
      {children}
    </span>
  );
}

