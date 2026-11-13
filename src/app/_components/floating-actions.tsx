"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./floating-actions.module.css";

/** Heart held in an open hand — giving. */
function DonateIcon() {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 10.2c-1.2-1.9-4.2-1.6-4.2.9 0 1.7 2 3 4.2 4.4 2.2-1.4 4.2-2.7 4.2-4.4 0-2.5-3-2.8-4.2-.9z" fill="currentColor" stroke="none" />
      <path d="M2.5 17.5h3.2c1 0 1.9.3 2.7.9l1.6 1.1c.6.4 1.3.6 2 .6H16c1 0 1.6-.9 1.3-1.8-.2-.5-.7-.8-1.2-.8h-3.2" />
      <path d="m17.3 17.8 3.4-2.3c.7-.5 1.7-.2 2 .6.2.5 0 1-.4 1.4l-4.2 3.2c-.8.6-1.7.9-2.7.9H9.5" />
      <path d="M12 3.2v1.6M7.5 4.6l.9 1.3M16.5 4.6l-.9 1.3" />
    </svg>
  );
}

/** Two people with a raised hand — offering time. */
function VolunteerIcon() {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
      <circle cx="17.5" cy="9" r="2.4" />
      <path d="M16.5 14.2c3 .2 5 2.3 5 5.3" />
    </svg>
  );
}

/**
 * Two always-visible shortcuts, stacked above the chat icon on every public page,
 * so that giving or volunteering is one tap away from anywhere on the site.
 */
export function FloatingActions() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;

  return (
    <nav aria-label="Quick actions" className={styles.stack}>
      <Link className={`${styles.pill} ${styles.volunteer}`} href="/volunteers">
        <span className={styles.icon}>
          <VolunteerIcon />
        </span>
        <span className={styles.text}>
          <strong>Volunteer</strong>
          <small lang="sa">स्वयंसेवा</small>
        </span>
      </Link>
      <Link className={`${styles.pill} ${styles.donate}`} href="/donation">
        <span className={styles.icon}>
          <DonateIcon />
        </span>
        <span className={styles.text}>
          <strong>Donate</strong>
          <small lang="sa">दानम्</small>
        </span>
      </Link>
    </nav>
  );
}
