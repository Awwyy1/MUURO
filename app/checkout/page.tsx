"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useCart } from "@/lib/cart";
import { getEdition } from "@/lib/editions";
import { describeConfig, formatEur, unitPrice } from "@/lib/pricing";
import CheckoutForm from "@/components/CheckoutForm";

const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
const stripePromise = publishableKey ? loadStripe(publishableKey) : null;

const appearance = {
  variables: {
    colorPrimary: "#1c1c1c",
    colorBackground: "#ffffff",
    colorText: "#1c1c1c",
    colorDanger: "#a33",
    fontFamily: "Inter, system-ui, sans-serif",
    borderRadius: "0px",
    spacingUnit: "4px",
  },
};

export default function CheckoutPage() {
  const { items, subtotal, hydrated } = useCart();
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [error, setError] = useState<"not_configured" | "failed" | null>(null);

  useEffect(() => {
    if (items.length === 0 || !publishableKey) return;
    let cancelled = false;
    setClientSecret(null);
    fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items }),
    })
      .then(async (res) => {
        if (res.status === 503) throw new Error("not_configured");
        if (!res.ok) throw new Error("failed");
        return res.json();
      })
      .then((data) => {
        if (!cancelled) setClientSecret(data.clientSecret);
      })
      .catch((err) => {
        if (!cancelled)
          setError(err.message === "not_configured" ? "not_configured" : "failed");
      });
    return () => {
      cancelled = true;
    };
  }, [items]);

  if (!hydrated) {
    return (
      <div className="mx-auto max-w-[1400px] px-6 py-32 text-center">
        <p className="label animate-pulse">Loading…</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto flex max-w-[1400px] flex-col items-center gap-6 px-6 py-32 text-center">
        <p className="label">Your bag is empty</p>
        <Link href="/editions" className="btn">
          Browse editions
        </Link>
      </div>
    );
  }

  const notConfigured = !publishableKey || error === "not_configured";

  return (
    <div className="mx-auto grid max-w-[1280px] gap-12 px-6 py-12 md:px-10 lg:grid-cols-[1.35fr_1fr] lg:gap-16">
      <div>
        <h1 className="text-[26px] font-medium">Checkout</h1>

        {notConfigured ? (
          <div className="mt-8 border border-edge bg-white p-7">
            <p className="label text-ink">Payments not configured</p>
            <p className="mt-4 text-[14px] leading-[1.7] text-[#444]">
              Add Stripe test keys to the environment and redeploy:
            </p>
            <pre className="mt-4 overflow-x-auto bg-paper p-4 text-[12px] leading-[1.8]">
              NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_…{"\n"}
              STRIPE_SECRET_KEY=sk_test_…
            </pre>
            <p className="mt-4 text-[13px] leading-[1.7] text-stone">
              Keys live at dashboard.stripe.com → Developers → API keys (test
              mode). On Vercel: Project → Settings → Environment Variables.
            </p>
          </div>
        ) : error === "failed" ? (
          <p className="label mt-8">
            Could not start the payment session — refresh to try again.
          </p>
        ) : !clientSecret || !stripePromise ? (
          <p className="label mt-8 animate-pulse">Preparing secure payment…</p>
        ) : (
          <Elements stripe={stripePromise} options={{ clientSecret, appearance }}>
            <CheckoutForm />
          </Elements>
        )}
      </div>

      <aside>
        <div className="bg-[#f1eee7] p-7">
          <div className="label text-ink">Order summary</div>
          <ul className="mt-6 flex flex-col gap-5">
            {items.map((item, i) => {
              const edition = getEdition(item.slug);
              if (!edition) return null;
              let price = 0;
              try {
                price = unitPrice(item.slug, item.sizeId, item.frameId, item.lightId);
              } catch {
                return null;
              }
              return (
                <li key={i} className="grid grid-cols-[56px_1fr_auto] items-start gap-4">
                  <div className="border-[3px] border-[#17161a]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={edition.image} alt="" className="block h-auto w-full" />
                  </div>
                  <div>
                    <div className="text-[13px] font-medium">{edition.title}</div>
                    <div className="label mt-1 normal-case tracking-[0.08em]">
                      {describeConfig(item.sizeId, item.frameId, item.lightId)}
                      {item.qty > 1 && ` · ×${item.qty}`}
                    </div>
                  </div>
                  <div className="text-[13px] font-medium">
                    {formatEur(price * item.qty)}
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="my-6 hairline" />
          <div className="flex flex-col gap-2.5">
            <div className="flex justify-between">
              <span className="label">Subtotal</span>
              <span className="label text-ink">{formatEur(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="label">Shipping</span>
              <span className="label">Free · launch period</span>
            </div>
            <div className="flex justify-between">
              <span className="label">VAT</span>
              <span className="label">Included</span>
            </div>
          </div>
          <div className="my-6 hairline" />
          <div className="flex justify-between text-[16px] font-medium">
            <span>Total</span>
            <span>{formatEur(subtotal)}</span>
          </div>
        </div>
        <p className="label mt-5 text-center">
          Test mode — card 4242 4242 4242 4242, any future date, any CVC
        </p>
      </aside>
    </div>
  );
}
