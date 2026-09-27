"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./VideoPlayer.module.css";

type Source = { src: string; type: string };

type Props = {
  /** Still shown before playback. No video bytes load until the viewer clicks. */
  poster: string;
  posterAlt: string;
  /** Ordered by preference — the browser takes the first it can play. */
  sources: Source[];
  label: string;
  duration?: string;
  width: number;
  height: number;
};

export function VideoPlayer({
  poster,
  posterAlt,
  sources,
  label,
  duration,
  width,
  height,
}: Props) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <video
        className={styles.video}
        controls
        autoPlay
        playsInline
        preload="auto"
        poster={poster}
        width={width}
        height={height}
      >
        {sources.map((source) => (
          <source key={source.src} src={source.src} type={source.type} />
        ))}
        Your browser cannot play this video.
      </video>
    );
  }

  return (
    <button
      type="button"
      className={styles.facade}
      onClick={() => setPlaying(true)}
      aria-label={duration ? `Play: ${label} (${duration})` : `Play: ${label}`}
    >
      <Image
        src={poster}
        alt={posterAlt}
        width={width}
        height={height}
        className={styles.poster}
        unoptimized
      />
      <span className={styles.overlay} aria-hidden="true">
        <svg viewBox="0 0 100 100" className={styles.badge} aria-hidden="true">
          {/* One path: the disc, with the triangle punched out of it by the
              even-odd fill rule, so the poster shows through the arrow. */}
          <path
            className={styles.disc}
            fillRule="evenodd"
            d="M50 0A50 50 0 1 0 50 100 50 50 0 0 0 50 0ZM40 31 71 50 40 69Z"
          />
          <circle className={styles.ring} cx="50" cy="50" r="49.5" />
        </svg>
      </span>
    </button>
  );
}
