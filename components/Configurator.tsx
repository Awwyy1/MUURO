"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart";
import {
  BACKLIT_SIZE_REQUIREMENT,
  DEFAULT_SIZE_ID,
  FRAMES,
  LIGHTS,
  SIZES,
  formatEur,
  unitPrice,
} from "@/lib/pricing";

function OptionGroup({
  label,
  options,
  value,
  onChange,
  disabledIds = [],
  note,
}: {
  label: string;
  options: { id: string; label: string; delta: number }[];
  value: string;
  onChange: (id: string) => void;
  disabledIds?: string[];
  note?: string;
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
          </button>
        ))}
      </div>
      {note && (
        <p className="mt-3 text-[12px] leading-[1.5] text-stone">{note}</p>
      )}
    </div>
  );
}

export default function Configurator({ slug }: { slug: string }) {
  const { addItem } = useCart();
  const [sizeId, setSizeId] = useState(DEFAULT_SIZE_ID);
  const [frameId, setFrameId] = useState(FRAMES[0].id);
  const [lightId, setLightId] = useState(LIGHTS[0].id);

  function selectSize(id: string) {
    setSizeId(id);
    // Backlit only mounts in A2 and A1, so drop it the moment the size
    // can no longer carry the LED profile.
    if (!BACKLIT_SIZE_REQUIREMENT.has(id) && lightId === "backlit") {
      setLightId("off");
    }
  }

  function selectFrame(id: string) {
    setFrameId(id);
    // The perimeter LED mounts into the frame profile. No frame, no light.
    if (id === "none") setLightId("off");
  }

  const backlitBlockedBySize = !BACKLIT_SIZE_REQUIREMENT.has(sizeId);
  const backlitBlockedByFrame = frameId === "none";
  const disabledLightIds: string[] = [];
  if (backlitBlockedBySize || backlitBlockedByFrame) {
    disabledLightIds.push("backlit");
  }

  let lightNote: string | undefined;
  if (backlitBlockedBySize) {
    lightNote = "Backlit is only available at A2 and A1, the LED needs a deeper Nielsen profile than the smaller formats carry.";
  } else if (backlitBlockedByFrame) {
    lightNote = "Backlit mounts inside the frame, choose a framed option to enable it.";
  }

  const total = unitPrice(slug, sizeId, frameId, lightId);

  return (
    <div className="flex flex-col gap-6">
      <OptionGroup
        label="Size"
        options={SIZES}
        value={sizeId}
        onChange={selectSize}
      />
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
        disabledIds={disabledLightIds}
        note={lightNote}
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
