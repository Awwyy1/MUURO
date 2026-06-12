import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Privacy",
  robots: { index: false },
};

const SECTIONS: { title: string; body: string }[] = [
  {
    title: "Controller",
    body: "[Legal entity name and registered address, to be completed before public launch.] For any privacy request: hello@muuro.co.",
  },
  {
    title: "Analytics",
    body: "This site uses Vercel Web Analytics, a cookieless measurement tool. It does not store cookies on your device, does not persist your IP address and does not track you across sites. Legal basis: legitimate interest (Art. 6(1)(f) GDPR) in understanding aggregate site usage.",
  },
  {
    title: "Payments",
    body: "Payments are processed by Stripe Payments Europe Ltd. When you place an order, your payment details are transmitted directly to Stripe and never touch our servers. Stripe processes your data as described in the Stripe Privacy Policy. Legal basis: performance of a contract (Art. 6(1)(b) GDPR).",
  },
  {
    title: "Orders and shipping",
    body: "We process your name, address and email to fulfil and ship your order and to comply with statutory retention duties (tax and commercial law). Legal basis: Art. 6(1)(b) and 6(1)(c) GDPR.",
  },
  {
    title: "Newsletter",
    body: "If you subscribe, your email address is stored with our email provider until you unsubscribe. Every mailing contains an unsubscribe link. Legal basis: consent (Art. 6(1)(a) GDPR).",
  },
  {
    title: "Your rights",
    body: "You have the right to access, rectify and erase your data, restrict or object to processing, data portability, and to lodge a complaint with a supervisory authority.",
  },
];

export default function PrivacyPage() {
  return (
    <>
      <div className="mx-auto max-w-[1400px] px-6 pt-8 md:px-10">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Privacy" }]} />
      </div>
      <article className="mx-auto max-w-[760px] px-6 py-20">
        <div className="label">Legal</div>
        <h1 className="mt-5 text-[32px] font-medium">Privacy Policy</h1>
        <p className="mt-6 border border-dashed border-edge bg-white p-5 text-[13px] leading-[1.8] text-stone">
          Draft structure. Final wording to be generated with a legal service
          (e.g. e-recht24) and reviewed before public launch.
        </p>
        <div className="mt-10 flex flex-col gap-9">
          {SECTIONS.map((s) => (
            <section key={s.title}>
              <h2 className="text-[15px] font-medium uppercase tracking-[0.08em]">
                {s.title}
              </h2>
              <p className="mt-3 text-[15px] leading-[1.75] text-[#333]">
                {s.body}
              </p>
            </section>
          ))}
        </div>
      </article>
    </>
  );
}
