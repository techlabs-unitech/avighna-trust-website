"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { Photo } from "./photo";
import type { ImageKey } from "@/content/images";
import styles from "./pilgrimage-chooser.module.css";

export type ChooserDirection = {
  slug: string;
  title: string;
  sa: string;
  image: ImageKey;
  states: { slug: string; title: string }[];
};

/**
 * Home-page pilgrimage block: two choices — Scheduled Trips (opens a dropdown of the six regions and their
 * states) and Planned Trips (goes to its own page, where a visitor describes the trip they want).
 */
export function PilgrimageChooser({
  directions,
  scheduledImage,
  plannedImage,
}: {
  directions: ChooserDirection[];
  scheduledImage: ImageKey;
  plannedImage: ImageKey;
}) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <div className={styles.wrap}>
      <div className={styles.choices}>
        <button aria-controls={panelId} aria-expanded={open} className={`${styles.choice} ${open ? styles.choiceOpen : ""}`} onClick={() => setOpen((o) => !o)} type="button">
          <span className={styles.choiceImg}>
            <Photo alt="" name={scheduledImage} width={800} />
          </span>
          <span className={styles.choiceBody}>
            <span className={styles.choiceSa} lang="sa">
              निर्धारितयात्राः
            </span>
            <strong>Scheduled Trips</strong>
            <span className={styles.choiceText}>Journeys the Trust has planned for each region of Bharat, with their own dates and itineraries.</span>
            <em>
              {open ? "Hide regions" : "Choose a region"}
              <svg aria-hidden="true" className={styles.chev} fill="none" height="16" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.6" viewBox="0 0 24 24" width="16">
                <path d="m6 9 6 6 6-6" />
              </svg>
            </em>
          </span>
        </button>

        <Link className={styles.choice} href="/pilgrimage/planned-trips">
          <span className={styles.choiceImg}>
            <Photo alt="" name={plannedImage} width={800} />
          </span>
          <span className={styles.choiceBody}>
            <span className={styles.choiceSa} lang="sa">
              आयोजितयात्रा
            </span>
            <strong>Planned Trips</strong>
            <span className={styles.choiceText}>Tell us where you wish to go, with whom and for how long, and the Trust will plan a journey around you.</span>
            <em>Plan your trip →</em>
          </span>
        </Link>
      </div>

      <div className={styles.panel} data-open={open || undefined} id={panelId} inert={!open}>
        <div className={styles.panelInner}>
          <ul className={styles.regions}>
            {directions.map((d) => (
              <li className={styles.region} key={d.slug}>
                <Link className={styles.regionHead} href={`/pilgrimage/${d.slug}`}>
                  <span className={styles.regionImg}>
                    <Photo alt="" name={d.image} width={400} />
                  </span>
                  <span>
                    <strong>{d.title}</strong>
                    <small lang="sa">{d.sa}</small>
                  </span>
                </Link>
                <ul className={styles.states}>
                  {d.states.map((st) => (
                    <li key={st.slug}>
                      <Link href={`/pilgrimage/${d.slug}/${st.slug}`}>{st.title}</Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
          <div className={styles.panelFoot}>
            <Link href="/pilgrimage">See all scheduled trips →</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
