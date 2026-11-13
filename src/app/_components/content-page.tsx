import type { ReactNode } from "react";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "./site-chrome";
import styles from "./content-page.module.css";

type ContentPageProps = {
  activePath: string;
  eyebrow: string;
  title: ReactNode;
  description: string;
  children: ReactNode;
};

type InfoGridProps = {
  items: {
    title: string;
    description: string;
    note?: string;
  }[];
};

const pageArtwork: Record<string, { symbol: string; title: string; note: string }> = {
  "/contact": { symbol: "सम्पर्कः", title: "Come, sit, and ask", note: "Illustrative motif" },
  "/volunteers": { symbol: "सेवा", title: "Hands that serve", note: "Illustrative motif" },
  "/gallery": { symbol: "वीथिका", title: "Glimpses of life here", note: "Illustrative motif" },
};

const relatedPages: Record<string, { href: string; label: string }[]> = {
  "/contact": [
    { href: "/our-story", label: "Our Story" },
    { href: "/knowledge-centre", label: "Knowledge Centre" },
  ],
  "/volunteers": [
    { href: "/contact", label: "Contact" },
    { href: "/donation", label: "Donation" },
  ],
  "/privacy-policy": [
    { href: "/terms-and-conditions", label: "Terms & conditions" },
    { href: "/donation-refund-policy", label: "Donation & refund policy" },
  ],
  "/terms-and-conditions": [
    { href: "/privacy-policy", label: "Privacy policy" },
    { href: "/donation-refund-policy", label: "Donation & refund policy" },
  ],
  "/donation-refund-policy": [
    { href: "/privacy-policy", label: "Privacy policy" },
    { href: "/donation", label: "Donation" },
  ],
  "/thank-you": [
    { href: "/", label: "Return home" },
    { href: "/contact", label: "Contact the Trust" },
  ],
  "/donate": [
    { href: "/donation", label: "Ways to give" },
    { href: "/contact", label: "Contact" },
  ],
};

export function ContentPage({
  activePath,
  eyebrow,
  title,
  description,
  children,
}: ContentPageProps) {
  const artwork = pageArtwork[activePath];
  const related = relatedPages[activePath] ?? [];

  return (
    <>
      <SiteHeader activePath={activePath} />
      <main id="main" className={styles.main}>
        <section className={styles.pageHero} aria-labelledby="page-title">
          <div className={styles.heroInner}>
            <nav className={styles.breadcrumb} aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">{eyebrow}</span>
            </nav>
            <p className={styles.eyebrow}>
              <span aria-hidden="true" />
              {eyebrow}
            </p>
            <h1 id="page-title">{title}</h1>
            <p className={styles.heroDescription}>{description}</p>
            <span className={styles.heroIndex} aria-hidden="true">
              अविघ्नमस्तु
            </span>
          </div>
          <div
            className={styles.heroArtwork}
            data-page={activePath.slice(1)}
            role="img"
            aria-label={`${artwork?.note ?? "Illustrative motif"}: ${artwork?.title ?? eyebrow}`}
          >
            <span className={styles.artworkRing} aria-hidden="true" />
            <span className={styles.artworkSymbol} aria-hidden="true">{artwork?.symbol ?? "॥"}</span>
            <span className={styles.artworkTitle}>{artwork?.title ?? eyebrow}</span>
            <span className={styles.artworkNote}>{artwork?.note ?? "Illustrative motif"}</span>
          </div>
        </section>
        <div className={styles.content}>{children}</div>
        <section className={styles.pageCta} aria-labelledby="related-title">
          <p className={styles.eyebrow}>
            <span aria-hidden="true" />
            Continue exploring
          </p>
          <h2 id="related-title">Questions are a good place to begin.</h2>
          <p>
            Explore related areas, or review the available enquiry information.
          </p>
          <div className={styles.relatedLinks}>
            {related.map(({ href, label }) => (
              <Link className={styles.relatedLink} href={href} key={href}>
                {label} <span aria-hidden="true">↗</span>
              </Link>
            ))}
            <Link className={styles.ctaLink} href="/contact">
              View enquiry information <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

export function PageSection({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className={styles.section}>
      <div className={styles.sectionHeading}>
        <p className={styles.eyebrow}>
          <span aria-hidden="true" />
          {eyebrow}
        </p>
        <h2>{title}</h2>
      </div>
      <div className={styles.sectionBody}>{children}</div>
    </section>
  );
}

export function InfoGrid({ items }: InfoGridProps) {
  return (
    <div className={styles.infoGrid}>
      {items.map((item, index) => (
        <article className={styles.infoCard} key={item.title}>
          <span className={styles.infoNumber}>
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
          {item.note && <span className={styles.cardNote}>{item.note}</span>}
        </article>
      ))}
    </div>
  );
}

export function NotePanel({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <aside className={styles.notePanel}>
      <span className={styles.noteMark} aria-hidden="true">✳</span>
      <div>
        <h3>{title}</h3>
        <div>{children}</div>
      </div>
    </aside>
  );
}

export function TextColumns({ children }: { children: ReactNode }) {
  return <div className={styles.textColumns}>{children}</div>;
}

export function TextBlock({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <article className={styles.textBlock}>
      <h3>{title}</h3>
      {children}
    </article>
  );
}

export function PlaceholderGallery({
  items,
}: {
  items: { title: string; symbol: string }[];
}) {
  return (
    <>
      <div className={styles.galleryGrid}>
        {items.map((item, index) => (
          <div
            className={`${styles.galleryItem} ${styles[`galleryTone${index % 3}`]}`}
            key={item.title}
            role="img"
            aria-label={`Illustrative placeholder for ${item.title}; no approved institutional photograph supplied`}
          >
            <span aria-hidden="true">{item.symbol}</span>
            <strong>{item.title}</strong>
            <small>Photograph to be supplied</small>
          </div>
        ))}
      </div>
      <p className={styles.disclaimer}>
        These are illustrative design placeholders, not photographs of the
        institution, campus or students.
      </p>
    </>
  );
}
