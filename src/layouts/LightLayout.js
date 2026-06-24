import { useState, useRef, useEffect } from "react";
import { useGSAP } from "../hooks/useGSAP";
import { Typewriter, SkillBar, Modal } from "../components/Shared";
import { DevBadge } from "../components/DeveloperMode";
import { PROJECTS, SKILLS, TECH, TIMELINE, CONTACT_INFO } from "../data/content";
import "./LightLayout.css";

export function LightLayout({ theme, devMode, scrollTo, tIdx, setTIdx, sel, setSel, sent, setSent, form, setForm }) {
  const heroRef=useRef(null),heroTitleRef=useRef(null),heroBadgeRef=useRef(null),heroCtaRef=useRef(null);
  const aboutRef=useRef(null),skillsRef=useRef(null),projectsRef=useRef(null),servicesRef=useRef(null),timelineRef=useRef(null),contactRef=useRef(null);
  const designSectionRef=useRef(null),aboutRailRef=useRef(null),aboutTrackRef=useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeWhatIDo, setActiveWhatIDo] = useState(0);
  const WHAT_I_DO_STRIPS = [
    { id: "01", title: "UI/UX Design", tone: "a", icon: "◈", tags: ["Wireframes", "Flows", "Prototypes"], desc: "Design systems, information hierarchy, and flow mapping for products that remain clear at scale." },
    { id: "02", title: "Frontend Development", tone: "b", icon: "▣", tags: ["React", "Components", "State"], desc: "Component architecture, state strategy, and implementation detail that keeps interfaces fast and maintainable." },
    { id: "03", title: "Motion Design", tone: "c", icon: "◎", tags: ["GSAP", "Micro UX", "Timing"], desc: "Subtle interactive motion that clarifies intent, communicates hierarchy, and makes interactions feel alive." },
    { id: "04", title: "Responsive Design", tone: "d", icon: "▤", tags: ["Grid", "Breakpoints", "Fluid"], desc: "Layout systems that adapt across breakpoints without losing rhythm, readability, or conversion flow." },
    { id: "05", title: "Accessibility", tone: "e", icon: "◉", tags: ["A11y", "Semantics", "WCAG"], desc: "Contrast, keyboard navigation, and semantic structure designed in from the beginning rather than patched later." },
    { id: "06", title: "Design Systems", tone: "f", icon: "▦", tags: ["Tokens", "Patterns", "Docs"], desc: "Reusable UI patterns and token-led styling to speed delivery while protecting visual consistency." },
    { id: "07", title: "Performance UX", tone: "g", icon: "◌", tags: ["LCP", "Perceived", "Optimize"], desc: "Perceived speed improvements through loading states, rendering strategy, and interaction-level optimization." }
  ];
  const whatIDoTone = ["a", "b", "c", "d", "e", "f", "g"][activeWhatIDo % 7];

  // Track mouse movement for interactive background
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useGSAP((gsap,ST)=>{
    let whatidoCleanup;
    const tl=gsap.timeline({delay:.2});
    tl.fromTo(heroBadgeRef.current,{y:16,opacity:0},{y:0,opacity:1,duration:.65,ease:"expo.out"})
      .fromTo(heroTitleRef.current,{y:40,opacity:0},{y:0,opacity:1,duration:1,ease:"expo.out"},"-=.25")
      .fromTo(heroCtaRef.current,{y:16,opacity:0},{y:0,opacity:1,duration:.65,ease:"expo.out"},"-=.35");
    
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

      const getNavOffset=()=>(window.innerWidth<768?56:62);

      const getLayoutConfig=()=>{
        const w=window.innerWidth;
        if(w<480)return{visible:1,gap:12,peek:0.14};
        if(w<768)return{visible:1,gap:14,peek:0.1};
        if(w<1025)return{visible:1.12,gap:14,peek:0};
        return{visible:2,gap:16,peek:0};
      };

      const syncCardWidth=()=>{
        const {visible,gap,peek}=getLayoutConfig();
        const railW=rail.clientWidth;
        const peekPx=peek?railW*peek:0;
        const gaps=Math.max(0,Math.ceil(visible)-1)*gap;
        const cardW=Math.max(240,Math.floor((railW-gaps-peekPx)/visible));
        rail.style.setProperty("--card-width",`${cardW}px`);
        rail.style.setProperty("--card-gap",`${gap}px`);
        section.style.setProperty("--nav-offset",`${getNavOffset()}px`);
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

      mm.add("(min-width: 768px)",()=>{
        gsap.set(track,{force3D:true,x:0});

        const tween=gsap.to(track,{
          x:()=>-getScrollDistance(),
          ease:"none",
          scrollTrigger:{
            id:"whatido-horizontal-lock",
            trigger:section,
            start:()=>`top top+=${getNavOffset()}`,
            end:()=>`+=${Math.max(getScrollDistance(),window.innerHeight*0.9)}`,
            scrub:1.85,
            pin:true,
            pinSpacing:true,
            anticipatePin:1,
            invalidateOnRefresh:true,
            fastScrollEnd:true,
            snap:cards.length>1?{
              snapTo:(value)=>{
                const step=1/(cards.length-1);
                return gsap.utils.snap(step,value);
              },
              duration:{min:0.2,max:0.55},
              delay:0.02,
              ease:"power3.out"
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

      mm.add("(max-width: 767px)",()=>{
        gsap.set(track,{clearProps:"transform"});
        ST.getById("whatido-horizontal-lock")?.kill();

        const onRailScroll=()=>{
          const max=rail.scrollWidth-rail.clientWidth;
          if(max<=0)return;
          const progress=rail.scrollLeft/max;
          const idx=Math.min(cards.length-1,Math.max(0,Math.round(progress*(cards.length-1))));
          setActiveWhatIDo(idx);
        };

        rail.addEventListener("scroll",onRailScroll,{passive:true});
        scheduleRefresh();
        onRailScroll();

        return ()=>rail.removeEventListener("scroll",onRailScroll);
      });

      whatidoCleanup=()=>{
        ro.disconnect();
        cancelAnimationFrame(refreshRaf);
        mm.revert();
      };
    }
    const skillRows=skillsRef.current?.querySelectorAll(".skill-item");
    if(skillRows)gsap.fromTo(skillRows,{x:-20,opacity:0},{x:0,opacity:1,stagger:.05,duration:.6,ease:"power3.out",scrollTrigger:{trigger:skillsRef.current,start:"top 80%"}});
    const ti=timelineRef.current?.querySelectorAll(".tl-step");
    if(ti)gsap.fromTo(ti,{y:20,opacity:0},{y:0,opacity:1,stagger:.14,duration:.7,ease:"expo.out",scrollTrigger:{trigger:timelineRef.current,start:"top 84%"}});
    gsap.fromTo(contactRef.current,{y:24,opacity:0},{y:0,opacity:1,duration:.8,ease:"expo.out",scrollTrigger:{trigger:contactRef.current,start:"top 86%"}});

    return whatidoCleanup;
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
    {/* HERO — clean left-aligned with image on right */}
    <section ref={heroRef} id="hero" className="hero-section section-hero" style={{display:"flex",alignItems:"center",justifyContent:"space-between",position:"relative"}}>
      {/* Left side - Hero content */}
      <div className="hero-content" style={{position:"relative",zIndex:1,width:"100%"}}>
        <p className="hero-subtitle" style={{fontFamily:"'Syne',sans-serif",fontSize:"clamp(26px,4vw,42px)",fontWeight:800,letterSpacing:"-.02em",lineHeight:1.5,opacity:.9,color:theme.accent}}>Software Developer & Design-Minded Engineer in Nakuru, Kenya </p>
        <p className="hero-description" style={{fontSize:18,color:theme.textMuted,maxWidth:380,margin:"0 0 40px 0",lineHeight:1.85,opacity:.7}}>Blending code and creativity to build seamless, high-performance web experiences with elegant interactions..</p>
        <div ref={heroCtaRef} className="hero-cta" style={{display:"flex",gap:12,justifyContent:"flex-start",flexWrap:"wrap"}}>
          </div>
      </div>

      {/* Right side - Software Developer image */}
      <div className="hero-image-container" style={{position:"relative",zIndex:1}}>
        <img
          src="/sotdev.png"
          alt="Software Developer"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            borderRadius: 12
          }}
        />
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
      <div className="whatido-inner">
        <div className="whatido-header">
          <div>
            <span className="whatido-label">What I Do</span>
            <h2 className="whatido-title">Capabilities Across Design & Code</h2>
          </div>
          <div className="whatido-progress">
            <span>{String(activeWhatIDo + 1).padStart(2, "0")} / {WHAT_I_DO_STRIPS.length}</span>
            <div className="whatido-progress-bar">
              <div className="whatido-progress-fill" style={{width:`${((activeWhatIDo + 1) / WHAT_I_DO_STRIPS.length) * 100}%`}}/>
            </div>
          </div>
        </div>
        <div ref={aboutRailRef} className={`whatido-horizontal-rail tone-${whatIDoTone}`}>
          <div ref={aboutTrackRef} className="whatido-horizontal-track">
            {WHAT_I_DO_STRIPS.map((item, i) => (
              <article key={item.id} className={`whatido-strip-card tone-${item.tone} ${i===activeWhatIDo?"is-active":""}`}>
                <div className="whatido-card-watermark">{item.id}</div>
                <div className="whatido-card-grid" aria-hidden="true"/>
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
              </article>
            ))}
          </div>
        </div>
      </div>
      {devMode&&<DevBadge id="what-i-do" devMode={devMode} theme={theme}/>}
    </section>

    {/* SKILLS — dot-grid indicators */}
    <section ref={skillsRef} id="skills" className="skills-section light-section-shell section-skills" style={{padding:"100px 60px",position:"relative",'@media (max-width: 768px)': {padding:"60px 30px"}, '@media (max-width: 480px)': {padding:"40px 20px"}}}>
      <div style={{maxWidth:1100,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:56}}>
          <span style={{fontSize:14,letterSpacing:".25em",textTransform:"uppercase",color:theme.text,fontFamily:"'Space Mono',monospace",opacity:.8,display:"block",marginBottom:12}}>Expertise</span>
          <h2 className="section-title" style={{fontFamily:"'Syne',sans-serif",fontSize:"clamp(26px,4vw,42px)",fontWeight:800,letterSpacing:"-.02em",color:theme.text}}>Skills</h2>
        </div>
        <div className="skills-grid skills-lab-layout" style={{display:"grid",gridTemplateColumns:"1.15fr .85fr",gap:50,'@media (max-width: 768px)': {gridTemplateColumns:"1fr",gap:30}}}>
          <div className="skills-lab-track">
            {SKILLS.map((s,i)=><div key={s.label} className="skill-item skill-node" style={{marginBottom:18}}>
              <div className="skill-node-head" style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
                <span style={{fontSize:14,fontWeight:500,color:theme.text,opacity:.82}}>{s.label}</span>
                <span style={{fontSize:14,color:theme.text,fontFamily:"'Space Mono',monospace",opacity:.8}}>{s.pct}%</span>
              </div>
              <div className="skill-node-rail" style={{display:"flex",gap:4}}>
                {Array.from({length:10},(_,d)=><div key={d} style={{width:18,height:4,borderRadius:2,background:d<Math.round(s.pct/10)?theme.accent:theme.border,opacity:d<Math.round(s.pct/10)?.65:.4,transition:"background .3s"}}/>)}
              </div>
            </div>)}
          </div>
          <div className="skills-tech-cluster">
            <h3 style={{fontFamily:"'Syne',sans-serif",fontSize:17,fontWeight:700,marginBottom:18,color:theme.text,letterSpacing:".08em",textTransform:"uppercase",opacity:.8}}>Tech Stack</h3>
            <div className="tech-cluster-grid" style={{display:"flex",flexWrap:"wrap",gap:12}}>
              {TECH.map((t,i)=>{
                const [h,setH]=useState(false);
                return (
                  <div 
                    key={i} 
                    className="tech-cluster-item"
                    onMouseEnter={()=>setH(true)} 
                    onMouseLeave={()=>setH(false)}
                    style={{
                      display:"flex",
                      alignItems:"center",
                      gap:8,
                      padding:"10px 16px",
                      background:h?"rgba(0,0,0,0.05)":"transparent",
                      borderRadius:8,
                      transition:"all .2s",
                      cursor:"default",
                      boxShadow:h?theme.shadowMd:theme.shadow
                    }}
                  >
                    <img 
                      src={t.colorLogo} 
                      alt={t.name}
                      style={{
                        width:28,
                        height:28,
                        transition:"all .2s"
                      }}
                    />
                    <span style={{fontSize:14,fontWeight:500,color:theme.text,opacity:.8}}>{t.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      {devMode&&<DevBadge id="skills" devMode={devMode} theme={theme}/>}
    </section>

    {/* PROJECTS — large case study cards */}
    <section ref={projectsRef} id="projects" className="projects-section light-section-shell section-projects" style={{padding:"100px 60px",position:"relative"}}>
      <div style={{maxWidth:1200,margin:"0 auto"}}>
        <div style={{textAlign:"left",marginBottom:40}}>
          
          <h2 className="section-title" style={{fontFamily:"'Syne',sans-serif",fontSize:"clamp(30px,4vw,44px)",fontWeight:800,letterSpacing:"-.02em",marginBottom:16,color:theme.text}}>Featured Work</h2>
          <p style={{fontSize:16,color:theme.textMuted,lineHeight:1.75,maxWidth:600}}>A selection of enterprise engagements — from greenfield architecture to complex systems integration at scale.</p>
        </div>
        <div className="projects-grid" style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:24,'@media (max-width: 768px)': {gridTemplateColumns:"1fr"}}}>
          {PROJECTS.map((p)=>{
            const [h,setH]=useState(false);
            return (
              <div 
                key={p.id} 
                className="project-card"
                onMouseEnter={()=>setH(true)} 
                onMouseLeave={()=>setH(false)} 
                style={{
                  background:"transparent",
                  border:`1px solid ${h?theme.borderMid:theme.border}`,
                  borderRadius:16,
                  overflow:"hidden",
                  transform:h?"translateY(-4px)":"translateY(0)",
                  transition:"all .28s",
                  boxShadow:h?theme.shadowMd:theme.shadow
                }}
              >
                {/* Card Top — Image/Background Area */}
                <div style={{
                  height:320,
                  background:p.image ? `url(${p.image}) center/cover no-repeat` : p.cardBg,
                  display:"flex",
                  flexDirection:"column",
                  alignItems:"center",
                  justifyContent:"center",
                  position:"relative",
                  padding:"0 40px"
                }}>
                  {/* Dark Overlay */}
                  {p.image && <div style={{
                    position:"absolute",
                    inset:0,
                    background:"rgba(0,0,0,0.5)",
                    zIndex:1
                  }} />}
                  
                  {/* LIVE Badge */}
                  <div style={{
                    position:"absolute",
                    top:20,
                    right:20,
                    display:"flex",
                    alignItems:"center",
                    gap:8,
                    background:"rgba(0,0,0,0.4)",
                    backdropFilter:"blur(10px)",
                    padding:"6px 12px",
                    borderRadius:6,
                    border:"1px solid rgba(255,255,255,0.15)",
                    zIndex:2
                  }}>
                    <div style={{width:6,height:6,borderRadius:"50%",background:"#00FF88",boxShadow:"0 0 8px #00FF88"}} />
                    <span style={{fontSize:14,fontWeight:600,color:"#fff",letterSpacing:".1em",textTransform:"uppercase"}}>LIVE</span>
                  </div>
                  
                  {/* Title & Category */}
                  <h3 style={{
                    fontSize:"clamp(20px,3vw,28px)",
                    fontWeight:800,
                    fontFamily:"'Syne',sans-serif",
                    color:"#fff",
                    textAlign:"center",
                    margin:0,
                    textShadow:"0 2px 20px rgba(0,0,0,0.3)",
                    position:"relative",
                    zIndex:2
                  }}>{p.title}</h3>
                  <span style={{
                    fontSize:14,
                    letterSpacing:".2em",
                    textTransform:"uppercase",
                    color:"rgba(255,255,255,0.7)",
                    marginTop:8,
                    fontWeight:600,
                    position:"relative",
                    zIndex:2
                  }}>{p.category}</span>
                </div>

                {/* Card Bottom — Meta Info */}
                <div style={{padding:"24px 28px 28px"}}>
                  {/* Ultra-minimal project type indicator */}
                  <div style={{
                    fontSize:11,
                    fontWeight:600,
                    color:theme.textMuted,
                    letterSpacing:".1em",
                    textTransform:"uppercase",
                    marginBottom:16,
                    opacity:0.7
                  }}>
                    {p.category}
                  </div>

                  {/* Description */}
                  <p style={{fontSize:15,color:theme.textMuted,lineHeight:1.75,marginBottom:20,opacity:.9}}>{p.longDesc}</p>

                  {/* Tech Stack Tags */}
                  <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
                    {p.stack.map((tech)=>{
                      const [tH,setTH]=useState(false);
                      return (
                        <span 
                          key={tech} 
                          onMouseEnter={()=>setTH(true)} 
                          onMouseLeave={()=>setTH(false)}
                          style={{
                            padding:"6px 12px",
                            border:`1px solid ${tH?theme.accent:theme.border}`,
                            borderRadius:6,
                            fontSize:14,
                            fontWeight:500,
                            color:theme.text,
                            opacity:.75,
                            transition:"all .2s",
                            cursor:"default",
                            letterSpacing:".02em"
                          }}
                        >{tech}</span>
                      );
                    })}
                  </div>
                  
                  {/* Live Demo Arrow */}
                  {p.liveUrl && (
                    <a 
                      href={p.liveUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{
                        display:"inline-flex",
                        alignItems:"center",
                        gap:8,
                        marginTop:20,
                        padding:"8px 16px",
                        border:`1px solid ${theme.border}`,
                        borderRadius:6,
                        fontSize:14,
                        fontWeight:600,
                        color:theme.text,
                        textDecoration:"none",
                        opacity:.6,
                        transition:"all .2s",
                        letterSpacing:".08em"
                      }}
                      onMouseEnter={e=>{
                        e.target.style.borderColor=theme.accent;
                        e.target.style.opacity=1;
                      }}
                      onMouseLeave={e=>{
                        e.target.style.borderColor=theme.border;
                        e.target.style.opacity=.6;
                      }}
                    >
                      <span>Live Demo</span>
                      <span style={{fontSize:14,transform:"translateX(2px)"}}>→</span>
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {devMode&&<DevBadge id="projects" devMode={devMode} theme={theme}/>}
    </section>

    {/* TIMELINE — creative horizontal with large year badges */}
    <section ref={timelineRef} id="experience" className="timeline-section light-section-shell section-timeline" style={{padding:"100px 60px",position:"relative"}}>
      <div style={{maxWidth:1100,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:60}}><span style={{fontSize:13,letterSpacing:".25em",textTransform:"uppercase",color:theme.textMuted,fontFamily:"'Space Mono',monospace",opacity:.6,display:"block",marginBottom:12}}>Journey</span><h2 className="section-title" style={{fontFamily:"'Syne',sans-serif",fontSize:"clamp(26px,4vw,42px)",fontWeight:800,letterSpacing:"-.02em",color:theme.text}}>Experience & Education</h2></div>
        {/* Creative horizontal layout */}
        <div style={{display:"flex",flexDirection:"column",gap:40}}>
          {TIMELINE.map((t,i)=><div key={i} className="tl-step brutal-tl-step" style={{display:"flex",gap:32,alignItems:"center",position:"relative"}}>
            <div style={{width:120,flexShrink:0,textAlign:"right"}}>
              <div style={{fontFamily:"'Syne',sans-serif",fontSize:48,fontWeight:800,color:theme.accent,opacity:.3,lineHeight:1}}>{t.year.slice(-2)}</div>
              <div style={{fontFamily:"'Space Mono',monospace",fontSize:12,fontWeight:700,color:theme.textMuted,letterSpacing:".08em",textTransform:"uppercase",opacity:.7}}>{t.place}</div>
            </div>
            <div style={{width:16,height:16,borderRadius:"50%",background:theme.accent,flexShrink:0}}/>
            <div style={{flex:1,background:"transparent",border:`1px solid ${theme.border}`,borderRadius:12,padding:24,transition:"all .3s"}}
              onMouseEnter={e=>{e.currentTarget.style.borderColor=theme.accent;e.currentTarget.style.transform="translateX(8px)";}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor=theme.border;e.currentTarget.style.transform="translateX(0)";}}>
              <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}>
                <span style={{fontSize:20,opacity:.5}}>{t.type==="edu"?"◦":"■"}</span>
                <h3 style={{fontFamily:"'Syne',sans-serif",fontSize:20,fontWeight:700,color:theme.text,opacity:.9}}>{t.title}</h3>
              </div>
              <p style={{fontSize:16,color:theme.textMuted,lineHeight:1.75,opacity:.75}}>{t.desc}</p>
            </div>
          </div>)}
        </div>
      </div>
      {devMode&&<DevBadge id="experience" devMode={devMode} theme={theme}/>}
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
