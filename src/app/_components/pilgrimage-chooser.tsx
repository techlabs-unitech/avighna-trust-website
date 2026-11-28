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
 * Home-page pilgrimage block: two choices — Customized Trips (opens a dropdown of the six regions and their
 * states) and Planned Trips (goes to its own page, where a visitor describes the trip they want).
 */
export function PilgrimageChooser({
  customizedImage,
  plannedImage,
}: {
  customizedImage: ImageKey;
  plannedImage: ImageKey;
}) {
  return (
    <div className={styles.wrap}>
      <div className={styles.choices}>
        <Link className={styles.choice} href="/pilgrimage#regions">
          <span className={styles.choiceImg}>
            <Photo alt="" name={customizedImage} width={800} />
          </span>
          <span className={styles.choiceBody}>
            <span className={styles.choiceSa} lang="sa">
              अनुकूलितयात्राः
            </span>
            <strong>Customized Trips</strong>
            <span className={styles.choiceText}>Journeys curated by the Trust for each region of Bharat, shaped around your group and your itinerary.</span>
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
