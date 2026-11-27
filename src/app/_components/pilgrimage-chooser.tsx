"use client";

import Link from "next/link";
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
  scheduledImage,
  plannedImage,
}: {
  scheduledImage: ImageKey;
  plannedImage: ImageKey;
}) {
  return (
    <div className={styles.wrap}>
      <div className={styles.choices}>
        <Link className={styles.choice} href="/pilgrimage#regions">
          <span className={styles.choiceImg}>
            <Photo alt="" name={scheduledImage} width={800} />
          </span>
          <span className={styles.choiceBody}>
            <span className={styles.choiceSa} lang="sa">
              निर्धारितयात्राः
            </span>
            <strong>Scheduled Trips</strong>
            <span className={styles.choiceText}>Journeys the Trust has planned for each region of Bharat, with their own dates and itineraries.</span>
            <em>Choose a region →</em>
          </span>
        </Link>

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
    </div>
  );
}
