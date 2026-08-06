import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Manifesto",
  description:
    "MUURO publishes limited art editions and the frames they live in. We don't sell decoration. We publish the final accent your interior is missing.",
};

export default function ManifestoPage() {
  return (
    <>
      <div className="mx-auto max-w-[1400px] px-6 pt-8 md:px-10">
        <Breadcrumbs
          items={[{ label: "Home", href: "/" }, { label: "Manifesto" }]}
        />
      </div>

      <article className="mx-auto max-w-[760px] px-6 py-20 md:py-24">
        <div className="label">Manifesto</div>
        <h1 className="mt-6 text-[36px] font-medium leading-[1.12] tracking-[-0.01em] md:text-[46px]">
          We don&apos;t sell decoration. We publish the final accent your
          interior is missing.
        </h1>

        <div className="mt-12 flex flex-col gap-6 text-[16px] leading-[1.75] text-[#333]">
          <p>
            MUURO is a studio publishing limited art editions and the frames
            they live in. Each release is an act of curation. Not stock
            imagery, not an infinite catalogue. A small circle of artists,
            designers and image makers. A small number of works. A fixed
            number of prints.
          </p>
          <p>
            We frame in Nielsen aluminium, with or without integrated
            perimeter light. When an edition ends, it ends. We don&apos;t
            restock. We don&apos;t discount.
          </p>
          <p>
            Visual capital is the part of taste you carry on the wall. The
            chosen object that tells whoever walks in who you are. We make the
            object worth choosing.
          </p>
        </div>

        <div className="my-14 flex items-center justify-center bg-wall px-10 py-16">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/details/frame.svg"
            alt="Nielsen aluminium frame, corner detail"
            className="w-full max-w-[420px]"
          />
        </div>

        <h2 className="text-[16px] font-medium uppercase tracking-[0.1em]">
          Process. Materials. Frame.
        </h2>
        <div className="mt-5 flex flex-col gap-6 text-[16px] leading-[1.75] text-[#333]">
          <p>
            Each piece is produced as a matte fine art print in four formats,
            from A4 to A1. Every print is signed and numbered. The edition
            size is fixed before release and never extended.
          </p>
          <p>
            Frames are Nielsen aluminium profiles with mitred corners and anti
            reflective acrylic glazing, in matte black or brushed silver. The
            backlit option adds an integrated 24&nbsp;V perimeter LED. Warm
            white, dimmable, plug and play. By day it is a frame. After dark,
            a light source.
          </p>
        </div>
      </article>
    </>
  );
}
