"use client";

import { motion } from "framer-motion";

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: {
        duration: 2.2,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
        delay: 0.7,
      },
      opacity: { duration: 0.15, delay: 0.7 },
    },
  },
};

/**
 * Exits from the bottom of the 'n' in Bryson and flows downward.
 * Two cursive loops cross back over the stroke before a trailing exit.
 * Positioned absolutely within the hero <section>.
 */
export function HandwrittenMark() {
  return (
    <motion.svg
      viewBox="0 0 70 280"
      preserveAspectRatio="xMidYMin meet"
      className="absolute pointer-events-none"
      style={{
        left: "calc(9rem + 30vw)",  // approximate right edge of 'n' in Bryson
        top: "61%",                 // bottom baseline of second name line
        width: "5.5rem",
        height: "32vh",
        zIndex: 5,
      }}
      initial="hidden"
      animate="visible"
      aria-hidden="true"
    >
      {/*
        Entry: exits the bottom of 'n' going downward.
        Loop 1: sweeps right, hooks back up-left crossing the descent stroke,
                exits downward again.
        Loop 2: same rhythm, tighter.
        Exit: long trailing stroke down-left.
      */}
      <motion.path
        d="
          M 32 0
          C 36 18, 48 42, 44 72
          C 40 102, 18 112, 12 90
          C 6 68, 22 52, 40 68
          C 58 84, 60 118, 50 148
          C 40 178, 16 184, 10 162
          C 4 140, 20 124, 38 140
          C 56 156, 54 192, 42 222
          C 34 244, 20 262, 14 278
        "
        fill="none"
        strokeWidth="10"
        stroke="#09090b"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        variants={draw}
      />
    </motion.svg>
  );
}
