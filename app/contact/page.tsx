import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
};

export default function ContactPage() {
  return (
    <article className="mx-auto max-w-[760px] px-6 py-24">
      <div className="label">Studio</div>
      <h1 className="mt-5 text-[32px] font-medium">Contact</h1>
      <div className="mt-10 flex flex-col gap-6 text-[15px] leading-[1.75] text-[#333]">
        <p>
          For orders, editions, trade enquiries or anything else:
          <br />
          <a href="mailto:hello@muuro.co" className="underline underline-offset-2">
            hello@muuro.co
          </a>
        </p>
        <p>
          Instagram:{" "}
          <a
            href="https://www.instagram.com/muuro.co/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2"
          >
            @muuro.co ↗
          </a>
        </p>
      </div>
    </article>
  );
}
