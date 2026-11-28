"use client";

import { useCallback, useEffect, useRef, useState, type PointerEvent } from "react";
import type { GalleryImage } from "@/lib/gallery-images";
import { CATEGORY_INFO, GALLERY_CATEGORIES, categorySlug } from "@/lib/gallery-categories";
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

/** How many stamp-sized pictures a category shows before "See more". */
const PREVIEW = 5;

export function PhotoGallery({ images: all }: { images: GalleryImage[] }) {
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  /** Categories whose full set of pictures is open. */
  const [open, setOpen] = useState<Record<string, boolean>>({});
  /** The picture open in the viewer: its category and its place in that category. */
  const [lightbox, setLightbox] = useState<{ cat: string; i: number } | null>(null);

  /* ---------- Filters: year + month ---------- */
  const years = Array.from(new Set(all.map((i) => i.date.slice(0, 4)))).sort().reverse();
  const inRange = (i: GalleryImage) => (!year || i.date.slice(0, 4) === year) && (!month || i.date.slice(5, 7) === month);
  const filtered = year !== "" || month !== "";

  // One group per category, in the Trust's order; categories with no pictures wait for later.
  const groups = GALLERY_CATEGORIES.map((c) => ({ cat: c as string, items: all.filter((i) => i.category === c && inRange(i)) }));
  const shown = groups.filter((g) => g.items.length > 0);
  const waiting = groups.filter((g) => g.items.length === 0);

  function reset() {
    setYear("");
    setMonth("");
  }

  /* ---------- Lightbox (moves within one category) ---------- */
  const lbImages = lightbox ? groups.find((g) => g.cat === lightbox.cat)?.items ?? [] : [];
  const count = lbImages.length;

  const step = useCallback(
    (dir: -1 | 1) => setLightbox((l) => (l && count ? { cat: l.cat, i: (l.i + dir + count) % count } : l)),
    [count],
  );

  const lbOpen = lightbox !== null;
  const lbIndex = lightbox?.i ?? 0;

  useEffect(() => {
    if (!lbOpen) return;
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
  }, [lbOpen, step]);

  // Keep the active thumbnail in view
  useEffect(() => {
    if (!lbOpen) return;
    document.querySelector<HTMLElement>(`[data-thumb="${lbIndex}"]`)?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
  }, [lbOpen, lbIndex]);

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

  const current = lightbox ? lbImages[lightbox.i] : undefined;

  return (
    <>
      {/* ---------------- Filters and a quick way to each category ---------------- */}
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
        {shown.length > 0 && (
          <nav aria-label="Jump to a category" className={styles.chipGroup}>
            <p className={styles.chipLabel}>Jump to a category</p>
            <div className={styles.chips}>
              {shown.map((g) => (
                <a className={styles.chip} href={`#${categorySlug(g.cat)}`} key={g.cat}>
                  {g.cat} <small>{g.items.length}</small>
                </a>
              ))}
            </div>
          </nav>
        )}
      </section>

      {/* ---------------- One block per category: write-up, five stamps, then "See more" ---------------- */}
      {shown.length === 0 ? (
        <p className={styles.none}>No photographs match these filters. Try another year or month, or choose “All years” and “All months”.</p>
      ) : (
        shown.map((g) => {
          const id = categorySlug(g.cat);
          const info = CATEGORY_INFO[g.cat];
          const isOpen = !!open[g.cat];
          const visible = isOpen ? g.items : g.items.slice(0, PREVIEW);
          const more = g.items.length - PREVIEW;
          return (
            <section aria-labelledby={`${id}-title`} className={styles.catSection} id={id} key={g.cat}>
              <header className={styles.catHead}>
                {info?.sa && (
                  <span className={styles.catSa} lang="sa">
                    {info.sa}
                  </span>
                )}
                <h2 id={`${id}-title`}>{g.cat}</h2>
                <span className={styles.catCount}>
                  {g.items.length} {g.items.length === 1 ? "photo" : "photos"}
                </span>
              </header>
              {info && <p className={styles.blurb}>{info.blurb}</p>}

              <ul className={styles.stamps} id={`${id}-stamps`}>
                {visible.map((img, i) => (
                  <li key={img.src}>
                    <button
                      aria-label={`Open ${img.kind === "video" ? "video" : "photo"}: ${img.title} (${monthLabel(img.date)})`}
                      className={styles.stamp}
                      onClick={() => setLightbox({ cat: g.cat, i })}
                      title={`${img.title} · ${monthLabel(img.date)}`}
                      type="button"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img alt="" height={120} loading="lazy" src={thumbOf(img)} width={120} />
                      {img.kind === "video" && (
                        <span aria-hidden="true" className={styles.play}>
                          ▶
                        </span>
                      )}
                    </button>
                  </li>
                ))}
              </ul>

              {more > 0 && (
                <button
                  aria-controls={`${id}-stamps`}
                  aria-expanded={isOpen}
                  className={styles.more}
                  onClick={() => setOpen((o) => ({ ...o, [g.cat]: !o[g.cat] }))}
                  type="button"
                >
                  <span aria-hidden="true" className={styles.moreArrow} data-open={isOpen || undefined}>
                    <Chevron dir="right" />
                  </span>
                  {isOpen ? "Show fewer" : `See more · ${more} more ${more === 1 ? "photo" : "photos"}`}
                </button>
              )}
            </section>
          );
        })
      )}

      {/* ---------------- Categories still waiting for their photographs ---------------- */}
      {!filtered && waiting.length > 0 && (
        <section aria-labelledby="soon-title" className={styles.soon}>
          <h2 id="soon-title">More to come</h2>
          <p className={styles.soonLead}>Photographs for these categories will be added soon.</p>
          <ul className={styles.soonGrid}>
            {waiting.map((g) => (
              <li key={g.cat}>
                <strong>{g.cat}</strong>
                {CATEGORY_INFO[g.cat]?.sa && <span lang="sa">{CATEGORY_INFO[g.cat].sa}</span>}
                <p>{CATEGORY_INFO[g.cat]?.blurb}</p>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* ---------------- Lightbox ---------------- */}
      {current && lightbox && (
        <div aria-label="Photo viewer" aria-modal="true" className={styles.lightbox} role="dialog">
          <div className={styles.lbTop}>
            <span className={styles.lbCount}>{lightbox.cat} · {lightbox.i + 1} / {count}</span>
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
              {lbImages.map((img, i) => (
                <button aria-current={i === lightbox.i} aria-label={`Show photo ${i + 1}`} className={styles.thumb} data-thumb={i} key={img.src} onClick={() => setLightbox({ cat: lightbox.cat, i })} type="button">
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
              <img alt="" src={thumbOf(lbImages[(lightbox.i + 1) % count])} />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="" src={thumbOf(lbImages[(lightbox.i - 1 + count) % count])} />
            </div>
          )}
        </div>
      )}
    </>
  );
}
