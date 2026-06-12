"use client";

import { useState } from "react";
import FramedArtwork from "./FramedArtwork";

interface View {
  id: string;
  label: string;
  src: string;
  framed: boolean;
}

export default function Gallery({
  image,
  title,
}: {
  image: string;
  title: string;
}) {
  const views: View[] = [
    { id: "artwork", label: "Artwork", src: image, framed: true },
    { id: "paper", label: "Paper", src: "/details/paper.svg", framed: false },
    { id: "frame", label: "Frame", src: "/details/frame.svg", framed: false },
    { id: "backlit", label: "Backlit", src: "/details/backlit.svg", framed: false },
  ];
  const [active, setActive] = useState(views[0]);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-center bg-wall px-8 py-12 md:px-14 md:py-16">
        {active.framed ? (
          <FramedArtwork
            src={active.src}
            alt={`${title} — ${active.label}`}
            className="w-full max-w-[440px]"
          />
        ) : (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={active.src}
            alt={`${title} — ${active.label}`}
            className="block w-full max-w-[440px]"
          />
        )}
      </div>
      <div className="grid grid-cols-4 gap-2.5">
        {views.map((view) => (
          <button
            key={view.id}
            type="button"
            onClick={() => setActive(view)}
            aria-label={`Show ${view.label}`}
            className={`cursor-pointer border bg-wall p-2 transition-colors ${
              active.id === view.id
                ? "border-ink"
                : "border-transparent hover:border-edge"
            }`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={view.src}
              alt=""
              className="block aspect-square h-auto w-full object-cover"
            />
            <span className="label mt-1.5 block text-[8px] tracking-[0.18em]">
              {view.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
