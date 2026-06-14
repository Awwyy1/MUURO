"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { coverImage, type Edition } from "@/lib/editions";
import { formatEur, minPrice } from "@/lib/pricing";
import FramedArtwork from "./FramedArtwork";

/**
 * Catalogue card with an in-place mini gallery.
 *
 * The carousel is a translateX track: all photos are rendered side by side
 * in a 500% wide row inside an overflow-hidden viewport. Switching slides
 * is a CSS transform, GPU-accelerated, with no network request and no
 * image-decode pause after first paint. This is the pattern used by
 * Shopify, Instagram, Linear and others. Once a file is decoded, swiping is
 * effectively a 16 ms animation.
 *
 * Photos 02..05 only get their src after the card enters the viewport
 * (IntersectionObserver, 300 px root margin), so we don't fire 30 image
 * requests on first paint of a six-card grid. By the time the visitor
 * scrolls to a card and starts swiping, its photos are already loading
 * (or cached) in the background.
 *
 * Tap-vs-swipe is disambiguated by horizontal delta: a > 40 px horizontal
 * move that dominates the vertical move is treated as a swipe and the
 * synthetic click that follows is cancelled, so the Link does not fire.
 */
export default function ProductCard({ edition }: { edition: Edition }) {
  const hasPhotos = edition.images.length > 0;
  const slides = hasPhotos ? edition.images : [coverImage(edition)];
  const multi = slides.length > 1;

  const [index, setIndex] = useState(0);
  const [preloadReady, setPreloadReady] = useState(false);

  const cardRef = useRef<HTMLAnchorElement>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const swiping = useRef(false);

  useEffect(() => {
    if (!multi) return;
    const node = cardRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setPreloadReady(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [multi]);

  function go(next: number) {
    if (!multi) return;
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
      ref={cardRef}
      href={`/editions/${edition.slug}`}
      onClickCapture={onLinkClickCapture}
      className="group flex flex-col gap-4"
    >
      <div
        className="relative aspect-[4/5] overflow-hidden bg-wall transition-colors duration-300 group-hover:bg-[#eae6db]"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {multi ? (
          <div
            className="flex h-full w-full transition-transform duration-[260ms] ease-out"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {slides.map((src, i) => (
              <div key={i} className="relative h-full w-full shrink-0">
                {(i === 0 || preloadReady) && (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={src}
                    alt={
                      i === index
                        ? `${edition.title}, view ${i + 1} of ${slides.length}`
                        : ""
                    }
                    decoding="async"
                    fetchPriority={i === 0 ? "high" : "auto"}
                    draggable={false}
                    className="block h-full w-full select-none object-cover"
                  />
                )}
              </div>
            ))}
          </div>
        ) : hasPhotos ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={slides[0]}
            alt={`${edition.title}, limited edition print`}
            decoding="async"
            fetchPriority="high"
            draggable={false}
            className="block h-full w-full select-none object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <FramedArtwork
              src={slides[0]}
              alt={`${edition.title}, limited edition print`}
              className="w-3/4 max-w-[260px]"
            />
          </div>
        )}

        {multi && (
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
              className="pointer-events-none absolute bottom-3 left-1/2 flex max-w-[80%] -translate-x-1/2 flex-wrap items-center justify-center gap-1"
              aria-hidden="true"
            >
              {slides.map((_, i) => (
                <span
                  key={i}
                  className={`h-[2px] w-3 transition-colors ${
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
