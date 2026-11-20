"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { SocialRail } from "./social-rail";
import { SubmissionForm } from "./submission-form";
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
 * Always-visible shortcuts on every public page: Donate (top) and Volunteer (bottom) at the
 * lower right, and a slim social-media rail on the right edge that opens to show full names on hover.
 */
export function FloatingActions() {
  const pathname = usePathname();
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const [open, setOpen] = useState(false);

  // Keep the native <dialog> in step with the `open` state (it handles focus trapping and Escape).
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  if (pathname?.startsWith("/admin")) return null;

  return (
    <>
      <SocialRail />
      <nav aria-label="Quick actions" className={styles.stack}>
        <Link className={`${styles.pill} ${styles.donate}`} href="/donation">
          <span className={styles.icon}>
            <DonateIcon />
          </span>
          <span className={styles.text}>
            <strong>Donate</strong>
            <small lang="sa">दानम्</small>
          </span>
        </Link>
        <button aria-haspopup="dialog" className={`${styles.pill} ${styles.volunteer}`} onClick={() => setOpen(true)} type="button">
          <span className={styles.icon}>
            <VolunteerIcon />
          </span>
          <span className={styles.text}>
            <strong>Volunteer</strong>
            <small lang="sa">स्वयंसेवा</small>
          </span>
        </button>
      </nav>

      {/* The same registration form as on the /volunteers page, opened as a pop-up */}
      <dialog
        aria-labelledby="volunteer-popup-title"
        className={styles.dialog}
        onClick={(e) => {
          if (e.target === e.currentTarget) setOpen(false);
        }}
        onClose={() => setOpen(false)}
        ref={dialogRef}
      >
        <div className={styles.dialogHead}>
          <div>
            <p lang="sa">स्वयंसेवकाः</p>
            <h2 id="volunteer-popup-title">Offer your time, with sincerity</h2>
          </div>
          <button aria-label="Close the volunteer form" className={styles.dialogClose} onClick={() => setOpen(false)} type="button">
            ×
          </button>
        </div>
        <p className={styles.dialogIntro}>
          Selfless service is one of our guiding values. Tell us how you would like to help.{" "}
          <Link href="/volunteers" onClick={() => setOpen(false)}>
            See all the ways to help
          </Link>
        </p>
        {open && <SubmissionForm type="volunteer" />}
        <p className={styles.dialogNote}>Submitting this form expresses interest only; it does not confirm a volunteer opportunity.</p>
      </dialog>
    </>
  );
}
