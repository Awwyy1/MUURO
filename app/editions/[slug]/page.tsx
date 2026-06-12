import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EDITIONS, galleryImages, getEdition } from "@/lib/editions";
import { minPrice } from "@/lib/pricing";
import Gallery from "@/components/Gallery";
import Configurator from "@/components/Configurator";
import ProductCard from "@/components/ProductCard";
import Breadcrumbs from "@/components/Breadcrumbs";

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
  const images = galleryImages(edition);

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: edition.title,
    description: edition.short,
    image: images.map((src) => `https://muuro.co${src}`),
    brand: { "@type": "Brand", name: "MUURO" },
    offers: {
      "@type": "Offer",
      url: `https://muuro.co/editions/${edition.slug}`,
      priceCurrency: "EUR",
      price: minPrice(edition.basePrice),
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <>
      <div className="mx-auto max-w-[1400px] px-6 pt-8 md:px-10">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Editions", href: "/editions" },
            { label: edition.title },
          ]}
        />
      </div>

      <div className="mx-auto grid max-w-[1400px] gap-12 px-6 py-10 md:px-10 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
        <Gallery
          images={edition.images}
          title={edition.title}
          fallback={`/editions/${edition.slug}.svg`}
        />

        <div className="flex flex-col gap-6">
          <div>
            <div className="label">
              Edition {edition.number} · Limited to {edition.editionSize}, signed
              and numbered
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

          <Configurator slug={edition.slug} />

          <div className="mt-2">
            <details className="spec border-t border-hairline">
              <summary>Materials and print</summary>
              <p className="pb-5 text-[14px] leading-[1.7] text-[#444]">
                Giclée pigment print on Hahnemühle Photo Rag 308 gsm. Matte,
                100% cotton, age resistant archival paper. Framed in Nielsen
                aluminium profile with mitred corners and anti reflective
                acrylic glazing. The backlit option adds an integrated 24&nbsp;V
                perimeter LED. Warm white, dimmable, plug and play.
              </p>
            </details>
            <details className="spec border-t border-hairline">
              <summary>Dimensions and weight</summary>
              <div className="pb-5 text-[14px] leading-[1.9] text-[#444]">
                50 × 70 cm, frame 52 × 72 cm, about 3.4 kg framed
                <br />
                70 × 100 cm, frame 72 × 102 cm, about 5.8 kg framed
                <br />
                100 × 140 cm, frame 102 × 142 cm, about 9.6 kg framed
                <br />
                Backlit adds about 0.9 kg and 26 mm profile depth.
              </div>
            </details>
            <details className="spec border-y border-hairline">
              <summary>Shipping and returns</summary>
              <p className="pb-5 text-[14px] leading-[1.7] text-[#444]">
                Free worldwide shipping during the launch period. Dispatched
                within 3 to 5 working days. Delivery 5 to 9 days in the EU, 7
                to 14 days worldwide. Framed editions travel in rigid art
                crates. 14 day return right; the piece must come back in its
                original crate.
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

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
    </>
  );
}
