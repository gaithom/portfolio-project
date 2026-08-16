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

const EXPRESSION_PALETTE_AREAS = {
  Moss: "1 / 8 / 4 / 13",
  Clay: "5 / 1 / 8 / 6",
  Dusk: "8 / 9 / 11 / 13",
  Signal: "12 / 1 / 15 / 6"
};

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
          <span className="cap-measure"><i /><b>1440</b><i /></span>
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
          <span className="cap-caption">cubic-bezier(.16, 1, .3, 1)</span>
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
          <span className="cap-focus">Tab ↹</span>
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
  const heroRef=useRef(null),heroTitleRef=useRef(null),heroBadgeRef=useRef(null),heroDescRef=useRef(null),heroCtaRef=useRef(null),developerRef=useRef(null);
  const aboutRef=useRef(null),skillsRef=useRef(null),projectsRef=useRef(null),servicesRef=useRef(null),typeCanvasRef=useRef(null),contactRef=useRef(null);
  const designSectionRef=useRef(null),aboutRailRef=useRef(null),aboutTrackRef=useRef(null);
  const railTriggerRef=useRef(null);
  const railFillRef=useRef(null);
  const [developerFill, setDeveloperFill] = useState(0);
  const [activeWhatIDo, setActiveWhatIDo] = useState(0);
  // Screenshots that failed to load. A project can name an image before the
  // file exists; the card then falls back to its title card instead of
  // rendering an empty rectangle.
  const [missingShots, setMissingShots] = useState({});
  // Guarded: the rail's active index is driven by scroll maths, so never let a
  // bad value reach the dock and take the whole layout down with it.
  const activeCapability = CAPABILITIES[activeWhatIDo] || CAPABILITIES[0];

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

  // Jump the pinned rail to a given card. The rail is driven by scroll
  // position, so navigating means scrolling the page to the matching offset
  // rather than moving the track directly.
  const goToCapability = (index) => {
    // Look the trigger up by id at click time rather than reading a ref: the
    // ref is only populated once ScrollTrigger has fired an update, so on a
    // fresh load the first dock click would find it null and do nothing.
    const st = railTriggerRef.current
      || window.ScrollTrigger?.getById("whatido-horizontal-lock");
    if (!st) return;
    const span = CAPABILITIES.length - 1;
    const target = st.start + ((st.end - st.start) * (index / span));
    // "instant", not "smooth": a smooth page scroll is still in flight when
    // ScrollTrigger's snap wakes up, and the snap grabs the mid-flight
    // progress and rounds it to the next card — landing one card past the
    // one that was clicked. Jumping the scroll position lands exactly on the
    // snap point, and because the section is pinned nothing visibly jumps —
    // scrub still glides the rail across to the new card.
    window.scrollTo({ top: target, behavior: "instant" });
  };

  useGSAP((gsap,ST)=>{
    let whatidoCleanup;

    const heroSoftware=heroTitleRef.current?.querySelector(".hero-line-software");
    const heroBits=[heroSoftware,developerRef.current,heroBadgeRef.current,heroDescRef.current,heroCtaRef.current].filter(Boolean);
    gsap.set(heroBits,{opacity:0});

    const heroIntro=gsap.timeline({delay:0.45,defaults:{ease:"expo.out"}});
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
    if(heroBadgeRef.current){
      heroIntro.fromTo(heroBadgeRef.current,
        {x:-48,opacity:0,clipPath:"inset(0 100% 0 0)"},
        {x:0,opacity:1,clipPath:"inset(0 0% 0 0)",duration:0.95,ease:"power3.out"},
        "-=0.72"
      );
    }
    if(heroDescRef.current){
      heroIntro.fromTo(heroDescRef.current,
        {y:28,opacity:0,filter:"blur(4px)"},
        {y:0,opacity:1,filter:"blur(0px)",duration:0.8},
        "-=0.55"
      );
    }
    if(heroCtaRef.current){
      heroIntro.fromTo(heroCtaRef.current,
        {y:18,opacity:0},
        {y:0,opacity:1,duration:0.65},
        "-=0.45"
      );
    }
    
    // 3D scrolling animations for background name elements
    gsap.to(".name-bg",{
      yPercent:20,
      scale:1.08,
      rotationX:3,
      rotationY:2,
      ease:"none",
      scrollTrigger:{
        trigger:heroRef.current,
        start:"top top",
        end:"bottom top",
        scrub:1.8
      }
    });
    
    gsap.to(".name-float-1",{
      xPercent:25,
      yPercent:15,
      rotation:18,
      scale:0.92,
      opacity:0.015,
      ease:"none",
      scrollTrigger:{
        trigger:heroRef.current,
        start:"top top",
        end:"bottom top",
        scrub:1.4
      }
    });
    
    gsap.to(".name-float-2",{
      xPercent:-20,
      yPercent:-18,
      rotation:-15,
      scale:1.1,
      opacity:0.012,
      ease:"none",
      scrollTrigger:{
        trigger:heroRef.current,
        start:"top top",
        end:"bottom top",
        scrub:1.6
      }
    });
    
    const sc=servicesRef.current?.querySelectorAll(".srv-card");
    if(sc)gsap.fromTo(sc,{y:30,opacity:0},{y:0,opacity:1,stagger:.08,duration:.75,ease:"expo.out",scrollTrigger:{trigger:servicesRef.current,start:"top 84%"}});
    // Selector was `.project-card`, which stopped matching when the markup was
    // renamed — this reveal had been silently dead.
    const workRows=projectsRef.current?.querySelectorAll(".work-band");
    if(workRows?.length)gsap.fromTo(workRows,{y:34,opacity:0},{y:0,opacity:1,stagger:.1,duration:.9,ease:"power3.out",scrollTrigger:{trigger:projectsRef.current,start:"top 82%"}});
    const splitBlocks=aboutRef.current?.querySelectorAll(".split-block");
    if(splitBlocks)gsap.fromTo(splitBlocks,{y:28,opacity:0},{y:0,opacity:1,stagger:.16,duration:.9,ease:"expo.out",scrollTrigger:{trigger:aboutRef.current,start:"top 80%"}});

    if(designSectionRef.current&&aboutRailRef.current&&aboutTrackRef.current){
      const section=designSectionRef.current;
      const rail=aboutRailRef.current;
      const track=aboutTrackRef.current;
      const cards=Array.from(track.querySelectorAll(".cap-card"));

      const getLayoutConfig=()=>({visible:1,gap:0,peek:0});

      const syncCardWidth=()=>{
        const {gap}=getLayoutConfig();
        const cardW=window.innerWidth;
        const cardH=window.innerHeight;
        rail.style.setProperty("--card-width",`${cardW}px`);
        rail.style.setProperty("--card-height",`${cardH}px`);
        rail.style.setProperty("--card-gap",`${gap}px`);
      };

      const getScrollDistance=()=>Math.max(0,track.scrollWidth-rail.clientWidth);

      let refreshRaf;
      const refreshLayout=()=>{
        syncCardWidth();
        ST.refresh();
      };
      const scheduleRefresh=()=>{
        cancelAnimationFrame(refreshRaf);
        refreshRaf=requestAnimationFrame(refreshLayout);
      };

      syncCardWidth();

      const ro=new ResizeObserver(scheduleRefresh);
      ro.observe(rail);
      ro.observe(section);

      const mm=gsap.matchMedia();

      mm.add("(min-width: 0px)",()=>{
        gsap.set(track,{force3D:true,x:0});

        const tween=gsap.to(track,{
          x:()=>-getScrollDistance(),
          ease:"none",
          scrollTrigger:{
            id:"whatido-horizontal-lock",
            trigger:section,
            start:"top top",
            // Give each card a little over a viewport of scroll so the travel
            // never feels like it is racing the wheel.
            end:()=>`+=${Math.max(getScrollDistance()*1.25,(cards.length-1)*window.innerHeight*1.1)}`,
            // Higher scrub = the track eases toward the scroll position instead
            // of tracking it frame-for-frame. This is what makes it glide.
            scrub:1.1,
            pin:true,
            pinSpacing:true,
            anticipatePin:1,
            invalidateOnRefresh:true,
            // A soft settle, not a hard snap: it waits for the user to stop,
            // then eases out rather than yanking to the nearest card.
            // inertia:false is load-bearing — with momentum projection on,
            // ScrollTrigger reads a programmatic jump as enormous velocity and
            // carries the snap far past the target (a dock click would run the
            // rail to the last card). Off, it simply settles on the nearest.
            snap:cards.length>1?{
              snapTo:1/(cards.length-1),
              duration:{min:0.3,max:0.7},
              delay:0.12,
              ease:"power2.out",
              inertia:false
            }:false,
            onRefresh:(self)=>{ railTriggerRef.current=self; },
            onUpdate:(self)=>{
              railTriggerRef.current=self;
              // The progress bar is written straight to the DOM. It used to go
              // through setState, which re-rendered the entire layout — seven
              // rail cards, the expression canvas, the work bands, the contact
              // form — on every single scroll frame. That was the stutter.
              const fill=railFillRef.current;
              if(fill)fill.style.transform=`scaleX(${self.progress})`;
              // Clamp low last, so an empty card list can never yield -1.
              const idx=Math.max(0,Math.min(cards.length-1,Math.round(self.progress*(cards.length-1))));
              // Only touch state when the card actually changes.
              setActiveWhatIDo((prev)=>prev===idx?prev:idx);
            }
          }
        });

        // ── Depth inside each card ──────────────────────────────────────────
        // One scrubbed timeline per card, not five separate ScrollTriggers.
        // The previous version created 35 triggers across the rail (5 x 7),
        // and every one of them recalculated on each frame of the pinned
        // scroll. Rotation was dropped too: rotating a full-viewport element
        // is markedly more expensive to composite than translate and scale.
        const cardTweens=[];
        cards.forEach((card)=>{
          const copy=card.querySelector(".cap-copy");
          const visual=card.querySelector(".cap-visual");
          const index=card.querySelector(".cap-index");

          const tl=gsap.timeline({
            defaults:{ease:"none"},
            scrollTrigger:{
              trigger:card,
              containerAnimation:tween,
              start:"left right",
              end:"right left",
              scrub:true
            }
          });

          if(visual)tl.fromTo(visual,{xPercent:16,scale:.93},{xPercent:-16,scale:1.03,duration:1},0);
          if(copy){
            tl.fromTo(copy,{xPercent:-8},{xPercent:8,duration:1},0)
              // Copy is dim at the edges of travel and lit dead centre, so
              // attention lands on whichever card is actually in front of you.
              .fromTo(copy,{opacity:.18},{opacity:1,duration:.5},0)
              .to(copy,{opacity:.18,duration:.5},.5);
          }
          if(index)tl.fromTo(index,{yPercent:-30,opacity:0},{yPercent:0,opacity:1,duration:.35},0);

          cardTweens.push(tl);
        });

        window.addEventListener("resize",scheduleRefresh);
        window.addEventListener("orientationchange",scheduleRefresh);
        window.addEventListener("load",scheduleRefresh);
        requestAnimationFrame(scheduleRefresh);
        setTimeout(scheduleRefresh,320);

        return ()=>{
          window.removeEventListener("resize",scheduleRefresh);
          window.removeEventListener("orientationchange",scheduleRefresh);
          window.removeEventListener("load",scheduleRefresh);
          cardTweens.forEach((t)=>{t.scrollTrigger?.kill();t.kill();});
          tween.scrollTrigger?.kill();
          tween.kill();
        };
      });

      whatidoCleanup=()=>{
        ro.disconnect();
        cancelAnimationFrame(refreshRaf);
        mm.revert();
      };
    }
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

    if(typeCanvasRef.current){
      const section=typeCanvasRef.current;
      const words=section.querySelectorAll(".expr-word");
      const palettes=section.querySelectorAll(".expr-palette");
      const rules=section.querySelectorAll(".expr-rule");

      if(rules.length){
        gsap.fromTo(rules,
          {opacity:0},
          {opacity:1,stagger:.05,duration:.9,ease:"power2.out",
            scrollTrigger:{trigger:section,start:"top 80%"}}
        );
      }
      // Specimens settle in reading order rather than all at once, so the
      // scatter resolves into a composition as you arrive.
      if(words.length){
        gsap.fromTo(words,
          {y:26,opacity:0,scale:.94},
          {y:0,opacity:1,scale:1,stagger:.07,duration:.9,ease:"power3.out",
            scrollTrigger:{trigger:section,start:"top 76%"}}
        );
      }
      if(palettes.length){
        gsap.fromTo(palettes,
          {y:22,opacity:0},
          {y:0,opacity:1,stagger:.1,duration:.85,ease:"power3.out",
            scrollTrigger:{trigger:section,start:"top 72%"}}
        );
      }
    }

    // ── Section headers: soft blur-and-rise rather than a hard fade ──
    const headerReveal=(root)=>{
      if(!root)return;
      const bits=root.querySelectorAll(".sec-eyebrow, .section-title, .sec-lead");
      if(!bits.length)return;
      gsap.fromTo(bits,
        {y:26,opacity:0,filter:"blur(6px)"},
        {y:0,opacity:1,filter:"blur(0px)",stagger:.12,duration:1,ease:"power3.out",
          scrollTrigger:{trigger:root,start:"top 84%"}}
      );
    };
    headerReveal(aboutRef.current);
    headerReveal(projectsRef.current);
    headerReveal(contactRef.current);

    // ── Contact: reveal the panel, then let the cards and fields settle in
    //    sequence instead of the whole section arriving as one block ──
    if(contactRef.current){
      const section=contactRef.current;
      const cards=section.querySelectorAll(".contact-info-card");
      const fields=section.querySelectorAll(".contact-field");
      const panel=section.querySelector(".contact-form-panel");

      if(cards.length){
        gsap.fromTo(cards,
          {x:-22,opacity:0},
          {x:0,opacity:1,stagger:.1,duration:.9,ease:"power3.out",
            scrollTrigger:{trigger:section,start:"top 76%"}}
        );
      }
      if(panel){
        gsap.fromTo(panel,
          {y:32,opacity:0},
          {y:0,opacity:1,duration:1,ease:"power3.out",
            scrollTrigger:{trigger:section,start:"top 76%"}}
        );
      }
      if(fields.length){
        gsap.fromTo(fields,
          {y:16,opacity:0},
          {y:0,opacity:1,stagger:.07,duration:.7,ease:"power3.out",
            scrollTrigger:{trigger:section,start:"top 70%"}}
        );
      }
    }

    // ── Marquee strip drifts a little against the scroll so the band between
    //    hero and about feels like it is moving through the page ──
    const marqueeTrack=document.querySelector(".tech-marquee-track");
    if(marqueeTrack?.parentElement){
      gsap.fromTo(marqueeTrack.parentElement,
        {opacity:0},
        {opacity:1,duration:1.1,ease:"power2.out",
          scrollTrigger:{trigger:marqueeTrack.parentElement,start:"top 95%"}}
      );
    }

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
      whatidoCleanup?.();
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
    {/* HERO — editorial masthead framing the headline */}
    <section ref={heroRef} id="hero" className="hero-section section-hero">
      <div className="hero-masthead">
        <span className="hero-mast"><i>Portfolio</i><b>Michael Gaitho</b></span>
        <span className="hero-mast"><i>Discipline</i><b>UI/UX &amp; Frontend</b></span>
        <span className="hero-mast"><i>Based in</i><b>Nakuru, Kenya</b></span>
      </div>

      <div className="hero-content">
        <h1 ref={heroTitleRef} className="hero-title">
          <span className="hero-line-software">Software</span><br />
          <span ref={developerRef} className="hero-developer">
            <span className="hero-outline hero-outline-ghost" aria-hidden="true">developer</span>
            <span className="hero-outline hero-outline-fill" style={{ width: `${developerFill * 100}%` }}>
              <span>developer</span>
            </span>
          </span>
        </h1>
        <p ref={heroBadgeRef} className="hero-subtitle">
          &amp; Design-Minded Engineer in Nakuru, Kenya
        </p>
        <p ref={heroDescRef} className="hero-description">
          Blending code and creativity to build seamless, high-performance web experiences with elegant interactions.
        </p>
        <div ref={heroCtaRef} className="hero-cta">
          <button className="bp" onClick={()=>scrollTo("projects")}>View selected work</button>
          <button className="bg" onClick={()=>scrollTo("contact")}>Start a project →</button>
        </div>
      </div>

      <div className="hero-footer">
        <dl className="hero-facts">
          <div><dt>Focus</dt><dd>Product interfaces</dd></div>
          <div><dt>Toolkit</dt><dd>Figma, React, GSAP</dd></div>
          <div><dt>Practising since</dt><dd>2023</dd></div>
        </dl>
        <button className="hero-scroll" onClick={()=>scrollTo("about")} aria-label="Scroll to about">
          <span>Scroll</span><b aria-hidden="true">↓</b>
        </button>
      </div>

      {devMode&&<DevBadge id="hero" devMode={devMode} theme={theme}/>}
    </section>

    <div className="tech-marquee">
      <div className="tech-marquee-track">
        {[...TECH,...TECH].map((t,i)=><span key={i} className="tech-marquee-item">{t.name}</span>)}
      </div>
    </div>

    {/* ABOUT — statement on the left, the detail and the facts on the right */}
    <section ref={aboutRef} id="about" className="about-section light-section-shell section-about">
      <div className="about-inner">
        <div className="sec-head">
          <span className="sec-eyebrow">About</span>
          <h2 className="section-title">Who I Am</h2>
        </div>

        <div className="about-layout">
          <div className="split-block about-statement">
            <p className="about-quote">
              I design interfaces that stay clear at scale, then build them myself,
              so nothing is lost between the file and the browser.
            </p>
            <span className="about-signature">Michael Gaitho</span>
          </div>

          <div className="split-block about-detail">
            <p className="about-paragraph">
              I'm a Frontend Developer &amp; UI/UX designer specialising in AI-powered interfaces
              and real-time analytics. I build AI-powered web interfaces and dashboards, leading
              frontend architecture and UI/UX design decisions. I hold a Bachelor of IT,
              specialising in software engineering and human-computer interaction.
            </p>
            <dl className="about-facts">
              <div><dt>Discipline</dt><dd>UI/UX design &amp; frontend engineering</dd></div>
              <div><dt>Education</dt><dd>Bachelor of Information Technology</dd></div>
              <div><dt>Focus</dt><dd>AI interfaces, real-time dashboards</dd></div>
              <div><dt>Based in</dt><dd>Nakuru, Kenya</dd></div>
            </dl>
            <div className="about-buttons">
              <button className="bp" onClick={() => window.open('/resume.pdf', '_blank')}>Download Resume</button>
              <button className="bg" onClick={()=>scrollTo("projects")}>See Work →</button>
            </div>
          </div>
        </div>
      </div>
      {devMode&&<DevBadge id="about" devMode={devMode} theme={theme}/>}
    </section>

    {/* WHAT I DO — pinned horizontal case-study rail */}
    <section ref={designSectionRef} id="what-i-do" className="whatido-section light-section-shell section-whatido">
      <div ref={aboutRailRef} className="whatido-horizontal-rail">
        <div ref={aboutTrackRef} className="whatido-horizontal-track">
          {CAPABILITIES.map((item, i) => (
            <article
              key={item.id}
              className={`cap-card tone-${item.tone} cap-variant-${item.variant} ${i === activeWhatIDo ? "is-active" : ""}`}
            >
              <div className="cap-card-inner">
                <div className="cap-copy">
                  <div className="cap-meta">
                    <span className="cap-index">{item.id}</span>
                    <span className="cap-meta-rule" />
                    <span className="cap-kicker">{item.kicker}</span>
                  </div>
                  <h3 className="cap-title">{item.title}</h3>
                  <p className="cap-desc">{item.desc}</p>
                  <ul className="cap-tags">
                    {item.tags.map((tag) => <li key={tag}>{tag}</li>)}
                  </ul>
                  <div className="cap-deliverable">
                    <span className="cap-deliverable-label">Deliverable</span>
                    <span className="cap-deliverable-value">{item.deliverable}</span>
                  </div>
                </div>
                <div className="cap-visual">
                  <CapabilityVisual variant={item.variant} />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Fixed chapter index — stays put while the rail travels underneath */}
      <div className="cap-dock">
        <div className="cap-dock-left">
          <span className="cap-dock-label">What I do</span>
          <span className="cap-dock-title">{activeCapability.title}</span>
        </div>
        <nav className="cap-dock-nav" aria-label="Capabilities">
          {CAPABILITIES.map((item, i) => (
            <button
              key={item.id}
              type="button"
              className={`cap-dock-dot${i === activeWhatIDo ? " is-active" : ""}`}
              aria-label={item.title}
              aria-current={i === activeWhatIDo ? "true" : undefined}
              onClick={() => goToCapability(i)}
            >
              <span>{item.id}</span>
            </button>
          ))}
        </nav>
        <div className="cap-dock-right">
          <span className="cap-dock-count">
            {activeCapability.id} <i>/</i> {String(CAPABILITIES.length).padStart(2, "0")}
          </span>
          <span className="cap-dock-track">
            <i ref={railFillRef} />
          </span>
        </div>
      </div>

      {devMode&&<DevBadge id="what-i-do" devMode={devMode} theme={theme}/>}
    </section>

    {/* EXPERTISE — bento mosaic */}
    <section ref={skillsRef} id="skills" className="skills-section light-section-shell section-skills expertise-section">
      <div className="expertise-inner">
        <div className="expertise-header">
          <span className="expertise-eyebrow">Expertise</span>
          <h2 className="section-title expertise-title">Skills & Stack</h2>
          <p className="expertise-lead">Design craft and engineering depth, measured in practice rather than buzzwords.</p>
        </div>
        <div className="expertise-layout">
          <aside className="expertise-skills-rail">
            <span className="expertise-rail-label">Proficiency</span>
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
                <span className="expertise-tech-eyebrow">Tech Stack</span>
                <h3 className="expertise-tech-title">Tools I build with</h3>
              </div>
              <span className="expertise-tech-count">{TECH.length} technologies</span>
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
      <div className="work-inner">
        <div className="sec-head">
          <span className="sec-eyebrow">Selected work</span>
          <h2 className="section-title">Featured Work</h2>
          <p className="sec-lead">A selection of enterprise engagements, from greenfield architecture to complex systems integration at scale.</p>
        </div>

        <div className="work-bands">
          {PROJECTS.map((p,i)=>{
            const hasShot = p.image && !missingShots[p.id];
            return (
              <article className={`work-band${i % 2 ? " is-flipped" : ""}`} key={p.id}>
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
                        <span className="work-shot-mark-meta">{p.category}</span>
                      </span>
                    )}
                  </span>
                </a>

                <div className="work-band-copy">
                  <div className="work-band-meta">
                    <span className="work-band-index">{String(p.id).padStart(2,"0")}</span>
                    <span className="work-band-rule" />
                    <span className="work-band-cat">{p.category}</span>
                  </div>

                  <h3 className="work-band-title">{p.title}</h3>
                  <p className="work-band-desc">{p.longDesc}</p>

                  <ul className="work-band-stack">
                    {p.stack.map((t)=><li key={t}>{t}</li>)}
                  </ul>

                  <div className="work-band-foot">
                    <dl className="work-band-facts">
                      <div><dt>Year</dt><dd>{p.year}</dd></div>
                      <div><dt>Role</dt><dd>Design &amp; build</dd></div>
                      <div><dt>Outcome</dt><dd>{p.outcome}</dd></div>
                    </dl>
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
        <span className="sec-eyebrow">Expression</span>
        <h2 className="section-title expr-title">Type &amp; Colour</h2>
        <p className="sec-lead expr-lead">
          The system underneath the work, laid out loose and held on a strict grid.
          Hover anything to read its spec.
        </p>
      </div>

      <div className="expr-canvas">
        <div className="expr-rules" aria-hidden="true">
          {[1, 2, 3, 4, 5].map((i) => <span key={`v${i}`} className="expr-rule expr-rule-v" style={{ left: `${(i / 6) * 100}%` }} />)}
          {[1, 2, 3, 4].map((i) => <span key={`h${i}`} className="expr-rule expr-rule-h" style={{ top: `${(i / 5) * 100}%` }} />)}
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
              <span className="expr-palette-use">{p.use}</span>
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
            <span className="expr-palette-foot">
              {p.steps.length} steps, {p.steps.filter((c) => c.grade).length} text-safe
            </span>
          </div>
        ))}
      </div>

      <p className="expr-footnote">
        Contrast measured with the WCAG 2.1 relative-luminance formula against <code>#F2EFE7</code>.
        Steps without a ratio are surface tones and carry no text.
      </p>

      {devMode && <DevBadge id="type-canvas" devMode={devMode} theme={theme} />}
    </section>

    {/* CONTACT — a statement, the channels, the facts, then the form */}
    <section ref={contactRef} id="contact" className="contact-section light-section-shell section-contact">
      <div className="contact-inner">
        <div className="contact-hero">
          <span className="sec-eyebrow">Connect</span>
          <h2 className="section-title contact-title">Let's work<br />together</h2>
          <span className="contact-status">Available for new projects</span>
        </div>

        <div className="contact-split-layout">
          <div className="contact-cards">
            <p className="contact-intro">
              I'm always interested in hearing about new projects and opportunities,
              whether that's a full product, a single interface, or a second pair of eyes
              on something you've already started.
            </p>

            <div className="contact-card-stack">
              {CONTACT_INFO.map((c,i)=>(
                <a key={i} href={c.link} target="_blank" rel="noopener noreferrer" className="contact-info-card">
                  <span className="contact-info-index">{String(i+1).padStart(2,"0")}</span>
                  <span className="contact-info-icon">{c.icon}</span>
                  <span className="contact-info-copy">
                    <span className="contact-info-title">{c.title}</span>
                    <span className="contact-info-value" title={c.value}>{c.value}</span>
                  </span>
                  <span className="contact-info-arrow" aria-hidden="true">→</span>
                </a>
              ))}
            </div>

            <dl className="contact-facts">
              <div><dt>Based in</dt><dd>Nakuru, Kenya</dd></div>
              <div><dt>Timezone</dt><dd>EAT (UTC+3)</dd></div>
              <div><dt>Replies within</dt><dd>24 hours</dd></div>
            </dl>
          </div>

          <div className="contact-form">
            <div className="contact-form-panel">
              {sent?<div className="contact-sent"><div className="contact-sent-mark">✓</div><h3>Message Sent!</h3><p>Michael will reply shortly.</p></div>:<>
                <div className="contact-form-head">
                  <span>Send a message</span>
                  <span>04 fields</span>
                </div>
                {[{l:"Name",k:"name",t:"text",p:"Your name"},{l:"Email",k:"email",t:"email",p:"hello@example.com"},{l:"Subject",k:"subject",t:"text",p:"Project inquiry"}].map((f,i)=><div key={f.k} className="contact-field">
                  <label htmlFor={`contact-${f.k}`}><i>{String(i+1).padStart(2,"0")}</i>{f.l}</label>
                  <input id={`contact-${f.k}`} type={f.t} placeholder={f.p} value={form[f.k]} onChange={e=>setForm(d=>({...d,[f.k]:e.target.value}))}/>
                </div>)}
                <div className="contact-field">
                  <label htmlFor="contact-message"><i>04</i>Message</label>
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
