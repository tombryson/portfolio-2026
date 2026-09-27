"use client";

import { useState } from "react";
import Image from "next/image";

export function ProjectGallery({ name, screenshots }: {
  name: string;
  screenshots: { src: string; caption: string; width: number; height: number }[];
}) {
  const [active, setActive] = useState(0);
  function move(direction: number) {
    setActive((current) => (current + direction + screenshots.length) % screenshots.length);
  }

  return (
    <figure className="min-w-0 self-start border border-[#202020] bg-[#e9e9e5] p-2 shadow-[4px_4px_0_#202020]" aria-label={`${name} screenshots`}>
      <a href={screenshots[active].src} target="_blank" rel="noopener noreferrer"
        aria-label={`Open ${screenshots[active].caption} full size (new tab)`}
        className="relative block overflow-hidden"
        style={{ aspectRatio: `${screenshots[active].width} / ${screenshots[active].height}` }}>
        {screenshots.map((screenshot, index) => (
          <Image key={screenshot.src} src={screenshot.src}
            alt={index === active ? `${name}: ${screenshot.caption}` : ""}
            aria-hidden={index !== active} fill sizes="(max-width: 1024px) 90vw, 40vw"
            className={`object-contain transition-opacity duration-300 motion-reduce:transition-none ${index === active ? "opacity-100" : "opacity-0"}`} />
        ))}
      </a>
      <div className="flex items-center justify-between gap-2 pt-2">
        <figcaption className="px-1 font-mono text-[11px] text-[#262626]" aria-live="polite" aria-atomic="true">
          {active + 1} / {screenshots.length} — {screenshots[active].caption}
        </figcaption>
        <div className="flex shrink-0 gap-1">
          <button type="button" aria-label="Previous screenshot" onClick={() => move(-1)} className="h-11 w-11 cursor-pointer border border-[#202020] hover:bg-[#202020] hover:text-white">←</button>
          <button type="button" aria-label="Next screenshot" onClick={() => move(1)} className="h-11 w-11 cursor-pointer border border-[#202020] hover:bg-[#202020] hover:text-white">→</button>
        </div>
      </div>
    </figure>
  );
}
