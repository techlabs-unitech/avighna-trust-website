import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "../_components/site-chrome";
import { PhotoGallery } from "../_components/photo-gallery";
import { getGalleryImages } from "@/lib/gallery-images";
import styles from "./gallery.module.css";

export const metadata: Metadata = {
  title: "Gallery | Vedavani Pathashala",
  description:
    "Photographs from the life of Vedavani Pathashala — our learners, teachers, volunteers and well-wishers.",
};

export default async function GalleryPage() {
  const images = await getGalleryImages();

  return (
    <>
      <SiteHeader activePath="/gallery" />
      <main id="main" className={styles.page}>
        <section className={styles.hero}>
          <nav aria-label="Breadcrumb" className={styles.crumbs}>
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Gallery</span>
          </nav>
          <p className={styles.kicker}>Moments of seva &amp; learning</p>
          <h1>Our Photo Gallery</h1>
          <p className={styles.lead}>
            Smiles, studies and service — a glimpse into the life of our
            community. Swipe or use the arrows to browse, and tap any photo to
            see it full screen.
          </p>
        </section>

        <PhotoGallery images={images} />

        <section className={styles.cta}>
          <h2>Be a part of the next picture</h2>
          <p>Volunteer with us or support the work that keeps the lamp of learning lit.</p>
          <div className={styles.ctaActions}>
            <Link className={styles.ctaPrimary} href="/donate">Donate now</Link>
            <Link className={styles.ctaGhost} href="/volunteer">Become a volunteer</Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
