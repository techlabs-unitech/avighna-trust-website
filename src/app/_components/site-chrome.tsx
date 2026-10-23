import Image from "next/image";
import Link from "next/link";
import { HeaderNav } from "./header-nav";
import { brand } from "./site-data";
import { SocialLinks } from "./social-links";
import { SubmissionForm } from "./submission-form";
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
        <span>Rooted in tradition. Open to the generations ahead.</span>
        <Link href="/about">Discover our purpose →</Link>
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
              <Image alt="Avighna Foundation logo" className={styles.logo} height={443} src={brand.logoSrc} width={753} />
            </span>
            <span className={styles.brandText}>
              <strong>{brand.pathashala}</strong>
              <small>{brand.trust}</small>
            </span>
          </Link>
          <p className={styles.tagline}>
            Preserving the eternal wisdom of the Vedas. Nurturing values. Inspiring future generations.
          </p>
          <span className={styles.provisional}>{brand.relationshipNote}</span>

          <div>
            <p className={styles.followLabel}>Follow us</p>
            <SocialLinks className={styles.social} label="Social media" linkClassName={styles.socialLink} />
          </div>

          <div className={styles.newsletter}>
            <h2>Newsletter</h2>
            <p>Register your interest in future updates.</p>
            <SubmissionForm type="newsletter" />
          </div>
        </div>

        <div className={styles.col}>
          <h2>Explore</h2>
          <Link href="/about">Our purpose</Link>
          <Link href="/programmes">Programmes</Link>
          <Link href="/gurukulam">Gurukulam</Link>
          <Link href="/panchamukhi-shikshana">Panchamukhi Shikshana</Link>
          <Link href="/research">Research &amp; publications</Link>
        </div>
        <div className={styles.col}>
          <h2>In service</h2>
          <Link href="/spiritual-services">Spiritual services</Link>
          <Link href="/community">Community</Link>
          <Link href="/events">Events &amp; activities</Link>
          <Link href="/gallery">Gallery</Link>
          <Link href="/testimonials">Testimonials</Link>
        </div>
        <div className={styles.col}>
          <h2>Take part</h2>
          <Link href="/donate">Support the mission</Link>
          <Link href="/volunteer">Volunteer registration</Link>
          <Link href="/contact">Contact &amp; enquiries</Link>
          <p>Official contact details to be confirmed.</p>
        </div>
        <div className={styles.col}>
          <h2>Policies</h2>
          <Link href="/privacy-policy">Privacy policy</Link>
          <Link href="/terms-and-conditions">Terms &amp; conditions</Link>
          <Link href="/donation-refund-policy">Donation &amp; refund policy</Link>
        </div>
      </div>
      <div className={styles.bottom}>
        <span>© {brand.pathashala}</span>
        <span lang="sa">सर्वे भवन्तु सुखिनः</span>
        <Link href="/">Back to home ↑</Link>
      </div>
    </footer>
  );
}
