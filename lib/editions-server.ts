import fs from "fs";
import path from "path";
import { EDITIONS, type Edition } from "./editions";

/**
 * Server-only helpers that resolve an edition's photography by reading the
 * filesystem at build time. Operators drop files into
 *   public/editions/<slug>/01.jpg, 02.jpg, …
 * and the catalogue picks them up automatically, no TypeScript edits.
 *
 * Files are matched by the strict pattern: two digits, then .jpg / .jpeg /
 * .png / .webp, lower-case. They are returned sorted, so 01.jpg leads,
 * 02.jpg follows, etc.
 *
 * These helpers MUST only be imported from server components (page.tsx,
 * layout.tsx, route.ts, generateMetadata, etc.). Importing them from a
 * "use client" file will break the build.
 */

const PHOTO_RE = /^\d{2}\.(jpe?g|png|webp)$/i;

export function resolveEditionImages(slug: string): string[] {
  try {
    const dir = path.join(process.cwd(), "public", "editions", slug);
    return fs
      .readdirSync(dir)
      .filter((f) => PHOTO_RE.test(f))
      .sort()
      .map((f) => `/editions/${slug}/${f}`);
  } catch {
    return [];
  }
}

export function resolveEdition(slug: string): Edition | undefined {
  const base = EDITIONS.find((e) => e.slug === slug);
  if (!base) return undefined;
  const uploaded = resolveEditionImages(slug);
  return uploaded.length > 0 ? { ...base, images: uploaded } : base;
}

export function resolveAllEditions(): Edition[] {
  return EDITIONS.map((e) => {
    const uploaded = resolveEditionImages(e.slug);
    return uploaded.length > 0 ? { ...e, images: uploaded } : e;
  });
}

export function resolveCurrentDrop(): Edition {
  const drop = resolveEdition("the-outlier");
  if (drop) return drop;
  return resolveAllEditions()[0];
}
