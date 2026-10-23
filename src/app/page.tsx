import type { ReactNode } from "react";
import styles from "./page.module.css";
import { SiteFooter, SiteHeader } from "./_components/site-chrome";

const programmes = [
  {
    number: "01",
    title: "Gurukulam",
    description:
      "Learning shaped by attentive listening, disciplined practice, thoughtful questions and the teacher–student relationship.",
    tag: "Guru–Shishya Parampara",
    href: "/gurukulam",
    symbol: "॥",
  },
  {
    number: "02",
    title: "Vedic & Sanskrit Learning",
    description:
      "Study Vedic knowledge and build a living connection with Sanskrit, literature, chanting and oral tradition.",
    tag: "Veda · Bhāṣā · Sāhitya",
    href: "/samskritam",
    symbol: "अ",
  },
  {
    number: "03",
    title: "Panchamukhi Shikshana",
    description:
      "Five dimensions of learning: Veda, Yoga, Vijnana, Krishi and Kala Kaushalya.",
    tag: "Learning in many dimensions",
    href: "/panchamukhi-shikshana",
    symbol: "✳",
  },
  {
    number: "04",
    title: "Modern Education",
    description:
      "A learning vision that brings traditional study into dialogue with contemporary academic opportunities, including NIOS.",
    tag: "Traditional · Contemporary",
    href: "/programmes",
    symbol: "◈",
  },
  {
    number: "05",
    title: "Research & Knowledge",
    description:
      "Study of Vedic and Bharatiya knowledge systems, shared through thoughtful educational resources.",
    tag: "Study · Publications",
    href: "/research",
    symbol: "◌",
  },
  {
    number: "06",
    title: "Temple & Spiritual Life",
    description:
      "Temple services and spiritual activities are among the areas identified in the institutional vision.",
    tag: "Practice · Service",
    href: "/spiritual-services",
    symbol: "दीप",
  },
  {
    number: "07",
    title: "Community Outreach",
    description:
      "Learning and service connect through cultural activity, education and community welfare.",
    tag: "Outreach · Seva",
    href: "/community",
    symbol: "सेवा",
  },
  {
    number: "08",
    title: "Sanskrit & DevaVāṇī",
    description:
      "Language learning can keep knowledge, literature and cultural memory in living conversation.",
    tag: "Language · Heritage",
    href: "/samskritam",
    symbol: "सं",
  },
];

const workAreas = [
  {
    number: "01",
    title: "Spiritual services",
    description: "Temple services and spiritual activities rooted in tradition.",
    href: "/spiritual-services",
    symbol: "दीप",
  },
  {
    number: "02",
    title: "Community welfare",
    description: "Service and outreach guided by care for the wider community.",
    href: "/community",
    symbol: "सेवा",
  },
];

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <span aria-hidden="true" className={styles.arrow}>
      {diagonal ? "↗" : "→"}
    </span>
  );
}

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className={styles.sectionLabel}>
      <span aria-hidden="true" />
      {children}
    </p>
  );
}

function HeroArtwork() {
  return (
    <div
      className={styles.heroArtwork}
      role="img"
      aria-label="Illustrative artwork placeholder for a future Gurukulam campus photograph"
    >
      <div className={styles.photoPlaceholder}>
        <span className={styles.photoKicker}>A place for learning</span>
        <span className={styles.photoMonogram} aria-hidden="true">॥</span>
        <span className={styles.photoTitle}>The Gurukulam,<br />in its own light.</span>
        <span className={styles.photoCaption}>Illustrative placeholder · campus photograph to follow</span>
      </div>
      <span className={styles.artIndex}>Illustrative artwork · 01</span>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <SiteHeader activePath="/" />

      <main id="main">
        <section className={styles.hero} id="home">
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>
              <span aria-hidden="true" />
              A tradition carried forward
            </p>
            <h1>Ancient wisdom.<br /><em>Living</em> knowledge.</h1>
            <p className={styles.heroDescription}>
              Preserving the Eternal Wisdom of the Vedas • Nurturing Values •
              Inspiring Future Generations
            </p>
            <div className={styles.heroActions}>
              <a className={styles.primaryButton} href="/gurukulam">
                Explore our Gurukulam <Arrow />
              </a>
              <a className={styles.textLink} href="/donate">
                Support Dharma <Arrow diagonal />
              </a>
              <a className={styles.textLink} href="/volunteer">
                Join our mission <Arrow diagonal />
              </a>
            </div>
            <div className={styles.heroQuote}>
              <span className={styles.quoteRule} />
              <div>
                <p lang="sa">विद्या ददाति विनयं विनयाद् याति पात्रताम्।</p>
                <span>Knowledge bestows humility; through humility, one becomes worthy.</span>
              </div>
            </div>
          </div>
          <HeroArtwork />
          <div className={styles.heroFoot}>
            <span>Wisdom passed on, with purpose</span>
            <a href="#about" aria-label="Scroll to learn more">↓</a>
            <span>01 — 06</span>
          </div>
        </section>

        <section className={styles.introduction} id="about">
          <div className={styles.introLabel}>
            <SectionLabel>A living inheritance</SectionLabel>
            <span className={styles.introIndex}>01 / Our purpose</span>
          </div>
          <div className={styles.introContent}>
            <h2>Knowledge is not only learned.<br /><em>It is lived, shared, and carried on.</em></h2>
            <div className={styles.introBottom}>
              <p>
                Vedic knowledge is a profound inheritance—one preserved through
                attentive study, oral tradition and the bond between teacher
                and student. We seek to keep that inheritance meaningful for
                the lives and questions of today.
              </p>
              <p>
                Through Gurukulam-based learning, Sanskrit, Bharatiya
                knowledge systems and holistic education, we hope to nurture
                thoughtful learners grounded in values, curiosity and care.
              </p>
            </div>
          </div>
        </section>

        <section className={styles.vision} aria-labelledby="vision-title">
          <div className={styles.visionHeading}>
            <SectionLabel>Our guiding principles</SectionLabel>
            <h2 id="vision-title">A purpose that looks<br /><em>both ways.</em></h2>
            <p>Rooted in an enduring inheritance. Reaching towards a thoughtful future.</p>
          </div>
          <div className={styles.visionCards}>
            <article className={styles.visionCard}>
              <span className={styles.visionNumber}>01 <i>—</i> Dṛṣṭi</span>
              <h3>Our vision</h3>
              <p>
                To preserve and share the wisdom of the Vedas and Bharatiya
                traditions, nurturing generations who live with understanding,
                humility and purpose.
              </p>
              <span className={styles.visionOrnament} aria-hidden="true">✳</span>
            </article>
            <article className={styles.visionCard}>
              <span className={styles.visionNumber}>02 <i>—</i> Saṅkalpa</span>
              <h3>Our mission</h3>
              <p>
                To create space for sincere learning through the Guru-Shishya
                Parampara, Vedic studies, Sanskrit and an education that
                embraces the whole person.
              </p>
              <span className={styles.visionOrnament} aria-hidden="true">✳</span>
            </article>
          </div>
        </section>

        <section className={styles.programmes} id="programmes">
          <div className={styles.sectionHeading}>
            <div>
              <SectionLabel>Learning for a whole life</SectionLabel>
              <h2>Study with depth.<br /><em>Grow with purpose.</em></h2>
            </div>
            <p>
              A considered path through time-honoured knowledge, language and
              the arts of living.
            </p>
          </div>
          <div className={styles.programmeGrid}>
            {programmes.map((programme) => (
              <a
                aria-label={`Explore ${programme.title}`}
                className={styles.programme}
                href={programme.href}
                key={programme.number}
              >
                <div className={styles.programmeTop}>
                  <span>{programme.number}</span>
                  <span className={styles.programmeSymbol} aria-hidden="true">{programme.symbol}</span>
                </div>
                <span className={styles.programmeArt} aria-hidden="true">
                  <span>{programme.symbol}</span>
                </span>
                <h3>{programme.title}</h3>
                <p>{programme.description}</p>
                <span className={styles.programmeBottom}>
                  <span className={styles.programmeTag}>{programme.tag}</span>
                  <span className={styles.programmeArrow} aria-hidden="true">↗</span>
                </span>
              </a>
            ))}
          </div>
          <p className={styles.programmeNote}>
            Programme details and availability are to be confirmed by the institution.
          </p>
          <a className={styles.sectionAction} href="/programmes">
            Explore all programmes <Arrow />
          </a>
        </section>

        <section className={styles.gurukulam} id="gurukulam">
          <div className={styles.gurukulamVisual}>
            <div className={styles.visualFrame}>
              <div className={styles.visualSun} />
              <div className={styles.visualArch}>
                <span className={styles.archLine} />
                <span className={styles.archLine} />
                <span className={styles.archLine} />
                <span className={styles.archLine} />
                <span className={styles.archLine} />
                <span className={styles.archLine} />
              </div>
              <span className={styles.visualSanskrit} lang="sa">गुरुर्ब्रह्मा गुरुर्विष्णुः</span>
              <span className={styles.visualLabel}>The learning begins within</span>
              <span className={styles.visualCaption}>Illustrative artwork · not a campus photograph</span>
            </div>
            <span className={styles.visualSideNote}>Tradition is a conversation across generations.</span>
          </div>
          <div className={styles.gurukulamCopy}>
            <SectionLabel>The Gurukulam experience</SectionLabel>
            <h2>More than a place<br />to learn. <em>A way to grow.</em></h2>
            <p>
              In the Guru-Shishya Parampara, learning is shaped by a living
              relationship: attentive listening, disciplined practice,
              thoughtful questions and the example of the teacher.
            </p>
            <p>
              A Gurukulam brings study into the rhythm of daily life. It makes
              room for recitation and reflection, community and self-reliance,
              inner steadiness and an open mind.
            </p>
            <a className={styles.lightLink} href="/gurukulam">Explore the Gurukulam <Arrow /></a>
            <span className={styles.gurukulamSanskrit} lang="sa">आचार्यात् पादमादत्ते पादं शिष्यः स्वमेधया।</span>
          </div>
        </section>

        <section className={styles.work} id="work">
          <div className={styles.sectionHeading}>
            <div>
              <SectionLabel>Learning beyond the classroom</SectionLabel>
              <h2>Knowledge in<br /><em>service of all.</em></h2>
            </div>
            <p>
              Knowledge flourishes when it is studied with care, shared with
              others and put in service of the community.
            </p>
          </div>
          <div className={styles.workList}>
            {workAreas.map(({ number, title, description, href, symbol }) => (
              <a className={styles.workRow} href={href} key={number}>
                <span className={styles.workNumber}>{number}</span>
                <span className={styles.workMark} aria-hidden="true">{symbol}</span>
                <span className={styles.workCopy}>
                  <span className={styles.workTitle}>{title}</span>
                  <span className={styles.workDescription}>{description}</span>
                </span>
                <span className={styles.workArrow} aria-hidden="true">↗</span>
              </a>
            ))}
          </div>
        </section>

        <section className={styles.activities} id="activities">
          <div className={styles.activityIntro}>
            <SectionLabel>Gathering in good purpose</SectionLabel>
            <h2>Learning is also<br /><em>something we share.</em></h2>
            <p>
              From study and reflection to celebrations rooted in tradition,
              our activities bring people together around a shared cultural
              inheritance.
            </p>
            <a className={styles.activityNote} href="/events">
              View events and activity updates <Arrow />
            </a>
          </div>
          <div className={styles.activityFeature}>
            <div className={styles.activityGlyph} aria-hidden="true">ॐ</div>
            <span className={styles.activityCategory}>A place for what comes next</span>
            <h3>In the rhythm<br />of the tradition</h3>
            <p>
              Vedic recitation · Sanskrit learning · Spiritual gatherings ·
              Community service
            </p>
            <span className={styles.activityArtNote}>Illustrative artwork · event photographs to follow</span>
            <span className={styles.activityFoot}>Dates and details to be shared by the institution</span>
          </div>
        </section>

        <section className={styles.gallery} aria-labelledby="gallery-title">
          <div className={styles.galleryHead}>
            <div>
              <SectionLabel>A glimpse of our world</SectionLabel>
              <h2 id="gallery-title">Tradition, <em>in the making.</em></h2>
            </div>
            <p>
              Official photographs will be shared here when available.
              We look forward to showing you the people and moments that make
              this learning community.
            </p>
          </div>
          <div className={styles.galleryPlaceholders}>
            <div className={`${styles.galleryPlaceholder} ${styles.galleryOne}`} role="img" aria-label="Illustrative placeholder for Vedic learning; not an institutional photograph">
              <span className={styles.placeholderIcon} aria-hidden="true">✳</span>
              <span>Vedic learning</span>
              <span className={styles.placeholderCaption}>Illustrative placeholder</span>
            </div>
            <div className={`${styles.galleryPlaceholder} ${styles.galleryTwo}`} role="img" aria-label="Illustrative placeholder for Sanskrit learning; not an institutional photograph">
              <span className={styles.placeholderIcon} aria-hidden="true">॥</span>
              <span>Words in practice</span>
              <span className={styles.placeholderCaption}>Illustrative placeholder</span>
            </div>
            <div className={`${styles.galleryPlaceholder} ${styles.galleryThree}`} role="img" aria-label="Illustrative placeholder for community gathering; not an institutional photograph">
              <span className={styles.placeholderIcon} aria-hidden="true">◉</span>
              <span>Gathered in community</span>
              <span className={styles.placeholderCaption}>Illustrative placeholder</span>
            </div>
          </div>
          <p className={styles.galleryDisclaimer}>
            Illustrative placeholders only · No institutional photographs supplied yet
          </p>
          <a className={styles.galleryLink} href="/gallery">
            Visit the gallery <Arrow />
          </a>
        </section>

        <section className={styles.support} id="support">
          <div className={styles.supportPattern} aria-hidden="true">ॐ</div>
          <div className={styles.supportCopy}>
            <SectionLabel>Dharmakaryam</SectionLabel>
            <h2>Help keep the<br /><em>lamp of learning lit.</em></h2>
            <p>
              Your support can help sustain Vedic and Sanskrit learning,
              educational resources, spiritual activities and community
              welfare. Every contribution begins with a conversation about
              the institution’s current needs.
            </p>
            <a className={styles.supportButton} href="/donate">
              Enquire about supporting <Arrow diagonal />
            </a>
            <span className={styles.supportNote}>
              Donation channels and current priorities are to be confirmed.
              No payment details are published on this site.
            </span>
          </div>
          <div className={styles.supportAside}>
            <span className={styles.asideLine} />
            <p>“A gift to learning<br />is a gift to generations.”</p>
            <span>— A thought to carry forward</span>
          </div>
        </section>

        <section className={styles.finalCta}>
          <span className={styles.finalOrnament} aria-hidden="true">✳</span>
          <SectionLabel>A journey begins with a question</SectionLabel>
          <h2>Come closer to<br /><em>what endures.</em></h2>
          <p>Learn more. Start a conversation. Be part of carrying wisdom forward.</p>
          <a className={styles.primaryButton} href="/contact">
            Get in touch <Arrow diagonal />
          </a>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
