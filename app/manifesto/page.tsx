import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manifesto",
  description:
    "MUURO publishes limited art editions and the frames they live in. We don't sell decoration — we publish the final accent your interior is missing.",
};

export default function ManifestoPage() {
  return (
    <article className="mx-auto max-w-[760px] px-6 py-24 md:py-28">
      <div className="label">Manifesto</div>
      <h1 className="mt-6 text-[36px] font-medium leading-[1.12] tracking-[-0.01em] md:text-[46px]">
        We don't sell decoration. We publish the final accent your interior is
        missing.
      </h1>

      <div className="my-12 h-px w-10 bg-ink/50" />

      <div className="flex flex-col gap-6 text-[16px] leading-[1.75] text-[#333]">
        <p>
          MUURO is a studio publishing limited art editions and the frames they
          live in. Each release is an act of curation — not stock imagery, not
          an infinite catalogue. A small circle of artists, designers and
          image-makers; a small number of works; a fixed number of prints.
        </p>
        <p>
          We print on Hahnemühle archival paper. We frame in Nielsen aluminium,
          with or without integrated perimeter light. When an edition ends, it
          ends. We don't restock. We don't discount.
        </p>
        <p>
          Visual capital is the part of taste you carry on the wall — the
          chosen object that tells whoever walks in who you are. We make the
          object worth choosing.
        </p>
      </div>

      <div className="my-14 flex items-center justify-center bg-wall px-10 py-16">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/details/frame.svg"
          alt="Nielsen aluminium frame — corner detail"
          className="w-full max-w-[420px]"
        />
      </div>

      <h2 className="text-[16px] font-medium uppercase tracking-[0.1em]">
        Process · Materials · Frame
      </h2>
      <div className="mt-5 flex flex-col gap-6 text-[16px] leading-[1.75] text-[#333]">
        <p>
          Each piece is produced as a giclée pigment print on Hahnemühle Photo
          Rag 308 gsm — matte, 100% cotton, certified archival. Every print is
          signed and numbered; the edition size is fixed before release and
          never extended.
        </p>
        <p>
          Frames are Nielsen aluminium profiles with mitred corners and
          anti-reflective acrylic glazing, in matte black or brushed silver.
          The backlit option adds an integrated 24&nbsp;V perimeter LED — warm
          white, dimmable, plug-and-play. By day it is a frame; after dark, a
          light source.
        </p>
      </div>
    </article>
  );
}
