"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./site-interactions.module.css";

const galleryItems = [
  { id: "vedic-learning", title: "Vedic learning", category: "Learning", symbol: "॥" },
  { id: "sanskrit-study", title: "Sanskrit study", category: "Language", symbol: "अ" },
  { id: "spiritual-service", title: "Spiritual service", category: "Service", symbol: "दीप" },
  { id: "community", title: "Community", category: "Community", symbol: "सेवा" },
  { id: "traditional-arts", title: "Traditional arts", category: "Learning", symbol: "कला" },
  { id: "festivals", title: "Festivals", category: "Community", symbol: "ॐ" },
];

const filters = ["All", "Learning", "Language", "Service", "Community"];

export function GalleryExplorer() {
  const [filter, setFilter] = useState("All");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);

  const visibleItems = useMemo(
    () =>
      filter === "All"
        ? galleryItems
        : galleryItems.filter((item) => item.category === filter),
    [filter],
  );
  const selectedIndex = visibleItems.findIndex((item) => item.id === selectedId);
  const selectedItem = selectedIndex < 0 ? null : visibleItems[selectedIndex];

  useEffect(() => {
    if (!selectedItem) return;

    closeRef.current?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedId(null);
        requestAnimationFrame(() => triggerRef.current?.focus());
      } else if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
        event.preventDefault();
        const direction = event.key === "ArrowRight" ? 1 : -1;
        const nextIndex = (selectedIndex + direction + visibleItems.length) % visibleItems.length;
        setSelectedId(visibleItems[nextIndex].id);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [selectedId, selectedIndex, selectedItem, visibleItems]);

  function closeDialog() {
    setSelectedId(null);
    requestAnimationFrame(() => triggerRef.current?.focus());
  }

  function moveSelection(direction: -1 | 1) {
    if (selectedIndex < 0 || visibleItems.length < 2) return;
    const nextIndex = (selectedIndex + direction + visibleItems.length) % visibleItems.length;
    setSelectedId(visibleItems[nextIndex].id);
  }

  return (
    <>
      <div className={styles.toolbar} aria-label="Filter gallery illustrations">
        {filters.map((item) => (
          <button
            aria-pressed={filter === item}
            className={styles.filterButton}
            key={item}
            onClick={() => {
              setFilter(item);
              setSelectedId(null);
            }}
            type="button"
          >
            {item}
          </button>
        ))}
      </div>
      <div className={styles.galleryGrid}>
        {visibleItems.map((item) => (
          <button
            aria-haspopup="dialog"
            className={styles.galleryCard}
            key={item.id}
            onClick={(event) => {
              triggerRef.current = event.currentTarget;
              setSelectedId(item.id);
            }}
            type="button"
          >
            <span className={styles.galleryArt} aria-hidden="true">
              <span>{item.symbol}</span>
            </span>
            <span className={styles.galleryCardTitle}>
              {item.title}
              <span aria-hidden="true">↗</span>
            </span>
            <small>{item.category} · illustrative artwork, not an institutional photograph</small>
          </button>
        ))}
      </div>
      <p className={styles.disclaimer}>
        No campus, student, ritual or event photographs have been supplied.
        These abstract illustrations are placeholders, not documentary images.
      </p>
      {selectedItem && (
        <div
          className={styles.dialogBackdrop}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeDialog();
          }}
        >
          <section
            aria-labelledby="gallery-dialog-title"
            aria-modal="true"
            className={styles.dialog}
            onKeyDown={(event) => {
              if (event.key !== "Tab") return;
              const focusable = Array.from(
                event.currentTarget.querySelectorAll<HTMLButtonElement>("button:not(:disabled)"),
              );
              const first = focusable[0];
              const last = focusable[focusable.length - 1];
              if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last?.focus();
              } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first?.focus();
              }
            }}
            role="dialog"
          >
            <button
              aria-label="Close gallery preview"
              className={styles.dialogClose}
              onClick={closeDialog}
              ref={closeRef}
              type="button"
            >
              ×
            </button>
            <div className={styles.dialogArt} aria-hidden="true">
              <span>{selectedItem.symbol}</span>
            </div>
            <div className={styles.dialogCaption}>
              <span>
                <strong id="gallery-dialog-title">{selectedItem.title}</strong>
                <br />
                Illustrative artwork only—not a photograph of the institution.
              </span>
              <span className={styles.dialogControls}>
                <button
                  aria-label="Previous gallery illustration"
                  className={styles.calendarButton}
                  onClick={() => moveSelection(-1)}
                  type="button"
                >
                  ←
                </button>
                <button
                  aria-label="Next gallery illustration"
                  className={styles.calendarButton}
                  onClick={() => moveSelection(1)}
                  type="button"
                >
                  →
                </button>
              </span>
            </div>
          </section>
        </div>
      )}
    </>
  );
}
