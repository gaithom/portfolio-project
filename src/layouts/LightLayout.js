import { useState, useRef, useEffect } from "react";
import { useGSAP } from "../hooks/useGSAP";
import { Typewriter, SkillBar, Modal } from "../components/Shared";
import { DevBadge } from "../components/DeveloperMode";
import { PROJECTS, SKILLS, TECH, CONTACT_INFO } from "../data/content";
import "./LightLayout.css";

const TYPE_CANVAS_LINES = {
  h: [
    { top: "12%", style: "solid" },
    { top: "28%", style: "dotted" },
    { top: "44%", style: "solid" },
    { top: "60%", style: "dotted" },
    { top: "76%", style: "solid" },
    { top: "92%", style: "dotted" }
  ],
  v: [
    { left: "8%", style: "solid" },
    { left: "24%", style: "dotted" },
    { left: "50%", style: "solid" },
    { left: "76%", style: "dotted" },
    { left: "92%", style: "solid" }
  ]
};

const TYPE_CANVAS_WORDS = [
  { word: "Bold", fontLabel: "Syne", fontRole: "Sans-serif", font: "'Syne', sans-serif", weight: 800, italic: false, size: 5.2, gridArea: "1 / 1 / 3 / 4" },
  { word: "Scale", fontLabel: "Poppins", fontRole: "Geometric sans", font: "'Poppins', sans-serif", weight: 800, italic: false, size: 5.4, gridArea: "1 / 9 / 3 / 13" },
  { word: "Serif", fontLabel: "Playfair Display", fontRole: "Transitional serif", font: "'Playfair Display', serif", weight: 700, italic: true, size: 4.6, gridArea: "2 / 5 / 4 / 9" },
  { word: "Mono", fontLabel: "JetBrains Mono", fontRole: "Monospace", font: "'JetBrains Mono', monospace", weight: 600, italic: false, size: 4.2, gridArea: "4 / 1 / 5 / 4" },
  { word: "Grotesk", fontLabel: "Space Grotesk", fontRole: "Neo-grotesk", font: "'Space Grotesk', sans-serif", weight: 700, italic: false, size: 5.6, gridArea: "5 / 4 / 7 / 9" },
  { word: "Rhythm", fontLabel: "Lora", fontRole: "Old-style serif", font: "'Lora', serif", weight: 500, italic: false, size: 4.8, gridArea: "7 / 6 / 9 / 11" },
  { word: "Clarity", fontLabel: "DM Sans", fontRole: "Humanist sans", font: "'DM Sans', sans-serif", weight: 500, italic: false, size: 4.4, gridArea: "8 / 1 / 10 / 5" },
  { word: "Ink", fontLabel: "Merriweather", fontRole: "Slab serif", font: "'Merriweather', serif", weight: 900, italic: false, size: 4.6, gridArea: "6 / 9 / 8 / 13" }
];

const COLOR_PALETTES = [
  { name: "Moss", gridArea: "3 / 1 / 5 / 5", colors: ["#3c6057", "#2f4d45", "#7a9e8e", "#edf3ef"] },
  { name: "Dusk", gridArea: "3 / 9 / 5 / 13", colors: ["#4a3f6b", "#8b7cb8", "#e8dff5", "#2a2438"] },
  { name: "Clay", gridArea: "6 / 1 / 8 / 5", colors: ["#c4a882", "#8b6f47", "#f8efe9", "#5c4a32"] },
  { name: "Ink", gridArea: "9 / 5 / 11 / 10", colors: ["#1a2332", "#7ee8a8", "#dce6ff", "#0f1520"] }
];

function WhatIDoCardScene({ variant }) {
  switch (variant) {
    case "blueprint":
      return (
        <div className="whatido-scene whatido-scene-blueprint" aria-hidden="true">
          <div className="bp-ruler bp-ruler-top" />
          <div className="bp-ruler bp-ruler-left" />
          <div className="bp-wireframe">
            <div className="bp-header" />
            <div className="bp-sidebar" />
            <div className="bp-block b1" />
            <div className="bp-block b2" />
            <div className="bp-block b3" />
          </div>
          <div className="bp-corner tl" /><div className="bp-corner tr" />
          <div className="bp-corner bl" /><div className="bp-corner br" />
        </div>
      );
    case "terminal":
      return (
        <div className="whatido-scene whatido-scene-terminal" aria-hidden="true">
          <div className="term-window">
            <div className="term-chrome"><span /><span /><span /></div>
            <pre className="term-code">{`const App = () => {\n  const [ui, setUi] = useState();\n  return (\n    <Layout>\n      <Component />\n    </Layout>\n  );\n};`}</pre>
            <span className="term-cursor" />
          </div>
          <div className="term-glow" />
        </div>
      );
    case "orbit":
      return (
        <div className="whatido-scene whatido-scene-orbit" aria-hidden="true">
          <div className="orbit-ring r1" /><div className="orbit-ring r2" /><div className="orbit-ring r3" />
          <div className="orbit-dot d1" /><div className="orbit-dot d2" /><div className="orbit-dot d3" />
          <div className="orbit-path" />
        </div>
      );
    case "breakpoints":
      return (
        <div className="whatido-scene whatido-scene-breakpoints" aria-hidden="true">
          <div className="bp-device mobile"><span>375</span></div>
          <div className="bp-device tablet"><span>768</span></div>
          <div className="bp-device desktop"><span>1440</span></div>
          <div className="bp-fluid-line" />
        </div>
      );
    case "a11y":
      return (
        <div className="whatido-scene whatido-scene-a11y" aria-hidden="true">
          <div className="a11y-checker" />
          <div className="a11y-focus f1" /><div className="a11y-focus f2" /><div className="a11y-focus f3" />
          <div className="a11y-tab">Tab ↹</div>
        </div>
      );
    case "tokens":
      return (
        <div className="whatido-scene whatido-scene-tokens" aria-hidden="true">
          <div className="token-swatch s1"><em>--primary</em></div>
          <div className="token-swatch s2"><em>--radius</em></div>
          <div className="token-swatch s3"><em>--space-4</em></div>
          <div className="token-swatch s4"><em>--font</em></div>
          <div className="token-grid" />
        </div>
      );
    case "metrics":
      return (
        <div className="whatido-scene whatido-scene-metrics" aria-hidden="true">
          <div className="metric-gauge">
            <div className="metric-arc" />
            <span className="metric-value">98</span>
            <span className="metric-label">Score</span>
          </div>
          <div className="metric-stat"><strong>1.1s</strong><span>LCP</span></div>
          <div className="metric-stat"><strong>0.02</strong><span>CLS</span></div>
          <div className="metric-bars"><i /><i /><i /><i /><i /></div>
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
  const typeCanvasFieldRef=useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [typeCanvasMouse, setTypeCanvasMouse] = useState({ x: 50, y: 50, active: false });
  const [developerFill, setDeveloperFill] = useState(0);
  const [activeWhatIDo, setActiveWhatIDo] = useState(0);
  const WHAT_I_DO_STRIPS = [
    { id: "01", title: "UI/UX Design", tone: "a", variant: "blueprint", icon: "◈", tags: ["Wireframes", "Flows", "Prototypes"], desc: "Design systems, information hierarchy, and flow mapping for products that remain clear at scale." },
    { id: "02", title: "Frontend Development", tone: "b", variant: "terminal", icon: "▣", tags: ["React", "Components", "State"], desc: "Component architecture, state strategy, and implementation detail that keeps interfaces fast and maintainable." },
    { id: "03", title: "Motion Design", tone: "c", variant: "orbit", icon: "◎", tags: ["GSAP", "Micro UX", "Timing"], desc: "Subtle interactive motion that clarifies intent, communicates hierarchy, and makes interactions feel alive." },
    { id: "04", title: "Responsive Design", tone: "d", variant: "breakpoints", icon: "▤", tags: ["Grid", "Breakpoints", "Fluid"], desc: "Layout systems that adapt across breakpoints without losing rhythm, readability, or conversion flow." },
    { id: "05", title: "Accessibility", tone: "e", variant: "a11y", icon: "◉", tags: ["A11y", "Semantics", "WCAG"], desc: "Contrast, keyboard navigation, and semantic structure designed in from the beginning rather than patched later." },
    { id: "06", title: "Design Systems", tone: "f", variant: "tokens", icon: "▦", tags: ["Tokens", "Patterns", "Docs"], desc: "Reusable UI patterns and token-led styling to speed delivery while protecting visual consistency." },
    { id: "07", title: "Performance UX", tone: "g", variant: "metrics", icon: "◌", tags: ["LCP", "Perceived", "Optimize"], desc: "Perceived speed improvements through loading states, rendering strategy, and interaction-level optimization." }
  ];

  // Track mouse movement for interactive background
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

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

  // Type canvas — cursor glow & line proximity
  useEffect(() => {
    const field = typeCanvasFieldRef.current;
    if (!field) return;

    const onMove = (e) => {
      const rect = field.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      field.style.setProperty("--tcx", `${e.clientX - rect.left}px`);
      field.style.setProperty("--tcy", `${e.clientY - rect.top}px`);
      setTypeCanvasMouse({ x, y, active: true });

      field.querySelectorAll(".type-line-h").forEach((line) => {
        const lineY = parseFloat(line.dataset.y);
        line.classList.toggle("is-active", Math.abs(y - lineY) < 5);
      });
      field.querySelectorAll(".type-line-v").forEach((line) => {
        const lineX = parseFloat(line.dataset.x);
        line.classList.toggle("is-active", Math.abs(x - lineX) < 4);
      });
    };

    const onLeave = () => {
      setTypeCanvasMouse((s) => ({ ...s, active: false }));
      field.querySelectorAll(".type-line.is-active").forEach((l) => l.classList.remove("is-active"));
    };

    field.addEventListener("mousemove", onMove);
    field.addEventListener("mouseleave", onLeave);
    return () => {
      field.removeEventListener("mousemove", onMove);
      field.removeEventListener("mouseleave", onLeave);
    };
  }, []);

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
    const projectCards=projectsRef.current?.querySelectorAll(".project-card");
    if(projectCards)gsap.fromTo(projectCards,{y:42,opacity:0,scale:.97},{y:0,opacity:1,scale:1,stagger:.08,duration:.8,ease:"expo.out",scrollTrigger:{trigger:projectsRef.current,start:"top 84%"}});
    const splitBlocks=aboutRef.current?.querySelectorAll(".split-block");
    if(splitBlocks)gsap.fromTo(splitBlocks,{y:28,opacity:0},{y:0,opacity:1,stagger:.16,duration:.9,ease:"expo.out",scrollTrigger:{trigger:aboutRef.current,start:"top 80%"}});

    if(designSectionRef.current&&aboutRailRef.current&&aboutTrackRef.current){
      const section=designSectionRef.current;
      const rail=aboutRailRef.current;
      const track=aboutTrackRef.current;
      const cards=Array.from(track.querySelectorAll(".whatido-strip-card"));

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
            end:()=>`+=${Math.max(getScrollDistance()*1.1,(cards.length-1)*window.innerHeight)}`,
            scrub:0.65,
            pin:true,
            pinSpacing:true,
            anticipatePin:1,
            invalidateOnRefresh:true,
            snap:cards.length>1?{
              snapTo:1/(cards.length-1),
              duration:{min:0.5,max:0.95},
              delay:0.06,
              ease:"power3.inOut",
              inertia:false
            }:false,
            onUpdate:(self)=>{
              const idx=Math.min(cards.length-1,Math.max(0,Math.round(self.progress*(cards.length-1))));
              setActiveWhatIDo(idx);
            }
          }
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
          {opacity:0,y:20,scale:0.88},
          {opacity:1,y:0,scale:1,stagger:.03,duration:.5,ease:"back.out(1.35)",scrollTrigger:{trigger:techArena,start:"top 82%"}}
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
      const header=section.querySelector(".type-canvas-header");
      const words=section.querySelectorAll(".type-canvas-word");
      const palettes=section.querySelectorAll(".palette-cluster");
      const lines=section.querySelectorAll(".type-line");

      if(header){
        gsap.fromTo(header.children,
          {y:24,opacity:0},
          {y:0,opacity:1,stagger:.08,duration:.75,ease:"expo.out",scrollTrigger:{trigger:section,start:"top 85%"}}
        );
      }

      if(lines.length){
        const hLines=section.querySelectorAll(".type-line-h");
        const vLines=section.querySelectorAll(".type-line-v");
        gsap.fromTo(hLines,
          {scaleX:0,opacity:0},
          {scaleX:1,opacity:1,stagger:.08,duration:.85,ease:"power3.inOut",scrollTrigger:{trigger:section,start:"top 80%"}}
        );
        gsap.fromTo(vLines,
          {scaleY:0,opacity:0},
          {scaleY:1,opacity:1,stagger:.08,duration:.85,ease:"power3.inOut",scrollTrigger:{trigger:section,start:"top 80%"}}
        );
      }

      if(words.length){
        gsap.fromTo(words,
          {opacity:0,scale:0.9,y:20},
          {opacity:1,scale:1,y:0,stagger:.07,duration:.85,ease:"expo.out",scrollTrigger:{trigger:section,start:"top 78%"}}
        );
      }

      if(palettes.length){
        gsap.fromTo(palettes,
          {opacity:0,scale:0.88,y:24},
          {opacity:1,scale:1,y:0,stagger:.1,duration:.75,ease:"expo.out",scrollTrigger:{trigger:section,start:"top 72%"}}
        );
      }
    }

    gsap.fromTo(contactRef.current,{y:24,opacity:0},{y:0,opacity:1,duration:.8,ease:"expo.out",scrollTrigger:{trigger:contactRef.current,start:"top 86%"}});

    return ()=>{
      whatidoCleanup?.();
      skillsCleanup?.();
    };
  },[]);

  return <>
    {/* Interactive Grid Background for entire theme */}
    <div style={{position:"fixed",inset:0,pointerEvents:"none",overflow:"hidden",zIndex:0}}>
      <div style={{
        position: "absolute",
        width: "200%",
        height: "200%",
        top: "50%",
        left: "50%",
        transform: `translate(-50%, -50%) translate(${(mousePos.x - window.innerWidth/2) * 0.02}px, ${(mousePos.y - window.innerHeight/2) * 0.02}px)`,
        backgroundImage: `linear-gradient(${theme.animFg} 1px, transparent 1px), linear-gradient(90deg, ${theme.animFg} 1px, transparent 1px)`,
        backgroundSize: "48px 48px",
        transition: "transform 0.3s ease-out",
        opacity: 0.6
      }}/>
    </div>
    
    {/* Main content with higher z-index */}
    <div style={{position:"relative",zIndex:1}}>
    {/* HERO — left-aligned headline, outlined developer */}
    <section ref={heroRef} id="hero" className="hero-section section-hero">
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
          & Design-Minded Engineer in Nakuru, Kenya
        </p>
        <p ref={heroDescRef} className="hero-description">
          Blending code and creativity to build seamless, high-performance web experiences with elegant interactions.
        </p>
        <div ref={heroCtaRef} className="hero-cta" />
      </div>

      {devMode&&<DevBadge id="hero" devMode={devMode} theme={theme}/>}
    </section>

    <div style={{overflow:"hidden",padding:"9px 0"}}>
      <div style={{display:"flex",gap:30,whiteSpace:"nowrap",animation:"marquee 25s linear infinite"}}>
        {[...TECH,...TECH].map((t,i)=><span key={i} style={{fontSize:14,fontWeight:600,letterSpacing:".15em",textTransform:"uppercase",color:theme.text,opacity:.6}}>{t.name}<span style={{marginLeft:16,opacity:.2}}>·</span></span>)}
      </div>
    </div>

    {/* ABOUT */}
    <section ref={aboutRef} id="about" className="about-section light-section-shell section-about" style={{position:"relative"}}>
      <div style={{maxWidth:1200,margin:"0 auto"}}>
        <div style={{textAlign:"center"}}>
          <span style={{fontSize:13,letterSpacing:".25em",textTransform:"uppercase",color:theme.textMuted,fontFamily:"'Space Mono',monospace",opacity:.6,display:"block",marginBottom:12}}>About</span>
          <h2 className="section-title" style={{fontFamily:"'Syne',sans-serif",fontSize:"clamp(26px,4vw,42px)",fontWeight:800,letterSpacing:"-.02em",color:theme.text}}>Who I Am</h2>
        </div>
        <div className="split-block about-copy-panel">
          <div style={{padding:"20px 0"}}>
            <p className="about-paragraph" style={{color:theme.text,opacity:.9}}>
              I'm <strong style={{color:theme.accent}}>Michael Gaitho</strong>, a Frontend Developer & UI/UX designer specializing in AI-powered interfaces and real-time analytics. I build AI-powered web interfaces and dashboards, leading frontend architecture and UI/UX design decisions. I hold a Bachelor of IT, specializing in software engineering and human-computer interaction.
            </p>
          </div>
          <div className="about-buttons" style={{display:"flex",gap:12,justifyContent:"flex-start"}}><button className="bp" onClick={() => window.open('/resume.pdf', '_blank')} style={{borderRadius:4}}>Download Resume</button><button className="bg" onClick={()=>scrollTo("projects")} style={{borderRadius:4}}>See Work →</button></div>
        </div>
      </div>
      {devMode&&<DevBadge id="about" devMode={devMode} theme={theme}/>}
    </section>

    {/* WHAT I DO — fullscreen horizontal scroll */}
    <section ref={designSectionRef} id="what-i-do" className="whatido-section light-section-shell section-whatido">
      <div ref={aboutRailRef} className="whatido-horizontal-rail">
        <div ref={aboutTrackRef} className="whatido-horizontal-track">
          {WHAT_I_DO_STRIPS.map((item, i) => (
            <article key={item.id} className={`whatido-strip-card tone-${item.tone} whatido-variant-${item.variant} ${i===activeWhatIDo?"is-active":""}`}>
              <WhatIDoCardScene variant={item.variant} />
              <div className="whatido-card-grid" aria-hidden="true" />
              <div className="whatido-card-watermark">{item.id}</div>
              <div className={`whatido-card-inner whatido-inner-${item.variant}`}>
                <div className="whatido-card-top">
                  <div className="whatido-card-icon">{item.icon}</div>
                  <span className="whatido-card-id">{item.id}</span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
                <div className="whatido-card-tags">
                  {item.tags.map(tag=><span key={tag}>{tag}</span>)}
                </div>
                <div className="whatido-card-footer">
                  <span className="whatido-hint-desktop">Scroll to explore</span>
                  <span className="whatido-hint-mobile">Swipe to explore</span>
                  <span className="whatido-card-arrow">→</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
      <div className="whatido-dock" aria-live="polite">
        <div className="whatido-dock-copy">
          <span className="whatido-label">What I Do</span>
          <span className="whatido-dock-title">Capabilities Across Design & Code</span>
        </div>
        <div className="whatido-dock-progress">
          <span className="whatido-dock-count">{String(activeWhatIDo + 1).padStart(2, "0")} / {String(WHAT_I_DO_STRIPS.length).padStart(2, "0")}</span>
          <div className="whatido-progress-bar">
            <div className="whatido-progress-fill" style={{width:`${((activeWhatIDo + 1) / WHAT_I_DO_STRIPS.length) * 100}%`}}/>
          </div>
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
          <p className="expertise-lead">Design craft and engineering depth — measured in practice, not buzzwords.</p>
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

    {/* PROJECTS — large case study cards */}
    <section ref={projectsRef} id="projects" className="projects-section light-section-shell section-projects" style={{padding:"100px 60px",position:"relative"}}>
      <div style={{maxWidth:1320,margin:"0 auto"}}>
        <div style={{textAlign:"left",marginBottom:40}}>
          
          <h2 className="section-title" style={{fontFamily:"'Syne',sans-serif",fontSize:"clamp(30px,4vw,44px)",fontWeight:800,letterSpacing:"-.02em",marginBottom:16,color:theme.text}}>Featured Work</h2>
          <p style={{fontSize:16,color:theme.textMuted,lineHeight:1.75,maxWidth:600}}>A selection of enterprise engagements — from greenfield architecture to complex systems integration at scale.</p>
        </div>
        <div className="projects-grid" style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:24,'@media (max-width: 768px)': {gridTemplateColumns:"1fr"}}}>
          {PROJECTS.map((p,i)=>(
              <article
                key={p.id}
                className={`project-card whatido-strip-card tone-${["a","b","c","d","e","f","g"][i % 7]}`}
              >
                <div className="whatido-card-watermark">{String(p.id).padStart(2, "0")}</div>
                <div className="whatido-card-grid" aria-hidden="true"/>
                <div className="whatido-card-top">
                  <div className="whatido-card-icon">{p.emoji}</div>
                  <span className="whatido-card-id">{String(p.id).padStart(2, "0")}</span>
                </div>
                <h3>{p.title}</h3>
                <p>{p.longDesc}</p>
                {p.liveUrl && (
                  <div className="project-live-panel">
                    <div className="project-live-badge" aria-label="Project is live">
                      <span className="project-live-dot" />
                      <span>LIVE</span>
                    </div>
                    <div className="project-live-chrome">
                      <span /><span /><span />
                      <span className="project-live-url">deployed</span>
                    </div>
                    <div
                      className="project-live-screen"
                      style={{backgroundImage:p.image ? `url(${p.image})` : p.cardBg}}
                      role="img"
                      aria-label={`${p.title} live preview`}
                    />
                  </div>
                )}
                <div className="whatido-card-tags">
                  {p.stack.map((tech)=>(
                    <span key={tech}>{tech}</span>
                  ))}
                </div>
                <div className="whatido-card-footer">
                  <span>{p.liveUrl ? "Live · " : ""}{p.year} · {p.outcome}</span>
                  {p.liveUrl ? (
                    <a
                      href={p.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="whatido-card-arrow project-card-live-link"
                      aria-label={`Open ${p.title} live demo`}
                    >
                      →
                    </a>
                  ) : (
                    <span className="whatido-card-arrow">→</span>
                  )}
                </div>
              </article>
          ))}
        </div>
      </div>
      {devMode&&<DevBadge id="projects" devMode={devMode} theme={theme}/>}
    </section>

    {/* TYPE CANVAS — grid layout, interactive type & palettes */}
    <section ref={typeCanvasRef} id="type-canvas" className={`type-canvas-section light-section-shell section-type-canvas${typeCanvasMouse.active ? " is-active" : ""}`}>
      <div className="type-canvas-header">
        <span className="type-canvas-eyebrow">Expression</span>
        <h2 className="section-title type-canvas-title">Type & Color</h2>
      </div>

      <div
        ref={typeCanvasFieldRef}
        className="type-canvas-field"
        aria-label="Typography and color moodboard"
      >
        <div className="type-canvas-glow" aria-hidden="true" />
        <div className="type-canvas-lines" aria-hidden="true">
          {TYPE_CANVAS_LINES.h.map((line) => (
            <span
              key={`h-${line.top}`}
              className={`type-line type-line-h type-line-${line.style}`}
              style={{ top: line.top }}
              data-y={parseFloat(line.top)}
            />
          ))}
          {TYPE_CANVAS_LINES.v.map((line) => (
            <span
              key={`v-${line.left}`}
              className={`type-line type-line-v type-line-${line.style}`}
              style={{ left: line.left }}
              data-x={parseFloat(line.left)}
            />
          ))}
        </div>

        {TYPE_CANVAS_WORDS.map((item) => (
          <button
            key={item.word}
            type="button"
            className="type-canvas-word"
            style={{
              gridArea: item.gridArea,
              fontFamily: item.font,
              fontWeight: item.weight,
              fontStyle: item.italic ? "italic" : "normal",
              fontSize: `clamp(28px, ${item.size}vw, ${item.size * 12}px)`
            }}
          >
            <span className="type-word-text">{item.word}</span>
            <span className="type-word-tip">
              <strong>{item.fontLabel}</strong>
              <em>{item.fontRole}</em>
              <span>{item.weight} · {item.italic ? "Italic" : "Regular"}</span>
            </span>
          </button>
        ))}

        {COLOR_PALETTES.map((palette) => (
          <div
            key={palette.name}
            className="palette-cluster"
            style={{ gridArea: palette.gridArea }}
            tabIndex={0}
          >
            <span className="palette-name">{palette.name}</span>
            <div className="palette-swatches">
              {palette.colors.map((color) => (
                <i key={color} style={{ background: color }} />
              ))}
            </div>
            <div className="palette-tip">
              <strong>{palette.name} palette</strong>
              <ul>
                {palette.colors.map((color) => (
                  <li key={color}><i style={{ background: color }} /><code>{color}</code></li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {devMode && <DevBadge id="type-canvas" devMode={devMode} theme={theme} />}
    </section>

    {/* CONTACT — combined connect and form in creative split layout */}
    <section ref={contactRef} id="contact" className="contact-section light-section-shell section-contact" style={{position:"relative"}}>
      <div style={{maxWidth:1200,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:50}}>
          <span style={{fontSize:13,letterSpacing:".25em",textTransform:"uppercase",color:theme.textMuted,fontFamily:"'Space Mono',monospace",opacity:.6,display:"block",marginBottom:12}}>Connect</span>
          <h2 className="section-title" style={{fontFamily:"'Syne',sans-serif",fontSize:"clamp(26px,4vw,42px)",fontWeight:800,letterSpacing:"-.02em",color:theme.text}}>Let's Work Together</h2>
        </div>
        {/* Creative split layout */}
        <div className="contact-split-layout">
          {/* Left side - Contact info cards */}
          <div className="contact-cards">
            <p style={{fontSize:16,lineHeight:1.9,color:theme.text,opacity:.8,marginBottom:30}}>I'm always interested in hearing about new projects and opportunities. Whether you have a question or just want to say hi, feel free to reach out!</p>
            <div style={{display:"flex",flexDirection:"column",gap:16}}>
              {CONTACT_INFO.map((c,i)=>(
                <a key={i} href={c.link} target="_blank" rel="noopener noreferrer" style={{background:theme.surface,border:`1px solid ${theme.border}`,borderRadius:12,padding:"20px",textDecoration:"none",display:"flex",alignItems:"center",gap:16,transition:"all .3s",opacity:.9}} onMouseOver={e=>{e.currentTarget.style.transform="translateX(4px)";e.currentTarget.style.borderColor=theme.accent;e.currentTarget.style.opacity=1}} onMouseOut={e=>{e.currentTarget.style.transform="translateX(0)";e.currentTarget.style.borderColor=theme.border;e.currentTarget.style.opacity=.9}}>
                  <div style={{fontSize:24,opacity:.4,width:40,height:40,display:"flex",alignItems:"center",justifyContent:"center",background:theme.bgAlt,borderRadius:8}}>{c.icon}</div>
                  <div>
                    <div style={{fontSize:14,fontWeight:600,color:theme.text,fontFamily:"'Syne',sans-serif",marginBottom:2}}>{c.title}</div>
                    <div style={{fontSize:13,color:theme.textMuted,opacity:.8}}>{c.value}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Right side - Contact form */}
          <div className="contact-form">
            <div style={{background:"transparent",border:`1px solid ${theme.border}`,borderRadius:12,padding:34,boxShadow:theme.shadow}}>
              {sent?<div style={{textAlign:"center",padding:"30px 0"}}><div style={{fontSize:24,marginBottom:16,opacity:.6}}>✓</div><h3 style={{fontFamily:"'Syne',sans-serif",fontSize:20,fontWeight:800,color:theme.text}}>Message Sent!</h3><p style={{color:theme.textMuted,fontSize:14}}>Michael will reply shortly.</p></div>:<>
                {[{l:"Name",k:"name",t:"text",p:"Your name"},{l:"Email",k:"email",t:"email",p:"hello@example.com"},{l:"Subject",k:"subject",t:"text",p:"Project Inquiry"}].map(f=><div key={f.k} style={{marginBottom:14}}>
                  <label style={{display:"block",fontSize:12,fontWeight:700,letterSpacing:".17em",textTransform:"uppercase",color:theme.textMuted,marginBottom:6,fontFamily:"'Space Mono',monospace",opacity:.65}}>{f.l}</label>
                  <input style={{width:"100%",padding:"12px 15px",background:theme.bgAlt,border:`1px solid ${theme.border}`,borderRadius:5,color:theme.text,fontSize:15,fontFamily:"'DM Sans',sans-serif",outline:"none",transition:"border-color .2s"}} type={f.t} placeholder={f.p} value={form[f.k]} onChange={e=>setForm(d=>({...d,[f.k]:e.target.value}))} onFocus={e=>e.target.style.borderColor=theme.borderMid} onBlur={e=>e.target.style.borderColor=theme.border}/>
                </div>)}
                <div style={{marginBottom:20}}>
                  <label style={{display:"block",fontSize:12,fontWeight:700,letterSpacing:".17em",textTransform:"uppercase",color:theme.textMuted,marginBottom:6,fontFamily:"'Space Mono',monospace",opacity:.65}}>Message</label>
                  <textarea style={{width:"100%",padding:"12px 15px",background:theme.bgAlt,border:`1px solid ${theme.border}`,borderRadius:5,color:theme.text,fontSize:15,fontFamily:"'DM Sans',sans-serif",outline:"none",resize:"vertical",transition:"border-color .2s"}} rows={5} placeholder="Tell me about your project..." value={form.message} onChange={e=>setForm(d=>({...d,message:e.target.value}))} onFocus={e=>e.target.style.borderColor=theme.borderMid} onBlur={e=>e.target.style.borderColor=theme.border}/>
                </div>
                <button className="bp" onClick={()=>{
                  const subject = encodeURIComponent(form.subject || "Portfolio Contact");
                  const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`);
                  window.open(`mailto:michaelgaitho47@gmail.com?subject=${subject}&body=${body}`);
                  setSent(true);
                }} style={{width:"100%",display:"flex",justifyContent:"center",fontSize:14,padding:"12px 15px",borderRadius:4}}>Send Message →</button>
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
