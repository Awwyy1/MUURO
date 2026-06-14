"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useCart } from "@/lib/cart";
import { coverImage, getEdition } from "@/lib/editions";
import { describeConfig, formatEur, unitPrice } from "@/lib/pricing";

export default function CartDrawer() {
  const { items, subtotal, isOpen, closeCart, updateQty, removeItem } = useCart();

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, closeCart]);

  return (
    /* The wrapper itself never takes pointer events; only the open overlay
       and panel do. A closed drawer can never intercept taps on the page. */
    <div className="pointer-events-none fixed inset-0 z-50" aria-hidden={!isOpen}>
      <div
        onClick={closeCart}
        className={`absolute inset-0 bg-[#14120f]/35 transition-opacity duration-300 ${
          isOpen ? "pointer-events-auto opacity-100" : "opacity-0"
        }`}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Shopping bag"
        className={`absolute right-0 top-0 flex h-full w-full max-w-[420px] flex-col bg-paper shadow-[-30px_0_60px_-10px_rgba(0,0,0,0.15)] transition-transform duration-300 ease-out ${
          isOpen ? "pointer-events-auto translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-hairline px-7 py-6">
          <span className="label">
            Your bag · {items.length} {items.length === 1 ? "item" : "items"}
          </span>
          <button
            type="button"
            onClick={closeCart}
            aria-label="Close bag"
            className="cursor-pointer text-xl leading-none text-stone transition-colors hover:text-ink"
          >
            ×
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-7 py-6">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-5 text-center">
              <p className="label">Your bag is empty</p>
              <Link href="/editions" onClick={closeCart} className="btn">
                Browse editions
              </Link>
            </div>
          ) : (
            <ul className="flex flex-col gap-7">
              {items.map((item, index) => {
                const edition = getEdition(item.slug);
                if (!edition) return null;
                let price = 0;
                try {
                  price = unitPrice(item.slug, item.sizeId, item.frameId, item.lightId);
                } catch {
                  return null;
                }
                return (
                  <li
                    key={`${item.slug}-${item.sizeId}-${item.frameId}-${item.lightId}`}
                    className="grid grid-cols-[64px_1fr_auto] gap-4"
                  >
                    <div className="self-start border-[3px] border-[#17161a]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={coverImage(edition)}
                        alt={edition.title}
                        className="block aspect-[4/5] w-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="text-[14px] font-medium">{edition.title}</div>
                      <div className="label mt-1.5 normal-case tracking-[0.08em]">
                        {describeConfig(item.sizeId, item.frameId, item.lightId)}
                      </div>
                      <div className="mt-3 flex items-center gap-4">
                        <span className="inline-flex items-center gap-3 border border-edge px-3 py-1 text-[12px]">
                          <button
                            type="button"
                            aria-label="Decrease quantity"
                            className="cursor-pointer"
                            onClick={() => updateQty(index, item.qty - 1)}
                          >
                            −
                          </button>
                          <span>{item.qty}</span>
                          <button
                            type="button"
                            aria-label="Increase quantity"
                            className="cursor-pointer"
                            onClick={() => updateQty(index, item.qty + 1)}
                          >
                            +
                          </button>
                        </span>
                        <button
                          type="button"
                          onClick={() => removeItem(index)}
                          className="cursor-pointer text-[11px] text-stone underline underline-offset-2 transition-colors hover:text-ink"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                    <div className="text-[14px] font-medium">
                      {formatEur(price * item.qty)}
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-hairline px-7 py-6">
            <div className="flex justify-between">
              <span className="label">Subtotal</span>
              <span className="label text-ink">{formatEur(subtotal)}</span>
            </div>
            <div className="mt-2 flex justify-between">
              <span className="label">Shipping</span>
              <span className="label">Calculated at checkout</span>
            </div>
            <Link
              href="/checkout"
              onClick={closeCart}
              className="btn btn-fill mt-5 w-full py-[18px]"
            >
              Checkout · {formatEur(subtotal)}
            </Link>
          </div>
        )}
      </aside>
    </div>
  );
}
