import Link from "next/link";
import styles from "./page.module.css";
import { SiteFooter, SiteHeader } from "./_components/site-chrome";
import { PopupBanner } from "./_components/popup-banner";
import { NewsletterSection } from "./_components/newsletter-section";
import { getGalleryImages } from "@/lib/gallery-images";
import { AlumniCarousel } from "./_components/alumni-carousel";
import { Corner, Diya, LotusDivider, Mandala } from "./_components/ornaments";

const tones = ["indigo", "kumkum", "turmeric", "tulsi", "peacock", "plum"] as const;
const numerals = ["१", "२", "३", "४", "५", "६"];

const pillars = [
  { symbol: "वेद", title: "Veda", text: "Chanting, memory and the living oral tradition." },
  { symbol: "योग", title: "Yoga", text: "Discipline of body, breath and mind." },
  { symbol: "विज्ञान", title: "Vijnana", text: "Curiosity and understanding of the natural world." },
  { symbol: "कृषि", title: "Krishi", text: "Learning from the land through farming and care." },
  { symbol: "कला", title: "Kala Kaushalya", text: "Skill in the arts and crafts of living." },
];

const programmes = [
  { title: "Gurukulam", text: "Learning shaped by attentive listening, disciplined practice and the teacher–student bond.", href: "/gurukulam", symbol: "गुरु" },
  { title: "Vedic & Sanskrit Learning", text: "Build a living connection with Sanskrit, chanting and the oral tradition.", href: "/samskritam", symbol: "अ" },
  { title: "Modern Education", text: "Traditional study in dialogue with contemporary academic opportunities, including NIOS.", href: "/programmes", symbol: "विद्या" },
  { title: "Temple & Spiritual Life", text: "Temple services and spiritual activities rooted in tradition.", href: "/spiritual-services", symbol: "दीप" },
  { title: "Community Outreach", text: "Cultural activity, education and welfare that reach beyond the classroom.", href: "/community", symbol: "सेवा" },
  { title: "Research & Knowledge", text: "Study of Vedic and Bharatiya knowledge systems, shared as educational resources.", href: "/research", symbol: "ज्ञान" },
];

const ways = [
  { icon: "दान", title: "Donate", text: "Help sustain Vedic and Sanskrit learning, resources and community welfare.", href: "/donate", cta: "Support Our Gurukula" },
  { icon: "सेवा", title: "Volunteer", text: "Offer your time and skills to teaching, events, outreach and seva.", href: "/volunteer", cta: "Join as volunteer" },
  { icon: "संवाद", title: "Stay connected", text: "Visit us, write to us, or share our work with someone who would value it.", href: "/contact", cta: "Get in touch" },
];

export default async function Home() {
  const images = await getGalleryImages();
  const [first, second] = images;
  const strip = images.slice(0, 6);

  return (
    <>
      <SiteHeader activePath="/" />
      <PopupBanner />

      <main id="main">
        {/* ---------------- Hero ---------------- */}
        <section className={styles.hero} id="home">
          <Mandala className={styles.heroMandala} />
          <div className={styles.heroInner}>
            <div className={styles.heroCopy}>
              <p className={styles.invocation} lang="sa">॥ विद्या ददाति विनयं विनयाद् याति पात्रताम्। ॥</p>
              <span className={styles.badge}><Diya className={styles.badgeDiya} /> Avighna Trust · Vedavani Pathashala</span>
              <h1>
                Preserving the Eternal Wisdom of the Vedas<br />
                <em>• Nurturing Values</em><br />
                • Inspiring Future Generations
              </h1>
              <p className={styles.lede}>
                At Vedavani Pathashala, we are dedicated to preserving and propagating the timeless heritage of the Vedas, Sanskrit, Bharatiya knowledge systems, and Sanatana Dharma. Rooted in the sacred Guru–Shishya Parampara, our institution provides holistic education that harmoniously blends traditional Vedic learning with modern academic excellence, nurturing knowledgeable, disciplined, compassionate, and self-reliant individuals for the welfare of society.
              </p>
              <div className={styles.heroActions}>
                <Link className={styles.btnPrimary} href="/donate">Support our Gurukula</Link>
                <Link className={styles.btnGhost} href="/volunteer">Become a volunteer</Link>
              </div>
              <p className={styles.shloka} lang="sa">
                सर्वे भवन्तु सुखिनः
                <span>May all be happy.</span>
              </p>
            </div>

            <div className={styles.heroMedia} aria-hidden={!first}>
              <div className={styles.torana}>
                <div className={styles.toranaInner}>
                  {first ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img alt="Moments from the Pathashala community" src={first.src} />
                  ) : (
                    <span className={styles.archFallback} lang="sa">ॐ</span>
                  )}
                </div>
              </div>
              {second && (
                <div className={styles.medallion}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img alt="" src={second.src} />
                </div>
              )}
              <span className={styles.leafTag}>
                <strong>Veda · Yoga · Vijnana</strong>
                <small>Krishi · Kala Kaushalya</small>
              </span>
            </div>
          </div>
        </section>

        {/* ---------------- Palm-leaf strip ---------------- */}
        <section className={styles.trust} aria-label="What we stand for">
          <ul>
            <li><span aria-hidden="true" lang="sa">गुरु</span><strong>Guru–Shishya</strong><small>Parampara</small></li>
            <li><span aria-hidden="true" lang="sa">ॐ</span><strong>Vedic &amp; Sanskrit</strong><small>Living learning</small></li>
            <li><span aria-hidden="true" lang="sa">पंच</span><strong>Holistic</strong><small>Five-fold education</small></li>
            <li><span aria-hidden="true" lang="sa">सेवा</span><strong>Seva</strong><small>Service to community</small></li>
          </ul>
        </section>

        {/* ---------------- About ---------------- */}
        <section className={styles.about} id="about">
          <div className={styles.aboutPhoto}>
            {first ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img alt="Community of Vedavani Pathashala" src={(second ?? first).src} />
            ) : (
              <span aria-hidden="true" lang="sa">ॐ</span>
            )}
            <span className={styles.aboutTag}>A living inheritance</span>
          </div>
          <div className={styles.aboutCopy}>
            <p className={styles.eyebrow}>Welcome</p>
            <h2>Knowledge is not only learned. <em>It is lived and shared.</em></h2>
            <LotusDivider className={styles.divLeft} />
            <p>
              Vedic knowledge is a profound inheritance, preserved through
              attentive study, oral tradition and the bond between teacher and
              student. We keep that inheritance meaningful for the lives and
              questions of today.
            </p>
            <div className={styles.vmGrid}>
              <article className={styles.leaf} data-tone="indigo">
                <Corner className={styles.corner} />
                <h3>Our vision</h3>
                <p>To preserve, practice, and propagate the eternal wisdom of the Vedas, Sanskrit, and Bharatiya knowledge systems as a living tradition that enlightens humanity. We envision a society rooted in Dharma, enriched by knowledge, guided by compassion, and inspired by spiritual awareness. Through authentic education, disciplined living, and selfless service, Vedavani Pathashala strives to nurture individuals who become custodians of India's timeless heritage while contributing positively to the modern world.</p>
              </article>
              <article className={styles.leaf} data-tone="kumkum">
                <Corner className={styles.corner} />
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
            <LotusDivider className={styles.div} />
            <p>A whole-person approach that grows the head, hands and heart together.</p>
          </div>
          <div className={styles.pillarRow}>
            {pillars.map((p, i) => (
              <article className={styles.pillar} data-tone={tones[i % 5]} key={p.title}>
                <span className={styles.pillarIcon} aria-hidden="true" lang="sa">{p.symbol}</span>
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
            <LotusDivider className={styles.div} />
            <p>Learning, tradition and service — in one community.</p>
          </div>
          <div className={styles.cardGrid}>
            {programmes.map((p, i) => (
              <Link className={`${styles.card} ${styles.leaf}`} data-tone={tones[i % tones.length]} href={p.href} key={p.title}>
                <span className={styles.holes} aria-hidden="true" />
                <span className={styles.numeral} aria-hidden="true" lang="sa">{numerals[i]}</span>
                <span className={styles.cardIcon} aria-hidden="true" lang="sa">{p.symbol}</span>
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
            <LotusDivider className={styles.div} />
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

        {/* ---------------- Success stories ---------------- */}
        <section className={styles.alumni} id="alumni">
          <div className={styles.head}>
            <p className={styles.eyebrow}>Success Stories</p>
            <h2>Our Proud <em>Alumni</em></h2>
            <LotusDivider className={styles.div} />
            <p>Hear from those who learned, lived and grew with us.</p>
          </div>
          <AlumniCarousel />
        </section>

        {/* ---------------- Ways to help ---------------- */}
        <section className={styles.ways} id="support">
          <div className={styles.head}>
            <p className={styles.eyebrow}>Dharmakaryam</p>
            <h2>Help keep the <em>lamp of learning lit</em></h2>
            <LotusDivider className={styles.div} />
            <p>Every act of support — big or small — carries this tradition forward.</p>
          </div>
          <div className={styles.waysGrid}>
            {ways.map((w, i) => (
              <article className={`${styles.way} ${styles.leaf}`} data-tone={tones[(i + 1) % tones.length]} key={w.title}>
                <span aria-hidden="true" lang="sa">{w.icon}</span>
                <h3>{w.title}</h3>
                <p>{w.text}</p>
                <Link href={w.href}>{w.cta} →</Link>
              </article>
            ))}
          </div>
        </section>

        {/* ---------------- Voices ---------------- */}
        <section className={styles.voices}>
          <Mandala className={styles.voicesMandala} />
          <Diya className={styles.voicesDiya} />
          <blockquote>
            <p lang="sa">विद्या ददाति विनयं विनयाद् याति पात्रताम्।</p>
            <footer>Knowledge bestows humility; through humility, one becomes worthy.</footer>
          </blockquote>
          <Link className={styles.btnLight} href="/testimonials">Hear from our community</Link>
        </section>

        <NewsletterSection />

        {/* ---------------- Donate call-to-action ---------------- */}
        <section className={styles.donateCta} id="donate-cta" aria-labelledby="donate-cta-title">
          <Mandala className={styles.donateMandala} />
          <span className={styles.donateBadge}><Diya className={styles.badgeDiya} /> Support Dharma</span>
          <h2 id="donate-cta-title">Support the Future of Vedic Education</h2>
          <p>
            We believe that knowledge, values and care should reach every
            learner. Your contribution helps Vedavani Pathashala keep the
            Vedic and Sanskrit tradition alive, nurture young minds and serve
            the wider community. Is it not the duty of society to stand with
            institutions that preserve our ancient heritage?
          </p>
          <Link className={styles.donateBtn} href="/donate">Support our Gurukula</Link>
          <small>Tax-exemption details will be shared once confirmed by the Trust.</small>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
