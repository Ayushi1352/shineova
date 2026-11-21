/**
 * Line drawings used as decoration (hero sparkles and bubbles, the green brush strokes under title words,
 * the dotted arrows between the How It Works steps). They draw in `currentColor`, so each place sets the colour and size with classes.
 */
type ArtProps = { className?: string };

/** Three outlined four-point sparkles */
export const SparklesArt = ({ className }: ArtProps) => (
  <svg viewBox="0 0 160 160" fill="none" aria-hidden="true" className={className}>
    <g stroke="currentColor" strokeWidth="5" strokeLinejoin="round">
      <path d="M108 8c3 26 14 38 40 42-26 4-37 16-40 42-3-26-14-38-40-42 26-4 37-16 40-42Z" />
      <path d="M36 56c2 15 8 22 23 24-15 2-21 9-23 24-2-15-8-22-23-24 15-2 21-9 23-24Z" />
      <path d="M82 106c2 13 7 19 20 21-13 2-18 8-20 21-2-13-7-19-20-21 13-2 18-8 20-21Z" />
    </g>
  </svg>
);

/** Soap bubbles with small sparkles */
export const BubblesArt = ({ className }: ArtProps) => (
  <svg viewBox="0 0 160 170" fill="none" aria-hidden="true" className={className}>
    <g stroke="currentColor" strokeWidth="5">
      <circle cx="94" cy="112" r="44" />
      <circle cx="42" cy="88" r="28" />
      <circle cx="64" cy="146" r="18" />
      <circle cx="74" cy="12" r="7" />
      <circle cx="80" cy="36" r="5" />
      <path d="M26 84a18 18 0 0 1 14-16M70 98a30 30 0 0 1 22-14" strokeLinecap="round" />
    </g>
    <g fill="currentColor">
      <path d="M112 92c1 8 4 11 12 12-8 1-11 4-12 12-1-8-4-11-12-12 8-1 11-4 12-12Z" />
      <path d="M134 26c1 7 4 10 11 11-7 1-10 4-11 11-1-7-4-10-11-11 7-1 10-4 11-11Z" />
      <path d="M130 122c1 6 3 8 9 9-6 1-8 3-9 9-1-6-3-8-9-9 6-1 8-3 9-9Z" />
      <circle cx="150" cy="60" r="3" />
      <circle cx="20" cy="150" r="3" />
    </g>
  </svg>
);

/** Green brush stroke drawn under a highlighted title word (placed with absolute position classes) */
export const BrushStroke = ({ className = "" }: ArtProps) => (
  <svg viewBox="0 0 300 30" preserveAspectRatio="none" aria-hidden="true" className={`absolute text-[var(--color-green-dark)] ${className}`}>
    <path d="M2 27C70 8 170 2 298 14C180 9 80 14 2 27Z" fill="currentColor" />
  </svg>
);

/** Dotted arc with an arrow head, from one step to the next */
export const DottedArrowArt = ({ className }: ArtProps) => (
  <svg viewBox="0 0 110 40" fill="none" aria-hidden="true" className={className}>
    <path d="M4 30C30 4 72 2 98 26" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeDasharray="1 9" />
    <path d="M86 24l15 6-3-16" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
