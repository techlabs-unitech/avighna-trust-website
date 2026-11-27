"use client";

import { useId, useState } from "react";
import styles from "./page-shell.module.css";

type Props = {
  src: string;
  alt: string;
  name: string;
  sa?: string;
  caption?: string;
  paragraphs: string[];
};

/** A Guru's portrait with the first paragraph shown and the rest opened by "Know more…". */
export function GuruFeature({ src, alt, name, sa, caption, paragraphs }: Props) {
  const [open, setOpen] = useState(false);
  const [missing, setMissing] = useState(false);
  const id = useId();
  const [first, ...rest] = paragraphs;

  return (
    <figure className={styles.feature}>
      <div className={styles.featureArch}>
        {missing ? (
          <span aria-hidden="true" lang="sa" style={{ display: "grid", width: "100%", aspectRatio: "576 / 868", placeItems: "center", fontSize: "4rem", color: "#b8860b", background: "#f3e6c3" }}>
            ॐ
          </span>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img alt={alt} draggable={false} height={868} loading="lazy" onError={() => setMissing(true)} src={src} width={576} />
        )}
      </div>
      <figcaption className={styles.featureBody}>
        {sa && (
          <span className={styles.featureSa} lang="sa">
            {sa}
          </span>
        )}
        <h3>{name}</h3>
        {caption && <small>{caption}</small>}
        <p>{first}</p>
        {rest.length > 0 && (
          <>
            <div className={styles.featureMore} hidden={!open} id={id}>
              {rest.map((t) => (
                <p key={t}>{t}</p>
              ))}
            </div>
            <button aria-controls={id} aria-expanded={open} className={styles.knowMore} onClick={() => setOpen((o) => !o)} type="button">
              {open ? "Show less" : "Know more…"}
            </button>
          </>
        )}
      </figcaption>
    </figure>
  );
}
