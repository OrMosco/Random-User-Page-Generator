"use client";

import { useTheme } from "./ThemeProvider";

export default function Navbar() {
  const { theme, toggle } = useTheme();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 backdrop-blur-md bg-[var(--background)]/70 border-b border-[var(--border)] transition-colors duration-300">
      {/* Logo */}
      <a href="#hero" className="font-mono text-sm font-semibold tracking-widest uppercase text-[var(--foreground)] hover:text-[var(--accent)] transition-colors">
        Blueprint<span className="text-[var(--accent)]">.</span>Lab
      </a>

      {/* Nav links */}
      <nav className="hidden md:flex items-center gap-8 font-mono text-xs tracking-widest uppercase text-[var(--muted)]">
        <a href="#work" className="hover:text-[var(--foreground)] transition-colors">Work</a>
        <a href="#skills" className="hover:text-[var(--foreground)] transition-colors">Skills</a>
        <a href="#about" className="hover:text-[var(--foreground)] transition-colors">About</a>
        <a href="#contact" className="hover:text-[var(--foreground)] transition-colors">Contact</a>
      </nav>

      {/* Dark / Light toggle */}
      <button
        onClick={toggle}
        aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--border)] font-mono text-xs tracking-widest uppercase text-[var(--muted)] hover:text-[var(--foreground)] hover:border-[var(--accent)] transition-all duration-200"
      >
        {theme === "dark" ? (
          <>
            <SunIcon />
            <span className="hidden sm:inline">Light</span>
          </>
        ) : (
          <>
            <MoonIcon />
            <span className="hidden sm:inline">Dark</span>
          </>
        )}
      </button>
    </header>
  );
}

function SunIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}
