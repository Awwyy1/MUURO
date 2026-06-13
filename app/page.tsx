import Link from "next/link";
import { coverImage } from "@/lib/editions";
import { resolveAllEditions, resolveCurrentDrop } from "@/lib/editions-server";
import FramedArtwork from "@/components/FramedArtwork";
import ProductCard from "@/components/ProductCard";
import Newsletter from "@/components/Newsletter";

export default function Home() {
  const editions = resolveAllEditions();
  const drop = resolveCurrentDrop();
  const teaser =
    editions.find((e) => e.slug === "63-sting-ray") ?? editions[1];
  const dropCover = coverImage(drop);
  const teaserCover = coverImage(teaser);
  const dropHasPhotos = drop.images.length > 0;
  const teaserHasPhotos = teaser.images.length > 0;

  return (
    <>
      <section className="grid min-h-[540px] lg:grid-cols-2">
        <div className="flex items-center justify-center bg-wall px-10 py-16 lg:py-20">
          {dropHasPhotos ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={dropCover}
              alt={drop.title}
              className="block w-full max-w-[420px]"
            />
          ) : (
            <FramedArtwork
              src={dropCover}
              alt={drop.title}
              className="w-full max-w-[420px]"
            />
          )}
        </div>
        <div className="flex flex-col justify-center gap-6 px-6 py-14 md:px-14 lg:py-20">
          <div className="label">
            Current drop · Edition {drop.number} · 1 of {drop.editionSize}
          </div>
          <h1 className="text-[44px] font-medium leading-[1.04] tracking-[-0.01em] md:text-[58px]">
            {drop.title}.
          </h1>
          <p className="max-w-[440px] text-[15px] leading-[1.7] text-[#333]">
            {drop.short} Hahnemühle Photo Rag, Nielsen aluminium, backlit
            available. Signed and numbered.
          </p>
          <div>
            <Link href={`/editions/${drop.slug}`} className="btn">
              Discover the edition →
            </Link>
          </div>
        </div>
      </section>

      <section className="hairline">
        <div className="mx-auto max-w-[1400px] px-6 py-20 md:px-10">
          <div className="flex items-baseline justify-between">
            <h2 className="label text-ink">Editions available · 06</h2>
            <Link href="/editions" className="label transition-colors hover:text-ink">
              View all →
            </Link>
          </div>
          <div className="mt-10 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {editions.map((edition) => (
              <ProductCard key={edition.slug} edition={edition} />
            ))}
          </div>
        </div>
      </section>

      <section className="hairline">
        <div className="mx-auto grid max-w-[1400px] items-center gap-14 px-6 py-20 md:px-10 lg:grid-cols-2">
          <div>
            <div className="label">Manifesto</div>
            <h2 className="mt-5 max-w-[520px] text-[28px] font-medium leading-[1.25] md:text-[34px]">
              We don&apos;t sell decoration. We publish the final accent your
              interior is missing.
            </h2>
            <p className="mt-6 max-w-[460px] text-[15px] leading-[1.7] text-[#333]">
              Limited drops. Archival print. Nielsen aluminium frames, with or
              without integrated perimeter light. When an edition ends, it
              ends.
            </p>
            <Link href="/manifesto" className="btn mt-8">
              Read manifesto →
            </Link>
          </div>
          <div className="flex items-center justify-center bg-wall px-10 py-14">
            {teaserHasPhotos ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={teaserCover}
                alt={teaser.title}
                className="block w-full max-w-[340px]"
              />
            ) : (
              <FramedArtwork
                src={teaserCover}
                alt={teaser.title}
                className="w-full max-w-[340px]"
              />
            )}
          </div>
        </div>
      </section>

      <Newsletter />
    </>
  );
}
