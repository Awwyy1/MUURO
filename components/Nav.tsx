"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import CartIcon from "./CartIcon";
import MobileMenu from "./MobileMenu";

function BurgerIcon() {
  // Three strokes; the bottom one is shorter to give the brand a
  // distinct burger silhouette instead of the generic three-equal-lines.
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <line x1="4" y1="7" x2="20" y2="7" />
      <line x1="4" y1="12" x2="20" y2="12" />
      <line x1="4" y1="17" x2="14" y2="17" />
    </svg>
  );
}

export default function Nav() {
  const { count, openCart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-hairline bg-paper/95 backdrop-blur-sm">
        <nav className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-5 py-4 md:px-10 md:py-5">
          <Link
            href="/"
            className="shrink-0 text-[15px] font-semibold tracking-[0.24em] [text-indent:0.24em]"
          >
            MUURO
          </Link>

          {/* Slogan sits in the same line, on both desktop and mobile. */}
          <span className="label min-w-0 flex-1 truncate text-center text-stone">
            Your Visual Capital
          </span>

          <div className="hidden shrink-0 items-center gap-7 md:flex">
            <Link href="/editions" className="label transition-colors hover:text-ink">
              Editions
            </Link>
            <Link href="/manifesto" className="label transition-colors hover:text-ink">
              Manifesto
            </Link>
            <Link href="/blog" className="label transition-colors hover:text-ink">
              Blog
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

          <div className="flex shrink-0 items-center gap-3 md:hidden">
            <button
              type="button"
              onClick={openCart}
              className="flex h-[22px] w-[22px] cursor-pointer items-center justify-center text-ink"
              aria-label={`Open bag, ${count} items`}
            >
              <CartIcon count={count} />
            </button>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="flex h-[22px] w-[22px] cursor-pointer items-center justify-center text-ink"
              aria-label="Open menu"
            >
              <BurgerIcon />
            </button>
          </div>
        </nav>
      </header>
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
