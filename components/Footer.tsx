import Link from "next/link";

const COLUMNS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Shop",
    links: [
      { label: "Editions", href: "/editions" },
      { label: "Current drop", href: "/editions/the-outlier" },
    ],
  },
  {
    title: "Studio",
    links: [
      { label: "Manifesto", href: "/manifesto" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" },
      { label: "Instagram", href: "https://www.instagram.com/muuro.co/" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Impressum", href: "/impressum" },
      { label: "Privacy", href: "/privacy" },
      { label: "Shipping", href: "/shipping" },
      { label: "Returns", href: "/returns" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="hairline">
      <div className="mx-auto grid max-w-[1400px] gap-10 px-6 py-10 md:grid-cols-[2fr_1fr_1fr_1fr] md:px-10 md:py-12">
        <div>
          <div className="text-[15px] font-semibold tracking-[0.24em]">MUURO</div>
          <div className="brand-line mt-3">Your Visual Capital</div>
        </div>
        {COLUMNS.map((col) => (
          <div key={col.title}>
            <div className="text-[10px] font-semibold uppercase tracking-[0.2em]">
              {col.title}
            </div>
            <ul className="mt-3 flex flex-col gap-2">
              {col.links.map((link) =>
                link.href.startsWith("http") ? (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="label transition-colors hover:text-ink"
                    >
                      {link.label}
                    </a>
                  </li>
                ) : (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="label transition-colors hover:text-ink"
                    >
                      {link.label}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>
        ))}
      </div>
      <div className="hairline">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5 md:px-10">
          <span className="label">© 2026 MUURO</span>
          <span className="label">muuro.co</span>
        </div>
      </div>
    </footer>
  );
}
