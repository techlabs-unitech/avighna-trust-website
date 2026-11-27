/* Decorative heritage motifs — pure SVG, no images. All are aria-hidden. */

/** Sixteen-petal lotus mandala with concentric rings. Uses currentColor. */
export function Mandala({ className }: { className?: string }) {
  const petals = Array.from({ length: 16 }, (_, i) => i * 22.5);
  const inner = Array.from({ length: 8 }, (_, i) => i * 45 + 22.5);
  return (
    <svg aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="-200 -200 400 400">
      <circle r="196" strokeDasharray="2 6" />
      <circle r="184" />
      <circle r="150" />
      {petals.map((a) => (
        <path d="M0 -150 C 26 -122 26 -92 0 -62 C -26 -92 -26 -122 0 -150Z" key={a} transform={`rotate(${a})`} />
      ))}
      {petals.map((a) => (
        <circle cx="0" cy="-168" key={`d${a}`} r="3.2" transform={`rotate(${a})`} fill="currentColor" stroke="none" />
      ))}
      <circle r="62" />
      {inner.map((a) => (
        <path d="M0 -62 C 16 -46 16 -30 0 -16 C -16 -30 -16 -46 0 -62Z" key={a} transform={`rotate(${a})`} />
      ))}
      <circle r="14" />
      <circle r="4" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** A single lotus bud flanked by fine lines — used under section headings. */
export function LotusDivider({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 240 28">
      <path d="M0 14h92M148 14h92" stroke="currentColor" strokeWidth="1" opacity=".55" />
      <circle cx="96" cy="14" r="2" fill="currentColor" opacity=".7" />
      <circle cx="144" cy="14" r="2" fill="currentColor" opacity=".7" />
      <g stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round">
        <path d="M120 3c6 5 8 11 0 22-8-11-6-17 0-22Z" fill="currentColor" fillOpacity=".25" />
        <path d="M120 25c-9-1-15-6-17-14 8 0 14 4 17 14Z" />
        <path d="M120 25c9-1 15-6 17-14-8 0-14 4-17 14Z" />
      </g>
    </svg>
  );
}

/** Oil-lamp (diya) with flame. */
export function Diya({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 48 48">
      <path d="M24 5c5 6 7 11 0 18-7-7-5-12 0-18Z" fill="#e3a11c" stroke="#a3201f" strokeWidth="1.4" />
      <path d="M24 12c2 3 2 6 0 8-2-2-2-5 0-8Z" fill="#fff3b0" />
      <path d="M5 28c0 9 8 14 19 14s19-5 19-14H5Z" fill="currentColor" fillOpacity=".18" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M12 28c3-3 21-3 24 0" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

/** Corner flourish for palm-leaf panels. */
export function Corner({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth="1.3" viewBox="0 0 40 40">
      <path d="M2 38V14C2 7 7 2 14 2h24" />
      <path d="M9 38V16c0-4 3-7 7-7h22" opacity=".6" />
      <circle cx="14" cy="14" r="2.4" fill="currentColor" stroke="none" />
    </svg>
  );
}
