"use client";

import Link from "next/link";
import { useCallback, useEffect, useState, type CSSProperties, type ReactNode } from "react";
import { heroImages, type HeroKey } from "@/content/images";
import styles from "./hero.module.css";

type Slide = {
  id: string;
  image: HeroKey;
  /** The menu section this slide leads to — shown with its Sanskrit name, as in the main menu */
  menu: { label: string; sa: string };
  title: string;
  text: string;
  actions: { label: string; href: string; ghost?: boolean }[];
};

const slides: Slide[] = [
  {
    id: "story",
    image: "story",
    menu: { label: "Asmākaṁ Kathā", sa: "अस्माकं कथा" },
    title: "Preserving the Vedas, Serving Humankind",
    text: "Avighna Trust carries forward the Vedas, Sanskrit and the spiritual heritage of Bharat through the living Guru–Śiṣya Paramparā, and offers education, food, healthcare and shelter for elders as seva to all.",
    actions: [
      { label: "Read our story", href: "/our-story" },
    ],
  },
  {
    id: "ritual",
    image: "ritual",
    menu: { label: "Devaseva Kārya", sa: "देवसेवाकार्यम्" },
    title: "Worship as the Vedas ordain",
    text: "Daily temple worship, pujas, homams, samskaras and the rebuilding of temples, performed under qualified Acharyas for your family and for the welfare of all.",
    actions: [
      { label: "Explore rituals", href: "/ritual" },
    ],
  },
  {
    id: "pilgrimage",
    image: "pilgrimage",
    menu: { label: "Tīrtha Yātrā", sa: "तीर्थयात्रा" },
    title: "Walk the sacred geography of Bharat",
    text: "Guided journeys to ancient temples across South, North, East, West and Central India — their architecture, their stories and their spiritual energy.",
    actions: [
      { label: "Explore pilgrimages", href: "/pilgrimage" },
    ],
  },
  {
    id: "donation",
    image: "donation",
    menu: { label: "Dhaanam", sa: "दानम्" },
    title: "Choose the Seva Closest to Your Heart",
    text: "To give is the highest offering. Choose the seva closest to your heart: a student’s learning, a day’s meals, a cow’s care, a temple lamp or an elder’s shelter.",
    actions: [
      { label: "Ways to give", href: "/donation" },
    ],
  },
  {
    id: "gurukulam",
    image: "gurukulam",
    menu: { label: "Gurukulam", sa: "गुरुकुलम्" },
    title: "The home of spirutal knowledge and vedas",
    text: "At Vedavāṇī Pāṭhaśālā, students live with their Gurus in the ancient Guru–Śiṣya Paramparā — Vedic chanting, Sanskrit and recognised NIOS education, with boarding, food and healthcare all free of cost.",
    actions: [{ label: "Visit the Patashala", href: "/traditional-school" }],
  },
  {
    id: "knowledge",
    image: "knowledge",
    menu: { label: "Jñāna Kendra", sa: "ज्ञानकेन्द्रम्" },
    title: "Knowledge as a way of life",
    text: "A library of sacred texts and rare palm-leaf manuscripts, and online and in-person classes in Sanskrit, Veda, mantra and shloka — open to everyone who wishes to learn.",
    actions: [
      { label: "Library", href: "/knowledge-centre/granthalayam" },
      { label: "E-Learning Centre", href: "/knowledge-centre/e-jnana-kendram", ghost: true },
    ],
  },
];

const AUTOPLAY_MS = 7500;
/** Viewport width at and below which the mobile photograph is used. */
const MOBILE_MAX = 720;

/**
 * One slide's background: a separate photograph for desktop and for mobile, chosen by the browser
 * with <picture>. If a candidate cannot load, the next one is tried; if none load, the Devanagari
 * glyph behind it shows instead.
 */
function HeroPhoto({ slide, first }: { slide: HeroKey; first: boolean }) {
  const { desktop, mobile } = heroImages[slide];
  const [attempt, setAttempt] = useState(0);
  const d = desktop.srcs(1920);
  const m = mobile.srcs(1000);
  if (attempt >= Math.max(d.length, m.length)) return null;
  return (
    <picture key={attempt}>
      <source media={`(max-width: ${MOBILE_MAX}px)`} srcSet={m[Math.min(attempt, m.length - 1)]} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt=""
        className={styles.photo}
        draggable={false}
        fetchPriority={first ? "high" : "auto"}
        loading="eager"
        onError={() => setAttempt((a) => a + 1)}
        src={d[Math.min(attempt, d.length - 1)]}
        style={{ "--focus-d": desktop.focus, "--focus-m": mobile.focus } as CSSProperties}
      />
    </picture>
  );
}

export function Hero({ emblem }: { emblem: ReactNode }) {
  const [index, setIndex] = useState(0);
  /** Paused by the visitor with the pause button. */
  const [userPaused, setUserPaused] = useState(false);
  /** Paused only while a real mouse pointer rests on the text. Touch never pauses (it has no "leave"). */
  const [hovering, setHovering] = useState(false);
  /** Paused while the browser tab is hidden, so the slides do not run ahead unseen. */
  const [hidden, setHidden] = useState(false);
  const count = slides.length;
  const slide = slides[index];

  const go = useCallback((next: number) => setIndex(((next % count) + count) % count), [count]);

  useEffect(() => {
    const onVisibility = () => setHidden(document.hidden);
    onVisibility();
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  // Slides advance on their own, starting from the very first one. Reduced motion only removes the
  // zoom/slide animation (see the CSS) — the slides still change, since a gentle cross-fade is safe.
  const playing = !userPaused && !hovering && !hidden;

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
        {slides.map((s, i) => (
          <div className={styles.bg} data-active={i === index || undefined} key={s.id}>
            <span className={styles.glyph} lang="sa">
              {heroImages[s.image].desktop.glyph}
            </span>
            <HeroPhoto first={i === 0} slide={s.image} />
          </div>
        ))}
        <span className={styles.veil} />
        <span className={styles.band} />
      </div>

      <div className={styles.inner}>
        <div
          aria-label={`${index + 1} of ${count}`}
          aria-roledescription="slide"
          className={styles.copy}
          key={slide.id}
          onPointerEnter={(e) => e.pointerType === "mouse" && setHovering(true)}
          onPointerLeave={() => setHovering(false)}
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
          <button aria-label={userPaused ? "Resume automatic slides" : "Pause automatic slides"} className={styles.pause} onClick={() => setUserPaused((p) => !p)} type="button">
            {userPaused ? "▶" : "❚❚"}
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
