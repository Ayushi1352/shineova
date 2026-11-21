"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Counts up from 0 to `value` the first time it is on screen, on every screen size: a number already visible
 * when the page opens (the hero numbers on phones and tablets) counts right away, the others when they scroll in.
 * Shows the final number without JS or with reduced motion.
 */
export const CountUp = ({ value, suffix = "" }: { value: number; suffix?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      const start = performance.now();
      const tick = (now: number) => {
        // the first frame can be stamped a moment before `start`; never let the count go below 0 ("-0")
        const progress = Math.min(Math.max((now - start) / 1800, 0), 1);
        setDisplay(Math.round(value * (1 - Math.pow(1 - progress, 3))));
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    });
    frame = requestAnimationFrame(() => setDisplay(0));
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value]);

  return (
    <span ref={ref}>
      {display.toLocaleString("en-US")}
      {suffix}
    </span>
  );
};
