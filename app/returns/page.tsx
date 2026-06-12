import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Returns",
};

export default function ReturnsPage() {
  return (
    <>
      <div className="mx-auto max-w-[1400px] px-6 pt-8 md:px-10">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Returns" }]} />
      </div>
      <article className="mx-auto max-w-[760px] px-6 py-20">
        <div className="label">Service</div>
        <h1 className="mt-5 text-[32px] font-medium">Returns</h1>
        <div className="mt-10 flex flex-col gap-6 text-[15px] leading-[1.75] text-[#333]">
          <p>
            You may withdraw from your purchase within 14 days of delivery, as
            provided by EU consumer law. No reason required.
          </p>
          <p>
            The piece must come back in its original packaging (tube or
            crate), unmounted and undamaged. Write to hello@muuro.co with your
            order reference and we will arrange the return.
          </p>
          <p>
            Refunds are issued to the original payment method within 14 days
            of the piece arriving back at the studio.
          </p>
        </div>
      </article>
    </>
  );
}
