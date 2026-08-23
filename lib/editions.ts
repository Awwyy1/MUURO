export type EditionStatus = "available" | "coming-soon" | "sold-out";

export interface Edition {
  slug: string;
  title: string;
  number: string;
  series: string;
  year: number;
  editionSize: number;
  /** EUR. Framed 50 × 70 cm, no light. Other configurations derive from this. */
  basePrice: number;
  short: string;
  description: string;
  /**
   * Photography paths in display order. The first image is the cover used
   * on the catalogue card. The full list powers the swipeable gallery on
   * the product page. An empty array falls back to `artwork`, then to the
   * neutral upload slot. Files dropped into public/editions/<slug>/ are
   * picked up automatically by lib/editions-server.ts, so this array stays
   * empty in normal operation.
   */
  images: string[];
  /**
   * Optional drawn mock of the artwork, shown on the catalogue card and as
   * the first gallery slide until photography exists. Editions without one
   * show a neutral upload slot instead, so an empty folder never renders a
   * broken image.
   */
  artwork?: string;
  status: EditionStatus;
}

export const EDITIONS: Edition[] = [
  {
    slug: "the-outlier",
    title: "The Outlier",
    number: "04",
    series: "Geometry",
    year: 2025,
    editionSize: 100,
    basePrice: 200,
    short:
      "A study in conformity and exception. Fifty four cobalt circles, one refuses.",
    description:
      "Six columns, nine rows. Fifty three circles hold the line; one breaks it. The Outlier is a study in conformity and exception. Geometric, deliberate, quiet. For the room of someone who knows exactly which circle they are.",
    images: [],
    artwork: "/editions/the-outlier.svg",
    status: "available",
  },
  {
    slug: "63-sting-ray",
    title: "63 Sting Ray",
    number: "03",
    series: "Icons",
    year: 2025,
    editionSize: 100,
    basePrice: 200,
    short:
      "Nineteen sixty three. Split window. Black on black with gilded numerals.",
    description:
      "The only year Chevrolet built the split window coupé. Rendered in near black with gilded numerals. A portrait of restraint and horsepower in equal measure. For drivers, collectors, and everyone who keeps one particular garage in their head.",
    images: [],
    artwork: "/editions/63-sting-ray.svg",
    status: "available",
  },
  {
    slug: "red-waves",
    title: "Red Waves",
    number: "02",
    series: "Abstract",
    year: 2025,
    editionSize: 100,
    basePrice: 180,
    short: "Crimson over sand. A landscape that never existed.",
    description:
      "Layered line work in red and bone, drawn like the contour map of an imagined coast. Calm at the bottom, weather at the top. Hangs well in rooms where conversations happen.",
    images: [],
    artwork: "/editions/red-waves.svg",
    status: "available",
  },
  {
    slug: "hast-du-gekackt",
    title: "Hast du gekackt?",
    number: "01",
    series: "Berlin Humour",
    year: 2025,
    editionSize: 100,
    basePrice: 140,
    short: "Two concerned residents. One eternal Berlin question.",
    description:
      "A cat, a giraffe, and the question every Berlin flatshare eventually asks out loud. Monochrome ink on cream. Proof that a serious wall can keep a sense of humour.",
    images: [],
    artwork: "/editions/hast-du-gekackt.svg",
    status: "available",
  },
  {
    slug: "four-zero-four",
    title: "404",
    number: "05",
    series: "Cipher",
    year: 2025,
    editionSize: 100,
    basePrice: 180,
    short: "404. Black on black. The page every browser has shown.",
    description:
      "404 is what the browser shows when something a person made is no longer where it used to be. A dead link, a deleted draft, a project that quietly went offline. We took the format every browser uses and made it a print, black on black with the type laid sideways.",
    images: [],
    artwork: "/editions/four-zero-four.svg",
    status: "available",
  },
  {
    slug: "femme-fatale",
    title: "Femme Fatale",
    number: "06",
    series: "Icons",
    year: 2025,
    editionSize: 100,
    basePrice: 180,
    short: "Queen of Spades. Most of the card stripped. A kiss in the middle.",
    description:
      "A Queen of Spades with almost everything removed. The Q stays. The spade stays. The kiss is the rest of it, scanned from real lipstick on real paper, not drawn. Belongs in a hallway, above a dresser. Does not belong in a child's room.",
    images: [],
    artwork: "/editions/femme-fatale.svg",
    status: "available",
  },
  {
    slug: "do-it",
    title: "DO IT",
    number: "07",
    series: "Statements",
    year: 2025,
    editionSize: 100,
    basePrice: 180,
    short:
      "DO is printed. IT is the hole in the middle. The rest is on you.",
    description:
      "The shortest instruction anybody has ever needed, printed as two marks. D and O carry the ink. I and T are the counters, the holes the black leaves inside them, so from the doorway the sheet says DO and up close it finishes the sentence. Nothing else is on the paper. No quote, no explanation, no small print, because every extra word is one more thing to read instead of starting. Hang it where you actually stall. Over the desk, beside the door, opposite the chair you sit in while you decide.",
    images: [],
    status: "available",
  },
  {
    slug: "shield-the-flame",
    title: "Shield the Flame",
    number: "08",
    series: "Cipher",
    year: 2025,
    editionSize: 100,
    basePrice: 180,
    short: "Forty words about love, in Morse. The key is not on the sheet.",
    description:
      "One complete sentence about love, set dot by dot in international Morse. Four hundred and thirty five marks, forty words, no translation on the paper and none on the back. A guest sees a pattern. The person you hang it for either gets the sentence from you, in your own voice, or spends an evening with a decoding table earning it. We are not printing the translation here, and that is the point of the piece. If you want to read it before you buy, write to hello@muuro.co and it goes to you only.",
    images: [],
    status: "available",
  },
];

export const CURRENT_DROP_SLUG = "the-outlier";

export function getEdition(slug: string): Edition | undefined {
  return EDITIONS.find((e) => e.slug === slug);
}

export function getCurrentDrop(): Edition {
  return getEdition(CURRENT_DROP_SLUG) ?? EDITIONS[0];
}

/**
 * Card shown in place of the cover photo while an edition folder is still
 * empty. It reads "upload 01.jpg", so the gap is an instruction rather
 * than a hole in the page.
 */
export const PHOTO_SLOT = "/placeholders/photo-01.svg";

/** Cover image for catalogue cards. Falls back to the artwork, then the slot. */
export function coverImage(edition: Edition): string {
  return edition.images[0] ?? edition.artwork ?? PHOTO_SLOT;
}

/** Full gallery for the product page. Falls back to the artwork, then the slot. */
export function galleryImages(edition: Edition): string[] {
  return edition.images.length > 0
    ? edition.images
    : [edition.artwork ?? PHOTO_SLOT];
}
