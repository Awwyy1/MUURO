"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import FramedArtwork from "./FramedArtwork";

/**
 * Swipeable product gallery. Renders the edition's photography in order.
 * Drops back to the framed SVG when no JPGs have been uploaded yet, so
 * pages keep working before real photography arrives.
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
  const slides = images.length > 0 ? images : fallback ? [fallback] : [];
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

  const isFallback = images.length === 0;

  if (slides.length === 0) return null;

  return (
    <div className="flex flex-col gap-3">
      <div
        className="relative flex items-center justify-center bg-wall px-6 py-12 md:px-14 md:py-16"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div className="w-full max-w-[460px]">
          {isFallback ? (
            <FramedArtwork src={slides[index]} alt={title} />
          ) : (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={slides[index]}
              alt={`${title}, view ${index + 1} of ${slides.length}`}
              className="block h-auto w-full"
            />
          )}
        </div>

        {slides.length > 1 && (
          <>
            <button
              type="button"
              aria-label="Previous image"
              onClick={() => go(index - 1)}
              className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center border border-edge bg-paper/80 text-[14px] backdrop-blur-sm transition-colors hover:border-ink hover:bg-paper"
            >
              ‹
            </button>
            <button
              type="button"
              aria-label="Next image"
              onClick={() => go(index + 1)}
              className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center border border-edge bg-paper/80 text-[14px] backdrop-blur-sm transition-colors hover:border-ink hover:bg-paper"
            >
              ›
            </button>
          </>
        )}

        {slides.length > 1 && (
          <div
            className="pointer-events-none absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-2"
            aria-hidden="true"
          >
            {slides.map((_, i) => (
              <span
                key={i}
                className={`h-1 w-6 transition-colors ${
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
              key={src + i}
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
