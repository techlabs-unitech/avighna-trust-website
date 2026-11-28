"use client";

import { useState } from "react";
import { images, type ImageKey } from "@/content/images";
import styles from "./photo.module.css";

/**
 * A photograph from the central image registry. If a picture cannot load the next candidate is
 * tried; if none load, a warm panel with a Devanagari glyph is shown, so a slot is never empty or broken.
 */
export function Photo({
  name,
  width = 900,
  className,
  alt,
  priority = false,
}: {
  name: ImageKey;
  width?: number;
  className?: string;
  /** Pass "" for purely decorative images */
  alt?: string;
  priority?: boolean;
}) {
  const img = images[name];
  const [attempt, setAttempt] = useState(0);
  const candidates = img.srcs(width);
  const failed = attempt >= candidates.length;
  return (
    <span className={`${styles.photo} ${className ?? ""}`}>
      <span aria-hidden="true" className={styles.glyph} lang="sa">
        {img.glyph}
      </span>
      {!failed && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          alt={alt ?? img.alt}
          className={styles.img}
          draggable={false}
          loading={priority ? "eager" : "lazy"}
          key={attempt}
          onError={() => setAttempt((a) => a + 1)}
          src={candidates[attempt]}
          style={{ objectPosition: img.focus }}
        />
      )}
    </span>
  );
}
