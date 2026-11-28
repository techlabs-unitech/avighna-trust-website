import { existsSync } from "node:fs";
import { join } from "node:path";
import styles from "./ganesha-strip.module.css";

/** Ganesha pictures — /public/images/ganesha/ (ganesha-01.jpg … ganesha-25.jpg/png). */
const COUNT = 25;
export const ganesha = Array.from({ length: COUNT }, (_, i) => {
  const num = String(i + 1).padStart(2, "0");
  // Try .png first for images 19-20, otherwise use .jpg
  const ext = (i === 18 || i === 19) ? ".png" : ".jpg"; // ganesha-19 (index 18) and ganesha-20 (index 19) are .png
  const src = `/images/ganesha/ganesha-${num}${ext}`;
  return {
    src,
    alt: `Lord Ganesha — picture ${i + 1} of ${COUNT}`,
    sage: false,
  };
}).filter((g) => existsSync(join(process.cwd(), "public", g.src)));

/**
 * Sages and Gurus shown between the Ganesha pictures (same pictures as Guru Smaraṇam, in /public/images/gurus/).
 * To add another, put the photo in that folder and add one line here. A listed file that is not in the folder yet is skipped.
 */
const sages = [
  { src: "/images/gurus/kanchi-1.jpg", alt: "Kanchi Maha Periyava" },
  { src: "/images/gurus/kanchi-2.png", alt: "Kanchi Maha Periyava" },
  { src: "/images/gurus/kanchi-3.png", alt: "Kanchi Maha Periyava" },
  { src: "/images/gurus/bharati-tirtha-1.jpg", alt: "Sri Bharati Tirtha Mahaswamiji of Sringeri" },
  { src: "/images/gurus/bharati-tirtha-2.png", alt: "Sri Bharati Tirtha Mahaswamiji of Sringeri" },
  { src: "/images/gurus/bharati-tirtha-3.png", alt: "Sri Bharati Tirtha Mahaswamiji of Sringeri" },
  { src: "/images/gurus/ramana-maharshi-1.jpg", alt: "Sri Ramana Maharshi" },
  { src: "/images/gurus/ramana-maharshi-2.png", alt: "Sri Ramana Maharshi" },
  { src: "/images/gurus/ramana-maharshi-3.png", alt: "Sri Ramana Maharshi" },
  { src: "/images/gurus/shiridi-sai-1.png", alt: "Shirdi Sai Baba" },
  { src: "/images/gurus/shiridi-sai-2.png", alt: "Shirdi Sai Baba" },
  { src: "/images/gurus/shiridi-sai-3.png", alt: "Shirdi Sai Baba" },
]
  .filter((g) => existsSync(join(process.cwd(), "public", g.src)))
  .map((g) => ({ ...g, sage: true }));

/** Ganesha and Sages woven into one row: 2 Ganesha pictures followed by 1 Guru picture, repeating. */
export const pictures = (() => {
  if (sages.length === 0) return ganesha;
  const out: typeof ganesha = [];
  let ganeshaCount = 0;
  let sageIndex = 0;

  for (const g of ganesha) {
    out.push(g);
    ganeshaCount++;
    // After every 2 Ganesha images, insert a Guru image if available
    if (ganeshaCount === 2 && sageIndex < sages.length) {
      out.push(sages[sageIndex++]);
      ganeshaCount = 0;
    }
  }

  // If there are remaining Guru images after all Ganesha images, append them
  while (sageIndex < sages.length) {
    out.push(sages[sageIndex++]);
  }

  return out;
})();

/**
 * A band of Ganesha and Sage pictures that drifts slowly from right to left, under the menu on every page.
 * The row is drawn twice and slid by exactly one row's width, so it never jumps. It pauses on hover,
 * and for visitors who prefer reduced motion it stops and can be scrolled by hand.
 */
export function GaneshaStrip() {
  return (
    <section aria-label="Pictures of Lord Ganesha and revered Sages" className={styles.strip}>
      <div className={styles.viewport}>
        <div className={styles.track}>
          {[0, 1].map((copy) => (
            <ul aria-hidden={copy === 1 || undefined} className={styles.set} key={copy}>
              {pictures.map((p, i) => (
                <li className={styles.tile} key={`${copy}-${i}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img alt={copy === 0 ? p.alt : ""} draggable={false} height={112} loading={copy === 0 && i < 6 ? "eager" : "lazy"} src={p.src} style={p.sage ? { objectPosition: "50% 18%" } : undefined} width={112} />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
