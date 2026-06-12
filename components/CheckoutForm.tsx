"use client";

import { useState } from "react";
import {
  AddressElement,
  LinkAuthenticationElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useCart } from "@/lib/cart";
import { formatEur } from "@/lib/pricing";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const { subtotal } = useCart();
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!stripe || !elements || submitting) return;
    setSubmitting(true);
    setMessage(null);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/orders/confirmation`,
      },
    });

    // Only reached on immediate failure — success redirects away.
    if (error) {
      setMessage(error.message ?? "Payment failed — please try again.");
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-9">
      <section>
        <h2 className="label text-ink">01 · Contact</h2>
        <div className="mt-4">
          <LinkAuthenticationElement />
        </div>
      </section>

      <section>
        <h2 className="label text-ink">02 · Shipping address</h2>
        <div className="mt-4">
          <AddressElement options={{ mode: "shipping" }} />
        </div>
      </section>

      <section>
        <h2 className="label text-ink">03 · Payment</h2>
        <div className="mt-4">
          <PaymentElement />
        </div>
      </section>

      {message && (
        <p className="text-[13px] leading-[1.6] text-[#a33]">{message}</p>
      )}

      <button
        type="submit"
        disabled={!stripe || submitting}
        className="btn btn-fill w-full py-[18px]"
      >
        {submitting ? "Processing…" : `Place order · ${formatEur(subtotal)}`}
      </button>
    </form>
  );
}
