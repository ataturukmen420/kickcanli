import { KICK_PROFILE_URL, KICK_CLIPS_URL } from "@/lib/kick";

const links = [
  { href: KICK_PROFILE_URL, label: "Kick" },
  { href: KICK_CLIPS_URL, label: "Klipler" },
  { href: "/stats", label: "İstatistikler", internal: true },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-(--border) bg-(--surface-1)">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row sm:px-6">
        <p className="text-sm text-(--text-3)">
          © 2026 <span className="text-(--kick) font-semibold">kickcanli.com</span> · ATA TÜRÜKMEN
        </p>
        <nav aria-label="Footer bağlantıları">
          <ul className="flex items-center gap-4" role="list">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  {...(l.internal ? {} : { target: "_blank", rel: "noopener noreferrer" })}
                  className="text-sm text-(--text-2) hover:text-(--kick) transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-(--kick) rounded"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
