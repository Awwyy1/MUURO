import { getEdition } from "./editions";

export interface PriceOption {
  id: string;
  label: string;
  delta: number;
}

export const SIZES: PriceOption[] = [
  { id: "50x70", label: "50 × 70 cm", delta: 0 },
  { id: "70x100", label: "70 × 100 cm", delta: 80 },
  { id: "100x140", label: "100 × 140 cm", delta: 200 },
];

export const FRAMES: PriceOption[] = [
  { id: "black", label: "Matte black", delta: 0 },
  { id: "silver", label: "Brushed silver", delta: 0 },
  { id: "none", label: "Print only", delta: -90 },
];

export const LIGHTS: PriceOption[] = [
  { id: "off", label: "No light", delta: 0 },
  { id: "backlit", label: "Backlit", delta: 180 },
];

function find(options: PriceOption[], id: string, kind: string): PriceOption {
  const option = options.find((o) => o.id === id);
  if (!option) throw new Error(`Unknown ${kind}: ${id}`);
  return option;
}

/**
 * Single source of truth for pricing. Used by the configurator, the cart
 * and the server-side PaymentIntent creation. The client never sends a price.
 */
export function unitPrice(
  slug: string,
  sizeId: string,
  frameId: string,
  lightId: string
): number {
  const edition = getEdition(slug);
  if (!edition || edition.status !== "available")
    throw new Error(`Edition not available: ${slug}`);
  const size = find(SIZES, sizeId, "size");
  const frame = find(FRAMES, frameId, "frame");
  const light = find(LIGHTS, lightId, "light");
  if (frame.id === "none" && light.id === "backlit")
    throw new Error("Backlit requires a frame");
  return edition.basePrice + size.delta + frame.delta + light.delta;
}

export function minPrice(basePrice: number): number {
  const printOnly = FRAMES.find((f) => f.id === "none")?.delta ?? 0;
  return basePrice + printOnly;
}

export function describeConfig(
  sizeId: string,
  frameId: string,
  lightId: string
): string {
  const parts = [
    SIZES.find((s) => s.id === sizeId)?.label,
    FRAMES.find((f) => f.id === frameId)?.label,
  ];
  if (lightId === "backlit") parts.push("Backlit");
  return parts.filter(Boolean).join(" · ");
}

export function formatEur(amount: number): string {
  return `€${amount.toLocaleString("en-IE")}`;
}
