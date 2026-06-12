"use client";

import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import { useCart } from "@/lib/cart";

type Status = "loading" | "succeeded" | "processing" | "failed";

function ConfirmationInner() {
  const params = useSearchParams();
  const { clear } = useCart();
  const [status, setStatus] = useState<Status>("loading");
  const [intentId, setIntentId] = useState<string | null>(null);

  useEffect(() => {
    const clientSecret = params.get("payment_intent_client_secret");
    const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
    if (!clientSecret || !publishableKey) {
      setStatus("failed");
      return;
    }
    loadStripe(publishableKey).then(async (stripe) => {
      if (!stripe) return setStatus("failed");
      const { paymentIntent } = await stripe.retrievePaymentIntent(clientSecret);
      if (!paymentIntent) return setStatus("failed");
      setIntentId(paymentIntent.id);
      if (paymentIntent.status === "succeeded") {
        clear();
        setStatus("succeeded");
      } else if (
        paymentIntent.status === "processing" ||
        paymentIntent.status === "requires_capture"
      ) {
        clear();
        setStatus("processing");
      } else {
        setStatus("failed");
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="mx-auto flex max-w-[640px] flex-col items-center gap-6 px-6 py-32 text-center">
      {status === "loading" && <p className="label animate-pulse">Confirming…</p>}

      {status === "succeeded" && (
        <>
          <p className="label">Order placed</p>
          <h1 className="text-[32px] font-medium leading-[1.15]">
            Thank you. Your edition is reserved.
          </h1>
          <p className="max-w-[420px] text-[15px] leading-[1.7] text-[#333]">
            A confirmation is on its way to your inbox. Framed editions leave
            the studio within 3–5 working days in a rigid art crate.
          </p>
          {intentId && (
            <p className="label normal-case tracking-[0.08em]">Ref · {intentId}</p>
          )}
          <Link href="/editions" className="btn mt-2">
            Back to editions
          </Link>
        </>
      )}

      {status === "processing" && (
        <>
          <p className="label">Payment processing</p>
          <h1 className="text-[32px] font-medium leading-[1.15]">
            Almost there.
          </h1>
          <p className="max-w-[420px] text-[15px] leading-[1.7] text-[#333]">
            Your payment is being processed — you'll receive a confirmation as
            soon as it completes.
          </p>
        </>
      )}

      {status === "failed" && (
        <>
          <p className="label">Payment incomplete</p>
          <h1 className="text-[32px] font-medium leading-[1.15]">
            Something interrupted the payment.
          </h1>
          <p className="max-w-[420px] text-[15px] leading-[1.7] text-[#333]">
            No charge was completed. Your bag is untouched — you can try again.
          </p>
          <Link href="/checkout" className="btn mt-2">
            Return to checkout
          </Link>
        </>
      )}
    </div>
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense
      fallback={<p className="label py-32 text-center animate-pulse">Confirming…</p>}
    >
      <ConfirmationInner />
    </Suspense>
  );
}
