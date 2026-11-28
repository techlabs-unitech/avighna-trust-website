import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "../_components/site-chrome";
import { PhotoGallery } from "../_components/photo-gallery";
import { getGalleryImages } from "@/lib/gallery-images";
import styles from "./gallery.module.css";

export const metadata: Metadata = {
  title: "Gallery | Avighna Foundation",
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
          <p className={styles.kicker}>वीथिका · Vīthikā</p>
          <h1>Gallery</h1>
          <p className={styles.lead}>
            Photographs and short videos of our Dhaanam seva — Vidya, Anna, Go, Veda Rakshanam, Deva, Arogya and Vriddhashrama — and of campus life,
            the temple and goshala, classes, yoga, Vedic teaching and rituals. Each category begins with a few words about it and five small pictures;
            choose “See more” to open them all, and tap any small photo to see it in full.
          </p>
        </section>

        <PhotoGallery images={images} />


        <section className={styles.cta}>
          <h2>Be a part of the next picture</h2>
          <p>Volunteer with us or support the work that keeps the lamp of learning lit.</p>
          <div className={styles.ctaActions}>
            <Link className={styles.ctaPrimary} href="/donation">Give with devotion</Link>
            <Link className={styles.ctaGhost} href="/volunteers">Become a volunteer</Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
