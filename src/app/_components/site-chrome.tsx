import Image from "next/image";
import Link from "next/link";
import { HeaderNav } from "./header-nav";
import { brand } from "./site-data";
import { SocialLinks } from "./social-links";
import { SubmissionForm } from "./submission-form";
import { imageCredits } from "@/content/images";
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
    </>
  );
}

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.main}>
        <div className={styles.brandCol}>
          <Link aria-label={`${brand.pathashala} home`} className={styles.logoLink} href="/">
            <span className={styles.logoFrame}>
              <Image alt="Avighna Foundation logo" className={styles.logo} height={brand.logoHeight} src={brand.logoSrc} width={brand.logoWidth} />
            </span>
            <span className={styles.brandText}>
              <strong>{brand.pathashala}</strong>
              <small>{brand.trust}</small>
            </span>
          </Link>
          <p className={styles.tagline}>
            Preserving the eternal wisdom of the Vedas. Nurturing values. Inspiring future generations — with education, food, healthcare and
            spiritual guidance offered free of cost.
          </p>

          <div>
            <p className={styles.followLabel}>Follow us</p>
            <SocialLinks className={styles.social} label="Social media" linkClassName={styles.socialLink} />
          </div>

          <div className={styles.newsletter}>
            <h2>Newsletter</h2>
            <p>Receive news of festivals, pilgrimages and classes.</p>
            <SubmissionForm type="newsletter" />
          </div>
        </div>

        <div className={styles.col}>
          <h2>Tradition</h2>
          <Link href="/our-story">Our Story · अस्माकं कथा</Link>
          <Link href="/ritual">Ritual · सेवा</Link>
          <Link href="/ritual/puja">Pūjā</Link>
          <Link href="/ritual/homa">Homa</Link>
          <Link href="/ritual/yagna">Yajña</Link>
          <Link href="/pilgrimage">Pilgrimage · तीर्थयात्रा</Link>
        </div>
        <div className={styles.col}>
          <h2>Learn &amp; live</h2>
          <Link href="/knowledge-centre">Knowledge Centre · गुरुकुलम्</Link>
          <Link href="/knowledge-centre/vedavani-pathashala">Vedavāṇī Pāṭhaśālā</Link>
          <Link href="/knowledge-centre/granthalayam">Granthālayam</Link>
          <Link href="/knowledge-centre/e-jnana-kendram">E-Jñāna-kendram</Link>
          <Link href="/retired-living">Retired Living · वृद्धाश्रम</Link>
          <Link href="/gallery">Gallery · वीथिका</Link>
        </div>
        <div className={styles.col}>
          <h2>Take part</h2>
          <Link href="/donation">Donation · दानम्</Link>
          <Link href="/donation/annadanam">Annadānam</Link>
          <Link href="/donation/vidyadanam">Vidyādānam</Link>
          <Link href="/volunteers">Volunteers · स्वयंसेवकाः</Link>
          <Link href="/contact">Contact · सम्पर्कः</Link>
        </div>
        <div className={styles.col}>
          <h2>Visiting hours</h2>
          <p>
            <strong>Office</strong>
            <br />
            Mon–Sat, 9:00 AM – 5:30 PM
          </p>
          <p>
            <strong>Temple</strong>
            <br />
            5:00 AM – 12:00 PM
            <br />
            4:00 PM – 8:30 PM
          </p>
        </div>
      </div>
      <div className={styles.bottom}>
        <span>© {brand.trust} · {brand.pathashala}</span>
        <span lang="sa">॥ ईशावास्यमिदं सर्वम् ॥</span>
        <span className={styles.policies}>
          <Link href="/privacy-policy">Privacy</Link>
          <Link href="/terms-and-conditions">Terms</Link>
          <Link href="/donation-refund-policy">Donation &amp; refund</Link>
        </span>
      </div>
      <details className={styles.credits}>
        <summary>Photograph credits</summary>
        <p>
          Placeholder photographs, to be replaced with the Trust’s own: {imageCredits.join(" · ")}. Wikimedia Commons images are used under their
          respective free licences.
        </p>
      </details>
    </footer>
  );
}
