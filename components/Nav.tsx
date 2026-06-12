"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import CartIcon from "./CartIcon";
import MobileMenu from "./MobileMenu";

export default function Nav() {
  const { count, openCart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-hairline bg-paper/95 backdrop-blur-sm">
        <nav className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-5 py-4 md:px-10 md:py-5">
          <Link
            href="/"
            className="text-[15px] font-semibold tracking-[0.24em] [text-indent:0.24em]"
          >
            MUURO
          </Link>

          {/* Mobile: slogan sits between the logo and the right controls */}
          <span className="label flex-1 truncate text-center text-stone md:hidden">
            Your Visual Capital
          </span>

          {/* Desktop nav */}
          <div className="hidden items-center gap-9 md:flex">
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

          {/* Mobile controls: cart, then burger */}
          <div className="flex items-center gap-4 md:hidden">
            <button
              type="button"
              onClick={openCart}
              className="cursor-pointer text-ink transition-colors hover:text-stone"
              aria-label={`Open bag, ${count} items`}
            >
              <CartIcon count={count} />
            </button>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="cursor-pointer text-ink"
              aria-label="Open menu"
            >
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
                <line x1="4" y1="8" x2="20" y2="8" />
                <line x1="4" y1="16" x2="20" y2="16" />
              </svg>
            </button>
          </div>
        </nav>
      </header>
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
