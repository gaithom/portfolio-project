export const THEMES = {
  forest: {
    name:"Forest", icon:"🌿", layout:"organic",
    bg:"#3c6057", bgAlt:"#0A2114", surface:"#0D2C19", surfaceAlt:"rgba(13,44,25,0.55)",
    /* Warm stone, not the old #4E9E74. That green measured 2.15:1 against this
       layout's own background and is used inline as a text colour throughout,
       so no stylesheet rule could reach it — the token is the only fix.
       #C3B49A reads 3.44:1 on the ground and 8.32:1 on the surfaces, and is
       desaturated enough to sit in a forest palette without glaring. */
    accent:"#C3B49A", accentSub:"#8E8268",
    text:"#f2efe7", textMuted:"#f2efe7",
    border:"rgba(78,158,116,0.11)", borderMid:"rgba(78,158,116,0.22)",
    animFg:"rgba(160,210,180,0.09)", animDot:"rgba(160,210,180,0.13)", animOrb:"rgba(78,158,116,0.07)",
    shadow:"0 4px 28px rgba(0,0,0,0.38)", shadowMd:"0 8px 44px rgba(0,0,0,0.46)",
    particleRgb:"155,205,170",
    devAccent:"#00FF88", devBg:"rgba(2,12,6,0.97)", devBorder:"rgba(0,255,136,0.22)",
    // Fonts
    fontFamily:"'Instrument Sans', sans-serif",
    headingFont:"'Instrument Sans', sans-serif",
    bodyFont:"'Instrument Sans', sans-serif",
    /* Not a monospace any more — this token only ever dressed small labels,
       and those are Google Sans across the site now. */
    monoFont:"'Google Sans', sans-serif",
    // Layout personality: organic, asymmetric, nature-coded
    heroRadius:"0 0 60% 60% / 0 0 40px 40px",
    cardRadius:"18px 4px 18px 4px",
    sectionShape:"organic",
  },
  
  
  light: {
    name:"Light", icon:"☀️", layout:"minimal",
    /* Flat warm off-white, matched to the reference by eye. Kept separate
       from --cream (#f2efe7), which is still the colour of type on dark
       grounds and of the work copy card. */
    bg:"#EFEBE4", bgAlt:"#E9EDE4", surface:"#FFFFFF", surfaceAlt:"rgba(255,255,255,0.72)",
    accent:"#3c6057", accentSub:"#3c6057",
    text:"#1A2B1E", textMuted:"#3c6057",
    border:"rgba(60,96,87,0.11)", borderMid:"rgba(60,96,87,0.22)",
    animFg:"rgba(60,96,87,0.07)", animDot:"rgba(60,96,87,0.12)", animOrb:"rgba(60,96,87,0.06)",
    shadow:"0 4px 24px rgba(0,0,0,0.07)", shadowMd:"0 8px 40px rgba(0,0,0,0.10)",
    particleRgb:"60,96,87",
    devAccent:"#3c6057", devBg:"rgba(248,252,249,0.98)", devBorder:"rgba(60,96,87,0.22)",
    // Fonts
    fontFamily:"'Instrument Sans', sans-serif",
    headingFont:"'Instrument Sans', sans-serif",
    bodyFont:"'Instrument Sans', sans-serif",
    /* Not a monospace any more — this token only ever dressed small labels,
       and those are Google Sans across the site now. */
    monoFont:"'Google Sans', sans-serif",
    // Layout personality: airy, minimal, Swiss grid
    heroRadius:"0",
    cardRadius:"8px",
    sectionShape:"minimal",
  },
};
