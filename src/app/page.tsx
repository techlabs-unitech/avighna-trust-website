import Link from "next/link";
import styles from "./page.module.css";
import { SiteFooter, SiteHeader } from "./_components/site-chrome";
import { PopupBanner } from "./_components/popup-banner";
import { NewsletterSection } from "./_components/newsletter-section";
import { getGalleryImages } from "@/lib/gallery-images";

const pillars = [
  { symbol: "ॐ", title: "Veda", text: "Chanting, memory and the living oral tradition." },
  { symbol: "🧘", title: "Yoga", text: "Discipline of body, breath and mind." },
  { symbol: "🔭", title: "Vijnana", text: "Curiosity and understanding of the natural world." },
  { symbol: "🌱", title: "Krishi", text: "Learning from the land through farming and care." },
  { symbol: "🎨", title: "Kala Kaushalya", text: "Skill in the arts and crafts of living." },
];

const programmes = [
  { title: "Gurukulam", text: "Learning shaped by attentive listening, disciplined practice and the teacher–student bond.", href: "/gurukulam", symbol: "॥" },
  { title: "Vedic & Sanskrit Learning", text: "Build a living connection with Sanskrit, chanting and the oral tradition.", href: "/samskritam", symbol: "अ" },
  { title: "Modern Education", text: "Traditional study in dialogue with contemporary academic opportunities, including NIOS.", href: "/programmes", symbol: "✎" },
  { title: "Temple & Spiritual Life", text: "Temple services and spiritual activities rooted in tradition.", href: "/spiritual-services", symbol: "दीप" },
  { title: "Community Outreach", text: "Cultural activity, education and welfare that reach beyond the classroom.", href: "/community", symbol: "सेवा" },
  { title: "Research & Knowledge", text: "Study of Vedic and Bharatiya knowledge systems, shared as educational resources.", href: "/research", symbol: "❖" },
];

const ways = [
  { icon: "🪔", title: "Donate", text: "Help sustain Vedic and Sanskrit learning, resources and community welfare.", href: "/donate", cta: "Donate now" },
  { icon: "🤝", title: "Volunteer", text: "Offer your time and skills to teaching, events, outreach and seva.", href: "/volunteer", cta: "Join as volunteer" },
  { icon: "💌", title: "Stay connected", text: "Visit us, write to us, or share our work with someone who would value it.", href: "/contact", cta: "Get in touch" },
];

export default async function Home() {
  const images = await getGalleryImages();
  const [first, second, third] = images;
  const strip = images.slice(0, 6);

  return (
    <>
      <SiteHeader activePath="/" />
      <PopupBanner />

      <main id="main">
        {/* ---------------- Hero ---------------- */}
        <section className={styles.hero} id="home">
          <div className={styles.heroInner}>
            <div className={styles.heroCopy}>
              <span className={styles.badge}>🪔 Avighna Trust · Vedavani Pathashala</span>
              <h1>
                Nurturing minds.<br />
                Preserving heritage.<br />
                <em>Serving community.</em>
              </h1>
              <p>
                We keep the eternal wisdom of the Vedas alive through
                Gurukulam learning, Sanskrit and values — and we invite you to
                walk with us.
              </p>
              <div className={styles.heroActions}>
                <Link className={styles.btnPrimary} href="/donate">Donate now ♥</Link>
                <Link className={styles.btnGhost} href="/volunteer">Become a volunteer</Link>
              </div>
              <p className={styles.shloka} lang="sa">
                सर्वे भवन्तु सुखिनः
                <span>May all be happy.</span>
              </p>
            </div>

            <div className={styles.heroMedia} aria-hidden={!first}>
              <div className={styles.archMain}>
                {first ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img alt="Moments from the Pathashala community" src={first.src} />
                ) : (
                  <span className={styles.archFallback}>ॐ</span>
                )}
              </div>
              {second && (
                <div className={styles.archSmall}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img alt="" src={second.src} />
                </div>
              )}
              {third && (
                <div className={styles.archSmall2}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img alt="" src={third.src} />
                </div>
              )}
              <span className={styles.floatCard}>
                <strong>Veda · Yoga · Vijnana</strong>
                <small>Krishi · Kala Kaushalya</small>
              </span>
            </div>
          </div>
        </section>

        {/* ---------------- Trust strip ---------------- */}
        <section className={styles.trust} aria-label="What we stand for">
          <ul>
            <li><span aria-hidden="true">📖</span><strong>Guru–Shishya</strong><small>Parampara</small></li>
            <li><span aria-hidden="true">🕉️</span><strong>Vedic &amp; Sanskrit</strong><small>Living learning</small></li>
            <li><span aria-hidden="true">🌿</span><strong>Holistic</strong><small>Five-fold education</small></li>
            <li><span aria-hidden="true">🤲</span><strong>Seva</strong><small>Service to community</small></li>
          </ul>
        </section>

        {/* ---------------- About ---------------- */}
        <section className={styles.about} id="about">
          <div className={styles.aboutPhoto}>
            {first ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img alt="Community of Vedavani Pathashala" src={(second ?? first).src} />
            ) : (
              <span aria-hidden="true">ॐ</span>
            )}
            <span className={styles.aboutTag}>A living inheritance</span>
          </div>
          <div className={styles.aboutCopy}>
            <p className={styles.eyebrow}>Who we are</p>
            <h2>Knowledge is not only learned. <em>It is lived and shared.</em></h2>
            <p>
              Vedic knowledge is a profound inheritance, preserved through
              attentive study, oral tradition and the bond between teacher and
              student. We keep that inheritance meaningful for the lives and
              questions of today.
            </p>
            <div className={styles.vmGrid}>
              <article>
                <h3>Our vision</h3>
                <p>To share the wisdom of the Vedas and Bharatiya traditions, nurturing generations who live with understanding, humility and purpose.</p>
              </article>
              <article>
                <h3>Our mission</h3>
                <p>To create space for sincere learning through Gurukulam study, Sanskrit and an education that embraces the whole person.</p>
              </article>
            </div>
            <Link className={styles.link} href="/about">Read our story →</Link>
          </div>
        </section>

        {/* ---------------- Five pillars ---------------- */}
        <section className={styles.pillars}>
          <div className={styles.head}>
            <p className={styles.eyebrow}>Panchamukhi Shikshana</p>
            <h2>Five pillars of <em>education</em></h2>
            <p>A whole-person approach that grows the head, hands and heart together.</p>
          </div>
          <div className={styles.pillarRow}>
            {pillars.map((p) => (
              <article className={styles.pillar} key={p.title}>
                <span className={styles.pillarIcon} aria-hidden="true">{p.symbol}</span>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </article>
            ))}
          </div>
          <Link className={styles.linkCenter} href="/panchamukhi-shikshana">Explore the five pillars →</Link>
        </section>

        {/* ---------------- What we do ---------------- */}
        <section className={styles.programmes} id="programmes">
          <div className={styles.head}>
            <p className={styles.eyebrow}>What we do</p>
            <h2>Our work &amp; <em>programmes</em></h2>
            <p>Learning, tradition and service — in one community.</p>
          </div>
          <div className={styles.cardGrid}>
            {programmes.map((p) => (
              <Link className={styles.card} href={p.href} key={p.title}>
                <span className={styles.cardIcon} aria-hidden="true">{p.symbol}</span>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
                <span className={styles.cardMore}>Learn more →</span>
              </Link>
            ))}
          </div>
        </section>

        {/* ---------------- Gallery ---------------- */}
        <section className={styles.gallery} aria-labelledby="home-gallery">
          <div className={styles.head}>
            <p className={styles.eyebrow}>Our gallery</p>
            <h2 id="home-gallery">Moments from our <em>community</em></h2>
          </div>
          {strip.length > 0 ? (
            <div className={styles.photoStrip}>
              {strip.map((img, i) => (
                <Link aria-label="Open the photo gallery" className={styles.photo} href="/gallery" key={img.src}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img alt={`Community photo ${i + 1}`} loading="lazy" src={img.src} />
                </Link>
              ))}
            </div>
          ) : (
            <p className={styles.soon}>Photographs will appear here soon.</p>
          )}
          <Link className={styles.linkCenter} href="/gallery">View the full gallery →</Link>
        </section>

        {/* ---------------- Ways to help ---------------- */}
        <section className={styles.ways} id="support">
          <div className={styles.head}>
            <p className={styles.eyebrow}>Dharmakaryam</p>
            <h2>Help keep the <em>lamp of learning lit</em></h2>
            <p>Every act of support — big or small — carries this tradition forward.</p>
          </div>
          <div className={styles.waysGrid}>
            {ways.map((w) => (
              <article className={styles.way} key={w.title}>
                <span aria-hidden="true">{w.icon}</span>
                <h3>{w.title}</h3>
                <p>{w.text}</p>
                <Link href={w.href}>{w.cta} →</Link>
              </article>
            ))}
          </div>
        </section>

        {/* ---------------- Voices ---------------- */}
        <section className={styles.voices}>
          <blockquote>
            <p lang="sa">विद्या ददाति विनयं विनयाद् याति पात्रताम्।</p>
            <footer>Knowledge bestows humility; through humility, one becomes worthy.</footer>
          </blockquote>
          <Link className={styles.btnLight} href="/testimonials">Hear from our community</Link>
        </section>

        <NewsletterSection />
      </main>
      <SiteFooter />
    </>
  );
}
