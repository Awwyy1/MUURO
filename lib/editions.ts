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
    basePrice: 200,
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
    basePrice: 200,
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
    basePrice: 180,
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
    basePrice: 140,
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
    basePrice: 180,
    short: "404. Black on black. The page every browser has shown.",
    description:
      "404 is what the browser shows when something a person made is no longer where it used to be. A dead link, a deleted draft, a project that quietly went offline. We took the format every browser uses and made it a print, black on black with the type laid sideways.",
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
    basePrice: 180,
    short: "Queen of Spades. Most of the card stripped. A kiss in the middle.",
    description:
      "A Queen of Spades with almost everything removed. The Q stays. The spade stays. The kiss is the rest of it, scanned from real lipstick on real paper, not drawn. Belongs in a hallway, above a dresser. Does not belong in a child's room.",
    images: [],
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
      "Two words, two marks. DO is printed, IT is the space the ink left behind.",
    description:
      "D and O are printed. I and T are not. They are the counters, the holes the black leaves inside the letters, so the sheet reads DO from across the room and DO IT once you are close enough to see the gaps. Bold grotesque, near black on warm grey, nothing else on the paper. For the desk of someone who already knows what the task is.",
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
    short: "Forty words in Morse. The key is not printed on the sheet.",
    description:
      "A full sentence set in Morse, dot by dot, in reading order, with no translation anywhere on the paper. It says: love is not a fire that burns everything down, it is a candle that teaches two souls how to survive the dark. The trick is not finding someone who lights the flame, but someone who protects it from the wind. Anyone else sees a pattern. The person you hang it for gets the sentence, from you or from an evening with a decoding table.",
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
