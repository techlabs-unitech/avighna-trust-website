"use client";

import { useState } from "react";
import { images, type ImageKey } from "@/content/images";
import styles from "./photo.module.css";

/**
 * A photograph from the central image registry. If the picture cannot load, a warm panel with a
 * Devanagari glyph is shown instead, so a slot is never empty or broken.
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
  const [failed, setFailed] = useState(false);
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
          onError={() => setFailed(true)}
          src={img.src(width)}
          style={{ objectPosition: img.focus }}
        />
      )}
    </span>
  );
}
