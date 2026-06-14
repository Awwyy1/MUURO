import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Shipping",
};

export default function ShippingPage() {
  return (
    <>
      <div className="mx-auto max-w-[1400px] px-6 pt-8 md:px-10">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Shipping" }]} />
      </div>
      <article className="mx-auto max-w-[760px] px-6 py-20">
        <div className="label">Service</div>
        <h1 className="mt-5 text-[32px] font-medium">Shipping</h1>
        <div className="mt-10 flex flex-col gap-6 text-[15px] leading-[1.75] text-[#333]">
          <p>
            Every order ships from Berlin via DHL. Cost is calculated at
            checkout based on destination and the product you have chosen,
            we will publish the full rate matrix on this page shortly.
          </p>
          <p>
            Every order is dispatched within 3 to 5 working days. Unframed
            prints travel rolled in rigid tubes. Framed and backlit editions
            travel in custom art crates with corner protection.
          </p>
          <p>
            Delivery times. 5 to 9 working days within the EU. 7 to 14
            working days worldwide. You will receive a tracking link the
            moment your order leaves the workshop.
          </p>
          <p>
            Customs duties for destinations outside the EU are the
            recipient's responsibility.
          </p>
        </div>
      </article>
    </>
  );
}
