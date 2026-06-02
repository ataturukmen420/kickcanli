const FAQ: { q: string; a: string }[] = [
  {
    q: "ATA TÜRÜKMEN kimdir?",
    a: "ATA TÜRÜKMEN, Tayland'da yaşayan ve Kick platformunda IRL (gerçek hayat) yayınlar yapan Türk içerik üreticisi ve canlı yayıncıdır. @ataturukmen kanalında neredeyse her gün yayın açar; gezilerini, günlük hayatını ve dumanlı sohbetlerini takipçileriyle paylaşır.",
  },
  {
    q: "ATA TÜRÜKMEN hangi platformda yayın yapıyor?",
    a: "ATA TÜRÜKMEN canlı yayınlarını Kick üzerinde, kick.com/ataturukmen kanalında yapıyor. Bu siteden (kickcanli.com) yayını doğrudan izleyebilir veya Kick'te takip edebilirsin.",
  },
  {
    q: "ATA TÜRÜKMEN nasıl izlenir ve takip edilir?",
    a: "Canlı yayını kickcanli.com ana sayfasından izleyebilirsin; yayın açıkken oynatıcı otomatik görünür. Bildirim almak için Kick'te @ataturukmen kanalını takip et.",
  },
  {
    q: "ATA TÜRÜKMEN ne tür yayınlar yapıyor?",
    a: "Ağırlıklı olarak IRL yayınlar: Tayland gezileri, günlük hayat, sokak ve doğa içerikleri ve sohbet yayınları. Yayın kategorileri ve geçmiş yayın saatleri istatistikler sayfasında detaylıca yer alır.",
  },
  {
    q: "ATA TÜRÜKMEN'in kaç takipçisi var?",
    a: "ATA TÜRÜKMEN'in Kick kanalı her geçen gün büyüyor. Güncel takipçi sayısını bu sayfanın üst kısmında canlı olarak görebilirsin.",
  },
  {
    q: "ATA TÜRÜKMEN klipleri ve eski yayınları nereden izlenir?",
    a: "En iyi anların klipleri ve geçmiş yayınların tamamı bu sitedeki 'Klipler' ve 'Tüm Yayınlar' bölümlerinde listelenir. Her birine tıklayarak Kick üzerinden izleyebilirsin.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

const Chevron = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="var(--kick)"
    strokeWidth="2"
    strokeLinecap="round"
    className="shrink-0 transition-transform duration-200 group-open:rotate-180"
    aria-hidden="true"
  >
    <path d="M6 9l6 6 6-6" />
  </svg>
);

export function AboutFaq() {
  return (
    <section aria-labelledby="about-heading" className="mx-auto w-full max-w-7xl px-4 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="mb-7 flex items-end justify-between">
        <div className="flex flex-col gap-2">
          <span className="section-label">ℹ️ Hakkında</span>
          <h2 id="about-heading" className="text-2xl font-black text-(--text-1) tracking-tight">
            ATA TÜRÜKMEN Hakkında &amp; Sıkça Sorulanlar
          </h2>
        </div>
      </div>

      <p className="mb-8 max-w-3xl text-sm leading-relaxed text-(--text-2)">
        <strong className="text-(--text-1)">ATA TÜRÜKMEN</strong>, Tayland&apos;dan IRL yayınlar yapan
        Türk <strong className="text-(--text-1)">Kick yayıncısıdır</strong>. Kick platformundaki{" "}
        <span className="text-(--kick)">@ataturukmen</span> kanalında günlük hayatını, gezilerini ve
        dumanlı sohbetlerini canlı paylaşır. Bu sayfada ATA TÜRÜKMEN&apos;in{" "}
        <strong className="text-(--text-1)">canlı yayınını</strong> izleyebilir, en iyi{" "}
        <strong className="text-(--text-1)">kliplerine</strong> ve geçmiş{" "}
        <strong className="text-(--text-1)">yayın arşivine</strong> tek yerden ulaşabilirsin.
      </p>

      <div className="flex flex-col gap-3" role="list">
        {FAQ.map((item) => (
          <details
            key={item.q}
            role="listitem"
            className="group rounded-2xl border border-(--border) bg-(--surface-1) open:border-(--kick)/30 transition-colors"
          >
            <summary className="flex cursor-pointer items-center justify-between gap-4 px-5 py-4 text-sm font-semibold text-(--text-1) marker:content-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--kick) rounded-2xl">
              {item.q}
              <Chevron />
            </summary>
            <p className="px-5 pb-5 text-sm leading-relaxed text-(--text-2)">{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
