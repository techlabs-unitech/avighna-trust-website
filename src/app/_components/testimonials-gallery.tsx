"use client";

import { useEffect, useRef, useState } from "react";
import type { Testimonial } from "../testimonials/data";
import styles from "./testimonials-gallery.module.css";

const filters = ["All", "Videos", "Photos"] as const;
type Filter = (typeof filters)[number];

export function TestimonialsGallery({ items }: { items: Testimonial[] }) {
  const [filter, setFilter] = useState<Filter>("All");
  const [openId, setOpenId] = useState<string | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);

  const visible = items.filter(
    (i) => filter === "All" || (filter === "Videos" ? i.type === "video" : i.type === "image"),
  );
  const open = items.find((i) => i.id === openId && i.type === "image" && i.src) ?? null;

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenId(null);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <div className={styles.toolbar} role="group" aria-label="Filter testimonials">
        {filters.map((f) => (
          <button
            aria-pressed={filter === f}
            className={styles.filter}
            key={f}
            onClick={() => setFilter(f)}
            type="button"
          >
            {f}
          </button>
        ))}
      </div>

      <div className={styles.grid}>
        {visible.map((item) => (
          <article className={styles.card} key={item.id}>
            <div className={styles.media}>
              {!item.src ? (
                <div className={styles.pending} role="img" aria-label={`${item.type} to be uploaded`}>
                  <span aria-hidden="true">{item.type === "video" ? "▶" : "▣"}</span>
                  <small>{item.type === "video" ? "Video" : "Photo"} to be uploaded</small>
                </div>
              ) : item.type === "video" ? (
                <video controls playsInline preload="metadata" poster={item.poster} src={item.src}>
                  Your browser does not support embedded video.
                </video>
              ) : (
                <button
                  aria-label={`Enlarge photo: ${item.title}`}
                  className={styles.imageButton}
                  onClick={() => setOpenId(item.id)}
                  type="button"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img alt={item.title} loading="lazy" src={item.src} />
                </button>
              )}
              <span className={styles.badge}>{item.type === "video" ? "Video" : "Photo"}</span>
            </div>
            <div className={styles.body}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <footer>
                <strong>{item.name}</strong>
                {item.role && <span>{item.role}</span>}
              </footer>
            </div>
          </article>
        ))}
      </div>

      {open && (
        <div className={styles.lightbox} role="dialog" aria-modal="true" aria-label={open.title} onClick={() => setOpenId(null)}>
          <div className={styles.lightboxInner} onClick={(e) => e.stopPropagation()}>
            <button className={styles.close} onClick={() => setOpenId(null)} ref={closeRef} type="button" aria-label="Close photo">
              ×
            </button>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt={open.title} src={open.src} />
            <p>
              <strong>{open.name}</strong>
              {open.role ? ` · ${open.role}` : ""} — {open.description}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
