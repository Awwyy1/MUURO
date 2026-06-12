/**
 * Renders an artwork inside a thin Nielsen-style aluminium frame with a soft
 * drop shadow. House presentation for every edition image until real
 * photography arrives, and the fallback after.
 */
export default function FramedArtwork({
  src,
  alt,
  frame = "black",
  className = "",
}: {
  src: string;
  alt: string;
  frame?: "black" | "silver";
  className?: string;
}) {
  const frameColor = frame === "silver" ? "#b9b9bd" : "#17161a";
  return (
    <div
      className={`shadow-[0_24px_50px_-18px_rgba(28,25,20,0.35)] ${className}`}
      style={{ border: `6px solid ${frameColor}` }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className="block h-auto w-full" />
    </div>
  );
}
