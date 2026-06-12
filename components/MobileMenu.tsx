"use client";

import Link from "next/link";
import { useEffect } from "react";

const ITEMS: { label: string; href: string }[] = [
  { label: "Editions", href: "/editions" },
  { label: "Manifesto", href: "/manifesto" },
  { label: "Contact", href: "/contact" },
  { label: "Shipping", href: "/shipping" },
  { label: "Returns", href: "/returns" },
];

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
      className={`fixed inset-0 z-50 flex flex-col bg-paper transition-opacity duration-300 ${
        open ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <div className="flex items-center justify-between border-b border-hairline px-6 py-5">
        <span className="text-[15px] font-semibold tracking-[0.24em]">MUURO</span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="cursor-pointer text-[28px] leading-none text-ink"
        >
          ×
        </button>
      </div>

      <nav className="flex flex-1 flex-col items-center justify-center gap-9 px-6">
        {ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClose}
            className="text-[28px] font-medium tracking-[-0.005em] text-ink"
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="border-t border-hairline px-6 py-7 text-center">
        <p className="label">Your Visual Capital</p>
        <a
          href="https://www.instagram.com/muuro.co/"
          target="_blank"
          rel="noopener noreferrer"
          className="label mt-3 inline-block text-ink underline underline-offset-4"
        >
          @muuro.co on Instagram
        </a>
      </div>
    </div>
  );
}
