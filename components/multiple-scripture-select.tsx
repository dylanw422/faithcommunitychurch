"use client";

import { useRef, useState } from "react";
import { Plus, X } from "lucide-react";
import ScriptureSelect from "@/components/scripture-select";
import type { ScriptureReference } from "@/lib/bible";

const MAX_PASSAGES = 8;

type ScriptureSlot = {
  id: number;
  value: ScriptureReference | null;
};

type MultipleScriptureSelectProps = {
  values: ScriptureReference[];
  onChange: (values: ScriptureReference[]) => void;
  idPrefix: string;
};

export default function MultipleScriptureSelect({
  values,
  onChange,
  idPrefix,
}: MultipleScriptureSelectProps) {
  const [slots, setSlots] = useState<ScriptureSlot[]>(() =>
    values.map((value, index) => ({ id: index, value }))
  );
  const nextId = useRef(values.length);

  function updateSlot(id: number, value: ScriptureReference | null) {
    const nextSlots = slots.map((slot) => (slot.id === id ? { ...slot, value } : slot));
    setSlots(nextSlots);
    onChange(nextSlots.flatMap((slot) => (slot.value ? [slot.value] : [])));
  }

  function removeSlot(id: number) {
    const nextSlots = slots.filter((slot) => slot.id !== id);
    setSlots(nextSlots);
    onChange(nextSlots.flatMap((slot) => (slot.value ? [slot.value] : [])));
  }

  function addSlot() {
    if (slots.length >= MAX_PASSAGES) return;
    const id = nextId.current;
    nextId.current += 1;
    setSlots((current) => [...current, { id, value: null }]);
  }

  return (
    <div className="mt-2">
      <div className="space-y-4">
        {slots.map((slot, index) => (
          <div key={slot.id}>
            <div className="flex items-center justify-between gap-4">
              <p className="text-[10px] font-black tracking-[0.14em] text-black/50 uppercase">
                Passage {index + 1}
              </p>
              <button
                type="button"
                onClick={() => removeSlot(slot.id)}
                className="flex min-h-9 items-center gap-1.5 px-2 text-[10px] font-black tracking-[0.12em] text-black/50 uppercase transition-colors hover:bg-neutral-100 hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                aria-label={`Remove passage ${index + 1}`}
              >
                <X className="size-3.5" />
                Remove
              </button>
            </div>
            <ScriptureSelect
              idPrefix={`${idPrefix}-${slot.id}`}
              value={slot.value}
              onChange={(value) => updateSlot(slot.id, value)}
            />
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={addSlot}
        disabled={slots.length >= MAX_PASSAGES}
        className={`${slots.length ? "mt-4" : ""} flex min-h-12 w-full items-center justify-center gap-2 border border-dashed border-black text-xs font-black tracking-[0.12em] uppercase transition-colors hover:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black disabled:cursor-not-allowed disabled:opacity-40`}
      >
        <Plus className="size-4" />
        Add scripture passage
      </button>
    </div>
  );
}
