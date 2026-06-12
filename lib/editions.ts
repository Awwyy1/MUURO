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
   * the product page. Empty array falls back to the SVG placeholder.
   * Drop JPGs into public/editions/<slug>/ and list them here.
   */
  images: string[];
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
    basePrice: 240,
    short:
      "A study in conformity and exception. Fifty four cobalt circles, one refuses.",
    description:
      "Six columns, nine rows. Fifty three circles hold the line; one breaks it. The Outlier is a study in conformity and exception. Geometric, deliberate, quiet. For the room of someone who knows exactly which circle they are.",
    images: [],
    status: "available",
  },
  {
    slug: "63-sting-ray",
    title: "63 Sting Ray",
    number: "03",
    series: "Icons",
    year: 2025,
    editionSize: 100,
    basePrice: 240,
    short:
      "Nineteen sixty three. Split window. Black on black with gilded numerals.",
    description:
      "The only year Chevrolet built the split window coupé. Rendered in near black with gilded numerals. A portrait of restraint and horsepower in equal measure. For drivers, collectors, and everyone who keeps one particular garage in their head.",
    images: [],
    status: "available",
  },
  {
    slug: "red-waves",
    title: "Red Waves",
    number: "02",
    series: "Abstract",
    year: 2025,
    editionSize: 100,
    basePrice: 220,
    short: "Crimson over sand. A landscape that never existed.",
    description:
      "Layered line work in red and bone, drawn like the contour map of an imagined coast. Calm at the bottom, weather at the top. Hangs well in rooms where conversations happen.",
    images: [],
    status: "available",
  },
  {
    slug: "hast-du-gekackt",
    title: "Hast du gekackt?",
    number: "01",
    series: "Berlin Humour",
    year: 2025,
    editionSize: 100,
    basePrice: 180,
    short: "Two concerned residents. One eternal Berlin question.",
    description:
      "A cat, a giraffe, and the question every Berlin flatshare eventually asks out loud. Monochrome ink on cream. Proof that a serious wall can keep a sense of humour.",
    images: [],
    status: "available",
  },
  {
    slug: "untitled-05",
    title: "Untitled 05",
    number: "05",
    series: "TBA",
    year: 2025,
    editionSize: 100,
    basePrice: 220,
    short: "Final artwork to be revealed.",
    description:
      "This edition is being prepared for release. The artwork and title will be revealed shortly. Subscribers see it first.",
    images: [],
    status: "available",
  },
  {
    slug: "untitled-06",
    title: "Untitled 06",
    number: "06",
    series: "TBA",
    year: 2025,
    editionSize: 100,
    basePrice: 220,
    short: "Final artwork to be revealed.",
    description:
      "This edition is being prepared for release. The artwork and title will be revealed shortly. Subscribers see it first.",
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

/** Cover image for catalogue cards. Falls back to the SVG placeholder. */
export function coverImage(edition: Edition): string {
  return edition.images[0] ?? `/editions/${edition.slug}.svg`;
}

/** Full gallery for the product page. Falls back to the SVG placeholder. */
export function galleryImages(edition: Edition): string[] {
  return edition.images.length > 0
    ? edition.images
    : [`/editions/${edition.slug}.svg`];
}
