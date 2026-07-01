"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { coverImage, type Edition } from "@/lib/editions";
import { formatEur, minPrice } from "@/lib/pricing";
import FramedArtwork from "./FramedArtwork";

/**
 * Catalogue card with an in-place mini gallery and hover swap.
 *
 * Resting state shows the cover (slide 0). On a mouse-capable device,
 * hovering the card fades to the room scene (slide 1) so the visitor
 * sees the piece on a wall without leaving the listing, the way Desenio
 * and similar shops do it.
 *
 * The manual controls stay fully alive: clicking a chevron, tapping a
 * dot or swiping puts the card into manual mode and steps through every
 * photo of the edition. Leaving the card resets it to the cover. A tap
 * that is not a swipe still opens the product page via the wrapping Link.
 *
 * displayIndex is the single source of truth for what is on screen:
 *   manual navigation  -> the explicitly chosen index
 *   hover, no manual   -> slide 1 (room scene) if it exists
 *   resting            -> slide 0 (cover)
 */
export default function ProductCard({ edition }: { edition: Edition }) {
  const hasPhotos = edition.images.length > 0;
  const slides = hasPhotos ? edition.images : [coverImage(edition)];
  const multi = slides.length > 1;

  const [index, setIndex] = useState(0);
  const [manualNav, setManualNav] = useState(false);
  const [hovering, setHovering] = useState(false);
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

  const displayIndex = manualNav ? index : hovering && multi ? 1 : 0;

  function go(target: number) {
    if (!multi) return;
    setManualNav(true);
    setIndex(((target % slides.length) + slides.length) % slides.length);
  }

  function onEnter() {
    setHovering(true);
  }
  function onLeave() {
    setHovering(false);
    setManualNav(false);
    setIndex(0);
  }

  function onTouchStart(e: React.TouchEvent) {
    touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    swiping.current = false;
  }
  function onTouchEnd(e: React.TouchEvent) {
    if (!touchStart.current) return;
    const dx = e.changedTouches[0].clientX - touchStart.current.x;
    const dy = e.changedTouches[0].clientY - touchStart.current.y;
    touchStart.current = null;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
      swiping.current = true;
      go(displayIndex + (dx < 0 ? 1 : -1));
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
      go(displayIndex + delta);
    };
  }

  return (
    <Link
      ref={cardRef}
      href={`/editions/${edition.slug}`}
      onClickCapture={onLinkClickCapture}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="group flex flex-col gap-4"
    >
      <div
        className="relative aspect-[4/5] overflow-hidden bg-wall transition-colors duration-300 group-hover:bg-[#eae6db]"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {multi ? (
          <div
            className="flex h-full w-full transition-transform duration-[420ms] ease-out"
            style={{ transform: `translateX(-${displayIndex * 100}%)` }}
          >
            {slides.map((src, i) => (
              <div key={i} className="relative h-full w-full shrink-0">
                {(i <= 1 || preloadReady) && (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={src}
                    alt={
                      i === displayIndex
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
            {/* "In the room" hint appears on hover before manual browsing */}
            {hovering && !manualNav && (
              <span className="pointer-events-none absolute right-3 top-3 bg-paper/85 px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.16em] text-[#555] backdrop-blur-sm">
                In the room
              </span>
            )}

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
                    i === displayIndex ? "bg-ink" : "bg-edge"
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
