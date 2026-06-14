"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart";
import { FRAMES, LIGHTS, SIZES, formatEur, unitPrice } from "@/lib/pricing";

function OptionGroup({
  label,
  options,
  value,
  onChange,
  disabledIds = [],
}: {
  label: string;
  options: { id: string; label: string; delta: number }[];
  value: string;
  onChange: (id: string) => void;
  disabledIds?: string[];
}) {
  return (
    <div>
      <div className="label">{label}</div>
      <div className="mt-2.5 flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option.id}
            type="button"
            disabled={disabledIds.includes(option.id)}
            onClick={() => onChange(option.id)}
            className={`chip ${value === option.id ? "chip-on" : ""}`}
          >
            {option.label}
            {option.delta > 0 && ` · +${formatEur(option.delta).slice(1)}€`}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function Configurator({ slug }: { slug: string }) {
  const { addItem } = useCart();
  const [sizeId, setSizeId] = useState(SIZES[0].id);
  const [frameId, setFrameId] = useState(FRAMES[0].id);
  const [lightId, setLightId] = useState(LIGHTS[0].id);

  function selectFrame(id: string) {
    setFrameId(id);
    // The perimeter LED mounts into the frame profile. No frame, no light.
    if (id === "none") setLightId("off");
  }

  const total = unitPrice(slug, sizeId, frameId, lightId);

  return (
    <div className="flex flex-col gap-6">
      <OptionGroup label="Size" options={SIZES} value={sizeId} onChange={setSizeId} />
      <OptionGroup
        label="Frame · Nielsen aluminium"
        options={FRAMES}
        value={frameId}
        onChange={selectFrame}
      />
      <OptionGroup
        label="Light · integrated perimeter LED"
        options={LIGHTS}
        value={lightId}
        onChange={setLightId}
        disabledIds={frameId === "none" ? ["backlit"] : []}
      />

      <div className="mt-2">
        <div className="flex items-center justify-between border-t border-hairline pt-4">
          <span className="label text-ink">Total</span>
          <span className="text-[20px] font-medium">{formatEur(total)}</span>
        </div>
        <button
          type="button"
          onClick={() => addItem({ slug, sizeId, frameId, lightId })}
          className="btn btn-fill mt-4 w-full py-[18px]"
        >
          Add to bag
        </button>
      </div>
    </div>
  );
}
