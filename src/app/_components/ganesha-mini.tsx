import { pictures } from "./ganesha-strip";
import styles from "./ganesha-mini.module.css";

/**
 * A small band of Ganesha and Sage pictures (two Ganesha, then one Guru, repeating — the same order as the header strip) that drifts slowly under the footer logo.
 * The row is drawn twice and slid by exactly one row's width, so it never jumps.
 * It pauses on hover, and stops (but can be scrolled by hand) for visitors who prefer reduced motion.
 */
export function GaneshaMini() {
  return (
    <div aria-label="Pictures of Lord Ganesha and revered Sages" className={styles.viewport} role="group">
      <div className={styles.track}>
        {[0, 1].map((copy) => (
          <ul aria-hidden={copy === 1 || undefined} className={styles.set} key={copy}>
            {pictures.map((p, i) => (
              <li className={styles.tile} key={`${copy}-${i}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img alt={copy === 0 ? p.alt : ""} draggable={false} height={56} loading="lazy" src={p.src} style={p.sage ? { objectPosition: "50% 18%" } : undefined} width={56} />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
