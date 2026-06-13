"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import CartIcon from "./CartIcon";
import MobileMenu from "./MobileMenu";

function BurgerIcon() {
  // Two full strokes and a shorter third one. House burger silhouette.
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

function CloseIcon() {
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
      <line x1="5" y1="5" x2="19" y2="19" />
      <line x1="19" y1="5" x2="5" y2="19" />
    </svg>
  );
}

export default function Nav() {
  const { count, openCart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* The header never changes size or layout. On mobile the burger
          morphs into a close icon in the same 22px slot, and the menu
          panel slides in underneath the bar. */}
      <header className="sticky top-0 z-40 border-b border-hairline bg-paper/95 backdrop-blur-sm">
        <nav className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-5 py-4 md:px-10 md:py-5">
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="shrink-0 text-[15px] font-semibold leading-none tracking-[0.24em] [text-indent:0.24em]"
          >
            MUURO
          </Link>

          <span className="brand-line min-w-0 flex-1 truncate text-center">
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
              onClick={() => {
                setMenuOpen(false);
                openCart();
              }}
              className="flex h-[22px] w-[22px] cursor-pointer items-center justify-center text-ink"
              aria-label={`Open bag, ${count} items`}
            >
              <CartIcon count={count} />
            </button>
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              className="flex h-[22px] w-[22px] cursor-pointer items-center justify-center text-ink"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              {menuOpen ? <CloseIcon /> : <BurgerIcon />}
            </button>
          </div>
        </nav>
      </header>
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
