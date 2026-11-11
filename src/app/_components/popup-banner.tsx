"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./popup-banner.module.css";

const STORAGE_KEY = "avighna-popup-dismissed";
const SHOW_DELAY_MS = 1500;

/**
 * WIREFRAME ONLY: all text below is placeholder content to be replaced
 * with real announcements (admissions, events, festivals, donation drives).
 */
export function PopupBanner() {
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* storage unavailable: popup may show again on reload */
    }
  }, []);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(STORAGE_KEY)) return;
    } catch {
      /* ignore */
    }
    const id = window.setTimeout(() => setOpen(true), SHOW_DELAY_MS);
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  if (!open) return null;

  return (
    <div className={styles.overlay} onClick={close}>
      <div
        aria-describedby="popup-desc"
        aria-labelledby="popup-title"
        aria-modal="true"
        className={styles.dialog}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
      >
        <button
          aria-label="Close announcement"
          className={styles.close}
          onClick={close}
          ref={closeRef}
          type="button"
        >
          ×
        </button>

        <div className={styles.media} aria-hidden="true">
          <span className={styles.mediaSymbol}>ॐ</span>
          <span className={styles.mediaNote}>Placeholder image · 4:3</span>
        </div>

        <div className={styles.body}>
          <span className={styles.badge}>Announcement · Placeholder</span>
          <h2 id="popup-title">Headline for an important announcement</h2>
          <p id="popup-desc">
            Placeholder text for an upcoming event, admissions notice or festival
            update. Replace this with the Trust’s approved message, dates and details.
          </p>
          <div className={styles.actions}>
            <a className={styles.primary} href="/events" onClick={close}>
              Learn more →
            </a>
            <button className={styles.secondary} onClick={close} type="button">
              Maybe later
            </button>
          </div>
          <span className={styles.footnote}>
            Wireframe popup · content to be provided by the Trust
          </span>
        </div>
      </div>
    </div>
  );
}
