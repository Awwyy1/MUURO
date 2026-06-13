"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { coverImage, type Edition } from "@/lib/editions";
import { formatEur, minPrice } from "@/lib/pricing";
import FramedArtwork from "./FramedArtwork";

/**
 * Catalogue card with an in-place mini gallery.
 *
 * - Mobile: swipe left/right on the image flips through the photos.
 * - Desktop: subtle chevrons appear in the image gutters on card hover.
 * - Any tap that is not a horizontal swipe still navigates to the
 *   product page via the wrapping Link.
 *
 * Click-vs-swipe distinction is handled by tracking touch delta and
 * cancelling the next click event when a real swipe occurred. Chevron
 * buttons stop their click from bubbling up to the Link.
 */
export default function ProductCard({ edition }: { edition: Edition }) {
  const hasPhotos = edition.images.length > 0;
  const slides = hasPhotos ? edition.images : [coverImage(edition)];
  const [index, setIndex] = useState(0);

  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const swiping = useRef(false);

  function go(next: number) {
    if (slides.length < 2) return;
    setIndex(((next % slides.length) + slides.length) % slides.length);
  }

  function onTouchStart(e: React.TouchEvent) {
    touchStart.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
    swiping.current = false;
  }

  function onTouchEnd(e: React.TouchEvent) {
    if (!touchStart.current) return;
    const dx = e.changedTouches[0].clientX - touchStart.current.x;
    const dy = e.changedTouches[0].clientY - touchStart.current.y;
    touchStart.current = null;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
      swiping.current = true;
      go(dx < 0 ? index + 1 : index - 1);
      // Keep the "we just swiped" flag long enough for the synthetic
      // click event to be cancelled below, then drop it.
      window.setTimeout(() => {
        swiping.current = false;
      }, 250);
    }
  }

  function onLinkClickCapture(e: React.MouseEvent) {
    if (swiping.current) {
      e.preventDefault();
      e.stopPropagation();
    }
  }

  function stopAndGo(delta: number) {
    return (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      go(index + delta);
    };
  }

  return (
    <Link
      href={`/editions/${edition.slug}`}
      onClickCapture={onLinkClickCapture}
      className="group flex flex-col gap-4"
    >
      <div
        className="relative flex aspect-[4/5] items-center justify-center overflow-hidden bg-wall transition-colors duration-300 group-hover:bg-[#eae6db]"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {hasPhotos ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={slides[index]}
            alt={`${edition.title}, view ${index + 1} of ${slides.length}`}
            className="block h-full w-full select-none object-cover"
            draggable={false}
          />
        ) : (
          <FramedArtwork
            src={slides[0]}
            alt={`${edition.title}, limited edition print`}
            className="w-3/4 max-w-[260px]"
          />
        )}

        {slides.length > 1 && (
          <>
            <button
              type="button"
              aria-label="Previous image"
              onClick={stopAndGo(-1)}
              className="absolute left-2 top-1/2 hidden h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center bg-paper/80 text-[18px] font-light text-ink opacity-0 backdrop-blur-sm transition-opacity hover:opacity-100 group-hover:opacity-90 md:flex"
            >
              ‹
            </button>
            <button
              type="button"
              aria-label="Next image"
              onClick={stopAndGo(1)}
              className="absolute right-2 top-1/2 hidden h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center bg-paper/80 text-[18px] font-light text-ink opacity-0 backdrop-blur-sm transition-opacity hover:opacity-100 group-hover:opacity-90 md:flex"
            >
              ›
            </button>

            <div
              className="pointer-events-none absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-1.5"
              aria-hidden="true"
            >
              {slides.map((_, i) => (
                <span
                  key={i}
                  className={`h-[2px] w-4 transition-colors ${
                    i === index ? "bg-ink" : "bg-edge"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-[15px] font-medium tracking-[0.04em]">
            {edition.title}
          </div>
          <div className="label mt-2">
            Ed. {edition.number} · 1 of {edition.editionSize}
          </div>
        </div>
        <div className="whitespace-nowrap text-[14px] font-medium">
          from {formatEur(minPrice(edition.basePrice))}
        </div>
      </div>
    </Link>
  );
}
