import styles from "./volunteer-photos.module.css";

const photos = [
  { src: "/images/volunteers/volunteer-1.svg", alt: "A volunteer teaching Sanskrit to students at the blackboard", caption: "Teaching & Sanskrit" },
  { src: "/images/volunteers/volunteer-2.svg", alt: "A volunteer feeding cows at the goshala", caption: "Goshala service" },
  { src: "/images/volunteers/volunteer-3.svg", alt: "A volunteer preparing lamps and garlands for the temple", caption: "Temple services" },
  { src: "/images/volunteers/volunteer-4.svg", alt: "Volunteers cataloguing books and palm-leaf manuscripts in the library", caption: "Library care" },
  { src: "/images/volunteers/volunteer-5.svg", alt: "Volunteers helping organise a festival gathering", caption: "Events & festivals" },
  { src: "/images/volunteers/volunteer-6.svg", alt: "A volunteer walking to a village to share the Trust’s work", caption: "Community outreach" },
];

/** A band of pictures of volunteers at work, shown above the ways to contribute. */
export function VolunteerPhotos() {
  return (
    <ul aria-label="Volunteers at work" className={styles.grid}>
      {photos.map((p) => (
        <li key={p.src}>
          <figure>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt={p.alt} height={300} loading="lazy" src={p.src} width={400} />
            <figcaption>{p.caption}</figcaption>
          </figure>
        </li>
      ))}
    </ul>
  );
}
