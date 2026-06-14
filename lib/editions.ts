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
    slug: "four-zero-four",
    title: "404",
    number: "05",
    series: "Cipher",
    year: 2025,
    editionSize: 100,
    basePrice: 220,
    short:
      "The error code as quiet monument. Every link that ever broke, every page that ever forgot itself.",
    description:
      "404 is the most honest number on the internet — the code that names what every other page conceals. Things break. Links rot. Archives forget. The print holds it absolute: black on black, the type rotated to the edge of the frame, a small caption admitting what the piece already is. A monument to absence for anyone who has built something that disappeared, clicked a link and found nothing, watched a draft go unrecovered. Half of digital life is the half that no longer answers; this is the part of the wall that remembers it.",
    images: [],
    status: "available",
  },
  {
    slug: "femme-fatale",
    title: "Femme Fatale",
    number: "06",
    series: "Icons",
    year: 2025,
    editionSize: 100,
    basePrice: 220,
    short: "One kiss. Vermilion. Irrevocable.",
    description:
      "Femme Fatale. The single kiss that ended an era and never was repeated — vermilion pressed to ivory paper, the only signature of a woman whose name nobody can quite name and nobody quite forgets. Framed as evidence, hung as warning. The Queen of Spades in absentia: the card without the face, the seal without the sender, the imprint of an encounter no one walks away from intact. For the wall of someone who knows that certain people leave a mark instead of a memory.",
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
