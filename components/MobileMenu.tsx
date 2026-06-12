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
      <line x1="6" y1="6" x2="18" y2="18" />
      <line x1="18" y1="6" x2="6" y2="18" />
    </svg>
  );
}

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
    // Reserve scrollbar gutter so locking the body doesn't shift the layout.
    const html = document.documentElement;
    const previousGutter = html.style.scrollbarGutter;
    html.style.scrollbarGutter = "stable";
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      html.style.scrollbarGutter = previousGutter;
    };
  }, [open, onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      className={`fixed inset-0 z-50 flex flex-col bg-paper transition-opacity duration-300 ${
        open ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      {/* Top bar dimensions mirror the Nav exactly so opening the menu
          never reflows or resizes the header. */}
      <div className="border-b border-hairline">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-5 py-4 md:px-10 md:py-5">
          <span className="shrink-0 text-[15px] font-semibold tracking-[0.24em] [text-indent:0.24em]">
            MUURO
          </span>
          <span className="label min-w-0 flex-1 truncate text-center text-stone">
            Your Visual Capital
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="flex h-[22px] w-[22px] shrink-0 cursor-pointer items-center justify-center text-ink"
          >
            <CloseIcon />
          </button>
        </div>
      </div>

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
