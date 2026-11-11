"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { alumni } from "./alumni-data";
import styles from "./alumni-carousel.module.css";

const tones = ["indigo", "kumkum", "turmeric", "tulsi", "peacock"] as const;

function initials(name: string) {
  return name.split(/\s+/).map((w) => w[0]).join("").slice(0, 2).toUpperCase();
}

export function AlumniCarousel() {
  const trackRef = useRef<HTMLUListElement | null>(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const goTo = useCallback((index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const count = alumni.length;
    const i = (index + count) % count;
    const card = track.children[i] as HTMLElement | undefined;
    if (card) track.scrollTo({ left: card.offsetLeft - track.offsetLeft, behavior: "smooth" });
    setActive(i);
  }, []);

  // keep the active dot in sync when the user swipes / scrolls
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const kids = Array.from(track.children) as HTMLElement[];
        let best = 0;
        let bestDist = Infinity;
        kids.forEach((k, i) => {
          const d = Math.abs(k.offsetLeft - track.offsetLeft - track.scrollLeft);
          if (d < bestDist) { bestDist = d; best = i; }
        });
        setActive(best);
      });
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => { track.removeEventListener("scroll", onScroll); cancelAnimationFrame(frame); };
  }, []);

  // gentle auto-advance (off for reduced-motion users, or while hovered/focused)
  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => goTo(active + 1), 5500);
    return () => clearInterval(id);
  }, [active, paused, goTo]);

  return (
    <div
      aria-roledescription="carousel"
      aria-label="Alumni stories"
      className={styles.carousel}
      onBlur={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
    >
      <ul className={styles.track} ref={trackRef}>
        {alumni.map((a, i) => (
          <li
            aria-label={`${i + 1} of ${alumni.length}`}
            aria-roledescription="slide"
            className={styles.card}
            data-tone={tones[i % tones.length]}
            key={i}
          >
            <span aria-hidden="true" className={styles.quoteMark}>“</span>
            <p className={styles.feedback}>{a.feedback}</p>
            <div className={styles.person}>
              {a.photo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img alt={a.name} className={styles.avatar} loading="lazy" src={a.photo} />
              ) : (
                <span aria-hidden="true" className={styles.avatar}>{initials(a.name)}</span>
              )}
              <div>
                <strong>{a.name}</strong>
                <small>{a.batch}</small>
                <small>{a.now}</small>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className={styles.controls}>
        <button aria-label="Previous story" className={styles.arrow} onClick={() => goTo(active - 1)} type="button">←</button>
        <div className={styles.dots}>
          {alumni.map((_, i) => (
            <button
              aria-current={i === active || undefined}
              aria-label={`Go to story ${i + 1}`}
              className={styles.dot}
              key={i}
              onClick={() => goTo(i)}
              type="button"
            />
          ))}
        </div>
        <button aria-label="Next story" className={styles.arrow} onClick={() => goTo(active + 1)} type="button">→</button>
      </div>
    </div>
  );
}
