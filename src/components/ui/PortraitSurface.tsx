"use client";

import { useEffect, useRef, type ReactNode } from "react";
import styles from "./PortraitSurface.module.css";

export function PortraitSurface({ children, className }: { children: ReactNode; className: string }) {
  const surfaceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const surface = surfaceRef.current;
    const card = surface?.closest("figure");
    const anchor = surface?.closest<HTMLElement>("[data-portrait-anchor]");
    if (!surface || !card || !anchor) return;

    const interactive = window.matchMedia(
      "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    );
    let frame: number | null = null;
    let lastTime = 0;
    let hovering = false;
    const tilt = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };

    function paintTilt() {
      card!.style.setProperty("--portrait-tilt-x", `${tilt.x.toFixed(4)}deg`);
      card!.style.setProperty("--portrait-tilt-y", `${tilt.y.toFixed(4)}deg`);
    }

    function reset() {
      if (frame !== null) cancelAnimationFrame(frame);
      frame = null;
      lastTime = 0;
      hovering = false;
      tilt.x = tilt.y = target.x = target.y = 0;
      paintTilt();
      delete card!.dataset.tilting;
    }

    function wake() {
      if (frame === null) frame = requestAnimationFrame(draw);
    }

    function draw(time: number) {
      frame = null;
      if (!interactive.matches) {
        reset();
        return;
      }
      const delta = lastTime ? Math.min(time - lastTime, 32) : 16.67;
      const ease = 1 - Math.exp(-delta / 90);
      lastTime = time;
      tilt.x += (target.x - tilt.x) * ease;
      tilt.y += (target.y - tilt.y) * ease;
      const settled = Math.abs(target.x - tilt.x) < 0.015 && Math.abs(target.y - tilt.y) < 0.015;
      if (settled) {
        tilt.x = target.x;
        tilt.y = target.y;
      }
      paintTilt();
      if (!settled) wake();
      else {
        lastTime = 0;
        if (!hovering) delete card!.dataset.tilting;
      }
    }

    function leave() {
      hovering = false;
      target.x = target.y = 0;
      wake();
    }

    function move(event: PointerEvent) {
      if (!interactive.matches || event.pointerType !== "mouse") {
        reset();
        return;
      }
      // Read the stationary slot, never the moving card, to avoid a feedback loop.
      const rect = anchor!.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      if (x < 0 || x > 1 || y < 0 || y > 1) {
        leave();
        return;
      }
      target.x = (0.5 - y) * 10;
      target.y = (x - 0.5) * 10;
      hovering = true;
      card!.dataset.tilting = "true";
      wake();
    }

    anchor.addEventListener("pointerenter", move);
    anchor.addEventListener("pointermove", move);
    anchor.addEventListener("pointerleave", leave);
    anchor.addEventListener("pointercancel", reset);
    interactive.addEventListener("change", reset);
    window.addEventListener("blur", reset);
    window.addEventListener("scroll", reset, { passive: true });
    window.addEventListener("resize", reset);
    document.addEventListener("visibilitychange", reset);

    return () => {
      reset();
      anchor.removeEventListener("pointerenter", move);
      anchor.removeEventListener("pointermove", move);
      anchor.removeEventListener("pointerleave", leave);
      anchor.removeEventListener("pointercancel", reset);
      interactive.removeEventListener("change", reset);
      window.removeEventListener("blur", reset);
      window.removeEventListener("scroll", reset);
      window.removeEventListener("resize", reset);
      document.removeEventListener("visibilitychange", reset);
    };
  }, []);

  return (
    <div ref={surfaceRef} className={className}>
      {children}
      <span className={styles.grain} aria-hidden="true" />
    </div>
  );
}
