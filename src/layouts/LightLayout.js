import { useState, useRef, useEffect } from "react";
import { useGSAP } from "../hooks/useGSAP";
import { Typewriter, SkillBar, Modal } from "../components/Shared";
import { DevBadge } from "../components/DeveloperMode";
import { PROJECTS, SKILLS, TECH, CONTACT_INFO } from "../data/content";
import "./LightLayout.css";

// ── Capabilities shown in the horizontal case-study rail ─────────────────────
const CAPABILITIES = [
  { id: "01", title: "UI/UX Design", variant: "blueprint", tone: "moss",
    kicker: "Interface & flow",
    desc: "Design systems, information hierarchy and flow mapping for products that stay legible as they grow.",
    tags: ["Wireframes", "User flows", "Prototypes"],
    deliverable: "Figma library + annotated flows" },
  { id: "02", title: "Frontend Development", variant: "terminal", tone: "dusk",
    kicker: "Design, built",
    desc: "Component architecture and state strategy that keeps an interface fast, accessible and maintainable in production.",
    tags: ["React", "Components", "State"],
    deliverable: "Typed component library" },
  { id: "03", title: "Motion Design", variant: "motion", tone: "lilac",
    kicker: "Timing & easing",
    desc: "Interface motion that clarifies intent and communicates hierarchy. Every curve is chosen, and none of it is decorative.",
    tags: ["GSAP", "Micro-interactions", "Easing"],
    deliverable: "Motion spec + prototypes" },
  { id: "04", title: "Responsive Design", variant: "responsive", tone: "sage",
    kicker: "Every breakpoint",
    desc: "Layout systems that adapt across breakpoints without losing rhythm, readability or hierarchy.",
    tags: ["Fluid grid", "Breakpoints", "Type scale"],
    deliverable: "Responsive layout system" },
  { id: "05", title: "Accessibility", variant: "a11y", tone: "clay",
    kicker: "Designed in, not patched on",
    desc: "Contrast, keyboard paths and semantic structure resolved during design rather than retrofitted before launch.",
    tags: ["WCAG 2.2", "Keyboard", "Semantics"],
    deliverable: "Audit + remediated components" },
  { id: "06", title: "Design Systems", variant: "tokens", tone: "moss",
    kicker: "One source of truth",
    desc: "Token-led styling and documented patterns that speed delivery while holding visual consistency across teams.",
    tags: ["Tokens", "Patterns", "Docs"],
    deliverable: "Token set + usage docs" },
  { id: "07", title: "Performance UX", variant: "metrics", tone: "mist",
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
// Contrast ratios are measured against the page background (#F2EFE7) using the
// WCAG 2.1 relative-luminance formula. Tints below 300 are surface tones and
// are not intended to carry text, so no ratio is claimed for them.
const PALETTES = [
  { name: "Moss", use: "Brand, primary actions", steps: [
    { step: "900", hex: "#2F4D45", role: "Text", ratio: "8.06", grade: "AAA" },
    { step: "700", hex: "#3C6057", role: "Body", ratio: "6.09", grade: "AA" },
    { step: "500", hex: "#7A9E8E", role: "Accent" },
    { step: "300", hex: "#C7D9D0", role: "Line" },
    { step: "100", hex: "#EDF3EF", role: "Surface" }
  ] },
  { name: "Clay", use: "Warm neutrals, editorial", steps: [
    { step: "900", hex: "#4A3A24", role: "Text", ratio: "9.51", grade: "AAA" },
    { step: "700", hex: "#7E6440", role: "Body", ratio: "4.83", grade: "AA" },
    { step: "500", hex: "#C4A882", role: "Accent" },
    { step: "300", hex: "#E4D3BC", role: "Line" },
    { step: "100", hex: "#F8EFE9", role: "Surface" }
  ] },
  { name: "Dusk", use: "Secondary accent, depth", steps: [
    { step: "900", hex: "#2A2438", role: "Text", ratio: "12.98", grade: "AAA" },
    { step: "700", hex: "#4A3F6B", role: "Body", ratio: "8.25", grade: "AAA" },
    { step: "500", hex: "#8B7CB8", role: "Accent" },
    { step: "300", hex: "#C3B8E0", role: "Line" },
    { step: "100", hex: "#E8DFF5", role: "Surface" }
  ] },
  { name: "Signal", use: "State, feedback, code", steps: [
    { step: "900", hex: "#14202E", role: "Text", ratio: "14.33", grade: "AAA" },
    { step: "700", hex: "#0F766E", role: "Success", ratio: "4.76", grade: "AA" },
    { step: "500", hex: "#A24908", role: "Warning", ratio: "5.23", grade: "AA" },
    { step: "300", hex: "#DCE6FF", role: "Info" },
    { step: "100", hex: "#F1F5FF", role: "Surface" }
  ] }
];

// ── Expression canvas composition ────────────────────────────────────────────
// Specimens and palettes are scattered across the canvas, but every block is
// placed on an explicit 12-column grid and nothing overlaps — the looseness is
// composed, not random. Word colours are drawn from PALETTES above, so the
// section demonstrates the system it is documenting.
const EXPRESSION_WORDS = [
  { word: "Structure", face: "Roboto",           role: "Display",            font: "'Roboto', sans-serif",              weight: 900, size: 5.4, colour: "#2F4D45", area: "1 / 1 / 3 / 6" },
  { word: "Editorial", face: "Playfair Display", role: "Transitional serif", font: "'Playfair Display', serif",       weight: 700, size: 4.6, colour: "#4A3F6B", area: "3 / 2 / 5 / 7", italic: true },
  { word: "Legible",   face: "Inter",            role: "UI sans",            font: "'Inter', sans-serif",             weight: 500, size: 3.6, colour: "#3C6057", area: "4 / 8 / 6 / 12" },
  { word: "Rhythm",    face: "Lora",             role: "Old-style serif",    font: "'Lora', serif",                   weight: 500, size: 4.2, colour: "#7E6440", area: "6 / 7 / 8 / 12" },
  { word: "Balance",   face: "Poppins",          role: "Geometric sans",     font: "'Poppins', sans-serif",           weight: 700, size: 4.8, colour: "#2A2438", area: "8 / 3 / 10 / 8" },
  { word: "Metadata",  face: "Space Mono",       role: "Monospace",          font: "'Space Mono', monospace",         weight: 400, size: 2.4, colour: "#0F766E", area: "10 / 1 / 12 / 5" },
  { word: "Contrast",  face: "Roboto",           role: "Text",               font: "'Roboto', sans-serif",              weight: 400, size: 4.2, colour: "#A24908", area: "11 / 6 / 13 / 10" },
  { word: "System",    face: "Poppins",          role: "Geometric sans",     font: "'Poppins', sans-serif",           weight: 600, size: 3.8, colour: "#4A3A24", area: "13 / 7 / 15 / 12" }
];

/* Horizontal rule positions, as a share of the canvas height.
   They were even fifths (20/40/60/80), but two of them struck through a word:
   20% cut across Editorial and 80% across Contrast. Those two moved down to
   land just under the baseline of the word they were crossing, which is the
   relationship 60% already had with Balance — the word sits on the rule rather
   than being crossed by it. 40% and 60% were clear of every word and are
   unchanged. */
const EXPR_RULE_TOPS = [24.1, 40, 60, 81.5];

const EXPRESSION_PALETTE_AREAS = {
  Moss: "1 / 8 / 4 / 13",
  Clay: "5 / 1 / 8 / 6",
  Dusk: "8 / 9 / 11 / 13",
  Signal: "12 / 1 / 15 / 6"
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

// ── Broken grid ──────────────────────────────────────────────────────────────
// A lattice that reads as complete but is visibly fractured: each rule is built
// from segments with gaps, and the gaps on crossing axes never line up. Built
// from real elements rather than dashed borders so each segment can be offset
// on its own. Values are fixed, so it renders identically every load.
const BROKEN_V = [
  { x: 18, segs: [[0, 26], [34, 30], [72, 24]] },
  { x: 38, segs: [[6, 40], [54, 18], [80, 20]] },
  { x: 62, segs: [[0, 18], [26, 44], [78, 22]] },
  { x: 82, segs: [[12, 28], [48, 34], [88, 12]] }
];
const BROKEN_H = [
  { y: 22, segs: [[0, 30], [40, 22], [70, 26]] },
  { y: 48, segs: [[8, 24], [38, 40], [86, 14]] },
  { y: 74, segs: [[0, 20], [28, 32], [66, 30]] }
];

function BrokenGrid({ className = "" }) {
  return (
    <div className={`bgrid ${className}`} aria-hidden="true">
      {BROKEN_V.map((line) =>
        line.segs.map(([top, height]) => (
          <span
            key={`v${line.x}-${top}`}
            className="bgrid-v"
            style={{ left: `${line.x}%`, top: `${top}%`, height: `${height}%` }}
          />
        ))
      )}
      {BROKEN_H.map((line) =>
        line.segs.map(([left, width]) => (
          <span
            key={`h${line.y}-${left}`}
            className="bgrid-h"
            style={{ top: `${line.y}%`, left: `${left}%`, width: `${width}%` }}
          />
        ))
      )}
    </div>
  );
}

// ── Solid grid ───────────────────────────────────────────────────────────────
// The counterpart to BrokenGrid, used only on the projects section. Every line
// runs the full span with no gaps and sits on a denser rhythm (six columns
// rather than four), so the work reads as being laid out on a firm grid while
// the rest of the page uses the fractured one.
function SolidGrid({ className = "" }) {
  return (
    <div className={`sgrid ${className}`} aria-hidden="true">
      {[16.66, 33.33, 50, 66.66, 83.33].map((x) => (
        <span key={`sv${x}`} className="sgrid-v" style={{ left: `${x}%` }} />
      ))}
    </div>
  );
}

// ── Capability artwork ───────────────────────────────────────────────────────
// One contained artefact per capability. Each sits inside the card's visual
// column rather than bleeding across the whole card, so the rail reads as a
// consistent family instead of seven unrelated scenes.
function CapabilityVisual({ variant }) {
  switch (variant) {
    case "blueprint":
      return (
        <div className="cap-art cap-art-blueprint" aria-hidden="true">
          <div className="cap-board cap-board-back" />
          <div className="cap-board cap-board-front">
            <span className="cap-board-bar" />
            <span className="cap-board-side" />
            <span className="cap-board-block b1" />
            <span className="cap-board-block b2" />
            <span className="cap-board-block b3" />
          </div>
        </div>
      );
    case "terminal":
      return (
        <div className="cap-art cap-art-terminal" aria-hidden="true">
          <div className="cap-window">
            <span className="cap-window-chrome" />
            <div className="cap-code">
              <span><em>const</em> Card = ({'{'} title {'}'}) =&gt; (</span>
              <span className="ind1">&lt;<em>article</em> className=<b>"card"</b>&gt;</span>
              <span className="ind2">&lt;<em>h3</em>&gt;{'{'}title{'}'}&lt;/<em>h3</em>&gt;</span>
              <span className="ind1">&lt;/<em>article</em>&gt;</span>
              <span>);<i className="cap-caret" /></span>
            </div>
          </div>
        </div>
      );
    case "motion":
      return (
        <div className="cap-art cap-art-motion" aria-hidden="true">
          <span className="cap-ring r1" />
          <span className="cap-ring r2" />
          <span className="cap-orbit" />
          <svg className="cap-curve" viewBox="0 0 120 120" fill="none">
            <path d="M4 116 C 40 116, 52 12, 116 4" />
          </svg>
        </div>
      );
    case "responsive":
      return (
        <div className="cap-art cap-art-responsive" aria-hidden="true">
          <span className="cap-device sm"><i /><b>375</b></span>
          <span className="cap-device md"><i /><b>768</b></span>
          <span className="cap-device lg"><i /><b>1440</b></span>
        </div>
      );
    case "a11y":
      return (
        <div className="cap-art cap-art-a11y" aria-hidden="true">
          <div className="cap-contrast">
            <span className="cap-contrast-row">
              <i style={{ background: "#2F4D45" }} />
              <b>8.06:1</b>
              <em>AAA</em>
            </span>
            <span className="cap-contrast-row">
              <i style={{ background: "#3C6057" }} />
              <b>6.09:1</b>
              <em>AA</em>
            </span>
            <span className="cap-contrast-row is-weak">
              <i style={{ background: "#7A9E8E" }} />
              <b>2.57:1</b>
              <em>Surface only</em>
            </span>
          </div>
        </div>
      );
    case "tokens":
      return (
        <div className="cap-art cap-art-tokens" aria-hidden="true">
          {[
            { t: "--color-brand", c: "#3C6057" },
            { t: "--radius-md", c: "#C4A882" },
            { t: "--space-4", c: "#8B7CB8" },
            { t: "--ease-glide", c: "#7A9E8E" }
          ].map((tk) => (
            <span className="cap-token" key={tk.t}>
              <i style={{ background: tk.c }} />
              <code>{tk.t}</code>
            </span>
          ))}
        </div>
      );
    case "metrics":
      return (
        <div className="cap-art cap-art-metrics" aria-hidden="true">
          <div className="cap-gauge">
            <svg viewBox="0 0 120 120">
              <circle className="cap-gauge-track" cx="60" cy="60" r="52" />
              <circle className="cap-gauge-fill" cx="60" cy="60" r="52" />
            </svg>
            <b>98</b>
            <em>Performance</em>
          </div>
          <div className="cap-vitals">
            <span><b>1.1s</b><em>LCP</em></span>
            <span><b>0.02</b><em>CLS</em></span>
            <span><b>40ms</b><em>INP</em></span>
          </div>
        </div>
      );
    default:
      return null;
  }
}

export function LightLayout({ theme, devMode, scrollTo, tIdx, setTIdx, sel, setSel, sent, setSent, form, setForm }) {
  const heroRef=useRef(null),heroTitleRef=useRef(null),heroDescRef=useRef(null),developerRef=useRef(null);
  const aboutRef=useRef(null),skillsRef=useRef(null),projectsRef=useRef(null),typeCanvasRef=useRef(null),contactRef=useRef(null);
  const designSectionRef=useRef(null);
  const [developerFill, setDeveloperFill] = useState(0);
  const [activeWhatIDo, setActiveWhatIDo] = useState(0);
  // Screenshots that failed to load. A project can name an image before the
  // file exists; the card then falls back to its title card instead of
  // rendering an empty rectangle.
  const [missingShots, setMissingShots] = useState({});
  const [activeSection, setActiveSection] = useState(null);

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

  // Marks the card currently sitting in the middle of the viewport, which is
  // what drives each artefact's assembly. An observer only fires on threshold
  // crossings, so the stack itself stays pure CSS and perfectly smooth.
  useEffect(() => {
    const cards = Array.from(document.querySelectorAll(".cap-card"));
    if (!cards.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const i = cards.indexOf(e.target);
            if (i > -1) setActiveWhatIDo(i);
          }
        });
      },
      { rootMargin: "-42% 0px -42% 0px", threshold: 0 }
    );
    cards.forEach((c) => io.observe(c));
    return () => io.disconnect();
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
        gsap.fromTo(stackTiles,
          {opacity:0,y:22,scale:0.94},
          {opacity:1,y:0,scale:1,stagger:{each:.045,from:"start"},duration:.85,ease:"power3.out",scrollTrigger:{trigger:techArena,start:"top 82%"}}
        );
      }

      if(skillRows.length){
        skillRows.forEach((row)=>{
          const fill=row.querySelector(".expertise-meter-fill");
          if(fill)gsap.set(fill,{scaleX:0,transformOrigin:"left center"});
        });
        gsap.fromTo(skillRows,
          {x:-20,opacity:0},
          {x:0,opacity:1,stagger:.06,duration:.65,ease:"expo.out",scrollTrigger:{trigger:section,start:"top 80%"}}
        );
        skillRows.forEach((row)=>{
          const fill=row.querySelector(".expertise-meter-fill");
          if(fill){
            gsap.to(fill,
              {scaleX:1,duration:.85,ease:"power3.out",scrollTrigger:{trigger:row,start:"top 90%"}}
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
    <div className="soft-grid" aria-hidden="true" />

    {/* Main content with higher z-index */}
    <div style={{position:"relative",zIndex:1}}>
    {/* HERO — headline left, a design artefact filling the right */}
    <section ref={heroRef} id="hero" className="hero-section section-hero">
      <div className="hero-grid">
        <div className="hero-rules" aria-hidden="true">
          <span /><span /><span /><span />
        </div>

        <div className="hero-rail">
          <img className="hero-logo" src="/logo_transparent_shadow.png" alt="Michael Gaitho" />

          <nav className="hero-nav" aria-label="Sections">
            {HERO_NAV.map((n) => (
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

        {/* Name → role, laid out as one line reading across the grid: the
            left phrase, an arrow, then the right phrase breaking to two
            lines. Arrangement and spacing only — the face and colours stay
            as they were. */}
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

        {/* Moved out of the About section and set as one horizontal rail,
            the way the small items sit under the headline in the reference. */}
        <dl className="hero-meta">
          <div><dt>Discipline</dt><dd>UI/UX design &amp; frontend engineering</dd></div>
          <div><dt>Education</dt><dd>Bachelor of Information Technology</dd></div>
          <div><dt>Focus</dt><dd>AI interfaces, real-time dashboards</dd></div>
        </dl>

        {/* The statement moved up from Who I Am. It runs to the foot of the
            hero so its bottom edge meets the green band below. */}
        <figure ref={heroDescRef} className="hero-quote">
          {/* A brighter copy of the hero's column rules, clipped to the card.
              The rules crossing from outside are dark terracotta, which all
              but disappears on this green. */}
          <span className="hq-rules" aria-hidden="true"><i /><i /><i /><i /></span>

          <blockquote className="hero-quote-text">
            I design interfaces that stay clear at scale, then build them myself,
            so nothing is lost between the file and the browser.
          </blockquote>
          <figcaption className="hero-quote-mark" aria-hidden="true">&#8221;</figcaption>
        </figure>
      </div>

      {devMode&&<DevBadge id="hero" devMode={devMode} theme={theme}/>}
    </section>

    {/* ABOUT — statement on the left, the detail and the facts on the right */}
    <section ref={aboutRef} id="about" className="about-section light-section-shell section-about">
      <BrokenGrid className="bgrid-about" />
      {/* Geometry laid over the grid: outlines and solids in orange, sized off
          the section so they scale with it. */}
      <div className="about-shapes" aria-hidden="true">
        <span className="ab-shape ab-circle" />
        <span className="ab-shape ab-circle-sm" />
        <span className="ab-shape ab-square" />
        <span className="ab-shape ab-square-fill" />
        <span className="ab-shape ab-bar" />
        <span className="ab-shape ab-bar-v" />
        <span className="ab-shape ab-tri" />
        <span className="ab-shape ab-arc" />
      </div>
      <div className="about-inner">
        <div className="sec-head">
          <h2 className="section-title">Who I Am</h2>
        </div>

        <div className="about-layout">
          <div className="split-block about-detail">
            <p className="about-paragraph">
              I'm a Frontend Developer &amp; UI/UX designer specialising in AI-powered interfaces
              and real-time analytics. I build AI-powered web interfaces and dashboards, leading
              frontend architecture and UI/UX design decisions. I hold a Bachelor of IT,
              specialising in software engineering and human-computer interaction.
            </p>
            <div className="about-buttons">
              <button className="ab-btn ab-btn-solid" onClick={() => window.open('/resume.pdf', '_blank')}>
                <span className="ab-btn-label">Download Resume</span>
                <span className="ab-btn-icon" aria-hidden="true">&#8595;</span>
              </button>
              <button className="ab-btn ab-btn-line" onClick={()=>scrollTo("projects")}>
                <span className="ab-btn-label">See Work</span>
                <span className="ab-btn-icon" aria-hidden="true">&#8594;</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      {devMode&&<DevBadge id="about" devMode={devMode} theme={theme}/>}
    </section>

    {/* WHAT I DO — pinned horizontal case-study rail */}
    {/* WHAT I DO — a deck of cards that stack up as you scroll. Each card is
        sticky at a slightly lower offset than the one before, so the ones
        already passed stay visible as a stepped edge behind the current one.
        No pinning and no scroll-driven JS: the browser does all of it. */}
    <section ref={designSectionRef} id="what-i-do" className="whatido-section light-section-shell section-whatido">
      <div className="cap-stack">
        {CAPABILITIES.map((item, i) => (
          <article
            key={item.id}
            style={{ "--i": i, "--depth": CAPABILITIES.length - 1 - i }}
            className={`cap-card tone-${item.tone} cap-variant-${item.variant} ${i === activeWhatIDo ? "is-active" : ""}`}
          >
            <div className="cap-card-inner">
              <div className="cap-copy">
                <div className="cap-meta">
                  <span className="cap-index">{item.id}</span>
                </div>
                <h3 className="cap-title">{item.title}</h3>
                <p className="cap-desc">{item.desc}</p>
                <ul className="cap-tags">
                  {item.tags.map((tag) => <li key={tag}>{tag}</li>)}
                </ul>
              </div>
              <div className="cap-visual">
                <CapabilityVisual variant={item.variant} />
              </div>
            </div>
          </article>
        ))}
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
              {SKILLS.map((s, i) => (
                <li key={s.label} className="expertise-skill-row">
                  <div className="expertise-skill-head">
                    <span className="expertise-skill-name">{s.label}</span>
                    <span className="expertise-skill-pct">{s.pct}%</span>
                  </div>
                  <div className="expertise-meter" aria-hidden="true">
                    <div className="expertise-meter-fill" style={{ width: `${s.pct}%` }} />
                  </div>
                </li>
              ))}
            </ul>
          </aside>

          <div className="expertise-tech-arena">
            <div className="expertise-tech-orbit" aria-hidden="true" />
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
      <SolidGrid className="sgrid-work" />
      <div className="work-inner">
        <div className="sec-head">
          <h2 className="section-title">Featured Work</h2>
        </div>

        <div className="work-bands">
          {PROJECTS.map((p)=>{
            const hasShot = p.image && !missingShots[p.id];
            return (
              <article className="work-band" key={p.id}>
                <a
                  className="work-band-shot"
                  href={p.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open the ${p.title} live site`}
                >
                  <span className={`work-band-frame${hasShot?"":" is-placeholder"}`}
                        style={hasShot?undefined:{background:p.cardBg}}>
                    {hasShot ? (
                      <img
                        src={p.image}
                        alt={`${p.title} home page`}
                        loading="lazy"
                        onError={()=>setMissingShots(m=>({...m,[p.id]:true}))}
                      />
                    ) : (
                      <span className="work-shot-mark">
                        <span className="work-shot-mark-name">{p.title}</span>
                      </span>
                    )}
                  </span>
                </a>

                <div className="work-band-copy">
                  {/* Decoration lives in its own bleed layer so the grid and
                      shapes run out to the screen edge with the background,
                      rather than stopping at the text column. */}
                  <div className="wb-decor" aria-hidden="true">
                    <BrokenGrid className="bgrid-work-copy" />
                    <span className="wb-shape wb-circle" />
                    <span className="wb-shape wb-square" />
                    <span className="wb-shape wb-bar" />
                    <span className="wb-shape wb-square-fill" />
                  </div>
                  <div className="work-band-meta">
                    <span className="work-band-index">{String(p.id).padStart(2,"0")}</span>
                  </div>

                  <h3 className="work-band-title">{p.title}</h3>
                  <p className="work-band-desc">{p.longDesc}</p>

                  <ul className="work-band-stack">
                    {p.stack.map((t)=><li key={t}>{t}</li>)}
                  </ul>

                  <div className="work-band-foot">
                    <a
                      className="work-band-cta"
                      href={p.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Visit site <span aria-hidden="true">↗</span>
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
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
        {/* Horizontal rules only. They run the full width of the viewport, so
            the layer they live in is bled out to the screen edges in CSS. */}
        <div className="expr-rules" aria-hidden="true">
          {EXPR_RULE_TOPS.map((top, i) => <span key={`h${i}`} className="expr-rule expr-rule-h" style={{ top: `${top}%` }} />)}
        </div>

        {EXPRESSION_WORDS.map((w) => (
          <button
            key={w.word}
            type="button"
            className="expr-word"
            style={{
              gridArea: w.area,
              fontFamily: w.font,
              fontWeight: w.weight,
              fontStyle: w.italic ? "italic" : "normal",
              fontSize: `clamp(30px, ${w.size}vw, ${Math.round(w.size * 13)}px)`,
              color: w.colour
            }}
          >
            <span className="expr-word-text">{w.word}</span>
            <span className="expr-word-spec">
              <strong>{w.face}</strong>
              <em>{w.role}</em>
              <span>{w.weight}{w.italic ? " Italic" : ""}</span>
            </span>
          </button>
        ))}

        {PALETTES.map((p) => (
          <div
            key={p.name}
            className="expr-palette"
            style={{ gridArea: EXPRESSION_PALETTE_AREAS[p.name] }}
            tabIndex={0}
          >
            <span className="expr-palette-head">
              <span className="expr-palette-name">{p.name}</span>
            </span>
            <span className="expr-palette-chips">
              {p.steps.map((c) => (
                <span
                  key={c.hex}
                  className={`expr-chip${c.grade ? " has-grade" : ""}`}
                  style={{ background: c.hex }}
                >
                  <span className="expr-chip-tip">
                    <code>{c.hex}</code>
                    <em>{c.role}</em>
                    <b>{c.ratio ? `${c.ratio}:1 ${c.grade}` : "Surface"}</b>
                  </span>
                </span>
              ))}
            </span>
          </div>
        ))}
      </div>


      {devMode && <DevBadge id="type-canvas" devMode={devMode} theme={theme} />}
    </section>

    {/* CONTACT — a statement, the channels, the facts, then the form */}
    <section ref={contactRef} id="contact" className="contact-section light-section-shell section-contact">
      <BrokenGrid className="bgrid-contact" />
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

          <div className="contact-form">
            <div className="contact-form-panel">
              {sent?<div className="contact-sent"><div className="contact-sent-mark">✓</div><h3>Message Sent!</h3><p>Michael will reply shortly.</p></div>:<>
                {[{l:"Name",k:"name",t:"text",p:"Your name"},{l:"Email",k:"email",t:"email",p:"hello@example.com"},{l:"Subject",k:"subject",t:"text",p:"Project inquiry"}].map((f)=><div key={f.k} className="contact-field">
                  <label htmlFor={`contact-${f.k}`}>{f.l}</label>
                  <input id={`contact-${f.k}`} type={f.t} placeholder={f.p} value={form[f.k]} onChange={e=>setForm(d=>({...d,[f.k]:e.target.value}))}/>
                </div>)}
                <div className="contact-field">
                  <label htmlFor="contact-message">Message</label>
                  <textarea id="contact-message" rows={5} placeholder="Tell me about your project..." value={form.message} onChange={e=>setForm(d=>({...d,message:e.target.value}))}/>
                </div>
                <button className="bp contact-submit" onClick={()=>{
                  const subject = encodeURIComponent(form.subject || "Portfolio Contact");
                  const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`);
                  window.open(`mailto:michaelgaitho47@gmail.com?subject=${subject}&body=${body}`);
                  setSent(true);
                }}>Send message →</button>
              </>}
            </div>
          </div>
        </div>
      </div>
      {devMode&&<DevBadge id="contact" devMode={devMode} theme={theme}/>}
    </section>
    </div>
    </>;
}
