import { ganeshaSvgInner, ganeshaViewBox } from "@/content/ganesha-svg";
import styles from "./om-emblem.module.css";

/**
 * The Trust's Om–Ganesha–blessing-hand emblem (the same artwork as the floating hero emblem), made reusable
 * for every divider on the site.
 *
 * The 25 KB of path data is written into the page ONCE, as a hidden sprite (<OmSprite /> in the root layout).
 * Each divider then just points at it with <use>, so adding more dividers costs a few bytes each.
 */
const gradientDefs = (ganeshaSvgInner.match(/<defs>[\s\S]*?<\/defs>/) ?? [""])[0]
  .replace(/emGold/g, "omDivGold")
  .replace(/emLight/g, "omDivLight");

const artwork = ganeshaSvgInner
  .replace(/<defs>[\s\S]*?<\/defs>/, "")
  .replace(/emGold/g, "omDivGold")
  .replace(/emLight/g, "omDivLight")
  .replace(/ id="logo"/, "");

const SYMBOL_ID = "om-emblem-symbol";

/** Renders the shared emblem artwork once. Keep it mounted in the root layout. */
export function OmSprite() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      height="0"
      style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}
      width="0"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g dangerouslySetInnerHTML={{ __html: gradientDefs }} />
      <symbol id={SYMBOL_ID} viewBox={ganeshaViewBox} dangerouslySetInnerHTML={{ __html: artwork }} />
    </svg>
  );
}

/** The emblem at any size — set width/height from CSS (aspect ratio 249 : 288). */
export function OmEmblem({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} focusable="false" viewBox={ganeshaViewBox}>
      <use href={`#${SYMBOL_ID}`} />
    </svg>
  );
}

/** A divider line with the emblem at its centre. Colour of the lines follows `color` (currentColor). */
export function OmDivider({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={className}>
      <span className={styles.row}>
        <i className={`${styles.line} ${styles.lineLeft}`} />
        <OmEmblem className={styles.emblem} />
        <i className={`${styles.line} ${styles.lineRight}`} />
      </span>
    </div>
  );
}
