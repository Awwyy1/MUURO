"use client";

import Link from "next/link";
import { useEffect } from "react";

const ITEMS: { label: string; href: string }[] = [
  { label: "Editions", href: "/editions" },
  { label: "Manifesto", href: "/manifesto" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
  { label: "Shipping", href: "/shipping" },
  { label: "Returns", href: "/returns" },
];

/**
 * Mobile-only menu panel. It has no header of its own: the real Nav stays
 * on top (z-40 vs z-30 here) and never reflows, the panel just fades in
 * underneath it. While closed the panel is invisible and inert.
 */
export default function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      className={`fixed inset-0 z-30 flex flex-col bg-paper pt-14 transition-[opacity,visibility] duration-300 md:hidden ${
        open ? "visible opacity-100" : "invisible opacity-0 pointer-events-none"
      }`}
    >
      <nav className="flex flex-1 flex-col items-center justify-center gap-8 px-6">
        {ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClose}
            className="text-[26px] font-medium tracking-[-0.005em] text-ink"
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="border-t border-hairline px-6 py-7 text-center">
        <a
          href="https://www.instagram.com/muuro.co/"
          target="_blank"
          rel="noopener noreferrer"
          className="label inline-block text-ink underline underline-offset-4"
        >
          @muuro.co on Instagram
        </a>
      </div>
    </div>
  );
}
