import React, { useState, useRef, useEffect } from "react";
import { useGSAP } from "../hooks/useGSAP";
import { Typewriter, SkillBar, Modal } from "../components/Shared";
import { DevBadge } from "../components/DeveloperMode";
import { PROJECTS, SKILLS, TECH, CONTACT_INFO } from "../data/content";
import "./LightLayout.css";

// ── Capabilities shown in the horizontal case-study rail ─────────────────────
const CAPABILITIES = [
  { id: "01", title: "UI/UX Design", variant: "blueprint",
    kicker: "Interface & flow",
    desc: "Design systems, information hierarchy and flow mapping for products that stay legible as they grow.",
    tags: ["Wireframes", "User flows", "Prototypes"],
    deliverable: "Figma library + annotated flows" },
  { id: "02", title: "Frontend Development", variant: "terminal",
    kicker: "Design, built",
    desc: "Component architecture and state strategy that keeps an interface fast, accessible and maintainable in production.",
    tags: ["React", "Components", "State"],
    deliverable: "Typed component library" },
  { id: "03", title: "Motion Design", variant: "motion",
    kicker: "Timing & easing",
    desc: "Interface motion that clarifies intent and communicates hierarchy. Every curve is chosen, and none of it is decorative.",
    tags: ["GSAP", "Micro-interactions", "Easing"],
    deliverable: "Motion spec + prototypes" },
  { id: "04", title: "Responsive Design", variant: "responsive",
    kicker: "Every breakpoint",
    desc: "Layout systems that adapt across breakpoints without losing rhythm, readability or hierarchy.",
    tags: ["Fluid grid", "Breakpoints", "Type scale"],
    deliverable: "Responsive layout system" },
  { id: "05", title: "Accessibility", variant: "a11y",
    kicker: "Designed in, not patched on",
    desc: "Contrast, keyboard paths and semantic structure resolved during design rather than retrofitted before launch.",
    tags: ["WCAG 2.2", "Keyboard", "Semantics"],
    deliverable: "Audit + remediated components" },
  { id: "06", title: "Design Systems", variant: "tokens",
    kicker: "One source of truth",
    desc: "Token-led styling and documented patterns that speed delivery while holding visual consistency across teams.",
    tags: ["Tokens", "Patterns", "Docs"],
    deliverable: "Token set + usage docs" },
  { id: "07", title: "Performance UX", variant: "metrics",
    kicker: "Speed people feel",
    desc: "Perceived-speed work across loading states, rendering strategy and interaction cost, measured rather than guessed.",
    tags: ["Core Web Vitals", "Perceived", "Budgets"],
    deliverable: "Performance budget + report" }
];

// ── Type specimen ────────────────────────────────────────────────────────────
const TYPEFACES = [
  { name: "Roboto", role: "Display", font: "'Roboto', sans-serif", weight: 900, sample: "Structure", note: "Headlines, numerals" },
  { name: "Poppins", role: "Geometric sans", font: "'Poppins', sans-serif", weight: 700, sample: "Balance", note: "Section titles" },
  { name: "Inter", role: "UI sans", font: "'Inter', sans-serif", weight: 500, sample: "Legible", note: "Body, interface" },
  { name: "Playfair Display", role: "Transitional serif", font: "'Playfair Display', serif", weight: 700, italic: true, sample: "Editorial", note: "Pull quotes" },
  { name: "Lora", role: "Old-style serif", font: "'Lora', serif", weight: 500, sample: "Rhythm", note: "Long-form reading" },
  { name: "Space Mono", role: "Monospace", font: "'Space Mono', monospace", weight: 400, sample: "Metadata", note: "Labels, specs" }
];

// ── Colour system ────────────────────────────────────────────────────────────
// Grouped by shade family rather than by job: every green sits in one ramp,
// every warm in the next, and so on. The old "Signal" group was semantic, not
// chromatic — it held a teal, an orange, a near-black and two blues — so its
// members moved to the family each one actually belongs to and what was left
// became the blue-neutral ramp.
//
// `ratio` is against this layout's page background. That background moved from
// #F2EFE7 to #EFEBE4 and the figures were never re-derived, so all of them are
// recomputed here (WCAG 2.1 relative luminance). No published grade changed,
// but several numbers did — Moss 900 was claiming 8.06 and reads 7.79.
//
// `on` is the label colour printed on that swatch, and is measured against the
// swatch itself. Normally it is the family's own 100 tint or 900, whichever
// clears AA. Three mid-tones clear neither — #7A9E8E manages 2.63 on its tint
// and 3.14 on its 900 — so those carry a near-black mixed from the family's
// own hue rather than a neutral grey that would read as a different system.
//
// Slate 700 and 500 are new. That ramp inherited only three members from the
// redistribution and read as a broken ladder beside the six-step families.
const PALETTES = [
  { name: "Moss", use: "Greens — brand, primary actions", steps: [
    { step: "900", hex: "#2F4D45", role: "Text",    ratio: "7.79",  grade: "AAA", on: "#EDF3EF" },
    { step: "800", hex: "#3C6057", role: "Body",    ratio: "5.89",  grade: "AA",  on: "#EDF3EF" },
    { step: "600", hex: "#0F766E", role: "Success", ratio: "4.61",  grade: "AA",  on: "#EDF3EF" },
    { step: "500", hex: "#7A9E8E", role: "Accent",  on: "#101C18" },
    { step: "300", hex: "#C7D9D0", role: "Line",    on: "#2F4D45" },
    { step: "100", hex: "#EDF3EF", role: "Surface", on: "#2F4D45" }
  ] },
  { name: "Clay", use: "Warm earth — editorial, warning", steps: [
    { step: "900", hex: "#4A3A24", role: "Text",    ratio: "9.20",  grade: "AAA", on: "#F8EFE9" },
    { step: "800", hex: "#7E6440", role: "Body",    ratio: "4.67",  grade: "AA",  on: "#F8EFE9" },
    { step: "600", hex: "#A24908", role: "Warning", ratio: "5.06",  grade: "AA",  on: "#F8EFE9" },
    { step: "500", hex: "#C4A882", role: "Accent",  on: "#4A3A24" },
    { step: "300", hex: "#E4D3BC", role: "Line",    on: "#4A3A24" },
    { step: "100", hex: "#F8EFE9", role: "Surface", on: "#4A3A24" }
  ] },
  { name: "Dusk", use: "Violets — secondary accent, depth", steps: [
    { step: "900", hex: "#2A2438", role: "Text",    ratio: "12.55", grade: "AAA", on: "#E8DFF5" },
    { step: "700", hex: "#4A3F6B", role: "Body",    ratio: "7.98",  grade: "AAA", on: "#E8DFF5" },
    { step: "500", hex: "#8B7CB8", role: "Accent",  ratio: "3.12",  grade: "AA Large", on: "#0E0B14" },
    { step: "300", hex: "#C3B8E0", role: "Line",    on: "#2A2438" },
    { step: "100", hex: "#E8DFF5", role: "Surface", on: "#2A2438" }
  ] },
  { name: "Slate", use: "Blue neutrals — state, code, info", steps: [
    { step: "900", hex: "#14202E", role: "Text",    ratio: "13.85", grade: "AAA", on: "#F1F5FF" },
    { step: "700", hex: "#33465C", role: "Body",    ratio: "8.14",  grade: "AAA", on: "#F1F5FF" },
    { step: "500", hex: "#6F89A8", role: "Accent",  ratio: "3.04",  grade: "AA Large", on: "#14202E" },
    { step: "300", hex: "#DCE6FF", role: "Info",    on: "#14202E" },
    { step: "100", hex: "#F1F5FF", role: "Surface", on: "#14202E" }
  ] }
];

// ── Expression canvas composition ────────────────────────────────────────────
// Two panels, after the reference: the type specimens run down a narrow panel
// on the left, and the colour sits in the bigger panel on the right as a field
// of cards on its own dotted ground.
//
// Inside that panel the cards are uniform portrait blocks on an 8 x 4 grid,
// one family to a quadrant. The airiness comes from the gutter, not from empty
// cells — the reference's own grid is filled edge to edge and reads open
// because the gaps are wide. Two cells are left over and they sit at the foot
// of the lower two quadrants.
//
// Each family's darkest step keeps the bend: a bar two cells wide with a leg
// under its left half, welded into one card. Everything else is a single cell.
// Inside the right panel each family keeps the composition it had — the same
// two bends and the same track sizes, taken from the reference's own measured
// card edges — just smaller, so all four sit in the panel at once:
//
//   columns  179 : 45 : 179 : 185        rows  157 : 10 : 155 : 142
//
//        A     bar   bar   bar
//        A     leg   leg   C
//        shin  leg   leg   C
//        foot  foot  E     C
//
// Two cards bend, opposite ways: bar+leg is wide on top and narrower below,
// its notch holding the tall C; shin+foot is narrow on top and wider below,
// its notch holding the leg. Each is one card drawn as two fused rects,
// because a single element cannot be L-shaped and keep rounded outer corners.
const FAM_SLOTS = {
  A:    "1 / 1 / 3 / 2",
  bar:  "1 / 2 / 2 / 5",   leg:  "2 / 2 / 4 / 4",
  shin: "3 / 1 / 4 / 2",   foot: "4 / 1 / 5 / 3",
  C:    "2 / 4 / 5 / 5",   C1:   "2 / 4 / 4 / 5",  C2: "4 / 4 / 5 / 5",
  E:    "4 / 3 / 5 / 4"
};

/* Slot per shade, biggest card first, so a family still reads as a ramp even
   though its cards are scattered. "B" and "D" are the bent ones and each
   expands to a pair at render; six-shade families split the tall card. */
const FAM_ORDER = {
  6: ["B", "D", "C1", "A", "E", "C2"],
  5: ["B", "D", "C", "A", "E"]
};

/* [labelled piece, inert piece]. The label goes on the piece at the bottom of
   the silhouette, and the inert one follows it in the DOM so one hover can
   lift both — an adjacent-sibling selector only reaches forwards. */
const BENT_PAIRS = { B: ["leg", "bar"], D: ["foot", "shin"] };

// Down the left panel, in the order they are listed.
const EXPRESSION_WORDS = [
  { word: "Structure", face: "Roboto",           role: "Display",            font: "'Roboto', sans-serif",      weight: 900, colour: "#2F4D45" },
  { word: "Editorial", face: "Playfair Display", role: "Transitional serif", font: "'Playfair Display', serif", weight: 700, colour: "#4A3F6B", italic: true },
  { word: "Legible",   face: "Inter",            role: "UI sans",            font: "'Inter', sans-serif",       weight: 500, colour: "#3C6057" },
  { word: "Balance",   face: "Poppins",          role: "Geometric sans",     font: "'Poppins', sans-serif",     weight: 700, colour: "#2A2438" },
  { word: "Rhythm",    face: "Lora",             role: "Old-style serif",    font: "'Lora', serif",             weight: 500, colour: "#7E6440" },
  { word: "Metadata",  face: "Space Mono",       role: "Monospace",          font: "'Space Mono', monospace",   weight: 400, colour: "#0F766E" }
];

// ── Contact ──────────────────────────────────────────────────────────────────
// The intent only sets the subject line. Nothing is collected here and nothing
// is posted anywhere — the visitor's own mail client does the sending, which is
// why there is no form to fill in and no server to receive it.
const CONTACT_EMAIL = "michaelgaitho47@gmail.com";

const CONTACT_INTENTS = [
  { id: "project", label: "A new project", note: "Design, build or both", subject: "New project" },
  { id: "role", label: "A role", note: "Full time or contract", subject: "Role enquiry" },
  { id: "hello", label: "Something else", note: "Questions, or just hello", subject: "Hello" }
];

// ── Capability pages ─────────────────────────────────────────────────────────
// Two at a time rather than a sticky deck. A page is two cards that bend
// opposite ways and nest: the first narrow on top and widening below, the
// second wide on top and narrowing to the right, each one's step sitting in
// the space the other leaves.
//
// Measured off the reference, the page is a 3 x 2 grid of 492 : 172 : 494 by
// 423 : 335, which puts every piece within 0.3% of its size there. The split
// suits these cards exactly — each one already had a copy half and an artwork
// half, which is what the two halves of a bend hold.
//
//   A-copy   B-field  B-field    Copy sits where it always did — the top of
//   A-field  A-field  B-copy     the first card, the foot of the second.
//                                The other half is left as open colour, which
//                                is where the drawn artefacts used to be.
//
// An odd card at the end gets a page to itself in the same shape, widened by
// a column so it still fills the page.
const CAP_PAGES = CAPABILITIES.reduce((pages, c, i) => {
  if (i % 2 === 0) pages.push([c]); else pages[pages.length - 1].push(c);
  return pages;
}, []);

/* [slot, what it holds, which bend] per position. shin and leg are the narrow
   halves that reach out to meet their wider partner; bar and foot are wide.

   Both halves of a card carry the same colour, so a card reads as one block
   with its copy in one half and the other left open — which is what the
   reference does, and what the drawn artefacts were getting in the way of. */
const CAP_SLOTS = {
  lead:  [["a-head", "copy", "shin"], ["a-body", "field", "foot"]],
  trail: [["b-head", "field", "bar"], ["b-body", "copy", "leg"]],
  solo:  [["solo-head", "copy", "shin"], ["solo-body", "field", "foot"]]
};

// ── Hero navigation ──────────────────────────────────────────────────────────
// Mapped to the sections this layout actually renders, not the labels from the
// reference.
const HERO_NAV = [
  { label: "About", id: "about" },
  { label: "What I Do", id: "what-i-do" },
  { label: "Expertise", id: "skills" },
  { label: "Work", id: "projects" },
  { label: "Type", id: "type-canvas" },
  { label: "Contact", id: "contact" }
];

// Split either side of the mark. In the condensed bar the first two sit to the
// LEFT of the logo, which moves the bar's empty middle to its actual middle —
// with everything after a narrow logo the gap sat well off-centre. The hero
// column puts them back in reading order with `order`, so only the bar changes.
const HERO_NAV_LEAD = HERO_NAV.slice(0, 2);
const HERO_NAV_TRAIL = HERO_NAV.slice(2);
export function LightLayout({ theme, devMode, scrollTo, tIdx, setTIdx, sel, setSel }) {
  const heroRef=useRef(null),heroTitleRef=useRef(null),heroDescRef=useRef(null),developerRef=useRef(null);
  const aboutRef=useRef(null),skillsRef=useRef(null),projectsRef=useRef(null),typeCanvasRef=useRef(null),contactRef=useRef(null);
  const designSectionRef=useRef(null);
  const [developerFill, setDeveloperFill] = useState(0);
  // Screenshots that failed to load. A project can name an image before the
  // file exists; the card then falls back to its title card instead of
  // rendering an empty rectangle.
  const [missingShots, setMissingShots] = useState({});
  const [activeSection, setActiveSection] = useState(null);

  /* The hero rail is this layout's navbar. Once you leave the top of the page
     it detaches and rides along as a bar; 60px rather than 0 so a one-notch
     wheel nudge does not toggle it. */
  const [navCondensed, setNavCondensed] = useState(false);
  useEffect(() => {
    const read = () => setNavCondensed(window.scrollY > 60);
    read();
    window.addEventListener("scroll", read, { passive: true });
    return () => window.removeEventListener("scroll", read);
  }, []);

  /* The work rail's scroll position, so the arrows can disable themselves at
     each end instead of looking live when they would do nothing. */
  const workRailRef = useRef(null);
  const [railEdges, setRailEdges] = useState({ atStart: true, atEnd: false });
  const capRailRef = useRef(null);
  const [capEdges, setCapEdges] = useState({ atStart: true, atEnd: false });
  /* Which panel is the one you have scrolled to. Its copy card rises; the
     others stay retracted, which is what makes the rail read as a deck you
     move through rather than three equal cards. */
  const [openWork, setOpenWork] = useState(0);

  useEffect(() => {
    const rail = workRailRef.current;
    if (!rail) return undefined;
    const read = () => {
      // 1px of slack: fractional layout widths mean scrollLeft rarely lands
      // exactly on the maximum, which would leave the arrow enabled forever.
      const max = rail.scrollWidth - rail.clientWidth;
      setRailEdges({ atStart: rail.scrollLeft <= 1, atEnd: rail.scrollLeft >= max - 1 });
    };
    // Whichever panel shows the most of itself inside the rail is the open
    // one. Measured off the rail's own box, not the viewport, because the rail
    // scrolls independently of the page.
    const readOpen = () => {
      const cards = [...rail.querySelectorAll(".wk-card")];
      if (!cards.length) return;
      const r = rail.getBoundingClientRect();
      let best = 0, bestSeen = -1;
      cards.forEach((c, i) => {
        const b = c.getBoundingClientRect();
        const seen = Math.max(0, Math.min(b.right, r.right) - Math.max(b.left, r.left));
        if (seen > bestSeen) { bestSeen = seen; best = i; }
      });
      setOpenWork(best);
    };

    const onScroll = () => { read(); readOpen(); };
    read();
    readOpen();
    rail.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      rail.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // The capability field pages sideways on the same terms as the work rail.
  useEffect(() => {
    const rail = capRailRef.current;
    if (!rail) return undefined;
    const read = () => {
      // 1px of slack: fractional layout widths mean scrollLeft rarely lands
      // exactly on the maximum, which would leave the arrow enabled forever.
      const max = rail.scrollWidth - rail.clientWidth;
      setCapEdges({ atStart: rail.scrollLeft <= 1, atEnd: rail.scrollLeft >= max - 1 });
    };
    read();
    rail.addEventListener("scroll", read, { passive: true });
    window.addEventListener("resize", read);
    return () => {
      rail.removeEventListener("scroll", read);
      window.removeEventListener("resize", read);
    };
  }, []);

  const scrollCapRail = (dir) => {
    const rail = capRailRef.current;
    if (!rail) return;
    const page = rail.querySelector(".cap-page");
    const gap = parseFloat(getComputedStyle(rail).columnGap) || 0;
    const step = page ? page.getBoundingClientRect().width + gap : rail.clientWidth * 0.8;
    rail.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  // One panel plus its gap, read from the live layout rather than hard-coded,
  // so it stays correct as the panel width clamps with the viewport.
  const scrollWorkRail = (dir) => {
    const rail = workRailRef.current;
    if (!rail) return;
    const card = rail.querySelector(".wk-card");
    const gap = parseFloat(getComputedStyle(rail).columnGap) || 0;
    const step = card ? card.getBoundingClientRect().width + gap : rail.clientWidth * 0.8;
    rail.scrollBy({ left: dir * step, behavior: "smooth" });
  };


  // Contact: which subject the visitor picked, and whether the address has
  // just been copied.
  const [intent, setIntent] = useState(null);
  const [copied, setCopied] = useState(false);
  const activeIntent = CONTACT_INTENTS.find((t) => t.id === intent) || null;
  const mailtoHref = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
    activeIntent ? activeIntent.subject : "Hello"
  )}`;

  const copyEmail = async () => {
    // Confirm first, write after. The clipboard call can stall behind a
    // permission check, and waiting on it made the click feel unresponsive
    // even though the copy itself had succeeded.
    setCopied(true);
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
    } catch {
      // clipboard is unavailable over plain http and in some embedded views,
      // so fall back to a selection-based copy rather than failing silently.
      const ta = document.createElement("textarea");
      ta.value = CONTACT_EMAIL;
      ta.setAttribute("readonly", "");
      ta.style.cssText = "position:fixed;top:-1000px;opacity:0";
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand("copy"); } catch { /* nothing else to try */ }
      document.body.removeChild(ta);
    }
  };

  // Clear the "Copied" label a couple of seconds after it appears.
  useEffect(() => {
    if (!copied) return undefined;
    const t = setTimeout(() => setCopied(false), 1500);
    return () => clearTimeout(t);
  }, [copied]);

  // Developer word — fill follows cursor left → right, unfills right → left
  useEffect(() => {
    const el = developerRef.current;
    if (!el) return;

    const updateFill = (clientX) => {
      const rect = el.getBoundingClientRect();
      if (!rect.width) return;
      const x = clientX - rect.left;
      setDeveloperFill(Math.max(0, Math.min(1, x / rect.width)));
    };

    const onMove = (e) => updateFill(e.clientX);
    const onLeave = () => setDeveloperFill(0);

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  // A project can name a screenshot before the file exists. Both the CRA dev
  // server and `serve -s build` answer unknown paths with index.html at HTTP
  // 200, so a missing image is not a 404 and the <img> error event cannot be
  // relied on — check the content type instead.
  useEffect(() => {
    let cancelled = false;
    PROJECTS.filter((p) => p.image).forEach(async (p) => {
      try {
        const res = await fetch(p.image, { method: "HEAD" });
        const type = res.headers.get("content-type") || "";
        if (!cancelled && !(res.ok && type.startsWith("image/"))) {
          setMissingShots((m) => ({ ...m, [p.id]: true }));
        }
      } catch {
        if (!cancelled) setMissingShots((m) => ({ ...m, [p.id]: true }));
      }
    });
    return () => { cancelled = true; };
  }, []);

  // 100vw includes the scrollbar but the layout does not, so anything sized
  // from 100vw sits half a scrollbar out of step with the grid. Publishing the
  // real width lets the card's rule layer line up exactly.
  useEffect(() => {
    const setScrollbarWidth = () => {
      const w = window.innerWidth - document.documentElement.clientWidth;
      document.documentElement.style.setProperty("--sbw", `${w}px`);

      /* The gap between the page column and the screen edge, published as a
         real length. It cannot be a percentage in CSS: `padding` percentages
         resolve against the containing block while `scroll-padding` ones
         resolve against the scrollport, so one custom property would mean two
         different sizes and the snap would rest in the wrong place. */
      const inner = document.querySelector(".work-inner");
      if (inner) {
        const gutter = Math.max(0, Math.round(inner.getBoundingClientRect().left));
        document.documentElement.style.setProperty("--page-gutter", `${gutter}px`);
      }
    };
    setScrollbarWidth();
    window.addEventListener("resize", setScrollbarWidth);
    return () => window.removeEventListener("resize", setScrollbarWidth);
  }, []);

  // Jump the pinned rail to a given card. The rail is driven by scroll
  // position, so navigating means scrolling the page to the matching offset
  // rather than moving the track directly.
  useGSAP((gsap,ST)=>{

    const heroSoftware=heroTitleRef.current?.querySelector(".hero-line-software");
    const heroName=heroTitleRef.current?.querySelector(".hero-title-name");
    const heroArrow=heroTitleRef.current?.querySelector(".hero-title-arrow");
    const heroBits=[heroName,heroArrow,heroSoftware,developerRef.current,heroDescRef.current].filter(Boolean);
    gsap.set(heroBits,{opacity:0});

    const heroIntro=gsap.timeline({delay:0.45,defaults:{ease:"expo.out"}});
    if(heroName){
      heroIntro.fromTo(heroName,
        {yPercent:110,opacity:0},
        {yPercent:0,opacity:1,duration:0.95,ease:"power4.out"}
      );
    }
    if(heroArrow){
      heroIntro.fromTo(heroArrow,
        {x:-26,opacity:0},
        {x:0,opacity:1,duration:0.7,ease:"power3.out"},
        "-=0.55"
      );
    }
    if(heroSoftware){
      heroIntro.fromTo(heroSoftware,
        {yPercent:115,opacity:0,rotateX:18,transformOrigin:"0% 100%"},
        {yPercent:0,opacity:1,rotateX:0,duration:1.05,ease:"power4.out"}
      );
    }
    if(developerRef.current){
      heroIntro.fromTo(developerRef.current,
        {y:56,opacity:0,scale:0.9,filter:"blur(10px)"},
        {y:0,opacity:1,scale:1,filter:"blur(0px)",duration:1.15,ease:"expo.out"},
        "-=0.7"
      );
    }
    if(heroDescRef.current){
      heroIntro.fromTo(heroDescRef.current,
        {y:28,opacity:0,filter:"blur(4px)"},
        {y:0,opacity:1,filter:"blur(0px)",duration:0.8},
        "-=0.55"
      );
    }
    
    // The .name-bg / .name-float parallax that used to sit here targeted
    // elements this layout no longer renders, and the .srv-card reveal below
    // it matched nothing either. Both removed rather than left running.


    // The What-I-Do section used to be a pinned horizontal rail driven by
    // ScrollTrigger. It is now a sticky stacking deck handled entirely in CSS,
    // which scrolls natively and costs nothing per frame.

    let skillsCleanup;
    if(skillsRef.current){
      const section=skillsRef.current;
      const header=section.querySelector(".expertise-header");
      const skillRows=section.querySelectorAll(".expertise-skill-row");
      const techArena=section.querySelector(".expertise-tech-arena");
      const stackTiles=section.querySelectorAll(".expertise-stack-tile");

      if(header){
        gsap.fromTo(header.children,
          {y:28,opacity:0},
          {y:0,opacity:1,stagger:.1,duration:.8,ease:"expo.out",scrollTrigger:{trigger:section,start:"top 82%"}}
        );
      }

      if(techArena){
        gsap.fromTo(techArena,
          {x:32,opacity:0},
          {x:0,opacity:1,duration:.95,ease:"expo.out",scrollTrigger:{trigger:section,start:"top 78%"}}
        );
        /* Each tile sits under a panel of the page green, which drains away to
           reveal the tool. Ordered by where the tiles actually sit rather than
           by DOM order, so the reveal follows the arrangement down and across
           instead of jumping around it. Nothing moves — only the veil scales —
           so the tiles never come off their shared edges. */
        const toolVeils=[...techArena.querySelectorAll(".tool-veil")];
        if(toolVeils.length){
          const inReadingOrder=toolVeils.slice().sort((a,b)=>{
            const A=a.getBoundingClientRect(),B=b.getBoundingClientRect();
            return (A.top-B.top)||(A.left-B.left);
          });
          /* --wipe drives a clip-path rather than a scale: scaling the veil
             squashed the blueprint mark inside it. 0% is fully covered. */
          gsap.set(inReadingOrder,{"--wipe":"0%"});
          /* Scrubbed, not fired once: the timeline is mapped onto the scroll
             range, so a tile keeps its green until the scroll actually
             reaches it and clears as you carry on. The range is long and
             finishes well before the section leaves the screen, so the whole
             sequence is watchable rather than flashing past. ease "none"
             because the scroll position is the easing. */
          gsap.to(inReadingOrder,
            {"--wipe":"100%",duration:1,ease:"none",stagger:.75,
             scrollTrigger:{
               trigger:techArena,
               start:"top 92%",
               end:"bottom 35%",
               scrub:.8
             }}
          );
        }
      }

      if(skillRows.length){
        // The meter fill is gone; the level marks grow up from their base
        // instead, one after the other, which suits a stepped scale better
        // than a bar sliding out.
        skillRows.forEach((row)=>{
          const marks=row.querySelectorAll(".ex-level i");
          if(marks.length)gsap.set(marks,{scaleY:0,transformOrigin:"bottom center"});
        });
        // The field is one connected object now, so it reveals as one. Sliding
        // each tile in on its own stagger pulled them apart from their shared
        // edges for the length of the animation.
        const skillField = section.querySelector(".expertise-skill-list");
        if(skillField){
          gsap.fromTo(skillField,
            {x:-20,opacity:0},
            {x:0,opacity:1,duration:.7,ease:"expo.out",scrollTrigger:{trigger:section,start:"top 80%"}}
          );
        }
        skillRows.forEach((row)=>{
          const marks=row.querySelectorAll(".ex-level i");
          if(marks.length){
            gsap.to(marks,
              {scaleY:1,stagger:.07,duration:.45,ease:"back.out(2)",scrollTrigger:{trigger:row,start:"top 90%"}}
            );
          }
        });
      }

      skillsCleanup=()=>{};
    }

    // Scroll reveals are deliberately limited to the hero intro (above) and
    // the expertise/stack section. Every other section now renders in place:
    // the page had reached the point where almost everything animated in, and
    // the effect had stopped reading as intentional.

    // The pinned rail inserts a pin-spacer and changes the document height
    // *after* the triggers below it are created, leaving their start/end
    // positions stale — reveals further down the page then never fire and
    // their elements stay at opacity 0. Recompute once the pin and the web
    // fonts have settled.
    const refreshRafId=requestAnimationFrame(()=>ST.refresh());
    const refreshTimer=setTimeout(()=>ST.refresh(),500);
    document.fonts?.ready?.then(()=>ST.refresh());

    return ()=>{
      cancelAnimationFrame(refreshRafId);
      clearTimeout(refreshTimer);
      skillsCleanup?.();
    };
  },[]);

  return <>
    {/* Static drafting grid. This previously tracked the cursor via React
        state, which re-rendered the entire layout on every mousemove; it is
        now a fixed, CSS-only backdrop. */}

    {/* Main content with higher z-index */}
    <div style={{position:"relative",zIndex:1}}>
    {/* The hero pins and About rides up over it. The two live in one wrapper
        so the pin releases the moment About has fully covered the hero —
        leaving it stuck for the whole page would park it behind every later
        section, and any transparency in those would reveal it. */}
    <div className="hero-stack">
    {/* HERO — headline left, a design artefact filling the right */}
    <section ref={heroRef} id="hero" className="hero-section section-hero">
      <div className="hero-grid">
        {/* Column rules only — the boxy lattice that used to sit behind them
            is gone, so these read as guides on a plain ground. */}
        <div className={`hero-rail${navCondensed ? " is-condensed" : ""}`}>
          {/* Two groups around the mark. Only one of them is the labelled
              landmark — a second <nav aria-label="Sections"> would announce a
              duplicate region for what is one menu. */}
          <div className="hero-nav hero-nav--lead">
            {HERO_NAV_LEAD.map((n) => (
              <button
                key={n.id}
                type="button"
                className={`hero-nav-link${activeSection === n.id ? " is-active" : ""}`}
                aria-current={activeSection === n.id ? "true" : undefined}
                onClick={() => { setActiveSection(n.id); scrollTo(n.id); }}
              >
                {n.label}
              </button>
            ))}
          </div>

          {/* Two marks stacked and cross-faded rather than a CSS filter: a
              filter chain can only approximate a target colour, and this way
              the orange is exactly the file's own. */}
          <button
            type="button"
            className="hero-logo-wrap"
            onClick={() => scrollTo("hero")}
            aria-label="Michael Gaitho — back to top"
          >
            {/* alt is empty on both: the button's aria-label already names it,
                and alt text here would be read out twice. */}
            <img className="hero-logo" src="/logo_transparent_shadow.png" alt="" />
            <img className="hero-logo hero-logo-hot" src="/logo_orange.png" alt="" aria-hidden="true" />
          </button>

          <nav className="hero-nav hero-nav--trail" aria-label="Sections">
            {HERO_NAV_TRAIL.map((n) => (
              <button
                key={n.id}
                type="button"
                className={`hero-nav-link${activeSection === n.id ? " is-active" : ""}`}
                aria-current={activeSection === n.id ? "true" : undefined}
                onClick={() => { setActiveSection(n.id); scrollTo(n.id); }}
              >
                {n.label}
              </button>
            ))}
          </nav>
        </div>

        {/* The division, read off the reference: five columns, three rows,
            each row cut differently — 60% on the first two, 40% and 80% on
            the last. Seven cells, every one present so the hairlines between
            them run unbroken.

            The cards sit INSIDE their cells with a small inset; they are not
            cells themselves. That is what lets the wordmark sit at the right
            of its cell with no line between it and the open ground beside. */}
        <div className="hero-cell hero-cell--r1a" aria-hidden="true" />
        <div className="hero-cell hero-cell--mark">
          <div className="hero-mark">
            <span className="hero-mark-text">Quantamania</span>
          </div>
        </div>

        {/* Name → role, laid out as one line reading across the grid: the
            left phrase, an arrow, then the right phrase breaking to two
            lines. Arrangement and spacing only — the face and colours stay
            as they were. */}
        <div className="hero-cell hero-cell--head">
        <div className="hero-headline">
        <h1 ref={heroTitleRef} className="hero-title">
          <span className="hero-title-lead">
            <span className="hero-title-name">Michael Gaitho</span>
            <span className="hero-title-arrow" aria-hidden="true">&#8594;</span>
          </span>
          <span className="hero-title-role">
            <span className="hero-line-software">Software</span>
            <span ref={developerRef} className="hero-developer">
              <span className="hero-outline hero-outline-ghost" aria-hidden="true">developer</span>
              <span className="hero-outline hero-outline-fill" style={{ width: `${developerFill * 100}%` }}>
                <span>developer</span>
              </span>
            </span>
          </span>
        </h1>
        </div>
        </div>

        <div className="hero-cell hero-cell--open hero-cell--r2b" aria-hidden="true">
          <span className="hero-fill" />
        </div>
        <div className="hero-cell hero-cell--open hero-cell--r3a" aria-hidden="true">
          <span className="hero-fill" />
        </div>

        {/* Moved out of the About section and set as one horizontal rail,
            the way the small items sit under the headline in the reference. */}
        <div className="hero-cell hero-cell--facts">
        <dl className="hero-meta">
          <div><dt>Discipline</dt><dd>UI/UX design &amp; frontend engineering</dd></div>
          <div><dt>Education</dt><dd>Bachelor of Information Technology</dd></div>
          <div><dt>Focus</dt><dd>AI interfaces, real-time dashboards</dd></div>
        </dl>
        </div>

        {/* The statement moved up from Who I Am. It runs to the foot of the
            hero so its bottom edge meets the green band below. */}
        <div className="hero-cell hero-cell--quote">
        <figure ref={heroDescRef} className="hero-quote">
          <blockquote className="hero-quote-text">
            I design interfaces that stay clear at scale, then build them myself,
            so nothing is lost between the file and the browser.
          </blockquote>
          <figcaption className="hero-quote-mark" aria-hidden="true">&#8221;</figcaption>
        </figure>
        </div>

        {/* The card at the foot of the lattice: an arrow out to the top
            right, the line of copy at its bottom left. */}
        {/* Nothing here now — the cell stays so its hairlines still draw. */}
        <div className="hero-cell hero-cell--open hero-cell--cta" aria-hidden="true">
          <span className="hero-fill" />
        </div>
      </div>

      {devMode&&<DevBadge id="hero" devMode={devMode} theme={theme}/>}
    </section>

    {/* ABOUT — statement on the left, the detail and the facts on the right */}
    <section ref={aboutRef} id="about" className="about-section light-section-shell section-about">
      {/* A cut corner, a set of straight rules and one large piece of line art
          on the right — the scattered geometry that used to be here competed
          with the artwork for the same job. */}
      {/* The fold face. It is inside the section's own clip, so it can only
          paint on the bevel itself. */}
      <span className="ab-fold" aria-hidden="true" />

      <div className="ab-rules" aria-hidden="true">
        <span /><span /><span /><span />
      </div>

      <div className="about-inner">
        <div className="ab-grid">
          <div className="ab-copy">
            <h2 className="section-title ab-title">Who I Am</h2>
            <p className="about-paragraph">
              I&apos;m a Frontend Developer &amp; UI/UX designer specialising in AI-powered interfaces
              and real-time analytics. I build AI-powered web interfaces and dashboards, leading
              frontend architecture and UI/UX design decisions. I hold a Bachelor of IT,
              specialising in software engineering and human-computer interaction.
            </p>
          </div>

          {/* Drawn rather than an image: a stack of ellipses each turned a
              little further than the last, so the overlap does the shading.
              Scales to any size and costs one element. */}
          <div className="ab-art" aria-hidden="true">
            <svg viewBox="0 0 520 520" className="ab-ring" role="presentation" focusable="false">
              {Array.from({ length: 48 }, (_, i) => (
                <ellipse
                  key={i}
                  cx="260"
                  cy="260"
                  rx={150 + 14 * Math.sin((i / 48) * Math.PI * 2)}
                  ry={208 - 10 * Math.cos((i / 48) * Math.PI * 2)}
                  transform={`rotate(${(i * 180) / 48} 260 260)`}
                />
              ))}
            </svg>
          </div>
        </div>

        <div className="ab-links">
          <a className="ab-link" href="/CV.pdf" target="_blank" rel="noopener noreferrer">
            <span>Download my CV</span>
            <span className="ab-link-arrow" aria-hidden="true">&#8250;</span>
          </a>
          <button className="ab-link" type="button" onClick={() => scrollTo("projects")}>
            <span>See selected work</span>
            <span className="ab-link-arrow" aria-hidden="true">&#8250;</span>
          </button>
        </div>
      </div>
      {devMode&&<DevBadge id="about" devMode={devMode} theme={theme}/>}
    </section>
    </div>

    {/* WHAT I DO — pinned horizontal case-study rail */}
    {/* WHAT I DO — a deck of cards that stack up as you scroll. Each card is
        sticky at a slightly lower offset than the one before, so the ones
        already passed stay visible as a stepped edge behind the current one.
        No pinning and no scroll-driven JS: the browser does all of it. */}
    <section ref={designSectionRef} id="what-i-do" className="whatido-section light-section-shell section-whatido">
      <div className="cap-field" ref={capRailRef}>
        {CAP_PAGES.map((pair, pi) => (
          <div className="cap-page" key={pi}>
            {pair.map((item, k) => {
              const role = pair.length === 1 ? "solo" : k === 0 ? "lead" : "trail";
              /* A checkerboard, not a straight alternation. Keying the tone
                 off the card's position alone would put moss on the left of
                 every page and clay on the right; adding the page index flips
                 each page against the one before, so the field turns over as
                 you scroll instead of repeating one arrangement. */
              const tone = (pi + k) % 2 === 0 ? "moss" : "clay";

              return CAP_SLOTS[role].map(([slot, holds, bend]) => (
                <div
                  key={`${item.id}-${slot}`}
                  data-cap={item.id}
                  className={`cap-card tone-${tone} cap-variant-${item.variant} cap-piece--${bend} cap-slot--${slot}`}
                >
                  {holds === "field" ? (
                    /* The open half carries the three deliverables as a small
                       connected field of boxes, in the same language as the
                       tools constellation — square cells, hairline borders
                       with the shared edges collapsed, ticks at the outer
                       corners. They were pills under the copy before. */
                    <ul className="cap-tiles">
                      {item.tags.map((tag) => (
                        <li className="cap-tile" key={tag}><span>{tag}</span></li>
                      ))}
                    </ul>
                  ) : (
                    <div className="cap-copy">
                      <div className="cap-meta">
                        <span className="cap-index">{item.id}</span>
                      </div>
                      <h3 className="cap-title">{item.title}</h3>
                      <p className="cap-desc">{item.desc}</p>
                    </div>
                  )}
                </div>
              ));
            })}
          </div>
        ))}
      </div>

      {/* The same control as the work rail, down to the class names — one
          chevron that appears to pass through the button. Two paging rails on
          one page should not have two different controls. */}
      <div className="wk-nav cap-nav">
        <button
          type="button"
          className="wk-arrow wk-arrow--prev"
          onClick={() => scrollCapRail(-1)}
          disabled={capEdges.atStart}
          aria-label="Previous capabilities"
        >
          <span className="wk-chev" aria-hidden="true">
            <span className="wk-chev-track">
              <svg className="wk-chev-mark" viewBox="0 0 16 24" focusable="false">
                <polyline points="13,2 4,12 13,22" />
              </svg>
              <svg className="wk-chev-mark" viewBox="0 0 16 24" focusable="false">
                <polyline points="13,2 4,12 13,22" />
              </svg>
            </span>
          </span>
        </button>
        <button
          type="button"
          className="wk-arrow wk-arrow--next"
          onClick={() => scrollCapRail(1)}
          disabled={capEdges.atEnd}
          aria-label="Next capabilities"
        >
          <span className="wk-chev" aria-hidden="true">
            <span className="wk-chev-track">
              <svg className="wk-chev-mark" viewBox="0 0 16 24" focusable="false">
                <polyline points="3,2 12,12 3,22" />
              </svg>
              <svg className="wk-chev-mark" viewBox="0 0 16 24" focusable="false">
                <polyline points="3,2 12,12 3,22" />
              </svg>
            </span>
          </span>
        </button>
      </div>
      {devMode&&<DevBadge id="what-i-do" devMode={devMode} theme={theme}/>}
    </section>

    {/* EXPERTISE — bento mosaic */}
    <section ref={skillsRef} id="skills" className="skills-section light-section-shell section-skills expertise-section">
      <div className="expertise-inner">
        <div className="expertise-header">
          <h2 className="section-title expertise-title">Skills & Stack</h2>
        </div>
        <div className="expertise-layout">
          <aside className="expertise-skills-rail">
            <ul className="expertise-skill-list">
              {SKILLS.map((s) => {
                /* A band rather than a number. Every one of these sits between
                   75 and 95, so a percentage bar reads as near-full for all of
                   them and says nothing — and a figure like "React 92%" is not
                   a claim anyone can check. Three bands can at least be meant
                   honestly, and the level marks read at a glance. */
                const tier = s.pct >= 90 ? 3 : s.pct >= 80 ? 2 : 1;
                const band = ["Working knowledge", "Fluent", "Daily driver"][tier - 1];
                return (
                  <li key={s.label} className="expertise-skill-row">
                    <div className="expertise-skill-head">
                      <span className="expertise-skill-name">{s.label}</span>
                      {/* Marks are decorative — the band below carries the
                          meaning for anyone not seeing them. */}
                      <span className="ex-level" aria-hidden="true">
                        <i className={tier >= 1 ? "is-on" : ""} />
                        <i className={tier >= 2 ? "is-on" : ""} />
                        <i className={tier >= 3 ? "is-on" : ""} />
                      </span>
                    </div>
                    <span className={`ex-band is-t${tier}`}>{band}</span>
                  </li>
                );
              })}
            </ul>
          </aside>

          <div className="expertise-tech-arena">
            <div className="expertise-tech-header">
              <div>
                <h3 className="expertise-tech-title">Tools I build with</h3>
              </div>
            </div>
            <div className="expertise-stack-constellation">
              {TECH.map((t) => {
                const isSpotlight = ["React", "TypeScript", "GSAP", "Figma"].includes(t.name);
                return (
                  <div key={t.name} className={`expertise-stack-tile${isSpotlight ? " is-spotlight" : ""}`}>
                    {/* Starts hidden in CSS and is raised by GSAP before the
                        wipe. That order matters: if the animation never runs,
                        the tile is simply visible rather than left under a
                        block of green. */}
                    <span className="tool-veil" aria-hidden="true">
                      {/* The monochrome mark, flattened to a pale silhouette:
                          the blueprint of the logo that rides on the green
                          before the real one is uncovered. */}
                      <img className="tool-blueprint" src={t.logo} alt="" loading="lazy" />
                    </span>
                    <img src={t.colorLogo} alt="" width={isSpotlight ? 44 : 32} height={isSpotlight ? 44 : 32} loading="lazy" />
                    <span>{t.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      {devMode && <DevBadge id="skills" devMode={devMode} theme={theme} />}
    </section>

    {/* SELECTED WORK — full-width bands, image and copy swapping sides down
        the page so each project gets a spread of its own. */}
    <section ref={projectsRef} id="projects" className="projects-section light-section-shell section-projects">
      <div className="work-inner">
        <div className="wk-head">
          <h2 className="section-title wk-title">Featured Work</h2>
        </div>

        {/* One row, cards at full size. Anything that does not fit is reached
            by scrolling sideways rather than by shrinking the cards. */}
        <div className="wk-rail" ref={workRailRef}>
          {PROJECTS.map((p, i) => {
            const hasShot = p.image && !missingShots[p.id];
            return (
              <article className={`wk-card${openWork === i ? " is-open" : ""}`} key={p.id}>
                {/* Copy sits in its own inset card; the screenshot inset it from
                    the panel edge rather than letting it meet the border. */}
                <div className="wk-panel">
                  <span className="wk-eyebrow">{p.category}</span>
                  <h3 className="wk-name">{p.title}</h3>
                  <p className="wk-desc">{p.longDesc}</p>

                  <div className="wk-panel-foot">
                    <a
                      className="wk-cta"
                      href={p.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Visit the live site
                    </a>
                  </div>
                </div>

                <a
                  className="wk-shot"
                  href={p.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open the ${p.title} live site`}
                  style={hasShot ? undefined : { background: p.cardBg }}
                >
                  {hasShot && (
                    <img
                      src={p.image}
                      alt={`${p.title} home page`}
                      loading="lazy"
                      decoding="async"
                      onError={() => setMissingShots((m) => ({ ...m, [p.id]: true }))}
                    />
                  )}
                  <span className="wk-live"><i aria-hidden="true" />Live</span>
                </a>
              </article>
            );
          })}
        </div>

        {/* Each chevron is drawn twice. The pair sits in a track one cell
            wide, so only ever one is on screen: hovering slides the track by a
            cell, and the mark you were looking at leaves in the direction of
            travel while its twin arrives from behind. One chevron appearing to
            pass through the button, rather than a glyph that nudges. */}
        <div className="wk-nav">
          <button
            type="button"
            className="wk-arrow wk-arrow--prev"
            onClick={() => scrollWorkRail(-1)}
            disabled={railEdges.atStart}
            aria-label="Previous projects"
          >
            <span className="wk-chev" aria-hidden="true">
              <span className="wk-chev-track">
                <svg className="wk-chev-mark" viewBox="0 0 16 24" focusable="false">
                  <polyline points="13,2 4,12 13,22" />
                </svg>
                <svg className="wk-chev-mark" viewBox="0 0 16 24" focusable="false">
                  <polyline points="13,2 4,12 13,22" />
                </svg>
              </span>
            </span>
          </button>
          <button
            type="button"
            className="wk-arrow wk-arrow--next"
            onClick={() => scrollWorkRail(1)}
            disabled={railEdges.atEnd}
            aria-label="Next projects"
          >
            <span className="wk-chev" aria-hidden="true">
              <span className="wk-chev-track">
                <svg className="wk-chev-mark" viewBox="0 0 16 24" focusable="false">
                  <polyline points="3,2 12,12 3,22" />
                </svg>
                <svg className="wk-chev-mark" viewBox="0 0 16 24" focusable="false">
                  <polyline points="3,2 12,12 3,22" />
                </svg>
              </span>
            </span>
          </button>
        </div>

        <div className="wk-foot">
          <span className="wk-count">
            Showing {PROJECTS.length} of {PROJECTS.length} projects
          </span>
          <a
            className="wk-all"
            href="https://github.com/gaithom"
            target="_blank"
            rel="noopener noreferrer"
          >
            View all work <span aria-hidden="true">&#8599;</span>
          </a>
        </div>
      </div>
      {devMode&&<DevBadge id="projects" devMode={devMode} theme={theme}/>}
    </section>

    {/* EXPRESSION — type & colour, composed as a canvas rather than a table */}
    <section ref={typeCanvasRef} id="type-canvas" className="expr-section light-section-shell section-type-canvas">
      <div className="expr-head">
        <h2 className="section-title expr-title">Type &amp; Colour</h2>
      </div>

      <div className="expr-canvas">
        {/* Left: the type, listed. */}
        <div className="expr-type">
          {EXPRESSION_WORDS.map((w) => (
            <button key={w.word} type="button" className="expr-word">
              <span
                className="expr-word-text"
                style={{
                  fontFamily: w.font,
                  fontWeight: w.weight,
                  fontStyle: w.italic ? "italic" : "normal",
                  color: w.colour
                }}
              >
                {w.word}
              </span>
              <span className="expr-word-spec">
                <strong>{w.face}</strong>
                <em>{w.role}</em>
              </span>
            </button>
          ))}
        </div>

        {/* Right: the bigger panel, carrying the colour on its own ground.
            One grid per family inside it — the wrapper draws nothing, it only
            holds the four tracks that give the cards their proportions. */}
        <div className="expr-colour">
          {PALETTES.map((p) => (
            <div key={p.name} className="expr-family">
              {p.steps.flatMap((c, i) => {
                const slot = FAM_ORDER[p.steps.length][i];
                const label = (
                  <>
                    <span className="expr-swatch-name">{p.name} {c.step}</span>
                    <span className="expr-swatch-foot">
                      <code className="expr-swatch-hex">{c.hex}</code>
                      <span className="expr-swatch-role">{c.role}</span>
                    </span>
                  </>
                );

                if (!BENT_PAIRS[slot]) {
                  return [
                    <div
                      key={c.hex}
                      className="expr-swatch"
                      style={{ gridArea: FAM_SLOTS[slot], background: c.hex, color: c.on }}
                      tabIndex={0}
                    >
                      {label}
                    </div>
                  ];
                }

                /* One bent card, two fused rects. --sw-fill carries the colour
                   to the fillet, which paints the card's own colour back into
                   the inner angle. */
                const [face, rest] = BENT_PAIRS[slot];
                return [
                  <div
                    key={c.hex}
                    className={`expr-swatch expr-swatch--bent expr-swatch--${face}`}
                    style={{ gridArea: FAM_SLOTS[face], background: c.hex, color: c.on, "--sw-fill": c.hex }}
                    tabIndex={0}
                  >
                    {label}
                  </div>,
                  <div
                    key={`${c.hex}-${rest}`}
                    className={`expr-swatch expr-swatch--bent expr-swatch--${rest}`}
                    style={{ gridArea: FAM_SLOTS[rest], background: c.hex, "--sw-fill": c.hex }}
                    aria-hidden="true"
                  />
                ];
              })}
            </div>
          ))}
        </div>
      </div>

      {devMode && <DevBadge id="type-canvas" devMode={devMode} theme={theme} />}
    </section>

    {/* CONTACT — a statement, the channels, the facts, then the form */}
    <section ref={contactRef} id="contact" className="contact-section light-section-shell section-contact">
      <div className="contact-inner">
        <div className="contact-hero">
          <h2 className="section-title contact-title">Let's work<br />together</h2>
          <span className="contact-status">Available for new projects</span>
        </div>

        <div className="contact-split-layout">
          <div className="contact-cards">
            <div className="contact-card-stack">
              {CONTACT_INFO.map((c,i)=>(
                <a key={i} href={c.link} target="_blank" rel="noopener noreferrer" className="contact-info-card">
                  <span className="contact-info-icon">{c.icon}</span>
                  <span className="contact-info-copy">
                    <span className="contact-info-title">{c.title}</span>
                    <span className="contact-info-value" title={c.value}>{c.value}</span>
                  </span>
                  <span className="contact-info-arrow" aria-hidden="true">→</span>
                </a>
              ))}
            </div>

          </div>

          {/* No form. Rather than asking for four fields and then handing the
              whole thing to a mail client anyway, this picks the subject and
              opens the composer already filled in — or just hands over the
              address to copy. */}
          <div className="contact-direct">
            <div className="cd-step">
              <span className="cd-step-num">01</span>
              <span className="cd-step-label">What is it about?</span>
            </div>
            <div className="cd-intents">
              {CONTACT_INTENTS.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  className={`cd-intent${intent === t.id ? " is-on" : ""}`}
                  aria-pressed={intent === t.id}
                  onClick={() => setIntent(t.id)}
                >
                  <span className="cd-intent-label">{t.label}</span>
                  <span className="cd-intent-note">{t.note}</span>
                </button>
              ))}
            </div>

            <div className="cd-step">
              <span className="cd-step-num">02</span>
              <span className="cd-step-label">Send it here</span>
            </div>
            <button type="button" className="cd-address" onClick={copyEmail}>
              <span className="cd-address-text">{CONTACT_EMAIL}</span>
              <span className={`cd-address-hint${copied ? " is-copied" : ""}`}>
                {copied ? "Copied to clipboard" : "Click to copy"}
              </span>
            </button>

            <a className="cd-open" href={mailtoHref}>
              <span className="cd-open-label">
                {activeIntent ? `Open a mail about ${activeIntent.label.toLowerCase()}` : "Open your mail app"}
              </span>
              <span className="cd-open-icon" aria-hidden="true">&#8594;</span>
            </a>

            <p className="cd-note">Usually replies within a day.</p>
          </div>
        </div>
      </div>
      {devMode&&<DevBadge id="contact" devMode={devMode} theme={theme}/>}
    </section>
    </div>
    </>;
}
