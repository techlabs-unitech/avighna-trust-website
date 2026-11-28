import Link from "next/link";
import type { Metadata } from "next";
import sheet from "@/content/sheet.json";
import { SiteFooter, SiteHeader } from "./_components/site-chrome";
import { Hero } from "./_components/hero";
import { PilgrimageChooser } from "./_components/pilgrimage-chooser";
import { GaneshaEmblem } from "./_components/ganesha-emblem";
import { Photo } from "./_components/photo";
import { Mandala } from "./_components/ornaments";
import { OmDivider, OmEmblem } from "./_components/om-emblem";
import { donationCategories, ritualCards } from "@/content/pages";
import type { ImageKey } from "@/content/images";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Avighna Foundation · Preserving Sanatana Dharma & Uplifting Society",
  description:
    "Avighna Trust preserves the Vedas, Sanskrit and Sanatana Dharma through free residential gurukula education, temple worship, pilgrimage, elder care and community seva.",
};

/** Section heading: the Sanskrit chip mirrors the main menu, so each section is recognisably a menu page. */
function Head({ en, sa, title, intro, light }: { en: string; sa: string; title: string; intro?: string; light?: boolean }) {
  return (
    <header className={`${styles.head} ${light ? styles.headLight : ""}`}>
      <p className={styles.chip}>
        <span>{en}</span>
        <span className={styles.chipSa} lang="sa">
          {sa}
        </span>
      </p>
      <h2>{title}</h2>
      <OmDivider className={styles.divider} />
      {intro && <p className={styles.intro}>{intro}</p>}
    </header>
  );
}

/** A small round medallion that sits on the seam between two sections — the divider between them. It always carries the Trust's Om emblem. */
function Mark() {
  return (
    <span aria-hidden="true" className={styles.mark}>
      <OmEmblem className={styles.markIcon} />
    </span>
  );
}

/** Faint mandala behind a section's content (decoration only). */
function Watermark({ side = "right" }: { side?: "left" | "right" }) {
  return (
    <span aria-hidden="true" className={styles.wm} data-side={side}>
      <Mandala className={styles.wmArt} />
    </span>
  );
}

/** The five rituals — a picture and a short line each; the full write-up is on each ritual's own page. */
const ritualShort: Record<string, { image: ImageKey; text: string }> = {
  "/ritual/puja": { image: "puja", text: "Devotional worship offered to the Divine, for you and your family." },
  "/ritual/homa": { image: "yajna", text: "Sacred fire rituals with Vedic mantras, for peace, health and prosperity." },
  "/ritual/nitya-seva": { image: "nityaSeva", text: "Daily worship at the temple that you can sponsor in your name." },
  "/ritual/samskaras": { image: "samskaras", text: "The sacred rites that mark each stage of life, from birth onwards." },
  "/ritual/mandira-punarnirmanam": { image: "dravidaTemple", text: "Raising a lost or ruined temple again, as the Agamas ordain." },
};
const rituals = ritualCards.map((r) => ({ ...r, ...ritualShort[r.href] }));

/** The three foundations of the Trust — short, with the full text on the Our Story page. */
const foundations = [
  {
    id: "vision",
    title: "Vision",
    sa: "दृष्टिः",
    short: "Ancient wisdom in modern life — a society rooted in Dharma, compassion and selfless service, for the well-being of all.",
  },
  {
    id: "mission",
    title: "Mission",
    sa: "लक्ष्यम्",
    short: "To preserve, practise and propagate Sanatana Dharma, Vedic wisdom and Sanskrit through free education, spiritual guidance, elder care and community service.",
  },
  {
    id: "values",
    title: "Guiding Values",
    sa: "मूल्यानि",
    short: "Five values that guide every seva the Trust undertakes.",
  },
] as const;

/** Gallery categories (from the Trust's content sheet) — one same-sized tile each, with a related picture. */
const galleryTiles: { name: string; image: ImageKey }[] = [
  { name: "Campus Life", image: "galCampus" },
  { name: "Temple & Goshala", image: "galTemple" },
  { name: "Classroom Learning", image: "galClass" },
  { name: "Yoga Sessions", image: "galYoga" },
  { name: "Vedic Teaching", image: "galChant" },
  { name: "Rituals (Homams & Pujas)", image: "galRitual" },
  { name: "Virtual Campus Tours", image: "galTour" },
];

/** The two parts of the Knowledge Centre, shown as cards on the home page. */
const knowledge = [
  { title: "Library", sa: "ग्रन्थालयम्", href: "/knowledge-centre/granthalayam", image: "/images/library/library.jpg", text: "Sacred texts, rare palm-leaf manuscripts and a large digital repository." },
  { title: "E-Learning Centre", sa: "ई-ज्ञानकेन्द्रम्", href: "/knowledge-centre/e-jnana-kendram", image: "/images/donation/vidyadanam.jpg", text: "Online and in-person classes in Sanskrit, Vedic teaching, mantra and shloka." },
];

export default function Home() {

  return (
    <>
      <SiteHeader activePath="/" />

      <main id="main">
        <Hero emblem={<GaneshaEmblem />} />

        {/* ───────── Home + Our Story ───────── */}
        <section aria-labelledby="welcome-title" className={styles.about} id="our-story">
          <Watermark side="right" />
          <header className={styles.head}>
            <p className={styles.chip}>
              <span>Our Story</span>
              <span className={styles.chipSa} lang="sa">
                अस्माकं कथा
              </span>
            </p>
            <h2 id="welcome-title">Timeless Wisdom, Selfless Service, Soulful Living</h2>
            <OmDivider className={styles.divider} />
          </header>

          {/* Vision · Mission · Guiding Values — names only; each opens a short line and links to the full text */}
          <div className={styles.found} id="foundations">
            <div className={styles.foundGrid}>
              {foundations.map((f) => (
                <details className={styles.foundCard} key={f.id} name="foundations">
                  <summary>
                    <span className={styles.foundSa} lang="sa">
                      {f.sa}
                    </span>
                    <strong>{f.title}</strong>
                    <span aria-hidden="true" className={styles.foundPlus} />
                  </summary>
                  <div className={styles.foundBody}>
                    <p>{f.short}</p>
                    {f.id === "values" && (
                      <ul aria-label="Guiding values" className={styles.foundValues}>
                        {sheet.values.map((v) => (
                          <li key={v.en}>
                            <span lang="sa">{v.sa}</span>
                            {v.en}
                          </li>
                        ))}
                      </ul>
                    )}
                    <Link className={styles.textLink} href={`/our-story#${f.id}`}>
                      Read more →
                    </Link>
                  </div>
                </details>
              ))}
            </div>
            <div className={styles.panelButtons}>
              <Link className={styles.btnGhostGold} href="/our-story">
                Read our full story
              </Link>
            </div>
          </div>
        </section>

        {/* ───────── Indian School · Gurukulam ───────── */}
        <section className={`${styles.splitSec} ${styles.tintSandal}`} id="Indian-school">
          <Mark />
          <div className={styles.split}>
            <figure className={`${styles.archFigure} ${styles.splitFigure}`}>
              <div className={styles.splitArch}>
                <Photo className={styles.archPhoto} name="gurukulam" width={1000} />
              </div>
            </figure>
            <div className={styles.splitCopy}>
              <p className={styles.chip}>
                <span>Indian School</span>
                <span className={styles.chipSa} lang="sa">
                  गुरुकुलम्
                </span>
              </p>
              <h2>The Home of Spiritual Knowledge and Vedas</h2>
              <OmDivider className={styles.dividerLeft} />
              <p className={styles.lede}>A residential gurukulam where students live with their Gurus in the ancient Guru–Shishya Parampara.</p>
              <Link className={styles.btn} href="/Indian-school">
                Visit the Indian School
              </Link>
            </div>
          </div>
        </section>

        {/* ───────── Senior Living · Vṛddhāśrama ───────── */}
        <section className={`${styles.splitSec} ${styles.tintLight}`} id="senior-living">
          <Mark />
          <div className={`${styles.split} ${styles.splitRev}`}>
            <div className={styles.splitCopy}>
              <p className={styles.chip}>
                <span>Senior Living</span>
                <span className={styles.chipSa} lang="sa">
                  वृद्धाश्रमम्
                </span>
              </p>
              <h2>A life of dignity, reflection and purpose</h2>
              <OmDivider className={styles.dividerLeft} />
              <p className={styles.lede}>{sheet.vana.overview}</p>
              <Link className={styles.btn} href="/senior-living">
                Explore Senior Living
              </Link>
            </div>
            <figure className={`${styles.archFigure} ${styles.splitFigure}`}>
              <div className={styles.splitArch}>
                <Photo className={styles.archPhoto} name="seniorLivingHome" width={1000} />
              </div>
            </figure>
          </div>
        </section>

        {/* ───────── Divine Service · Devaseva Kārya ───────── */}
        <section className={styles.light} id="ritual">
          <Mark />
          <Head en="Divine Service" sa="देवसेवाकार्यम्" title="Worship as the Vedas ordain" />
          <div>
            <ul className={styles.ritualRow}>
              {rituals.map((r) => (
                <li key={r.href}>
                  <article className={styles.ritualCard}>
                    <span className={styles.ritualImg}>
                      <Photo name={r.image} width={500} alt="" />
                    </span>
                    <div className={styles.ritualBody}>
                      <span className={styles.cardSa} lang="sa">
                        {r.sa}
                      </span>
                      <h4>{r.title}</h4>
                      <p>{r.text}</p>
                      <Link aria-label={`Learn more about ${r.title}`} className={styles.btnSmall} href={r.href}>
                        Learn more
                      </Link>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
            <div className={styles.center}>
              <Link className={styles.btn} href="/ritual">
                Explore Divine Services
              </Link>
            </div>
          </div>
        </section>

        {/* ───────── Pilgrimage · Tīrtha Yātrā ───────── */}
        <section className={styles.sandal} id="pilgrimage">
          <Mark />
          <Head en="Pilgrimage" sa="तीर्थयात्रा" title="Walk the sacred geography of Bharat" intro="Immersive journeys that connect seekers with ancient temple architecture, Vāstu Śāstra, sacred geography and spiritual energy." />
          <PilgrimageChooser
            plannedImage="stUttarakhand"
            customizedImage="dravidaTemple"
          />
        </section>

        {/* ───────── Gallery · Vīthikā — one tile per category ───────── */}
        <section className={styles.light} id="gallery">
          <Mark />
          <Head en="Gallery" sa="वीथिका" title="Glimpses of our initiatives" />
          <ul className={styles.galGrid} aria-label="Gallery categories">
            {galleryTiles.map((g) => (
              <li key={g.name}>
                <Link className={styles.galTile} href="/gallery">
                  <Photo name={g.image} width={700} alt="" />
                  <span className={styles.galName}>{g.name}</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className={styles.center}>
            <Link className={styles.btn} href="/gallery">
              Open the gallery
            </Link>
          </div>
        </section>

        {/* ───────── Donation · Dhaanam ───────── */}
        <section className={styles.dark} id="donation">
          <Mark />
          <Head en="Donation" sa="दानम्" title="To give is the highest offering" intro="Seven ways to give" light />
          <div className={styles.danaGrid}>
            {donationCategories.map((c) => (
              <Link className={styles.dana} href={`/donation/${c.slug}`} key={c.slug}>
                <span className={styles.danaImg}>
                  <Photo name={c.image} width={600} alt="" />
                </span>
                <span className={styles.danaBody}>
                  <span lang="sa">{c.sa}</span>
                  <strong>{c.title}</strong>
                  <small className={styles.gift}>{c.tagline}</small>
                  <em>Read more</em>
                </span>
              </Link>
            ))}
          </div>
          <div className={styles.center}>
            <Link className={styles.btnGold} href="/donation">
              Options to donate
            </Link>
          </div>
        </section>

        {/* ───────── Contact · Samparkaḥ ───────── */}
        <section className={styles.contact} id="contact">
          <p className={styles.shloka} lang="sa">
            ईशावास्यमिदं सर्वम्
          </p>
          <p className={styles.shlokaEn}>All this, whatever lives and moves, is pervaded by the Divine.</p>
          <div className={styles.hours}>
            <div>
              <strong>Office</strong>
              <span>Monday – Saturday</span>
              <span>9:00 AM – 5:30 PM</span>
            </div>
          </div>
          <div className={styles.center}>
            <Link className={styles.btn} href="/contact">
              Contact us · सम्पर्कः
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
