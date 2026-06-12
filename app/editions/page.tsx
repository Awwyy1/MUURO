import type { Metadata } from "next";
import Link from "next/link";
import { EDITIONS } from "@/lib/editions";
import ProductCard from "@/components/ProductCard";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Editions",
  description:
    "All current MUURO editions. Limited art prints in Nielsen aluminium frames, with or without integrated light.",
};

export default function EditionsPage() {
  return (
    <>
      <div className="mx-auto max-w-[1400px] px-6 pt-8 md:px-10">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Editions" }]} />
      </div>

      <div className="mt-6 border-b border-hairline">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-4 px-6 py-5 md:px-10">
          <div className="flex flex-wrap items-center gap-7">
            <span className="label border-b border-ink pb-0.5 text-ink">
              All editions · 0{EDITIONS.length}
            </span>
            <span className="label cursor-default opacity-60">Size ▾</span>
            <span className="label cursor-default opacity-60">Series ▾</span>
            <span className="label cursor-default opacity-60">Frame ▾</span>
            <span className="label cursor-default opacity-60">Light ▾</span>
          </div>
          <span className="label">Sort · Newest</span>
        </div>
      </div>

      <div className="mx-auto max-w-[1400px] px-6 py-16 md:px-10">
        <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {EDITIONS.map((edition) => (
            <ProductCard key={edition.slug} edition={edition} />
          ))}

          <Link
            href="/#newsletter"
            className="group flex min-h-[360px] flex-col items-center justify-center gap-5 border border-dashed border-edge px-8 text-center transition-colors hover:border-ink"
          >
            <span className="label">Edition 07</span>
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
