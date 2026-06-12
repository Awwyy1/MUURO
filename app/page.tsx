import Link from "next/link";
import { EDITIONS, getCurrentDrop } from "@/lib/editions";
import FramedArtwork from "@/components/FramedArtwork";
import ProductCard from "@/components/ProductCard";
import Newsletter from "@/components/Newsletter";

export default function Home() {
  const drop = getCurrentDrop();
  const teaser = EDITIONS.find((e) => e.slug === "63-sting-ray") ?? EDITIONS[1];

  return (
    <>
      {/* Brand line — the slogan as a quiet ribbon under the nav */}
      <div className="border-b border-hairline">
        <p className="py-3 text-center text-[10px] font-medium uppercase tracking-[0.42em] text-stone [text-indent:0.42em]">
          Your Visual Capital
        </p>
      </div>

      {/* Hero — current drop */}
      <section className="grid min-h-[540px] lg:grid-cols-2">
        <div className="flex items-center justify-center bg-wall px-10 py-16 lg:py-20">
          <FramedArtwork
            src={drop.image}
            alt={`${drop.title} — current drop`}
            className="w-full max-w-[420px]"
          />
        </div>
        <div className="flex flex-col justify-center gap-6 px-6 py-14 md:px-14 lg:py-20">
          <div className="label">
            Current drop · Edition {drop.number} · 1 of {drop.editionSize}
          </div>
          <h1 className="text-[44px] font-medium leading-[1.04] tracking-[-0.01em] md:text-[58px]">
            {drop.title}.
          </h1>
          <div className="h-px w-10 bg-ink/50" />
          <p className="max-w-[440px] text-[15px] leading-[1.7] text-[#333]">
            {drop.short} Hahnemühle Photo Rag · Nielsen aluminium · backlit
            available. Signed and numbered.
          </p>
          <div>
            <Link href={`/editions/${drop.slug}`} className="btn">
              Discover the edition →
            </Link>
          </div>
        </div>
      </section>

      {/* All six editions */}
      <section className="hairline">
        <div className="mx-auto max-w-[1400px] px-6 py-20 md:px-10">
          <div className="flex items-baseline justify-between">
            <h2 className="label text-ink">Editions available · 06</h2>
            <Link href="/editions" className="label transition-colors hover:text-ink">
              View all →
            </Link>
          </div>
          <div className="mt-10 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {EDITIONS.map((edition) => (
              <ProductCard key={edition.slug} edition={edition} />
            ))}
          </div>
        </div>
      </section>

      {/* Manifesto teaser */}
      <section className="hairline">
        <div className="mx-auto grid max-w-[1400px] items-center gap-14 px-6 py-20 md:px-10 lg:grid-cols-2">
          <div>
            <div className="label">Manifesto</div>
            <h2 className="mt-5 max-w-[520px] text-[28px] font-medium leading-[1.25] md:text-[34px]">
              We don't sell decoration. We publish the final accent your
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
            <FramedArtwork
              src={teaser.image}
              alt={teaser.title}
              className="w-full max-w-[340px]"
            />
          </div>
        </div>
      </section>

      <Newsletter />
    </>
  );
}
