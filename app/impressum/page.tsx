import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impressum",
  robots: { index: false },
};

export default function ImpressumPage() {
  return (
    <article className="mx-auto max-w-[760px] px-6 py-24">
      <div className="label">Legal</div>
      <h1 className="mt-5 text-[32px] font-medium">Impressum</h1>
      <div className="mt-10 flex flex-col gap-5 text-[15px] leading-[1.75] text-[#333]">
        <p className="border border-dashed border-edge bg-white p-5 text-[13px] leading-[1.8] text-stone">
          Placeholder — to be completed with the registered entity before
          public launch: legal name, registered address, e-mail, phone,
          registration number (Handelsregister / registrikood), VAT ID, and
          the person responsible for content.
        </p>
        <p>
          MUURO
          <br />
          [Legal entity name]
          <br />
          [Registered address]
        </p>
        <p>
          E-mail: hello@muuro.co
          <br />
          [Registration no.] · [VAT ID]
        </p>
      </div>
    </article>
  );
}
