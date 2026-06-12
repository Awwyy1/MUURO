import Link from "next/link";
import { coverImage, type Edition } from "@/lib/editions";
import { formatEur, minPrice } from "@/lib/pricing";
import FramedArtwork from "./FramedArtwork";

export default function ProductCard({ edition }: { edition: Edition }) {
  const cover = coverImage(edition);
  const usingPlaceholder = edition.images.length === 0;

  return (
    <Link href={`/editions/${edition.slug}`} className="group flex flex-col gap-5">
      <div className="flex items-center justify-center bg-wall px-8 py-10 transition-colors duration-300 group-hover:bg-[#eae6db]">
        {usingPlaceholder ? (
          <FramedArtwork
            src={cover}
            alt={`${edition.title}, limited edition print`}
            className="w-full max-w-[300px]"
          />
        ) : (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={cover}
            alt={`${edition.title}, limited edition print`}
            className="block aspect-[4/5] w-full max-w-[300px] object-cover"
          />
        )}
      </div>
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-[15px] font-medium tracking-[0.04em]">
            {edition.title}
          </div>
          <div className="label mt-2">
            Ed. {edition.number} · 1 of {edition.editionSize}
          </div>
        </div>
        <div className="text-[14px] font-medium whitespace-nowrap">
          from {formatEur(minPrice(edition.basePrice))}
        </div>
      </div>
    </Link>
  );
}
