import { socialLinks } from "./site-data";
import { socialIcons } from "./social-links";
import styles from "./social-rail.module.css";

/**
 * Vertical social-media rail fixed to the right edge. Each icon sits on a palm-leaf tab;
 * on hover or keyboard focus the tab slides out to the left and shows the full network name.
 */
export function SocialRail() {
  return (
    <ul aria-label="Social media" className={styles.rail}>
      {socialLinks.map(({ platform, label, href }) => {
        const external = href.startsWith("http");
        return (
          <li key={platform}>
            <a
              aria-label={label}
              className={styles.tab}
              data-platform={platform}
              href={href}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              <span className={styles.name}>{label}</span>
              <span className={styles.icon}>{socialIcons[platform]}</span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
