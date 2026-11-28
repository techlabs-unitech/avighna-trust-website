"use client";

import { useCallback, useEffect, useState } from "react";
import styles from "./image-slider.module.css";

export type SliderItem = { src: string; alt: string; title: string; sa?: string; text: string };

const AUTOPLAY_MS = 7000;

/**
 * A full-width slider in the manner of the home-page hero: one photograph behind each slide, a heading and a
 * paragraph in front of it, cross-fading from one slide to the next. It advances by itself, and pauses on
 * hover, on focus, when the visitor presses pause, and while the tab is hidden.
 */
export function ImageSlider({ items, label }: { items: SliderItem[]; label: string }) {
  const [index, setIndex] = useState(0);
  const [userPaused, setUserPaused] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [hidden, setHidden] = useState(false);
  const count = items.length;

  const go = useCallback((next: number) => setIndex(((next % count) + count) % count), [count]);

  useEffect(() => {
    const onVisibility = () => setHidden(document.hidden);
    onVisibility();
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  const playing = !userPaused && !hovering && !hidden && count > 1;

  useEffect(() => {
    if (!playing) return;
    const id = window.setTimeout(() => setIndex((i) => (i + 1) % count), AUTOPLAY_MS);
    return () => window.clearTimeout(id);
  }, [index, playing, count]);

  return (
    <div
      aria-label={label}
      aria-roledescription="carousel"
      className={styles.slider}
      onBlur={() => setHovering(false)}
      onFocus={() => setHovering(true)}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") go(index - 1);
        if (e.key === "ArrowRight") go(index + 1);
      }}
      onPointerEnter={(e) => e.pointerType === "mouse" && setHovering(true)}
      onPointerLeave={() => setHovering(false)}
      role="region"
    >
      <div aria-hidden="true" className={styles.stack}>
        {items.map((it, i) => (
          <div className={styles.bg} data-active={i === index || undefined} key={it.src}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt="" className={styles.photo} draggable={false} loading={i === 0 ? "eager" : "lazy"} src={it.src} />
          </div>
        ))}
        <span className={styles.veil} />
      </div>

      <div className={styles.copyWrap}>
        {items.map((it, i) => (
          <div
            aria-hidden={i !== index}
            aria-label={`${i + 1} of ${count}`}
            aria-roledescription="slide"
            className={styles.copy}
            data-active={i === index || undefined}
            key={it.src}
            role="group"
          >
            {it.sa && (
              <span className={styles.sa} lang="sa">
                {it.sa}
              </span>
            )}
            <h3>{it.title}</h3>
            <p>{it.text}</p>
          </div>
        ))}
      </div>

      <div className={styles.controls}>
        <div aria-label="Choose a slide" className={styles.dots} role="group">
          {items.map((it, i) => (
            <button
              aria-current={i === index}
              aria-label={`${it.title}: slide ${i + 1} of ${count}`}
              className={styles.dot}
              data-active={i === index || undefined}
              key={it.src}
              onClick={() => go(i)}
              type="button"
            >
              <span className={styles.dotBar}>
                {i === index && playing && <span className={styles.dotFill} key={`${i}-${index}`} style={{ animationDuration: `${AUTOPLAY_MS}ms` }} />}
              </span>
            </button>
          ))}
        </div>
        <div className={styles.arrows}>
          <button aria-label={userPaused ? "Resume automatic slides" : "Pause automatic slides"} onClick={() => setUserPaused((p) => !p)} type="button">
            {userPaused ? "▶" : "❚❚"}
          </button>
          <button aria-label="Previous slide" onClick={() => go(index - 1)} type="button">
            ←
          </button>
          <button aria-label="Next slide" onClick={() => go(index + 1)} type="button">
            →
          </button>
        </div>
      </div>

      <p aria-live="polite" className={styles.live} role="status">
        Slide {index + 1} of {count}: {items[index].title}
      </p>
    </div>
  );
}
