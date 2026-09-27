"use client";

import { useEffect, useRef } from "react";
import styles from "./ElasticDots.module.css";

const SPACING = 18;
const RADIUS = 180;
const clamp = (value: number, limit: number) => Math.max(-limit, Math.min(limit, value));

type Dot = { x: number; y: number; dx: number; dy: number; strength: number };

/** A decorative grid that only animates while the pointer disturbs it. */
export function ElasticDots() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.closest("section");
    const context = canvas?.getContext("2d");
    if (!canvas || !host || !context) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const pointer = { x: 0, y: 0, active: false };
    const drag = { x: 0, y: 0 };
    let dots: Dot[] = [];
    let width = 0;
    let height = 0;
    let frame = 0;
    let lastTime = 0;
    let enabled = false;
    let visible = true;

    function stop() {
      cancelAnimationFrame(frame);
      frame = 0;
      lastTime = 0;
    }

    function wake() {
      if (!frame && enabled && visible && !document.hidden) {
        frame = requestAnimationFrame(draw);
      }
    }

    function draw(time: number) {
      frame = 0;
      const step = lastTime ? Math.min((time - lastTime) / 16.67, 3) : 1;
      lastTime = time;
      const ease = 1 - Math.pow(0.8, step);
      drag.x *= Math.pow(0.84, step);
      drag.y *= Math.pow(0.84, step);
      if (Math.abs(drag.x) < 0.02) drag.x = 0;
      if (Math.abs(drag.y) < 0.02) drag.y = 0;

      // Keep the interaction under the cursor even as the page scrolls beneath it.
      const rect = canvas!.getBoundingClientRect();
      const px = pointer.x - rect.left;
      const py = pointer.y - rect.top;
      const hovering = pointer.active && px >= 0 && px <= width && py >= 0 && py <= height;
      let unsettled = drag.x !== 0 || drag.y !== 0;
      context!.clearRect(0, 0, width, height);
      context!.fillStyle = "#262626";

      for (const dot of dots) {
        const x = dot.x - px;
        const y = dot.y - py;
        const distance = Math.hypot(x, y);
        const influence = hovering ? Math.pow(Math.max(0, 1 - distance / RADIUS), 2) : 0;
        const spread = influence * 28 / Math.max(distance, 1);
        const targetX = x * spread + drag.x * influence;
        const targetY = y * spread + drag.y * influence;
        const dx = targetX - dot.dx;
        const dy = targetY - dot.dy;
        const strength = influence - dot.strength;
        dot.dx = Math.abs(dx) < 0.08 ? targetX : dot.dx + dx * ease;
        dot.dy = Math.abs(dy) < 0.08 ? targetY : dot.dy + dy * ease;
        dot.strength = Math.abs(strength) < 0.002 ? influence : dot.strength + strength * ease;
        if (dot.dx !== targetX || dot.dy !== targetY || dot.strength !== influence) unsettled = true;

        const stretch = Math.min(Math.hypot(dot.dx, dot.dy) * 0.055, 1.4);
        context!.globalAlpha = 0.16 + dot.strength * 0.2;
        context!.beginPath();
        context!.ellipse(dot.x + dot.dx, dot.y + dot.dy, 0.8 + stretch, 0.8,
          Math.atan2(dot.dy, dot.dx), 0, Math.PI * 2);
        context!.fill();
      }

      // The CSS grid stays visible until the canvas has a complete first frame.
      canvas!.dataset.ready = "true";
      if (unsettled) wake();
      else lastTime = 0;
    }

    function resize() {
      if (!enabled) return;
      const rect = canvas!.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const scale = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = Math.round(width * scale);
      canvas!.height = Math.round(height * scale);
      context!.setTransform(scale, 0, 0, scale, 0, 0);
      dots = [];
      for (let y = SPACING / 2; y < height; y += SPACING) {
        for (let x = SPACING / 2; x < width; x += SPACING) {
          dots.push({ x, y, dx: 0, dy: 0, strength: 0 });
        }
      }
      wake();
    }

    function updateAvailability() {
      enabled = !motion.matches && finePointer.matches;
      pointer.active = false;
      drag.x = drag.y = 0;
      stop();
      if (enabled) resize();
      else {
        context!.clearRect(0, 0, width, height);
        delete canvas!.dataset.ready;
      }
    }

    function onPointerMove(event: PointerEvent) {
      if (!enabled) return;
      if (event.pointerType === "touch") {
        pointer.active = false;
        drag.x = drag.y = 0;
        wake();
        return;
      }
      if (pointer.active) {
        drag.x = clamp(drag.x + (event.clientX - pointer.x) * 0.7, 42);
        drag.y = clamp(drag.y + (event.clientY - pointer.y) * 0.7, 42);
      }
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.active = true;
      wake();
    }

    function onLeave() {
      pointer.active = false;
      wake();
    }

    function onWheel(event: WheelEvent) {
      if (!enabled) return;
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.active = true;
      const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? height : 1;
      drag.x = clamp(drag.x - event.deltaX * unit * 0.3, 42);
      drag.y = clamp(drag.y - event.deltaY * unit * 0.3, 42);
      wake();
    }

    function onScroll() {
      if (pointer.active) wake();
    }

    function onVisibilityChange() {
      if (document.hidden) {
        pointer.active = false;
        stop();
      } else wake();
    }

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) wake();
      else {
        pointer.active = false;
        stop();
      }
    });
    visibilityObserver.observe(host);
    motion.addEventListener("change", updateAvailability);
    finePointer.addEventListener("change", updateAvailability);
    host.addEventListener("pointermove", onPointerMove, { passive: true });
    host.addEventListener("pointerenter", onPointerMove, { passive: true });
    host.addEventListener("pointerdown", onPointerMove, { passive: true });
    host.addEventListener("pointerleave", onLeave);
    host.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("blur", onLeave);
    document.addEventListener("visibilitychange", onVisibilityChange);
    updateAvailability();

    return () => {
      stop();
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      motion.removeEventListener("change", updateAvailability);
      finePointer.removeEventListener("change", updateAvailability);
      host.removeEventListener("pointermove", onPointerMove);
      host.removeEventListener("pointerenter", onPointerMove);
      host.removeEventListener("pointerdown", onPointerMove);
      host.removeEventListener("pointerleave", onLeave);
      host.removeEventListener("wheel", onWheel);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("blur", onLeave);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      context.clearRect(0, 0, width, height);
      delete canvas.dataset.ready;
    };
  }, []);

  return (
    <div className={styles.field} aria-hidden="true">
      <canvas ref={canvasRef} className={styles.canvas} />
    </div>
  );
}
