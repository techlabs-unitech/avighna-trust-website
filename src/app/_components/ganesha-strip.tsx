import styles from "./ganesha-strip.module.css";

/** The Ganesha pictures in the strip — all of them live in /public/images/ganesha/ (ganesha-01.jpg … ganesha-18.jpg). */
const COUNT = 18;
const pictures = Array.from({ length: COUNT }, (_, i) => `/images/ganesha/ganesha-${String(i + 1).padStart(2, "0")}.jpg`);

/**
 * A band of Ganesha pictures that drifts slowly from right to left, under the menu on every page.
 * The row is drawn twice and slid by exactly one row's width, so it never jumps. It pauses on hover,
 * and for visitors who prefer reduced motion it stops and can be scrolled by hand.
 */
export function GaneshaStrip() {
  return (
    <section aria-label="Pictures of Lord Ganesha" className={styles.strip}>
      <div className={styles.viewport}>
        <div className={styles.track}>
          {[0, 1].map((copy) => (
            <ul aria-hidden={copy === 1 || undefined} className={styles.set} key={copy}>
              {pictures.map((src, i) => (
                <li className={styles.tile} key={`${copy}-${i}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img alt={copy === 0 ? `Lord Ganesha — picture ${i + 1} of ${COUNT}` : ""} draggable={false} height={112} loading={copy === 0 && i < 6 ? "eager" : "lazy"} src={src} width={112} />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
