import type { Metadata } from "next";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import Breadcrumbs from "@/components/Breadcrumbs";
import { resolveAllEditions } from "@/lib/editions-server";

export const metadata: Metadata = {
  title: "Editions",
  description:
    "All current MUURO editions. Limited art prints in Nielsen aluminium frames, with or without integrated light.",
};

export default function EditionsPage() {
  const editions = resolveAllEditions();

  return (
    <>
      <div className="mx-auto max-w-[1400px] px-6 pt-8 md:px-10">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Editions" }]} />
      </div>

      <div className="mx-auto max-w-[1400px] px-6 pt-10 md:px-10">
        <h1 className="label text-ink">
          All editions · {String(editions.length).padStart(2, "0")}
        </h1>
      </div>

      <div className="mx-auto max-w-[1400px] px-6 py-10 md:px-10">
        <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {editions.map((edition) => (
            <ProductCard key={edition.slug} edition={edition} />
          ))}

          <Link
            href="/#newsletter"
            className="group flex min-h-[360px] flex-col items-center justify-center gap-5 border border-dashed border-edge px-8 text-center transition-colors hover:border-ink"
          >
            <span className="label">
              Edition {String(editions.length + 1).padStart(2, "0")}
            </span>
            <span className="text-[18px] font-medium">Next drop in preparation</span>
            <span className="label underline underline-offset-4 transition-colors group-hover:text-ink">
              Notify me
            </span>
          </Link>
        </div>
      </div>
    </>
  );
}
