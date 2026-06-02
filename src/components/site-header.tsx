"use client";

import { useState } from "react";
import { useKickData } from "@/hooks/use-kick-data";
import { KICK_PROFILE_URL } from "@/lib/kick";

const KickGlyph = ({ size = 12 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M2 2h4v8l6-8h5l-6 8 6 8h-5l-6-8v8H2V2z" />
  </svg>
);

function LiveBadge({ live }: { live: boolean }) {
  return (
    <span
      className={`hidden items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold transition-colors sm:flex ${
        live
          ? "border-(--kick)/40 bg-(--kick-dim) text-(--kick)"
          : "border-(--border) bg-(--surface-1)/50 text-(--text-3)"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${live ? "bg-(--kick) pulse-ring" : "bg-(--text-3)"}`}
        aria-hidden="true"
      />
      {live ? "Canlı" : "Çevrimdışı"}
    </span>
  );
}

export function SiteHeader() {
  const { live, data } = useKickData();
  const watchHref = live
    ? KICK_PROFILE_URL
    : (data.vods[0]?.url ?? KICK_PROFILE_URL);
  const watchLabel = live ? "İzle" : "Son Yayın";
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50">
      <div className="relative transition-all duration-300 bg-(--bg)/45 backdrop-blur-md">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-(--kick)/35 to-transparent"
          aria-hidden="true"
        />
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <a
            aria-label="ATA TÜRÜKMEN Ana Sayfa"
            className="flex items-center rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--kick)"
            href="/"
          >
            <span className="text-base font-black leading-none tracking-tight sm:text-lg">
              <span className="text-(--kick)" style={{ textShadow: "0 0 18px rgba(83,252,24,0.3)" }}>
                ATA
              </span>
              <span className="text-(--text-1)"> TÜRÜKMEN</span>
            </span>
          </a>

          <nav
            className="hidden items-center gap-1 rounded-full border border-(--border)/70 bg-(--surface-1)/40 p-1 backdrop-blur-sm sm:flex"
            aria-label="Site navigasyonu"
          >
            <a
              className="relative rounded-full px-4 py-1.5 text-sm font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--kick) text-(--text-2) hover:text-(--text-1)"
              href="/"
            >
              Ana Sayfa
            </a>
            <a
              className="relative rounded-full px-4 py-1.5 text-sm font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--kick) text-(--text-2) hover:text-(--text-1)"
              href="/stats"
            >
              İstatistikler
            </a>
          </nav>

          <div className="flex items-center gap-2 sm:gap-2.5">
            <LiveBadge live={live} />
            <a
              href={watchHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#53FC18] px-4 py-2 text-sm font-bold text-black transition-all duration-150 hover:bg-[#46E514] hover:shadow-[0_0_18px_rgba(83,252,24,0.45)] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--kick) focus-visible:ring-offset-2 focus-visible:ring-offset-(--bg)"
            >
              <KickGlyph />
              {watchLabel}
            </a>
            <button
              type="button"
              aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-(--border) bg-(--surface-1)/50 text-(--text-1) transition-colors hover:bg-(--surface-2) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--kick) sm:hidden"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
          </div>
        </div>
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-(--kick)/25 to-transparent"
          aria-hidden="true"
        />

        {open && (
          <div id="mobile-menu" className="sm:hidden border-t border-(--border) bg-(--bg)/95 backdrop-blur-md">
            <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3" aria-label="Mobil navigasyon">
              <a
                href="/"
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-semibold text-(--text-2) hover:bg-(--surface-1) hover:text-(--text-1) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--kick)"
              >
                Ana Sayfa
              </a>
              <a
                href="/stats"
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-semibold text-(--text-2) hover:bg-(--surface-1) hover:text-(--text-1) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--kick)"
              >
                İstatistikler
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
