"use client";

import { useCallback, useEffect, useRef, useState, type PointerEvent } from "react";
import type { GalleryImage } from "@/lib/gallery-images";
import styles from "./photo-gallery.module.css";

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={dir === "left" ? "m15 5-7 7 7 7" : "m9 5 7 7-7 7"} />
    </svg>
  );
}

export function PhotoGallery({ images }: { images: GalleryImage[] }) {
  const count = images.length;
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [slide, setSlide] = useState(0);
  const stripRef = useRef<HTMLDivElement | null>(null);

  /* ---------- Featured slider (native scroll-snap = swipe on touch) ---------- */
  const scrollToSlide = useCallback((next: number) => {
    const strip = stripRef.current;
    if (!strip) return;
    const target = ((next % count) + count) % count;
    strip.scrollTo({ left: target * strip.clientWidth, behavior: "smooth" });
  }, [count]);

  function onStripScroll() {
    const strip = stripRef.current;
    if (!strip) return;
    const idx = Math.round(strip.scrollLeft / strip.clientWidth);
    setSlide((prev) => (prev === idx ? prev : idx));
  }

  /* ---------- Lightbox ---------- */
  const step = useCallback(
    (dir: -1 | 1) => setLightbox((i) => (i === null ? i : (i + dir + count) % count)),
    [count],
  );

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
    };
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = prev;
    };
  }, [lightbox, step]);

  // Keep the active thumbnail in view
  useEffect(() => {
    if (lightbox === null) return;
    document
      .querySelector<HTMLElement>(`[data-thumb="${lightbox}"]`)
      ?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
  }, [lightbox]);

  // Swipe handling (pointer events cover touch, pen and mouse drag)
  const drag = useRef<{ x: number; y: number } | null>(null);
  const [dragX, setDragX] = useState(0);

  function onPointerDown(e: PointerEvent<HTMLDivElement>) {
    drag.current = { x: e.clientX, y: e.clientY };
  }
  function onPointerMove(e: PointerEvent<HTMLDivElement>) {
    if (!drag.current) return;
    const dx = e.clientX - drag.current.x;
    const dy = e.clientY - drag.current.y;
    if (Math.abs(dx) > Math.abs(dy)) setDragX(dx);
  }
  function endDrag(e: PointerEvent<HTMLDivElement>) {
    if (!drag.current) return;
    const dx = e.clientX - drag.current.x;
    drag.current = null;
    setDragX(0);
    if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
  }

  if (count === 0) {
    return (
      <div className={styles.empty}>
        <span aria-hidden="true">❀</span>
        <h2>Our photo gallery is being prepared</h2>
        <p>Photographs of our community and activities will appear here very soon.</p>
      </div>
    );
  }

  const current = lightbox === null ? null : images[lightbox];

  return (
    <>
      {/* ---------------- Featured slider ---------------- */}
      <section className={styles.featured} aria-roledescription="carousel" aria-label="Featured photographs">
        <div className={styles.stripWrap}>
          <div className={styles.strip} onScroll={onStripScroll} ref={stripRef} tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "ArrowRight") { e.preventDefault(); scrollToSlide(slide + 1); }
              if (e.key === "ArrowLeft") { e.preventDefault(); scrollToSlide(slide - 1); }
            }}>
            {images.map((img, i) => (
              <button
                aria-label={`Open photo ${i + 1} of ${count}`}
                className={styles.slide}
                key={img.src}
                onClick={() => setLightbox(i)}
                type="button"
              >
                {/* blurred backdrop so portrait and landscape photos both look intentional */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img alt="" aria-hidden="true" className={styles.slideBackdrop} loading={i < 2 ? "eager" : "lazy"} src={img.src} />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img alt={img.description} className={styles.slideImage} draggable={false} loading={i < 2 ? "eager" : "lazy"} src={img.src} />
                <span className={styles.slideCaption}>
                  <strong>{img.title}</strong>
                  <span>{img.description}</span>
                </span>
              </button>
            ))}
          </div>
          {count > 1 && (
            <>
              <button aria-label="Previous photo" className={`${styles.navBtn} ${styles.navPrev}`} onClick={() => scrollToSlide(slide - 1)} type="button"><Chevron dir="left" /></button>
              <button aria-label="Next photo" className={`${styles.navBtn} ${styles.navNext}`} onClick={() => scrollToSlide(slide + 1)} type="button"><Chevron dir="right" /></button>
            </>
          )}
          <span className={styles.slideCount} aria-hidden="true">{slide + 1} / {count}</span>
        </div>
        {count > 1 && (
          <div className={styles.dots} role="tablist" aria-label="Choose photo">
            {images.map((img, i) => (
              <button aria-label={`Go to photo ${i + 1}`} aria-selected={i === slide} className={styles.dot} key={img.src} onClick={() => scrollToSlide(i)} role="tab" type="button" />
            ))}
          </div>
        )}
      </section>

      {/* ---------------- All photographs ---------------- */}
      <section className={styles.allSection} aria-labelledby="all-photos">
        <div className={styles.allHead}>
          <h2 id="all-photos">All photographs</h2>
          <span>{count} {count === 1 ? "photo" : "photos"}</span>
        </div>
        <div className={styles.masonry}>
          {images.map((img, i) => (
            <button aria-label={`Open photo ${i + 1} of ${count}`} className={styles.tile} key={img.src} onClick={() => setLightbox(i)} type="button">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt={img.description} loading="lazy" src={img.src} />
              <span className={styles.tileCaption}>
                <strong>{img.title}</strong>
                <span>{img.description}</span>
              </span>
              <span className={styles.tileZoom} aria-hidden="true">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5M11 8v6M8 11h6" /></svg>
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* ---------------- Lightbox ---------------- */}
      {current && lightbox !== null && (
        <div aria-label="Photo viewer" aria-modal="true" className={styles.lightbox} role="dialog">
          <div className={styles.lbTop}>
            <span className={styles.lbCount}>{lightbox + 1} / {count}</span>
            <button aria-label="Close photo viewer" className={styles.lbClose} onClick={() => setLightbox(null)} type="button">×</button>
          </div>

          <div className={styles.lbStage}
            onPointerCancel={endDrag} onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={endDrag}
            onClick={(e) => { if (e.target === e.currentTarget) setLightbox(null); }}>
            {count > 1 && (
              <button aria-label="Previous photo" className={`${styles.lbNav} ${styles.lbPrev}`} onClick={() => step(-1)} type="button"><Chevron dir="left" /></button>
            )}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt={current.description} className={styles.lbImage} draggable={false} key={current.src}
              src={current.src}
              style={{ transform: dragX ? `translateX(${dragX}px)` : undefined, transition: dragX ? "none" : undefined }} />
            {count > 1 && (
              <button aria-label="Next photo" className={`${styles.lbNav} ${styles.lbNext}`} onClick={() => step(1)} type="button"><Chevron dir="right" /></button>
            )}
          </div>

          <p aria-live="polite" className={styles.lbCaption}>
            <strong>{current.title}</strong>
            <span>{current.description}</span>
          </p>

          {count > 1 && (
            <div className={styles.thumbs}>
              {images.map((img, i) => (
                <button aria-current={i === lightbox} aria-label={`Show photo ${i + 1}`} className={styles.thumb} data-thumb={i} key={img.src} onClick={() => setLightbox(i)} type="button">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img alt="" loading="lazy" src={img.src} />
                </button>
              ))}
            </div>
          )}
          {/* preload neighbours for instant arrow navigation */}
          {count > 1 && (
            <div hidden>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="" src={images[(lightbox + 1) % count].src} />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="" src={images[(lightbox - 1 + count) % count].src} />
            </div>
          )}
        </div>
      )}
    </>
  );
}
