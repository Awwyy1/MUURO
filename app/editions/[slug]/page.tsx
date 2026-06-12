import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EDITIONS, getEdition } from "@/lib/editions";
import Gallery from "@/components/Gallery";
import Configurator from "@/components/Configurator";
import ProductCard from "@/components/ProductCard";

export function generateStaticParams() {
  return EDITIONS.map((edition) => ({ slug: edition.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const edition = getEdition(slug);
  if (!edition) return {};
  return {
    title: edition.title,
    description: `${edition.short} Limited edition of ${edition.editionSize}, signed and numbered.`,
  };
}

export default async function EditionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const edition = getEdition(slug);
  if (!edition) notFound();

  const related = EDITIONS.filter((e) => e.slug !== edition.slug).slice(0, 3);

  return (
    <>
      <div className="mx-auto grid max-w-[1400px] gap-12 px-6 py-12 md:px-10 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
        <Gallery image={edition.image} title={edition.title} />

        <div className="flex flex-col gap-6">
          <div>
            <div className="label">
              Edition {edition.number} · Limited to {edition.editionSize} —
              signed &amp; numbered
            </div>
            <h1 className="mt-3 text-[34px] font-medium leading-[1.08] tracking-[-0.005em] md:text-[40px]">
              {edition.title}
            </h1>
            <div className="label mt-3">
              {edition.series} · {edition.year}
            </div>
          </div>

          <p className="text-[15px] leading-[1.7] text-[#333]">
            {edition.description}
          </p>

          <div className="h-px w-10 bg-ink/50" />

          <Configurator slug={edition.slug} />

          <div className="mt-2">
            <details className="spec border-t border-hairline">
              <summary>Materials &amp; print</summary>
              <p className="pb-5 text-[14px] leading-[1.7] text-[#444]">
                Giclée pigment print on Hahnemühle Photo Rag 308 gsm — matte,
                100% cotton, age-resistant archival paper. Framed in Nielsen
                aluminium profile with mitred corners and anti-reflective
                acrylic glazing. The backlit option adds an integrated 24&nbsp;V
                perimeter LED — warm white, dimmable, plug-and-play.
              </p>
            </details>
            <details className="spec border-t border-hairline">
              <summary>Dimensions &amp; weight</summary>
              <div className="pb-5 text-[14px] leading-[1.9] text-[#444]">
                50 × 70 cm — frame 52 × 72 cm · ~3.4 kg framed
                <br />
                70 × 100 cm — frame 72 × 102 cm · ~5.8 kg framed
                <br />
                100 × 140 cm — frame 102 × 142 cm · ~9.6 kg framed
                <br />
                Backlit adds ~0.9 kg and 26 mm profile depth.
              </div>
            </details>
            <details className="spec border-y border-hairline">
              <summary>Shipping &amp; returns</summary>
              <p className="pb-5 text-[14px] leading-[1.7] text-[#444]">
                Free worldwide shipping during the launch period. Dispatched
                within 3–5 working days; delivery 5–9 days in the EU, 7–14 days
                worldwide. Framed editions travel in rigid art crates. 14-day
                return right — the piece must come back in its original crate.
              </p>
            </details>
          </div>
        </div>
      </div>

      <section className="hairline">
        <div className="mx-auto max-w-[1400px] px-6 py-16 md:px-10">
          <h2 className="label text-ink">You might also live with</h2>
          <div className="mt-9 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((e) => (
              <ProductCard key={e.slug} edition={e} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
