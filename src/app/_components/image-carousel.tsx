"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./image-carousel.module.css";

export type CarouselItem = { src: string; alt: string; caption: string };

const AUTOPLAY_MS = 6000;

/**
 * A swipeable picture carousel (native scroll-snap), with arrows, dots and a caption on each picture.
 * It advances by itself, pausing on hover, on focus, and for visitors who prefer reduced motion.
 */
export function ImageCarousel({ items, label }: { items: CarouselItem[]; label: string }) {
  const rail = useRef<HTMLUListElement | null>(null);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const count = items.length;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const go = useCallback(
    (next: number) => {
      const el = rail.current;
      if (!el) return;
      const target = ((next % count) + count) % count;
      el.scrollTo({ left: target * el.clientWidth, behavior: reduced ? "auto" : "smooth" });
    },
    [count, reduced],
  );

  function onScroll() {
    const el = rail.current;
    if (!el) return;
    const i = Math.round(el.scrollLeft / el.clientWidth);
    setIndex((prev) => (prev === i ? prev : i));
  }

  useEffect(() => {
    if (paused || reduced || count < 2) return;
    const id = window.setTimeout(() => go(index + 1), AUTOPLAY_MS);
    return () => window.clearTimeout(id);
  }, [index, paused, reduced, count, go]);

  return (
    <div
      aria-label={label}
      aria-roledescription="carousel"
      className={styles.carousel}
      onBlur={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      role="region"
    >
      <ul
        className={styles.rail}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") {
            e.preventDefault();
            go(index + 1);
          }
          if (e.key === "ArrowLeft") {
            e.preventDefault();
            go(index - 1);
          }
        }}
        onScroll={onScroll}
        ref={rail}
        tabIndex={0}
      >
        {items.map((it, i) => (
          <li aria-label={`${i + 1} of ${count}`} aria-roledescription="slide" className={styles.slide} key={it.src}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt={it.alt} draggable={false} loading={i === 0 ? "eager" : "lazy"} src={it.src} />
            <p className={styles.caption}>{it.caption}</p>
          </li>
        ))}
      </ul>
      {count > 1 && (
        <>
          <button aria-label="Previous picture" className={`${styles.nav} ${styles.prev}`} onClick={() => go(index - 1)} type="button">
            ‹
          </button>
          <button aria-label="Next picture" className={`${styles.nav} ${styles.next}`} onClick={() => go(index + 1)} type="button">
            ›
          </button>
          <div className={styles.dots} role="group" aria-label="Choose a picture">
            {items.map((it, i) => (
              <button aria-current={i === index} aria-label={`Show picture ${i + 1}`} className={styles.dot} key={it.src} onClick={() => go(i)} type="button" />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
