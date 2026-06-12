"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart";

export default function Nav() {
  const { count, openCart } = useCart();

  return (
    <header className="sticky top-0 z-40 border-b border-hairline bg-paper/95 backdrop-blur-sm">
      <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5 md:px-10">
        <Link
          href="/"
          className="text-[15px] font-semibold tracking-[0.24em] [text-indent:0.24em]"
        >
          MUURO
        </Link>
        <div className="flex items-center gap-6 md:gap-9">
          <Link href="/editions" className="label transition-colors hover:text-ink">
            Editions
          </Link>
          <Link href="/manifesto" className="label transition-colors hover:text-ink">
            Manifesto
          </Link>
          <button
            type="button"
            onClick={openCart}
            className="label cursor-pointer transition-colors hover:text-ink"
            aria-label={`Open bag, ${count} items`}
          >
            Bag ({count})
          </button>
        </div>
      </nav>
    </header>
  );
}
