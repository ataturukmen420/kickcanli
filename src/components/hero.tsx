"use client";

import { useRef } from "react";
import { useKickData } from "@/hooks/use-kick-data";
import { formatCount } from "@/lib/format";
import { KICK_PROFILE_URL, KICK_SLUG } from "@/lib/kick";
import { HeroCanvas } from "./hero-canvas";

const socials = [
  {
    href: KICK_PROFILE_URL,
    label: "Kick'te takip et",
    path: "M2 2h4v8l6-8h5l-6 8 6 8h-5l-6-8v8H2V2z",
  },
  {
    href: "https://youtube.com/@ataturukmen",
    label: "YouTube'da takip et",
    path: "M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8zM9.75 15.5v-7l6.25 3.5-6.25 3.5z",
  },
  {
    href: "https://instagram.com/ataturukmen",
    label: "Instagram'da takip et",
    path: "M12 2.2c3.2 0 3.6 0 4.9.1 3.3.1 4.8 1.7 4.9 4.9.1 1.3.1 1.6.1 4.8 0 3.2 0 3.6-.1 4.8-.1 3.2-1.7 4.8-4.9 4.9-1.3.1-1.6.1-4.9.1-3.2 0-3.6 0-4.8-.1-3.3-.1-4.8-1.7-4.9-4.9C2.2 15.6 2.2 15.2 2.2 12c0-3.2 0-3.6.1-4.8C2.4 3.9 4 2.3 7.2 2.3c1.2-.1 1.6-.1 4.8-.1zM12 0C8.7 0 8.3 0 7.1.1 2.7.3.3 2.7.1 7.1 0 8.3 0 8.7 0 12c0 3.3 0 3.7.1 4.9.2 4.4 2.6 6.8 7 7C8.3 24 8.7 24 12 24c3.3 0 3.7 0 4.9-.1 4.4-.2 6.8-2.6 7-7 .1-1.2.1-1.6.1-4.9 0-3.3 0-3.7-.1-4.9C23.7 2.7 21.3.3 16.9.1 15.7 0 15.3 0 12 0zm0 5.8a6.2 6.2 0 1 0 0 12.4A6.2 6.2 0 0 0 12 5.8zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.4-11.8a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z",
  },
];

function StatusBadge({
  live,
  viewers,
}: {
  live: boolean;
  viewers: number;
}) {
  if (live) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-(--kick)/40 bg-(--kick-dim) px-3 py-1 text-xs font-bold uppercase tracking-wide text-(--kick)">
        <span className="h-1.5 w-1.5 rounded-full bg-(--kick) pulse-ring" aria-hidden="true" />
        Canlı{viewers > 0 ? ` · ${formatCount(viewers)}` : ""}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-(--border) bg-(--surface-2)/60 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-(--text-3)">
      <span className="h-1.5 w-1.5 rounded-full bg-(--text-3)" aria-hidden="true" />
      Çevrimdışı
    </span>
  );
}

function StatItem({ value, label, first }: { value: string; label: string; first?: boolean }) {
  return (
    <div
      className={`flex flex-1 flex-col items-center gap-0.5 ${
        first ? "" : "border-l border-(--border)"
      }`}
    >
      <span className="text-xl font-black tabular-nums text-(--text-1) sm:text-2xl">{value}</span>
      <span className="text-[10px] uppercase tracking-widest text-(--text-2) sm:text-xs">{label}</span>
    </div>
  );
}

export function Hero() {
  const { data } = useKickData();
  const followers = formatCount(data.followers);
  const cardRef = useRef<HTMLDivElement>(null);

  // Fare hareketine göre kartı 3D eğen efekt (orijinal preserve-3d tasarımı).
  const handleTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    const MAX = 7;
    el.style.transform = `rotateX(${(-py * MAX).toFixed(2)}deg) rotateY(${(px * MAX).toFixed(2)}deg)`;
  };
  const resetTilt = () => {
    if (cardRef.current) cardRef.current.style.transform = "rotateX(0deg) rotateY(0deg)";
  };

  return (
    <section
      aria-label="Profil"
      className="relative flex min-h-[90vh] w-full items-center justify-center overflow-hidden"
    >
      {/* Arka plan görseli + degrade katmanlar */}
      <div className="absolute inset-0 z-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/generated/hero.webp"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          style={{ filter: "brightness(0.6) saturate(1.15) contrast(1.05)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-(--bg)/55 via-(--bg)/15 to-(--bg)" />
        <div className="absolute inset-0 bg-gradient-to-r from-(--bg)/85 via-transparent to-(--bg)/85" />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 55% 50% at 50% 52%, rgba(6,6,10,0.72) 0%, transparent 72%)",
          }}
        />
      </div>

      {/* Yüzen yeşil ışık küreleri */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-1/4 h-80 w-80 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(83,252,24,0.16) 0%, transparent 70%)",
            filter: "blur(55px)",
            animation: "float 10s ease-in-out infinite",
          }}
        />
        <div
          aria-hidden="true"
          className="absolute top-1/4 right-1/4 h-56 w-56 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(83,252,24,0.10) 0%, transparent 70%)",
            filter: "blur(40px)",
            animation: "float 13s ease-in-out infinite reverse",
          }}
        />
      </div>

      <div className="absolute inset-0 z-0">
        <HeroCanvas />
      </div>

      {/* İçerik kartı */}
      <div
        className="relative z-10 w-full max-w-3xl px-4 py-20 sm:px-6"
        style={{ perspective: "1100px" }}
      >
        <div
          ref={cardRef}
          onMouseMove={handleTilt}
          onMouseLeave={resetTilt}
          className="glass-kick gradient-border holo-shimmer rounded-3xl p-6 sm:p-10"
          style={{
            transformStyle: "preserve-3d",
            transition: "transform 0.18s ease-out",
            willChange: "transform",
          }}
        >
          <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-start sm:gap-10">
            <div className="float shrink-0">
              <div className="relative">
                <div
                  className="avatar-ring absolute -inset-3 rounded-full"
                  style={{
                    background:
                      "conic-gradient(from 0deg, var(--kick) 0%, transparent 30%, transparent 70%, var(--kick) 100%)",
                    padding: "2px",
                    opacity: 0.75,
                  }}
                  aria-hidden="true"
                />
                <div
                  className="absolute -inset-3 rounded-full opacity-35"
                  style={{ boxShadow: "0 0 40px 12px var(--kick-glow)" }}
                  aria-hidden="true"
                />
                <div className="relative h-28 w-28 overflow-hidden rounded-full border-4 border-(--bg) sm:h-36 sm:w-36">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={data.profilePic ?? "/icon.png"}
                    alt={`${KICK_SLUG} profil fotoğrafı`}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
                <span
                  className="absolute bottom-1 right-1 flex h-8 w-8 items-center justify-center rounded-full border-2 border-(--bg) bg-[#53FC18] text-black shadow-lg sm:bottom-2 sm:right-2"
                  title="Kick"
                  aria-hidden="true"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M2 2h4v8l6-8h5l-6 8 6 8h-5l-6-8v8H2V2z" />
                  </svg>
                </span>
              </div>
            </div>

            <div className="flex flex-1 flex-col gap-5 text-center sm:text-left">
              <div>
                <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 sm:justify-start">
                  <h1
                    className="text-4xl font-black tracking-tight text-(--text-1) sm:text-5xl"
                    style={{ textShadow: "0 0 40px rgba(83,252,24,0.25)" }}
                  >
                    {KICK_SLUG}
                  </h1>
                  <StatusBadge live={data.live.isLive} viewers={data.live.viewers} />
                </div>
                <p className="mt-2 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-sm text-(--text-2) sm:justify-start">
                  <span className="font-mono text-(--kick)/70">@{KICK_SLUG}</span>
                  <span aria-hidden="true" className="text-(--text-3)">·</span>
                  <span>🌴 Pattaya, Tayland</span>
                  <span aria-hidden="true" className="text-(--text-3)">·</span>
                  <span>IRL Yayıncı</span>
                </p>
              </div>

              {data.bio && (
                <p className="text-sm leading-relaxed text-(--text-2) max-w-md whitespace-pre-line">
                  {data.bio}
                </p>
              )}

              <div className="flex items-stretch rounded-2xl border border-(--border) bg-(--surface-1)/50 px-2 py-3">
                <StatItem first value={followers} label="Takipçi" />
                <StatItem value={String(data.vods.length)} label="Yayın" />
                <StatItem value={String(data.clips.length)} label="Klip" />
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 sm:justify-start">
                {socials.map((s) => (
                  <a
                    key={s.href}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="group flex h-10 w-10 items-center justify-center rounded-lg border border-(--border) bg-(--surface-2) text-(--text-3) transition-all duration-200 hover:scale-110 hover:text-(--kick) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--kick)"
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d={s.path} />
                    </svg>
                  </a>
                ))}
                <a
                  href={KICK_PROFILE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded bg-[#53FC18] px-5 py-[9px] text-sm font-bold leading-none text-black transition-all duration-150 hover:bg-[#46E514] hover:shadow-[0_4px_20px_rgba(83,252,24,0.45)] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--kick) focus-visible:ring-offset-2 focus-visible:ring-offset-(--bg)"
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M2 2h4v8l6-8h5l-6 8 6 8h-5l-6-8v8H2V2z" />
                  </svg>
                  Takip Et
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center gap-2 opacity-40">
          <span className="text-xs text-(--text-2) uppercase tracking-widest">İçerik</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--kick)" strokeWidth="2" className="float" aria-hidden="true">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>
      </div>
    </section>
  );
}
