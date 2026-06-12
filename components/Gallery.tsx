"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import FramedArtwork from "./FramedArtwork";

/**
 * Swipeable product gallery.
 *
 * With real photography: renders the edition's `images` in order.
 * Without it: shows the framed artwork placeholder as slide 1 and four
 * distinct "photo slot" cards as slides 2 to 5, so the carousel structure
 * is visible and switching slides is obviously working.
 *
 * Navigation: swipe on touch devices, chevrons in the side gutters on
 * desktop (never overlapping the image), dots underneath, arrow keys.
 */
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
      ? [
          fallback,
          "/placeholders/photo-02.svg",
          "/placeholders/photo-03.svg",
          "/placeholders/photo-04.svg",
          "/placeholders/photo-05.svg",
        ]
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

  const framedSlide = isFallback && index === 0;

  return (
    <div className="flex flex-col gap-3">
      <div
        className="relative flex items-center justify-center bg-wall px-6 py-12 md:px-24 md:py-16"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div className="w-full max-w-[460px]">
          {framedSlide ? (
            <FramedArtwork src={slides[0]} alt={title} />
          ) : (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={slides[index]}
              alt={`${title}, view ${index + 1} of ${slides.length}`}
              className="block h-auto w-full"
            />
          )}
        </div>

        {/* Desktop chevrons live in the side gutters created by md:px-24,
            so they never sit on top of the image. Mobile is swipe only. */}
        {slides.length > 1 && (
          <>
            <button
              type="button"
              aria-label="Previous image"
              onClick={() => go(index - 1)}
              className="absolute left-4 top-1/2 hidden h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center text-[26px] font-light text-stone transition-colors hover:text-ink md:flex"
            >
              ‹
            </button>
            <button
              type="button"
              aria-label="Next image"
              onClick={() => go(index + 1)}
              className="absolute right-4 top-1/2 hidden h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center text-[26px] font-light text-stone transition-colors hover:text-ink md:flex"
            >
              ›
            </button>
          </>
        )}

        {slides.length > 1 && (
          <div
            className="pointer-events-none absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2"
            aria-hidden="true"
          >
            {slides.map((_, i) => (
              <span
                key={i}
                className={`h-[3px] w-6 transition-colors ${
                  i === index ? "bg-ink" : "bg-edge"
                }`}
              />
            ))}
          </div>
        )}
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
                className="block aspect-[4/5] w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
