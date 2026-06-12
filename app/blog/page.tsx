import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Field notes from the studio. Editions, materials, framing, and the rooms that hold them.",
};

export default function BlogPage() {
  return (
    <>
      <div className="mx-auto max-w-[1400px] px-6 pt-8 md:px-10">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Blog" }]} />
      </div>

      <article className="mx-auto max-w-[760px] px-6 py-28 text-center">
        <div className="label">Journal</div>
        <h1 className="mt-5 text-[34px] font-medium leading-[1.1] md:text-[42px]">
          Soon.
        </h1>
        <p className="mx-auto mt-7 max-w-[520px] text-[15px] leading-[1.75] text-[#333]">
          Field notes on editions, materials, framing, and the rooms that hold
          them. The first entry arrives with the next drop.
        </p>
      </article>
    </>
  );
}
