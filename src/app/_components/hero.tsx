"use client";

import Link from "next/link";
import { useCallback, useEffect, useState, type ReactNode } from "react";
import { imageCaptions, images, type ImageKey } from "@/content/images";
import styles from "./hero.module.css";

type Slide = {
  id: string;
  image: ImageKey;
  /** The menu section this slide leads to — shown with its Sanskrit name, as in the main menu */
  menu: { label: string; sa: string };
  title: string;
  text: string;
  actions: { label: string; href: string; ghost?: boolean }[];
};

const slides: Slide[] = [
  {
    id: "story",
    image: "ganeshaStatue",
    menu: { label: "Our Story", sa: "अस्माकं कथा" },
    title: "Preserving the eternal wisdom of the Vedas",
    text: "Dedicated to the timeless heritage of the Vedas, Sanskrit, Bharatiya Knowledge Systems and Sanatana Dharma — carried forward through the ancient Guru–Shishya Parampara, and offered completely free of cost.",
    actions: [
      { label: "Read our story", href: "/our-story" },
      { label: "Give with devotion", href: "/donation", ghost: true },
    ],
  },
  {
    id: "ritual",
    image: "yajna",
    menu: { label: "Ritual", sa: "सेवा" },
    title: "Worship as the Vedas ordain",
    text: "Daily temple worship, pujas, homams, samskaras and grand yajnas — performed under qualified Acharyas, for your family and for the welfare of all.",
    actions: [
      { label: "Explore rituals", href: "/ritual" },
      { label: "Request a seva", href: "/contact", ghost: true },
    ],
  },
  {
    id: "pilgrimage",
    image: "dravidaTemple",
    menu: { label: "Pilgrimage", sa: "तीर्थयात्रा" },
    title: "Walk the sacred geography of the South",
    text: "Guided journeys to ancient temples across Keralam, Dravida Desham, Karnataka and Andhra Pradesha — their architecture, their stories and their spiritual energy.",
    actions: [
      { label: "Tīrtha Yātrā", href: "/pilgrimage" },
      { label: "Temples of Keralam", href: "/pilgrimage/keralam", ghost: true },
    ],
  },
  {
    id: "donation",
    image: "ganeshaMedieval",
    menu: { label: "Donation", sa: "दानम्" },
    title: "Anna Dānam Mahā Dānam",
    text: "Feed a student, care for Gomata, light a temple lamp, shelter an elder. Seven ways to turn giving into seva.",
    actions: [
      { label: "Ways to give", href: "/donation" },
      { label: "Annadānam", href: "/donation/annadanam", ghost: true },
    ],
  },
  {
    id: "knowledge",
    image: "ganeshaMiniature",
    menu: { label: "Knowledge Centre", sa: "गुरुकुलम्" },
    title: "Knowledge as a way of life",
    text: "A residential gurukulam where Vedic study, Sanskrit and recognised NIOS education grow together — boarding, food and learning, all free of cost.",
    actions: [
      { label: "Visit the Pāṭhaśālā", href: "/knowledge-centre/vedavani-pathashala" },
      { label: "E-Jñāna-kendram", href: "/knowledge-centre/e-jnana-kendram", ghost: true },
    ],
  },
];

const AUTOPLAY_MS = 7500;

export function Hero({ emblem }: { emblem: ReactNode }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [failed, setFailed] = useState<Record<string, boolean>>({});
  const count = slides.length;
  const slide = slides[index];

  const go = useCallback((next: number) => setIndex(((next % count) + count) % count), [count]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const playing = !paused && !reduced;

  useEffect(() => {
    if (!playing) return;
    const id = window.setTimeout(() => setIndex((i) => (i + 1) % count), AUTOPLAY_MS);
    return () => window.clearTimeout(id);
  }, [index, playing, count]);

  return (
    <section
      aria-label="Highlights of Avighna Trust"
      aria-roledescription="carousel"
      className={styles.hero}
      id="home"
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") go(index - 1);
        if (e.key === "ArrowRight") go(index + 1);
      }}
    >
      {/* Background photographs — cross-fade; the active one drifts slowly closer */}
      <div aria-hidden="true" className={styles.stack}>
        {slides.map((s, i) => {
          const img = images[s.image];
          return (
            <div className={styles.bg} data-active={i === index || undefined} key={s.id}>
              <span className={styles.glyph} lang="sa">
                {img.glyph}
              </span>
              {!failed[s.id] && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  alt=""
                  className={styles.photo}
                  draggable={false}
                  loading={i === 0 ? "eager" : "lazy"}
                  onError={() => setFailed((f) => ({ ...f, [s.id]: true }))}
                  src={img.src(1920)}
                  style={{ objectPosition: img.focus }}
                />
              )}
            </div>
          );
        })}
        <span className={styles.veil} />
        <span className={styles.band} />
      </div>

      <div className={styles.inner}>
        <div
          aria-label={`${index + 1} of ${count}`}
          aria-roledescription="slide"
          className={styles.copy}
          key={slide.id}
          onBlur={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          role="group"
        >
          <p className={styles.tag}>
            <span>{slide.menu.label}</span>
            <span className={styles.tagSa} lang="sa">
              {slide.menu.sa}
            </span>
          </p>
          <h1 className={styles.title}>{slide.title}</h1>
          <p className={styles.text}>{slide.text}</p>
          <div className={styles.actions}>
            {slide.actions.map((a) => (
              <Link className={a.ghost ? styles.btnGhost : styles.btnPrimary} href={a.href} key={a.href}>
                {a.label}
              </Link>
            ))}
          </div>
          <p className={styles.photoNote}>
            <span aria-hidden="true">◈</span> {imageCaptions[slide.image]}
          </p>
        </div>

        <div aria-hidden="false" className={styles.emblemWrap}>
          {emblem}
        </div>
      </div>

      <div className={styles.controls}>
        <div className={styles.dots} role="group" aria-label="Choose a slide">
          {slides.map((s, i) => (
            <button
              aria-current={i === index}
              aria-label={`${s.menu.label}: slide ${i + 1} of ${count}`}
              className={styles.dot}
              data-active={i === index || undefined}
              key={s.id}
              onClick={() => go(i)}
              type="button"
            >
              <span className={styles.dotBar}>
                {i === index && playing && <span className={styles.dotFill} key={`${s.id}-${index}`} style={{ animationDuration: `${AUTOPLAY_MS}ms` }} />}
              </span>
              <span className={styles.dotLabel}>{s.menu.label}</span>
            </button>
          ))}
        </div>
        <div className={styles.arrows}>
          <button aria-label={paused ? "Resume automatic slides" : "Pause automatic slides"} className={styles.pause} onClick={() => setPaused((p) => !p)} type="button">
            {paused ? "▶" : "❚❚"}
          </button>
          <button aria-label="Previous slide" onClick={() => go(index - 1)} type="button">
            ←
          </button>
          <button aria-label="Next slide" onClick={() => go(index + 1)} type="button">
            →
          </button>
        </div>
      </div>

      <p aria-live="polite" className={styles.live} role="status">
        Slide {index + 1} of {count}: {slide.menu.label}. {slide.title}
      </p>
    </section>
  );
}
