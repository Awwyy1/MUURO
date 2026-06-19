import Link from "next/link";
import { resolveEdition } from "@/lib/editions-server";
import { coverImage } from "@/lib/editions";
import { formatEur, minPrice } from "@/lib/pricing";
import FramedArtwork from "@/components/FramedArtwork";

export default function ProductCTA({
  slug,
  blurb,
}: {
  slug: string;
  blurb?: string;
}) {
  const edition = resolveEdition(slug);
  if (!edition) return null;
  const cover = coverImage(edition);
  const hasPhotos = edition.images.length > 0;

  return (
    <aside className="my-14 border border-hairline bg-wall p-6 md:p-10">
      <div className="grid items-center gap-8 md:grid-cols-[1fr_1.4fr]">
        <div className="flex items-center justify-center">
          {hasPhotos ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={cover}
              alt={edition.title}
              className="block aspect-[4/5] w-full max-w-[260px] object-cover"
            />
          ) : (
            <FramedArtwork
              src={cover}
              alt={edition.title}
              className="w-full max-w-[260px]"
            />
          )}
        </div>
        <div>
          <div className="label">
            Edition {edition.number} · {edition.editionSize} signed and numbered
          </div>
          <div className="mt-2 text-[22px] font-medium tracking-[-0.005em] md:text-[26px]">
            {edition.title}
          </div>
          {blurb && (
            <p className="mt-3 text-[15px] leading-[1.7] text-[#333]">{blurb}</p>
          )}
          <div className="mt-5 flex items-baseline gap-4">
            <div className="text-[15px] font-medium">
              from {formatEur(minPrice(edition.basePrice))}
            </div>
            <Link
              href={`/editions/${edition.slug}`}
              className="btn"
            >
              See the edition
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
}
