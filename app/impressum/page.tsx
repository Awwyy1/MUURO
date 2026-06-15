import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Impressum",
  robots: { index: false },
};

export default function ImpressumPage() {
  return (
    <>
      <div className="mx-auto max-w-[1400px] px-6 pt-8 md:px-10">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Impressum" }]} />
      </div>
      <article className="mx-auto max-w-[760px] px-6 py-20">
        <div className="label">Legal</div>
        <h1 className="mt-5 text-[32px] font-medium">Impressum</h1>
        <div className="mt-10 flex flex-col gap-6 text-[15px] leading-[1.75] text-[#333]">
          <p>
            MUURO is in pre-launch. A full Impressum, with the registered
            legal entity and its postal address, will be published on this
            page once that entity is in place. The current target is an
            Estonian OÜ, expected to be live within the next few weeks.
          </p>
          <p>
            Until then this site does not process payments and does not
            sell anything. The checkout flow runs in test mode only and no
            real transactions can be completed.
          </p>
          <p>
            For any legal or commercial inquiry:{" "}
            <a
              href="mailto:hello@muuro.co"
              className="underline underline-offset-2"
            >
              hello@muuro.co
            </a>
            .
          </p>
        </div>
      </article>
    </>
  );
}
