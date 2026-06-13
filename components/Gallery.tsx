"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import FramedArtwork from "./FramedArtwork";

/**
 * Product page gallery.
 *
 * Like the catalogue card carousel, this is a translateX track: all
 * photos are rendered side by side and switching slides is a CSS
 * transform, with no per-swipe network or decode pause. The framed
 * placeholder shown when no real photography exists yet still gets the
 * "01" leading slide plus four "upload XX.jpg" slot cards.
 */

const PLACEHOLDER_SLOTS = [
  "/placeholders/photo-02.svg",
  "/placeholders/photo-03.svg",
  "/placeholders/photo-04.svg",
  "/placeholders/photo-05.svg",
  "/placeholders/photo-06.svg",
  "/placeholders/photo-07.svg",
  "/placeholders/photo-08.svg",
  "/placeholders/photo-09.svg",
  "/placeholders/photo-10.svg",
];

export default function Gallery({
  images,
  title,
  fallback,
}: {
  images: string[];
  title: string;
  fallback?: string;
}) {
  const isFallback = images.length === 0;
  const slides = isFallback
    ? fallback
      ? [fallback, ...PLACEHOLDER_SLOTS]
      : []
    : images;

  const [index, setIndex] = useState(0);
  const touchStart = useRef<number | null>(null);

  const go = useCallback(
    (next: number) => {
      const total = slides.length;
      if (total < 2) return;
      setIndex(((next % total) + total) % total);
    },
    [slides.length]
  );

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") go(index - 1);
      if (e.key === "ArrowRight") go(index + 1);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, go]);

  function onTouchStart(e: React.TouchEvent) {
    touchStart.current = e.touches[0].clientX;
  }
  function onTouchEnd(e: React.TouchEvent) {
    if (touchStart.current == null) return;
    const delta = e.changedTouches[0].clientX - touchStart.current;
    touchStart.current = null;
    if (Math.abs(delta) < 40) return;
    go(delta < 0 ? index + 1 : index - 1);
  }

  if (slides.length === 0) return null;

  return (
    <div className="flex flex-col gap-3">
      <div
        className="relative aspect-[4/5] bg-wall md:aspect-auto md:h-[600px] md:px-24 xl:h-[720px]"
      >
        {slides.length > 1 && (
          <>
            <button
              type="button"
              aria-label="Previous image"
              onClick={() => go(index - 1)}
              className="absolute left-4 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center text-[26px] font-light text-stone transition-colors hover:text-ink md:flex"
            >
              ‹
            </button>
            <button
              type="button"
              aria-label="Next image"
              onClick={() => go(index + 1)}
              className="absolute right-4 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center text-[26px] font-light text-stone transition-colors hover:text-ink md:flex"
            >
              ›
            </button>
          </>
        )}

        {/* Inner clip box. overflow-hidden lives here, on the content area only,
            so adjacent slides cannot bleed into the padding gutters where the
            chevrons sit. */}
        <div
          className="relative h-full w-full overflow-hidden"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div
            className="flex h-full w-full transition-transform duration-[260ms] ease-out will-change-transform"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {slides.map((src, i) => (
              <div
                key={i}
                className="flex h-full w-full shrink-0 items-center justify-center"
              >
                {isFallback && i === 0 ? (
                  <div className="w-full max-w-[460px] p-6 md:p-10">
                    <FramedArtwork src={src} alt={title} />
                  </div>
                ) : (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={src}
                    alt={
                      i === index
                        ? `${title}, view ${i + 1} of ${slides.length}`
                        : ""
                    }
                    decoding="async"
                    fetchPriority={i === 0 ? "high" : "auto"}
                    draggable={false}
                    className={
                      isFallback
                        ? "block max-w-[460px] select-none"
                        : "block h-full w-full select-none object-cover md:object-contain"
                    }
                  />
                )}
              </div>
            ))}
          </div>

          {slides.length > 1 && (
            <div
              className="pointer-events-none absolute bottom-4 left-1/2 flex max-w-[90%] -translate-x-1/2 flex-wrap items-center justify-center gap-1.5"
              aria-hidden="true"
            >
              {slides.map((_, i) => (
                <span
                  key={i}
                  className={`h-[2px] w-5 transition-colors ${
                    i === index ? "bg-ink" : "bg-edge"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {slides.length > 1 && (
        <div className="grid grid-cols-5 gap-2">
          {slides.map((src, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show image ${i + 1}`}
              aria-current={i === index}
              className={`cursor-pointer border bg-wall p-1.5 transition-colors ${
                i === index ? "border-ink" : "border-transparent hover:border-edge"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt=""
                loading="lazy"
                decoding="async"
                className="block aspect-[4/5] w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
