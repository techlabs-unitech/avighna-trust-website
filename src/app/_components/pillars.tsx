import type { ReactNode } from "react";
import styles from "./pillars.module.css";

type Pillar = { title: string; subtitle: string; description: string; icon: ReactNode; tone: string };

const svgProps = {
  viewBox: "0 0 24 24",
  width: 26,
  height: 26,
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

const pillars: Pillar[] = [
  {
    title: "Veda",
    subtitle: "Sacred Knowledge",
    description:
      "Study of Rigveda, Yajurveda, Bhagavad Gita, Upanishads, and Sanskrit literature. Rooted in the Ghana Patha tradition, preserving our sacred oral heritage.",
    tone: "toneOne",
    icon: (
      <svg {...svgProps}><path d="M6 3h9l4 4v14H6z" /><path d="M9 8h3M9 12h7M9 16h7" /></svg>
    ),
  },
  {
    title: "Yoga",
    subtitle: "Mind-Body Harmony",
    description:
      "Daily practice of Asanas, Pranayama, and Meditation following the eight limbs of Ashtanga Yoga.",
    tone: "toneTwo",
    icon: (
      <svg {...svgProps}><circle cx="12" cy="5" r="2" /><path d="M12 7v6M4.5 10 12 11l7.5-1M12 13l-4 6M12 13l4 6" /></svg>
    ),
  },
  {
    title: "Vijnana",
    subtitle: "Modern Science",
    description:
      "Mathematics, Physics, and Social Sciences with emphasis on ancient Indian scientific achievements.",
    tone: "toneThree",
    icon: (
      <svg {...svgProps}><path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 1.8 3h10.4A2 2 0 0 0 19 18l-5-9V3" /><path d="M7.5 15h9" /></svg>
    ),
  },
  {
    title: "Krishi",
    subtitle: "Organic Agriculture",
    description:
      "Hands-on learning of sustainable farming, Goseva, and Agnihotra-based organic practices.",
    tone: "toneFour",
    icon: (
      <svg {...svgProps}><path d="M12 21v-9" /><path d="M12 12c0-4-3-6-7-6 0 4 3 6 7 6z" /><path d="M12 15c0-3 2-5 6-5 0 3-2 5-6 5z" /></svg>
    ),
  },
  {
    title: "Kala Kaushalya",
    subtitle: "Fine Arts",
    description:
      "Training in classical music, Bhajans, Yakshagana, drama, and the 64 traditional skills of Bharatiya culture, with communication skills in Kannada, Sanskrit, English, and Hindi.",
    tone: "toneFive",
    icon: (
      <svg {...svgProps}><path d="M12 3a9 9 0 1 0 0 18c1.6 0 2.2-1 1.7-2.1s0-2.2 1.5-2.2H17a3 3 0 0 0 3-3c0-5.5-3.6-10.7-8-10.7z" /><circle cx="8" cy="11" r="1" /><circle cx="12" cy="7.5" r="1" /><circle cx="16" cy="11" r="1" /></svg>
    ),
  },
];

export function FivePillars() {
  return (
    <section className={styles.wrap} aria-labelledby="pillars-title">
      <p className={styles.pill}>Panchamukhi Shikshana</p>
      <h2 id="pillars-title">The Five Pillars of Education</h2>
      <p className={styles.intro}>
        Panchamukhi Shikshana—our five-pronged education system combining Veda,
        Yoga, Bharatiya Agriculture, Bharatiya Science, and Art &amp; Music.
        This unique approach brings out the inner strength in our students,
        fostering self-study, self-thinking, self-discipline, and
        self-dependence for all-round personality development.
      </p>
      <div className={styles.grid}>
        {pillars.map((p) => (
          <article className={`${styles.card} ${styles[p.tone]}`} key={p.title}>
            <div className={styles.cardHead}>
              <span className={styles.icon}>{p.icon}</span>
              <h3>{p.title}</h3>
            </div>
            <p className={styles.subtitle}>{p.subtitle}</p>
            <p className={styles.body}>{p.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
