import Image from "next/image";
import Link from "next/link";
import { HeaderNav } from "./header-nav";
import { GaneshaStrip } from "./ganesha-strip";
import { GaneshaMini } from "./ganesha-mini";
import { brand } from "./site-data";
import { SocialLinks } from "./social-links";
import { SubmissionForm } from "./submission-form";
import { menu } from "@/content/menu";
import headerStyles from "./site-header.module.css";
import styles from "./site-footer.module.css";

export function SiteHeader({ activePath }: { activePath: string }) {
  return (
    <>
      <a className={headerStyles.skipLink} href="#main">
        Skip to content
      </a>
      <div className={headerStyles.announcement}>
        <span className={headerStyles.announcementDot} aria-hidden="true" />
        <span lang="sa">॥ अविघ्नमस्तु ॥</span>
        <span>May every good work be free of obstacles.</span>
        <Link href="/our-story">Our story →</Link>
      </div>
      <HeaderNav activePath={activePath} />
      <GaneshaStrip />
    </>
  );
}

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.main}>
        {/* Logo, with a small slider of Ganesha pictures beneath it */}
        <div className={styles.brandCol}>
          <Link aria-label={`${brand.trust} — ${brand.pathashala} home`} className={styles.logoLink} href="/">
            <Image alt="Avighna Foundation logo" className={styles.logo} height={brand.logoHeight} sizes="280px" src={brand.logoSrc} width={brand.logoWidth} />
          </Link>
          <GaneshaMini />
        </div>

        {/* Quick links — the same pages as the main menu */}
        <nav aria-label="Quick links" className={styles.col}>
          <h2>Quick links</h2>
          <ul className={`${styles.links} ${styles.linksTwo}`}>
            {menu.map((m) => (
              <li key={m.href}>
                <Link href={m.href}>
                  {m.label}
                  <span lang="sa">{m.sa}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Take part" className={styles.col}>
          <h2>Take part</h2>
          <ul className={styles.links}>
            <li>
              <Link href="/donation">
                Donation<span lang="sa">दानम्</span>
              </Link>
            </li>
            <li>
              <Link href="/donation/annadanam">Anna Dhaanam</Link>
            </li>
            <li>
              <Link href="/donation/vidyadanam">Vidya Dhaanam</Link>
            </li>
            <li>
              <Link href="/volunteers">
                Volunteers<span lang="sa">स्वयंसेवकाः</span>
              </Link>
            </li>
            <li>
              <Link href="/contact">
                Contact<span lang="sa">सम्पर्कः</span>
              </Link>
            </li>
          </ul>
        </nav>

        {/* Newsletter (right) with the social links beneath */}
        <div className={styles.newsletter}>
          <h2>Subscribe to our newsletter</h2>
          <SubmissionForm type="newsletter" />
          <div className={styles.follow}>
            <p className={styles.followLabel}>Follow us</p>
            <SocialLinks className={styles.social} label="Social media" linkClassName={styles.socialLink} />
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <span>© 2026 Avighna Foundation · All Rights Reserved</span>
        <span lang="sa">॥ ईशावास्यमिदं सर्वम् ॥</span>
        <span className={styles.policies}>
          <Link href="/privacy-policy">Privacy</Link>
          <Link href="/terms-and-conditions">Terms</Link>
        </span>
      </div>
      <details className={styles.disclaimer}>
        <summary>Image disclaimer</summary>
        <p>Some photographs and illustrations on this website are used for illustration and belong to their respective owners and creators, to whom all credit is due. The Trust claims no ownership of such images, and will gladly correct or remove any on request.</p>
      </details>
    </footer>
  );
}
