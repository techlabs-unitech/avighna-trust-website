import { ganeshaSvgInner, ganeshaViewBox } from "@/content/ganesha-svg";
import styles from "./ganesha-emblem.module.css";

/**
 * The Trust's Om–Ganesha–blessing-hand emblem (from om-ganesha-hand-logo.svg), drawn in temple gold.
 *
 * Motion is deliberately devotional rather than mechanical — nothing spins:
 *  • the whole emblem floats very slowly, like a lamp held up in offering,
 *  • a halo behind it breathes like the glow of a diya,
 *  • the lit fingers of the blessing hand lift and glow in turn.
 * All motion stops when the visitor prefers reduced motion.
 */
export function GaneshaEmblem({ className }: { className?: string }) {
  return (
    <div className={`${styles.emblem} ${className ?? ""}`}>
      <span aria-hidden="true" className={styles.halo} />
      <span aria-hidden="true" className={styles.haloRing} />
      <div className={styles.float}>
        <svg
          aria-label="Om with Lord Ganesha and a blessing hand — the emblem of Avighna Trust"
          className={styles.svg}
          role="img"
          viewBox={ganeshaViewBox}
          xmlns="http://www.w3.org/2000/svg"
          dangerouslySetInnerHTML={{ __html: ganeshaSvgInner }}
        />
      </div>
    </div>
  );
}
