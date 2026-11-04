"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./hero-carousel.module.css";

type Slide = {
  kicker: string;
  title: string;
  /** Drop your photo at this path inside /public. Until then a placeholder shows. */
  src: string;
  alt: string;
  symbol: string;
};

const slides: Slide[] = [
  {
    kicker: "A place for learning",
    title: "The Gurukulam, in its own light.",
    src: "/images/hero/slide-1.jpg",
    alt: "Students learning at the Gurukulam",
    symbol: "॥",
  },
  {
    kicker: "Vedic & Sanskrit study",
    title: "Words carried by voice and memory.",
    src: "/images/hero/slide-2.jpg",
    alt: "Vedic chanting and Sanskrit learning",
    symbol: "अ",
  },
  {
    kicker: "Temple & spiritual life",
    title: "Practice rooted in tradition.",
    src: "/images/hero/slide-3.jpg",
    alt: "Temple and spiritual activities",
    symbol: "दीप",
  },
  {
    kicker: "Community & seva",
    title: "Knowledge in service of all.",
    src: "/images/hero/slide-4.jpg",
    alt: "Community gathering and service",
    symbol: "सेवा",
  },
];

const AUTOPLAY_MS = 5000;

export function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [failed, setFailed] = useState<Record<number, boolean>>({});
  const touchStart = useRef<number | null>(null);
  const count = slides.length;

  const go = useCallback(
    (next: number) => setIndex(((next % count) + count) % count),
    [count],
  );

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setTimeout(() => setIndex((i) => (i + 1) % count), AUTOPLAY_MS);
    return () => window.clearTimeout(id);
  }, [index, paused, count]);

  return (
    <div
      aria-roledescription="carousel"
      aria-label="Gurukulam highlights"
      className={styles.carousel}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") go(index - 1);
        if (e.key === "ArrowRight") go(index + 1);
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={(e) => {
        touchStart.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        if (touchStart.current === null) return;
        const dx = e.changedTouches[0].clientX - touchStart.current;
        touchStart.current = null;
        if (Math.abs(dx) > 40) go(index + (dx < 0 ? 1 : -1));
      }}
    >
      <div className={styles.viewport}>
        <div
          className={styles.track}
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {slides.map((slide, i) => (
            <div
              aria-hidden={i !== index}
              aria-label={`${i + 1} of ${count}`}
              aria-roledescription="slide"
              className={styles.slide}
              key={slide.src}
              role="group"
            >
              <div className={styles.placeholder} aria-hidden="true">
                <span className={styles.symbol}>{slide.symbol}</span>
              </div>
              {!failed[i] && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  alt={slide.alt}
                  className={styles.image}
                  draggable={false}
                  loading={i === 0 ? "eager" : "lazy"}
                  onError={() => setFailed((f) => ({ ...f, [i]: true }))}
                  src={slide.src}
                />
              )}
              <div className={styles.caption}>
                <span className={styles.kicker}>{slide.kicker}</span>
                <span className={styles.title}>{slide.title}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.controls}>
        <div className={styles.dots} role="tablist" aria-label="Choose slide">
          {slides.map((slide, i) => (
            <button
              aria-label={`Go to slide ${i + 1}`}
              aria-selected={i === index}
              className={`${styles.dot} ${i === index ? styles.dotActive : ""}`}
              key={slide.src}
              onClick={() => go(i)}
              role="tab"
              type="button"
            />
          ))}
        </div>
        <span className={styles.counter} aria-hidden="true">
          0{index + 1} — 0{count}
        </span>
        <div className={styles.arrows}>
          <button aria-label="Previous slide" onClick={() => go(index - 1)} type="button">←</button>
          <button aria-label="Next slide" onClick={() => go(index + 1)} type="button">→</button>
        </div>
      </div>

      <p className={styles.live} aria-live="polite" role="status">
        Slide {index + 1} of {count}: {slides[index].title}
      </p>
    </div>
  );
}
