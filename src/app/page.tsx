import Link from "next/link";
import type { Metadata } from "next";
import sheet from "@/content/sheet.json";
import { SiteFooter, SiteHeader } from "./_components/site-chrome";
import { Hero } from "./_components/hero";
import { GaneshaEmblem } from "./_components/ganesha-emblem";
import { Photo } from "./_components/photo";
import { LotusDivider } from "./_components/ornaments";
import { getGalleryImages } from "@/lib/gallery-images";
import { donationCategories, pilgrimageRegions, homeContent } from "@/content/pages";
import { imageCaptions, type ImageKey } from "@/content/images";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Avighna Trust · Vedavani Pathashala | Vedic learning, ritual and seva",
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
      <LotusDivider className={styles.divider} />
      {intro && <p className={styles.intro}>{intro}</p>}
    </header>
  );
}

const rituals: { title: string; sa: string; text: string; href: string; image: ImageKey }[] = [
  { title: "Pūjā", sa: "पूजा", text: "Deity pujas, Gopūjā, Guru Pūjā, Satyanārāyaṇa and more — worship with strict scriptural authenticity.", href: "/ritual/puja", image: "ganeshaStatue" },
  { title: "Homa", sa: "होमः", text: "Sacred fire as the divine messenger — Gaṇapati, Navagraha, Mṛtyuñjaya, Sudarśana and other homams.", href: "/ritual/homa", image: "yajna" },
  { title: "Yajña", sa: "यज्ञः", text: "Collective ceremonies for universal welfare — Saṁhitā, Śatachaṇḍī, Rudra and Bāla Gaṇapati yajñas.", href: "/ritual/yagna", image: "ganeshaMedieval" },
  { title: "Saṁskāras", sa: "संस्कारः", text: "Life-cycle rites from Nāmakaraṇa to Upanayana and Vivāha, under qualified Ācāryas.", href: "/ritual#samskaras", image: "ganeshaMiniature" },
];

const pilgrimImages: Record<string, ImageKey> = {
  keralam: "keralaTemple",
  "dravida-desham": "dravidaTemple",
  "karnataka-rajyam": "ganeshaStatue",
  "andhra-pradesha": "ganeshaMedieval",
};

const knowledge: { title: string; sa: string; text: string; href: string; image: ImageKey }[] = [
  { title: "Vedavāṇī Pāṭhaśālā", sa: "वेदवाणी पाठशाला", text: "The residential gurukulam: Vedic and Sanskrit studies, NIOS academics and a disciplined day that begins at 5:00 AM.", href: "/knowledge-centre/vedavani-pathashala", image: "ganeshaMiniature" },
  { title: "Granthālayam", sa: "ग्रन्थालयम्", text: "A library and research institute for Veda Vijñāna, rare manuscripts and the Bhagavad Gītā and Bhāgavatam.", href: "/knowledge-centre/granthalayam", image: "ganeshaMedieval" },
  { title: "E-Jñāna-kendram", sa: "ई-ज्ञानकेन्द्रम्", text: "Traditional wisdom, digital learning: Sanskrit, Veda, mantra and shloka classes, online and offline.", href: "/knowledge-centre/e-jnana-kendram", image: "ganeshaStatue" },
];

/** Left → right. The centre pillar is the tallest; each pillar has its own colour (see data-tone in globals.css). */
const panchamukhi = [
  { sa: "वेदः", en: "Veda", note: "Sacred knowledge", tone: "kumkum", size: "outer" },
  { sa: "योगः", en: "Yoga", note: "Body, mind & spirit", tone: "peacock", size: "inner" },
  { sa: "विज्ञानम्", en: "Vijñāna", note: "Science & wisdom", tone: "turmeric", size: "centre" },
  { sa: "कृषिः", en: "Krishi", note: "Agriculture", tone: "tulsi", size: "inner" },
  { sa: "कलाकौशल्यम्", en: "Kalā Kaushalya", note: "Arts & skills", tone: "plum", size: "outer" },
] as const;

const vanaPillars = sheet.vana.pillars;

export default async function Home() {
  const local = await getGalleryImages();
  const fillers: ImageKey[] = ["ganeshaStatue", "yajna", "dravidaTemple", "keralaTemple", "ganeshaMiniature", "madurai2"];

  return (
    <>
      <SiteHeader activePath="/" />

      <main id="main">
        <Hero emblem={<GaneshaEmblem />} />

        {/* ───────── Home · Gṛham ───────── */}
        <section className={styles.welcome} aria-labelledby="welcome-title">
          <figure className={styles.archFigure}>
            <div className={styles.welcomeArch}>
              <Photo className={styles.archPhoto} name="ganeshaMiniature" width={900} />
            </div>
            <figcaption className={styles.figCaption}>{imageCaptions.ganeshaMiniature}</figcaption>
          </figure>
          <div className={styles.welcomeCopy}>
            <p className={styles.chip}>
              <span>Home</span>
              <span className={styles.chipSa} lang="sa">
                गृहम्
              </span>
            </p>
            <h2 id="welcome-title">A home for the Vedas, open to all</h2>
            <LotusDivider className={styles.dividerLeft} />
            <p className={styles.lede}>{homeContent.theme}</p>
            <ul className={styles.ticks}>
              <li>Education, boarding, food and healthcare — free of cost for every student</li>
              <li>Vedic studies alongside recognised NIOS academic certificates</li>
              <li>Daily temple worship, guided pilgrimages and care for our elders</li>
            </ul>
            <Link className={styles.btn} href="/our-story">
              Read our story
            </Link>
          </div>
        </section>

        {/* ───────── Our Story · Asmākaṁ Kathā ───────── */}
        <section className={styles.dark} id="our-story">
          <Head en="Our Story" sa="अस्माकं कथा" title="Why we exist" intro="Established to preserve, practice and propagate the timeless wisdom of the Vedas and the spiritual heritage of Bharat." light />
          <div className={styles.vm}>
            <article>
              <h3>Vision</h3>
              <p>{sheet.vision}</p>
            </article>
            <article>
              <h3>Mission</h3>
              <p>{sheet.mission.replace(/^"|"$/g, "")}</p>
            </article>
          </div>
          <ul className={styles.values} aria-label="Guiding values">
            {sheet.values.map((v) => (
              <li key={v.en}>
                <span lang="sa">{v.sa}</span>
                <strong>{v.en}</strong>
                <small>{v.title}</small>
              </li>
            ))}
          </ul>
          <div className={styles.center}>
            <Link className={styles.btnGold} href="/our-story">
              Read our full story
            </Link>
          </div>
        </section>

        {/* ───────── Ritual · Sevā ───────── */}
        <section className={styles.light} id="ritual">
          <Head en="Ritual" sa="सेवा" title="Worship as the Vedas ordain" intro="Daily worship forms the spiritual foundation of campus life. Offer a puja, a homam or a samskara through the temple — for yourself, your family and all beings." />
          <div className={styles.photoCards}>
            {rituals.map((r) => (
              <Link className={styles.photoCard} href={r.href} key={r.title}>
                <span className={styles.photoCardImg}>
                  <Photo name={r.image} width={700} alt="" />
                  <span className={styles.imgCaption}>{imageCaptions[r.image]}</span>
                </span>
                <span className={styles.photoCardBody}>
                  <span className={styles.cardSa} lang="sa">
                    {r.sa}
                  </span>
                  <strong>{r.title}</strong>
                  <span>{r.text}</span>
                  <em>Learn more</em>
                </span>
              </Link>
            ))}
          </div>
          <div className={styles.festivals}>
            <h3>Celebrated through the year</h3>
            <ul>
              {homeContent.celebrations.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
          <div className={styles.center}>
            <Link className={styles.btn} href="/ritual">
              Explore all rituals
            </Link>
          </div>
        </section>

        {/* ───────── Pilgrimage · Tīrtha Yātrā ───────── */}
        <section className={styles.sandal} id="pilgrimage">
          <Head en="Pilgrimage" sa="तीर्थयात्रा" title="Walk the sacred geography" intro="Immersive journeys that connect seekers with ancient temple architecture, Vāstu Śāstra, sacred geography and spiritual energy." />
          <div className={styles.tiles}>
            {pilgrimageRegions.map((r) => (
              <Link className={styles.tile} href={`/pilgrimage/${r.slug}`} key={r.slug}>
                <Photo name={pilgrimImages[r.slug]} width={800} alt="" />
                <span className={styles.tileShade} />
                <span className={styles.tileText}>
                  <span lang="sa">{r.sa}</span>
                  <strong>{r.title}</strong>
                  <small>{imageCaptions[pilgrimImages[r.slug]]}</small>
                  <em>Learn more</em>
                </span>
              </Link>
            ))}
          </div>
          <div className={styles.center}>
            <Link className={styles.btn} href="/pilgrimage">
              Plan a Tīrtha Yātrā
            </Link>
          </div>
        </section>

        {/* ───────── Donation · Dānam ───────── */}
        <section className={styles.dark} id="donation">
          <Head en="Donation" sa="दानम्" title="Anna Dānam Mahā Dānam" intro="To give is the highest offering. Choose the seva closest to your heart." light />
          <div className={styles.danaGrid}>
            {donationCategories.map((c) => (
              <Link className={styles.dana} href={`/donation/${c.slug}`} key={c.slug}>
                <span lang="sa">{c.sa}</span>
                <strong>{c.title}</strong>
                <small>{c.tagline}</small>
                <em>Read more</em>
              </Link>
            ))}
          </div>
          <p className={styles.fineLight}>{sheet.taxNote}</p>
          <div className={styles.center}>
            <Link className={styles.btnGold} href="/donation">
              See all ways to give
            </Link>
          </div>
        </section>

        {/* ───────── Retired Living · Vṛddhāśrama ───────── */}
        <section className={styles.split} id="retired-living">
          <div className={styles.splitCopy}>
            <p className={styles.chip}>
              <span>Retired Living</span>
              <span className={styles.chipSa} lang="sa">
                वृद्धाश्रम
              </span>
            </p>
            <h2>A life of dignity, reflection and purpose</h2>
            <LotusDivider className={styles.dividerLeft} />
            <p className={styles.lede}>{sheet.vana.overview}</p>
            <ul className={styles.pillarList}>
              {vanaPillars.map((p) => (
                <li key={p.title}>
                  <strong>{p.title}</strong>
                </li>
              ))}
            </ul>
            <Link className={styles.btn} href="/retired-living">
              Learn more about Vṛddhāśrama
            </Link>
          </div>
          <figure className={`${styles.archFigure} ${styles.splitFigure}`}>
            <div className={styles.splitArch}>
              <Photo className={styles.archPhoto} name="keralaTemple" width={900} />
            </div>
            <figcaption className={styles.figCaption}>{imageCaptions.keralaTemple}</figcaption>
          </figure>
        </section>

        {/* ───────── Knowledge Centre · Gurukulam ───────── */}
        <section className={styles.sandal} id="knowledge-centre">
          <Head en="Knowledge Centre" sa="गुरुकुलम्" title="Where wisdom becomes a way of life" intro="A residential gurukulam, a library of sacred texts, and classes open to everyone." />
          <div className={styles.photoCards3}>
            {knowledge.map((k) => (
              <Link className={styles.photoCard} href={k.href} key={k.title}>
                <span className={styles.photoCardImg}>
                  <Photo name={k.image} width={700} alt="" />
                  <span className={styles.imgCaption}>{imageCaptions[k.image]}</span>
                </span>
                <span className={styles.photoCardBody}>
                  <span className={styles.cardSa} lang="sa">
                    {k.sa}
                  </span>
                  <strong>{k.title}</strong>
                  <span>{k.text}</span>
                  <em>Read more</em>
                </span>
              </Link>
            ))}
          </div>
          <div className={styles.five}>
            <h3>Pañcamukhī Śikṣaṇa — five dimensions of education</h3>
            <ul className={styles.pillars}>
              {panchamukhi.map((p) => (
                <li className={styles.pillar} data-size={p.size} data-tone={p.tone} key={p.en}>
                  <span aria-hidden="true" className={styles.pillarCap} />
                  <span className={styles.pillarShaft}>
                    <span className={styles.pillarSa} lang="sa">
                      {p.sa}
                    </span>
                    <strong>{p.en}</strong>
                    <small>{p.note}</small>
                  </span>
                  <span aria-hidden="true" className={styles.pillarBase} />
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.center}>
            <Link className={styles.btn} href="/knowledge-centre">
              Explore the Knowledge Centre
            </Link>
          </div>
        </section>

        {/* ───────── Gallery · Vīthikā ───────── */}
        <section className={styles.light} id="gallery">
          <Head en="Gallery" sa="वीथिका" title="Glimpses of life here" intro="Campus life, temple and goshala, classrooms, yoga, chanting, rituals and festivals." />
          <div className={styles.mosaic}>
            {Array.from({ length: 6 }, (_, i) => {
              const l = local[i];
              const filler = fillers[i % fillers.length];
              return l ? (
                <Link aria-label={`${l.title} — open the photo gallery`} className={styles.mosaicItem} href="/gallery" key={l.src}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img alt={l.description} loading="lazy" src={l.src} />
                  <span className={styles.imgCaption}>
                    <b>{l.title}</b>
                    {l.description}
                  </span>
                </Link>
              ) : (
                <Link aria-label="Open the photo gallery" className={styles.mosaicItem} href="/gallery" key={`f${i}`}>
                  <Photo name={filler} width={700} alt="" />
                  <span className={styles.imgCaption}>{imageCaptions[filler]}</span>
                </Link>
              );
            })}
          </div>
          <ul className={styles.chips} aria-label="Gallery categories">
            {homeContent.galleryCategories.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
          <div className={styles.center}>
            <Link className={styles.btn} href="/gallery">
              Open the gallery
            </Link>
          </div>
        </section>

        {/* ───────── Volunteers · Svayaṁsevakāḥ ───────── */}
        <section className={styles.sandal} id="volunteers">
          <Head en="Volunteers" sa="स्वयंसेवकाः" title="Offer your time as seva" intro="Whatever your skill, there is a place for it in the work of the Trust." />
          <ul className={styles.chips} aria-label="Volunteer opportunities">
            {homeContent.volunteerAreas.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
          <div className={styles.center}>
            <Link className={styles.btn} href="/volunteers">
              Become a volunteer
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
            <div>
              <strong>Temple</strong>
              <span>5:00 AM – 12:00 PM</span>
              <span>4:00 PM – 8:30 PM</span>
            </div>
          </div>
          <div className={styles.center}>
            <Link className={styles.btnGold} href="/contact">
              Contact us · सम्पर्कः
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
