import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Privacy",
  robots: { index: false },
};

export default function PrivacyPage() {
  return (
    <>
      <div className="mx-auto max-w-[1400px] px-6 pt-8 md:px-10">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Privacy" }]} />
      </div>
      <article className="mx-auto max-w-[760px] px-6 py-20">
        <div className="label">Legal</div>
        <h1 className="mt-5 text-[32px] font-medium">Privacy Policy</h1>
        <div className="mt-10 flex flex-col gap-9 text-[15px] leading-[1.75] text-[#333]">
          <p>
            MUURO is in pre-launch. A full Privacy Policy will be published
            on this page once the operating legal entity is registered.
            Until that point the site does not process payments, does not
            fulfil orders and does not sell anything.
          </p>

          <section>
            <h2 className="text-[15px] font-medium uppercase tracking-[0.08em]">
              What is collected right now
            </h2>
            <p className="mt-3">
              Vercel Web Analytics records aggregate visits, page views and
              traffic sources. It is cookieless. No cookies are stored on
              your device, your IP address is not persisted, you are not
              tracked across sites. Legal basis: legitimate interest, GDPR
              Art. 6(1)(f).
            </p>
            <p className="mt-3">
              If you submit your email address through the newsletter form
              it is stored with our newsletter provider until you
              unsubscribe. Every mailing carries an unsubscribe link. Legal
              basis: consent, GDPR Art. 6(1)(a).
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-medium uppercase tracking-[0.08em]">
              What is not collected right now
            </h2>
            <p className="mt-3">
              No payment data, no shipping addresses, no order history. The
              checkout flow runs in test mode and does not process real
              transactions. Once the operating entity is registered and the
              shop opens, this section will be expanded to cover Stripe
              (payment processor), our shipping partner and the related
              data flows.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-medium uppercase tracking-[0.08em]">
              Your rights
            </h2>
            <p className="mt-3">
              You can request access to any data held about you, ask for it
              to be rectified or erased, restrict or object to processing,
              request data portability, and lodge a complaint with a
              supervisory authority.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-medium uppercase tracking-[0.08em]">
              Contact
            </h2>
            <p className="mt-3">
              For any privacy request:{" "}
              <a
                href="mailto:hello@muuro.co"
                className="underline underline-offset-2"
              >
                hello@muuro.co
              </a>
              .
            </p>
          </section>
        </div>
      </article>
    </>
  );
}
