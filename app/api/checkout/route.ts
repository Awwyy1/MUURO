import { NextResponse } from "next/server";
import Stripe from "stripe";
import { describeConfig, unitPrice } from "@/lib/pricing";
import { getEdition } from "@/lib/editions";

interface IncomingItem {
  slug: string;
  sizeId: string;
  frameId: string;
  lightId: string;
  qty: number;
}

export async function POST(req: Request) {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  let items: IncomingItem[];
  try {
    const body = await req.json();
    items = body.items;
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  if (!Array.isArray(items) || items.length === 0 || items.length > 20) {
    return NextResponse.json({ error: "invalid_items" }, { status: 400 });
  }

  // Recompute the amount server-side. The client never sends a price.
  let amount = 0;
  const lines: string[] = [];
  try {
    for (const item of items) {
      const qty = Math.floor(Number(item.qty));
      if (!Number.isFinite(qty) || qty < 1 || qty > 10) {
        throw new Error("invalid qty");
      }
      const price = unitPrice(item.slug, item.sizeId, item.frameId, item.lightId);
      amount += price * qty;
      const edition = getEdition(item.slug);
      lines.push(
        `${qty}× ${edition?.title} (${describeConfig(item.sizeId, item.frameId, item.lightId)}) €${price * qty}`
      );
    }
  } catch {
    return NextResponse.json({ error: "invalid_items" }, { status: 400 });
  }

  const stripe = new Stripe(secretKey);

  try {
    const intent = await stripe.paymentIntents.create({
      amount: amount * 100, // cents
      currency: "eur",
      automatic_payment_methods: { enabled: true },
      metadata: {
        order: lines.join(" | ").slice(0, 490),
      },
    });
    return NextResponse.json({
      clientSecret: intent.client_secret,
      amount,
    });
  } catch (err) {
    console.error("Stripe PaymentIntent failed:", err);
    return NextResponse.json({ error: "stripe_error" }, { status: 502 });
  }
}
