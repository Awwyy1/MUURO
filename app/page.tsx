import Link from "next/link";
import { coverImage } from "@/lib/editions";
import { resolveAllEditions, resolveCurrentDrop } from "@/lib/editions-server";
import { formatEur, minPrice } from "@/lib/pricing";
import FramedArtwork from "@/components/FramedArtwork";
import ProductCard from "@/components/ProductCard";
import Newsletter from "@/components/Newsletter";

export default function Home() {
  const editions = resolveAllEditions();
  const drop = resolveCurrentDrop();
  const teaser =
    editions.find((e) => e.slug === "63-sting-ray") ?? editions[1];
  const teaserCover = coverImage(teaser);
  const teaserHasPhotos = teaser.images.length > 0;

  // Editorial hero. The visual prefers the room scene (photo 02) so the
  // piece is shown on a wall; the drop title splits so its last word
  // carries the accent line.
  const heroImage = drop.images[1] ?? drop.images[0] ?? null;
  const titleParts = drop.title.split(" ");
  const titleHead =
    titleParts.length > 1 ? titleParts.slice(0, -1).join(" ") : "";
  const titleTail =
    titleParts.length > 1 ? titleParts[titleParts.length - 1] : drop.title;

  return (
    <>
      <section className="grid min-h-[540px] lg:grid-cols-[44fr_56fr]">
        {/* Editorial text column */}
        <div className="flex flex-col justify-center px-6 py-14 md:px-12 lg:py-16">
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-ink" aria-hidden="true" />
            <span className="label">
              Current drop · Edition {drop.number} · 1 of {drop.editionSize}
            </span>
          </div>
          <h1 className="mt-7 text-[52px] font-semibold leading-[0.98] tracking-[-0.02em] md:text-[72px] lg:text-[84px]">
            {titleHead && <span className="block">{titleHead}</span>}
            <span className="block text-[#2f36e8]">{titleTail}.</span>
          </h1>
          <p className="mt-7 max-w-[38ch] text-[15px] leading-[1.7] text-[#333]">
            {drop.short}
          </p>
          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-4">
            <div>
              <div className="text-[14px] font-semibold">Hahnemühle 308</div>
              <div className="label mt-1">Archival paper</div>
            </div>
            <div>
              <div className="text-[14px] font-semibold">Nielsen</div>
              <div className="label mt-1">Aluminium frame</div>
            </div>
            <div>
              <div className="text-[14px] font-semibold">
                / {drop.editionSize}
              </div>
              <div className="label mt-1">Signed and numbered</div>
            </div>
          </div>
          <div className="mt-9">
            <Link href={`/editions/${drop.slug}`} className="btn">
              Discover the edition →
            </Link>
          </div>
        </div>

        {/* Full-bleed room scene */}
        <div className="relative min-h-[380px] bg-wall lg:min-h-0">
          {heroImage ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={heroImage}
                alt={drop.title}
                fetchPriority="high"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute bottom-6 left-6 max-w-[250px] bg-paper/95 px-5 py-4 md:bottom-8 md:left-8">
                <div className="text-[13px] font-semibold">{drop.title}</div>
                <div className="mt-1 text-[12px] text-[#555]">
                  Edition of {drop.editionSize} · from{" "}
                  {formatEur(minPrice(drop.basePrice))}
                </div>
              </div>
            </>
          ) : (
            <div className="flex h-full items-center justify-center px-10 py-16">
              <FramedArtwork
                src={coverImage(drop)}
                alt={drop.title}
                className="w-full max-w-[420px]"
              />
            </div>
          )}
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
