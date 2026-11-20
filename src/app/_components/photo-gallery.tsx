"use client";

import { useCallback, useEffect, useRef, useState, type PointerEvent } from "react";
import type { GalleryImage } from "@/lib/gallery-images";
import { ACTIVITY_CATEGORIES, DONATION_CATEGORIES } from "@/lib/gallery-categories";
import styles from "./photo-gallery.module.css";

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={dir === "left" ? "m15 5-7 7 7 7" : "m9 5 7 7-7 7"} />
    </svg>
  );
}

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const monthLabel = (ym: string) => `${MONTHS[Number(ym.slice(5, 7)) - 1].slice(0, 3)} ${ym.slice(0, 4)}`;
/** The picture to show in small sizes: a video's poster, else the photo itself. */
const thumbOf = (i: GalleryImage) => (i.kind === "video" && i.poster ? i.poster : i.src);

export function PhotoGallery({ images: all }: { images: GalleryImage[] }) {
  const [category, setCategory] = useState("all");
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [lightbox, setLightbox] = useState<number | null>(null);

  /* ---------- Filters: year + month, then category ---------- */
  const years = Array.from(new Set(all.map((i) => i.date.slice(0, 4)))).sort().reverse();

  const inRange = (i: GalleryImage) => (!year || i.date.slice(0, 4) === year) && (!month || i.date.slice(5, 7) === month);
  const inCategory = (c: string) => all.filter((i) => inRange(i) && i.category === c).length;
  const images = all.filter((i) => inRange(i) && (category === "all" || i.category === category));
  const count = images.length;
  const filtered = category !== "all" || year !== "" || month !== "";

  function reset() {
    setCategory("all");
    setYear("");
    setMonth("");
  }

  const chip = (c: string) => {
    const n = inCategory(c);
    return (
      <button aria-pressed={category === c} className={styles.chip} disabled={n === 0 && category !== c} key={c} onClick={() => setCategory(c)} type="button">
        {c} <small>{n}</small>
      </button>
    );
  };

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
    if ((e.target as HTMLElement).tagName === "VIDEO") return; // let the video controls work
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

  if (all.length === 0) {
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
      {/* ---------------- Filters ---------------- */}
      <section aria-label="Filter the photographs" className={styles.filters}>
        <div className={styles.range}>
          <label>
            <span>Year</span>
            <select onChange={(e) => setYear(e.target.value)} value={year}>
              <option value="">All years</option>
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span>Month</span>
            <select onChange={(e) => setMonth(e.target.value)} value={month}>
              <option value="">All months</option>
              {MONTHS.map((m, n) => (
                <option key={m} value={String(n + 1).padStart(2, "0")}>
                  {m}
                </option>
              ))}
            </select>
          </label>
          {filtered && (
            <button className={styles.reset} onClick={reset} type="button">
              Clear filters
            </button>
          )}
        </div>
        <div aria-label="Categories" className={styles.chips} role="group">
          <button aria-pressed={category === "all"} className={styles.chip} onClick={() => setCategory("all")} type="button">
            All <small>{all.filter(inRange).length}</small>
          </button>
        </div>
        <div aria-label="Donation categories" className={styles.chipGroup} role="group">
          <p className={styles.chipLabel}>Donations · दानम्</p>
          <div className={styles.chips}>{DONATION_CATEGORIES.map(chip)}</div>
        </div>
        <div aria-label="Activity categories" className={styles.chipGroup} role="group">
          <p className={styles.chipLabel}>Campus &amp; community</p>
          <div className={styles.chips}>{ACTIVITY_CATEGORIES.map(chip)}</div>
        </div>
      </section>

      {/* ---------------- Stamp-sized photographs ---------------- */}
      <section aria-labelledby="all-photos" className={styles.allSection}>
        <div className={styles.allHead}>
          <h2 id="all-photos">{category === "all" ? "All photographs" : category}</h2>
          <span aria-live="polite">
            {count} {count === 1 ? "photo" : "photos"}
          </span>
        </div>
        {count === 0 ? (
          <p className={styles.none}>No photographs match these filters. Try another category, or choose “All years” and “All months”.</p>
        ) : (
          <ul className={styles.stamps}>
            {images.map((img, i) => (
              <li key={img.src}>
                <button aria-label={`Open ${img.kind === "video" ? "video" : "photo"}: ${img.title} (${monthLabel(img.date)})`} className={styles.stamp} onClick={() => setLightbox(i)} title={`${img.title} · ${monthLabel(img.date)}`} type="button">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img alt="" height={120} loading="lazy" src={thumbOf(img)} width={120} />
                  {img.kind === "video" && <span aria-hidden="true" className={styles.play}>▶</span>}
                </button>
              </li>
            ))}
          </ul>
        )}
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
            {current.kind === "video" ? (
              <video aria-label={current.description} className={styles.lbImage} controls key={current.src} playsInline poster={current.poster} preload="metadata" src={current.src} />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img alt={current.description} className={styles.lbImage} draggable={false} key={current.src}
                src={current.src}
                style={{ transform: dragX ? `translateX(${dragX}px)` : undefined, transition: dragX ? "none" : undefined }} />
            )}
            {count > 1 && (
              <button aria-label="Next photo" className={`${styles.lbNav} ${styles.lbNext}`} onClick={() => step(1)} type="button"><Chevron dir="right" /></button>
            )}
          </div>

          <p aria-live="polite" className={styles.lbCaption}>
            <strong>{current.title}</strong>
            <span>{current.category} · {monthLabel(current.date)}</span>
            <span>{current.description}</span>
          </p>

          {count > 1 && (
            <div className={styles.thumbs}>
              {images.map((img, i) => (
                <button aria-current={i === lightbox} aria-label={`Show photo ${i + 1}`} className={styles.thumb} data-thumb={i} key={img.src} onClick={() => setLightbox(i)} type="button">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img alt="" loading="lazy" src={thumbOf(img)} />
                </button>
              ))}
            </div>
          )}
          {/* preload neighbours for instant arrow navigation */}
          {count > 1 && (
            <div hidden>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="" src={thumbOf(images[(lightbox + 1) % count])} />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="" src={thumbOf(images[(lightbox - 1 + count) % count])} />
            </div>
          )}
        </div>
      )}
    </>
  );
}
