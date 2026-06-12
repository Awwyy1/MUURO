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
            Free worldwide shipping during the launch period. Every order is
            dispatched within 3 to 5 working days.
          </p>
          <p>
            Unframed prints travel rolled in rigid tubes. Framed and backlit
            editions travel in custom art crates with corner protection.
          </p>
          <p>
            Delivery times. 5 to 9 working days within the EU. 7 to 14 working
            days worldwide. You will receive a tracking link the moment your
            order leaves the studio.
          </p>
        </div>
      </article>
    </>
  );
}
