"use client";

import { useState } from "react";

type Status = "idle" | "loading" | "ok" | "unconfigured" | "error";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || status === "loading") return;
    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) setStatus("ok");
      else if (res.status === 503) setStatus("unconfigured");
      else setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="newsletter" className="hairline">
      <div className="mx-auto max-w-[1400px] px-6 py-20 text-center md:px-10">
        <div className="label">Newsletter</div>
        <h2 className="mt-4 text-[26px] font-medium md:text-[32px]">
          First access to the next drop.
        </h2>
        {status === "ok" ? (
          <p className="label mt-8 text-ink">You're on the list.</p>
        ) : (
          <form
            onSubmit={submit}
            className="mx-auto mt-8 flex max-w-[480px] gap-2"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              aria-label="Email address"
              className="input flex-1"
            />
            <button type="submit" className="btn btn-fill" disabled={status === "loading"}>
              {status === "loading" ? "…" : "Subscribe"}
            </button>
          </form>
        )}
        {status === "unconfigured" && (
          <p className="label mt-5">
            Sign-up opens with the first drop. Follow{" "}
            <a
              href="https://www.instagram.com/muuro.co/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2"
            >
              @muuro.co
            </a>{" "}
            meanwhile.
          </p>
        )}
        {status === "error" && (
          <p className="label mt-5">Something went wrong. Please try again.</p>
        )}
      </div>
    </section>
  );
}
