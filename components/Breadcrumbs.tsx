import Link from "next/link";

interface Crumb {
  label: string;
  href?: string;
}

/**
 * Renders the visible breadcrumb trail and a matching BreadcrumbList
 * JSON-LD block so search engines pick it up. The last item is the
 * current page and is rendered as plain text.
 */
export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  const base = "https://muuro.co";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.label,
      ...(crumb.href ? { item: `${base}${crumb.href}` } : {}),
    })),
  };

  return (
    <>
      <nav aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-2">
          {items.map((crumb, i) => (
            <li key={i} className="flex items-center gap-2">
              {crumb.href ? (
                <Link
                  href={crumb.href}
                  className="label transition-colors hover:text-ink"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span className="label text-ink">{crumb.label}</span>
              )}
              {i < items.length - 1 && (
                <span className="label" aria-hidden="true">
                  /
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
