import { useState, useRef } from "react";
import clsx from "clsx";
import { useGSAP } from "../hooks/useGSAP";
import { ParticleCanvas, Typewriter, SkillBar, Modal, ParallaxElement, ScrollReveal } from "../components/Shared";
import { DevBadge } from "../components/DeveloperMode";
import { PROJECTS, SKILLS, TECH, SERVICES, TIMELINE, CONTACT_INFO } from "../data/content";
import "./ForestLayout.css";

// ── Project Card Component ───────────────────────────────────────────────────
function ProjectCard({ project, theme, onSelect }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: "100%",
        background: "transparent",
        border: `1px solid ${hovered ? theme.borderMid : theme.border}`,
        borderRadius: 16,
        overflow: "hidden",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
        transition: "all .3s ease",
        boxShadow: theme.shadowLoading
      }}
    >
      {/* Card Top — Background Area */}
      <div style={{ 
        height: 320, 
        background: project.image ? `url(${project.image}) center/cover no-repeat` : project.cardBg, 
        display: "flex", 
        flexDirection: "column",
        alignItems: "center", 
        justifyContent: "center",
        position: "relative",
        padding: "0 40px"
      }}>
        {/* Dark Overlay */}
        {project.image && <div style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.5)",
          zIndex: 1
        }} />}
        
        {/* LIVE Badge */}
        <div style={{
          position: "absolute",
          top: 20,
          right: 20,
          display: "flex",
          alignItems: "center",
          gap: 8,
          background: "rgba(0,0,0,0.4)",
          backdropFilter: "blur(10px)",
          padding: "6px 12px",
          borderRadius: 6,
          border: "1px solid rgba(255,255,255,0.15)",
          zIndex: 2
        }}>
          <div style={{width: 6, height: 6, borderRadius: "50%", background: "#00FF88", boxShadow: "0 0 8px #00FF88"}} />
          <span style={{fontSize: 12, fontWeight: 600, color: "#fff", letterSpacing: ".1em", textTransform: "uppercase"}}>LIVE</span>
        </div>
        
        {/* Title & Category */}
        <h3 style={{
          fontSize: "clamp(20px,3vw,28px)",
          fontWeight: 800,
          fontFamily: "'Roboto',sans-serif",
          color: "#fff",
          textAlign: "center",
          margin: 0,
          textShadow: "0 2px 20px rgba(0,0,0,0.3)",
          position: "relative",
          zIndex: 2
        }}>
          {project.title}
        </h3>
        <span style={{
          fontSize: 11,
          letterSpacing: ".2em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.7)",
          marginTop: 8,
          fontWeight: 600,
          position: "relative",
          zIndex: 2
        }}>
          {project.category}
        </span>
      </div>

      {/* Card Bottom — Meta Info */}
      <div style={{ padding: "24px 28px 28px" }}>
        {/* Ultra-minimal project type indicator */}
        <div style={{
          fontSize: 11,
          fontWeight: 600,
          color: theme.textMuted,
          letterSpacing: ".1em",
          textTransform: "uppercase",
          marginBottom: 16,
          opacity: 0.7
        }}>
          {project.category}
        </div>

        {/* Description */}
        <p style={{fontSize: 15, color: theme.textMuted, lineHeight: 1.75, marginBottom: 20, opacity: .9}}>
          {project.longDesc}
        </p>

        {/* Tech Stack Tags */}
        <div style={{display: "flex", flexWrap: "wrap", gap: 8}}>
          {project.stack.map((tech) => {
            const [tH, setTH] = useState(false);
            return (
              <span 
                key={tech} 
                onMouseEnter={() => setTH(true)} 
                onMouseLeave={() => setTH(false)}
                style={{
                  padding: "6px 12px",
                  border: `1px solid ${tH ? theme.accent : theme.border}`,
                  borderRadius: 6,
                  fontSize: 12,
                  fontWeight: 500,
                  color: theme.text,
                  opacity: .75,
                  transition: "all .2s",
                  cursor: "default",
                  letterSpacing: ".02em"
                }}
              >{tech}</span>
            );
          })}
        </div>
        
        {/* Live Demo Arrow */}
        {project.liveUrl && (
          <a 
            href={project.liveUrl} 
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
}

export function ForestLayout({ theme, devMode, showGrid, scrollTo, tIdx, setTIdx, sel, setSel, sent, setSent, form, setForm, themeKey }) {
  const heroRef=useRef(null),heroTitleRef=useRef(null),heroBadgeRef=useRef(null),heroSubRef=useRef(null),heroCtaRef=useRef(null),heroStatsRef=useRef(null);
  const aboutRef=useRef(null),aboutImgRef=useRef(null),aboutTxtRef=useRef(null);
  const servicesRef=useRef(null),timelineRef=useRef(null),contactRef=useRef(null);
  const hPanelRef=useRef(null),hTrackRef=useRef(null);

  useGSAP((gsap,ST)=>{
    const tl=gsap.timeline({delay:.2});
    tl.fromTo(heroBadgeRef.current,{y:20,opacity:0},{y:0,opacity:1,duration:.7,ease:"expo.out"})
      .fromTo(heroTitleRef.current,{y:64,opacity:0,skewY:2.5},{y:0,opacity:1,skewY:0,duration:1.1,ease:"expo.out"},"-=.3")
      .fromTo(heroSubRef.current,{y:28,opacity:0},{y:0,opacity:1,duration:.8,ease:"expo.out"},"-=.55")
      .fromTo(heroCtaRef.current,{y:20,opacity:0},{y:0,opacity:1,duration:.7,ease:"expo.out"},"-=.4")
      .fromTo(heroStatsRef.current,{y:16,opacity:0},{y:0,opacity:1,duration:.7,ease:"expo.out"},"-=.35");
    
    // 3D scrolling animations for background name elements - now for entire page
    gsap.to(".name-bg",{
      yPercent:30,
      scale:1.1,
      rotationX:5,
      rotationY:3,
      ease:"none",
      scrollTrigger:{
        trigger:"body",
        start:"top top",
        end:"bottom top",
        scrub:2
      }
    });
    
    gsap.to(".name-float-1",{
      xPercent:-20,
      yPercent:-15,
      rotation:-25,
      scale:0.9,
      opacity:0.03,
      ease:"none",
      scrollTrigger:{
        trigger:"body",
        start:"top top",
        end:"bottom top",
        scrub:1.5
      }
    });
    
    gsap.to(".name-float-2",{
      xPercent:25,
      yPercent:20,
      rotation:20,
      scale:1.2,
      opacity:0.02,
      ease:"none",
      scrollTrigger:{
        trigger:"body",
        start:"top top",
        end:"bottom top",
        scrub:1.8
      }
    });
    
    gsap.to(heroTitleRef.current,{yPercent:-20,ease:"none",scrollTrigger:{trigger:heroRef.current,start:"top top",end:"bottom top",scrub:1.8}});
    document.querySelectorAll(".f-ring").forEach((el,i)=>{gsap.to(el,{y:i%2===0?-55:55,ease:"none",scrollTrigger:{trigger:heroRef.current,start:"top top",end:"bottom top",scrub:1+i*.2}});});
    gsap.fromTo(aboutImgRef.current,{x:-65,opacity:0,rotate:-2},{x:0,opacity:1,rotate:0,duration:1.1,ease:"expo.out",scrollTrigger:{trigger:aboutRef.current,start:"top 78%",toggleActions:"play none none none"}});
    gsap.fromTo(aboutTxtRef.current,{x:65,opacity:0},{x:0,opacity:1,duration:1.1,ease:"expo.out",delay:.1,scrollTrigger:{trigger:aboutRef.current,start:"top 78%",toggleActions:"play none none none"}});
    const sc=servicesRef.current?.querySelectorAll(".srv-card");
    if(sc)gsap.fromTo(sc,{y:46,opacity:0,scale:.96},{y:0,opacity:1,scale:1,stagger:.1,duration:.9,ease:"expo.out",scrollTrigger:{trigger:servicesRef.current,start:"top 82%"}});
    const ti=timelineRef.current?.querySelectorAll(".tl-item");
    if(ti)gsap.fromTo(ti,{x:-38,opacity:0},{x:0,opacity:1,stagger:.15,duration:.85,ease:"expo.out",scrollTrigger:{trigger:timelineRef.current,start:"top 82%"}});
    gsap.fromTo(contactRef.current,{y:36,opacity:0},{y:0,opacity:1,duration:.95,ease:"expo.out",scrollTrigger:{trigger:contactRef.current,start:"top 84%"}});
    document.querySelectorAll(".gsap-h-f").forEach(el=>gsap.fromTo(el,{clipPath:"inset(0 100% 0 0)",opacity:0},{clipPath:"inset(0 0% 0 0)",opacity:1,duration:1.1,ease:"expo.inOut",scrollTrigger:{trigger:el,start:"top 88%",toggleActions:"play none none none"}}));
  },[]);

  return <>
    {/* Global background name elements - visible across entire page */}
    <div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0}}>
      {/* Large blurred name in background */}
      <div className="name-bg" style={{
        position:"absolute",
        top:"50%",
        left:"50%",
        transform:"translate(-50%, -50%)",
        fontSize:"clamp(130px,20vw,440px)",
        fontWeight:900,
        fontFamily:"'Roboto', sans-serif",
        color:theme.accent,
        opacity:0.05,
        filter:"blur(3px)",
        letterSpacing:"-0.03em",
        pointerEvents:"none",
        zIndex:0,
        whiteSpace:"nowrap",
        textTransform:"uppercase",
        "@media (max-width: 768px)": {
          fontSize:"clamp(100px,20vw,320px)",
          opacity:0.07
        }
      }}>GAITHO</div>
      
      {/* Additional floating name elements for 3D effect */}
      <div className="name-float-1" style={{
        position:"absolute",
        top:"20%",
        left:"10%",
        fontSize:"clamp(45px,6vw,120px)",
        fontWeight:800,
        fontFamily:"'Roboto', sans-serif",
        color:theme.animOrb,
        opacity:0.06,
        filter:"blur(2px)",
        pointerEvents:"none",
        zIndex:0,
        transform:"rotate(-15deg)",
        "@media (max-width: 768px)": {
          fontSize:"clamp(35px,5vw,90px)",
          opacity:0.08,
          top:"15%",
          left:"6%"
        }
      }}>MICHAEL</div>
      
      <div className="name-float-2" style={{
        position:"absolute",
        bottom:"25%",
        right:"15%",
        fontSize:"clamp(40px,6vw,100px)",
        fontWeight:700,
        fontFamily:"'Space Mono', monospace",
        color:theme.animDot,
        opacity:0.05,
        filter:"blur(2.5px)",
        pointerEvents:"none",
        zIndex:0,
        transform:"rotate(5deg)",
        "@media (max-width: 768px)": {
          fontSize:"clamp(30px,4vw,70px)",
          opacity:0.07,
          bottom:"20%",
          right:"10%"
        }
      }}>DEVELOPER</div>
    </div>
    
    {/* Main content with higher z-index */}
    <div style={{position:"relative",zIndex:1}}>
    {/* HERO — organic curved bottom with car game */}
    <section ref={heroRef} id="hero" className="forest-hero" style={{minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"100px 40px 120px",position:"relative",overflow:"hidden",textAlign:"center",clipPath:"ellipse(120% 100% at 50% 0%)","@media (max-width: 768px)":{padding:"80px 20px 60px",minHeight:"85vh"}}}>
      <ParallaxElement theme={theme} speed={0.3}>
        <ParticleCanvas theme={theme}/>
        <div style={{position:"absolute",inset:0,pointerEvents:"none",backgroundImage:`linear-gradient(${theme.animFg} 1px,transparent 1px),linear-gradient(90deg,${theme.animFg} 1px,transparent 1px)`,backgroundSize:"64px 64px",maskImage:"radial-gradient(ellipse 75% 75% at 50% 50%,black 20%,transparent 100%)",WebkitMaskImage:"radial-gradient(ellipse 75% 75% at 50% 50%,black 20%,transparent 100%)"}}/>
        
        {/* Organic blob rings */}
        {[360,200,140,260,110].map((s,i)=><div key={i} className="f-ring" style={{position:"absolute",width:s,height:s,borderRadius:`${[48,62,55,70,58][i]}% ${[52,38,45,30,42][i]}% ${[44,60,50,66,52][i]}% ${[56,40,50,34,48][i]}%`,border:`1px solid ${theme.animDot}`,left:[`5%`,"68%","6%","62%","41%"][i],top:["7%","12%","58%","50%","73%"][i],pointerEvents:"none",opacity:.5,animation:[`spinSlow 30s linear infinite`,`spinSlowR 40s linear infinite`,`spinSlow 36s linear infinite`,`spinSlowR 50s linear infinite`,`spinSlow 24s linear infinite`][i]}}/>)}
        <div style={{position:"absolute",width:480,height:480,borderRadius:"50%",background:theme.animOrb,top:"50%",left:"50%",transform:"translate(-50%,-50%)",animation:"breathe 6s ease-in-out infinite",pointerEvents:"none"}}/>
      </ParallaxElement>
      
      <div className="hero-content" style={{position:"relative",zIndex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:"40px",maxWidth:1200,width:"100%","@media (max-width: 768px)":{maxWidth:"100%",gap:"30px"}}}>
        {/* Hero content */}
        <div style={{textAlign:"center"}}>
          <div ref={heroBadgeRef} style={{display:"inline-flex",alignItems:"center",gap:7,border:`1px solid ${theme.border}`,borderRadius:99,padding:"6px 16px",marginBottom:26,background:theme.surfaceAlt,backdropFilter:"blur(14px)",fontSize:14,letterSpacing:".14em",textTransform:"uppercase",color:theme.text,opacity:.9}}>
            <span style={{width:6,height:6,borderRadius:"50%",background:theme.accent,display:"inline-block",opacity:.65,animation:"pulse 2.8s ease-in-out infinite"}}/>Open to Opportunities
          </div>
          <h1 ref={heroTitleRef} className="hero-title" style={{fontFamily:"'Roboto',sans-serif",fontSize:"clamp(42px,8.5vw,90px)",fontWeight:800,lineHeight:1.02,letterSpacing:"-.03em",marginBottom:12,color:theme.text,opacity:.9}}>Michael<br/><span style={{color:theme.accent,opacity:.85}}>Gaitho</span></h1>
          <div ref={heroSubRef} className="hero-subtitle" style={{fontFamily:"'Space Mono',monospace",fontSize:"clamp(13px,1.8vw,17px)",marginBottom:32,minHeight:26}}><Typewriter words={["Frontend Developer","UI/UX Designer","Creative Coder","Problem Solver"]} theme={theme}/></div>
          <p className="hero-description" style={{fontSize:16,color:theme.textMuted,maxWidth:460,margin:"0 auto 36px",lineHeight:1.9,opacity:.85,"@media (max-width: 768px)":{fontSize:14,maxWidth:"100%",margin:"0 auto 24px"}}}>Building premium digital experiences — Nakuru, Kenya 🇰🇪</p>
          <div ref={heroCtaRef} className="hero-cta" style={{display:"flex",gap:11,justifyContent:"center",flexWrap:"wrap","@media (max-width: 768px)":{gap:8,flexDirection:"column",alignItems:"center"}}}>
            <button className="bp" onClick={()=>scrollTo("projects")}>View My Work ↓</button>
            <button className="bg" onClick={()=>scrollTo("contact")}>Let's Build</button>
          </div>
        </div>
      </div>
      
      {devMode&&<DevBadge id="hero" devMode={devMode} theme={theme}/>}
    </section>

    {/* Marquee */}
    <div style={{overflow:"hidden",background:theme.bg,borderTop:`1px solid ${theme.border}`,borderBottom:`1px solid ${theme.border}`,padding:"10px 0"}}>
      <div style={{display:"flex",gap:30,whiteSpace:"nowrap",animation:"marquee 22s linear infinite"}}>
        {[...TECH,...TECH].map((t,i)=><span key={i} style={{fontSize:14,fontWeight:600,letterSpacing:".15em",textTransform:"uppercase",color:theme.text,opacity:.6}}>{t.name}<span style={{marginLeft:16,opacity:.25}}>·</span></span>)}
      </div>
    </div>

    {/* ABOUT — diagonal offset */}
    <section ref={aboutRef} id="about" className="forest-about" style={{padding:"110px 40px",maxWidth:1010,margin:"0 auto",position:"relative","@media (max-width: 768px)":{padding:"60px 20px",maxWidth:"100%"}}}>
      <ScrollReveal theme={theme} direction="up" delay={0.1}>
        <div className="about-grid" style={{display:"grid",gridTemplateColumns:"1fr 1.3fr",gap:80,alignItems:"center","@media (max-width: 768px)":{gridTemplateColumns:"1fr",gap:40}}}>
        <div ref={aboutImgRef} style={{position:"relative"}}>
          {/* Organic shape frame */}
          <div style={{width:"100%",maxWidth:350,aspectRatio:"1",borderRadius:"48% 52% 62% 38% / 44% 56% 44% 56%",background:theme.surface,border:`1px solid ${theme.border}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:82,boxShadow:theme.shadowMd,position:"relative",overflow:"hidden"}}>
            <div style={{position:"absolute",inset:0,background:theme.animOrb}}/>
            <span style={{position:"relative",zIndex:1,fontSize:48,opacity:.6}}>•</span>
          </div>
          <div style={{position:"absolute",inset:-16,borderRadius:"48% 52% 62% 38% / 44% 56% 44% 56%",border:`1px dashed ${theme.animDot}`,animation:"spinSlow 30s linear infinite",pointerEvents:"none"}}/>
          <div style={{position:"absolute",bottom:8,right:-18,background:theme.surface,border:`1px solid ${theme.border}`,borderRadius:"12px 4px 12px 4px",padding:"9px 15px",backdropFilter:"blur(12px)",animation:"floatY 5s ease-in-out infinite",boxShadow:theme.shadow}}>
            <div style={{fontSize:12,color:theme.text,letterSpacing:".12em",marginBottom:2,opacity:.75}}>BASED IN</div>
            <div style={{fontWeight:600,fontSize:14,color:theme.text,opacity:.9}}>■ Nakuru, Kenya</div>
          </div>
          <div style={{position:"absolute",top:8,left:-18,background:theme.surface,border:`1px solid ${theme.border}`,borderRadius:"4px 12px 4px 12px",padding:"9px 15px",backdropFilter:"blur(12px)",animation:"floatYR 4.5s ease-in-out infinite .4s",boxShadow:theme.shadow}}>
            <div style={{fontSize:12,color:theme.text,letterSpacing:".12em",marginBottom:2,opacity:.75}}>AT</div>
            <div style={{fontWeight:600,fontSize:14,color:theme.text,opacity:.9}}>◦ AI Interfaces</div>
          </div>
        </div>
        <div ref={aboutTxtRef}>
          <span className="sec-label">About Me</span>
          <h2 className="gsap-h-f" style={{fontFamily:theme.headingFont,fontSize:"clamp(28px,3.5vw,42px)",fontWeight:800,lineHeight:1.15,letterSpacing:"-.02em",marginBottom:20,color:theme.text,opacity:.9}}>
            Crafting interfaces<br/><span style={{color:theme.accent,opacity:.82}}>worth remembering</span>
          </h2>
          <p style={{color:theme.textMuted,lineHeight:1.9,marginBottom:14,fontSize:15}}>Frontend Developer & UI/UX designer specializing in AI-powered interfaces and real-time analytics.</p>
          <p style={{color:theme.textMuted,lineHeight:1.9,marginBottom:28,fontSize:15}}>Bachelor of IT student, blending academic rigour with real-world craft.</p>
          <div style={{display:"flex",gap:11,flexWrap:"wrap"}}><button className="bp" onClick={() => window.open('/resume.pdf', '_blank')}>Download Resume</button><button className="bg" onClick={()=>scrollTo("projects")}>See My Work</button></div>
        </div>
        </div>
      </ScrollReveal>
      {devMode&&<DevBadge id="about" devMode={devMode} theme={theme}/>}
    </section>

    {/* SKILLS — organic layout */}
    <section id="skills" className="forest-skills" style={{padding:"110px 40px",borderTop:`1px solid ${theme.border}`,borderBottom:`1px solid ${theme.border}`,position:"relative"}}>
      <ScrollReveal theme={theme} direction="up" delay={0.2}>
        <div style={{maxWidth:1010,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:58}}><span className="sec-label" style={{display:"block",textAlign:"center"}}>Expertise</span><h2 className={clsx('gsap-h-f', 'section-title')} style={{fontFamily:"'Roboto',sans-serif",fontSize:"clamp(28px,4vw,44px)",fontWeight:800,letterSpacing:"-.02em",color:theme.text,opacity:.9}}>Skills & Proficiency</h2></div>
        <div className="skills-grid" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:62}}>
          <div>{SKILLS.map((s,i)=><SkillBar key={s.label} {...s} theme={theme} delay={i*.09}/>)}</div>
          <div>
            <h3 style={{fontFamily:"'Roboto',sans-serif",fontSize:17,fontWeight:700,marginBottom:20,color:theme.textMuted,letterSpacing:".08em",textTransform:"uppercase",opacity:.8}}>Tech Stack</h3>
            <div style={{display:"flex",flexWrap:"wrap",gap:12}}>
              {TECH.map((t,i)=>{
                const [h,setH]=useState(false);
                return (
                  <div 
                    key={i} 
                    onMouseEnter={()=>setH(true)} 
                    onMouseLeave={()=>setH(false)}
                    style={{
                      display:"flex",
                      alignItems:"center",
                      gap:8,
                      padding:"10px 16px",
                      background:h?"rgba(0,0,0,0.05)":theme.surfaceAlt,
                      borderRadius:"12px 3px 12px 3px",
                      transition:"all .2s",
                      cursor:"default",
                      backdropFilter:"blur(10px)",
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
                    <span style={{fontSize:14,fontWeight:500,color:theme.text,opacity:.7}}>{t.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        </div>
      </ScrollReveal>
      {devMode&&<DevBadge id="skills" devMode={devMode} theme={theme}/>}
    </section>

    {/* PROJECTS — case study grid */}
    <section id="projects" className="forest-projects" style={{padding:"110px 40px",position:"relative"}}>
      <ScrollReveal theme={theme} direction="up" delay={0.3}>
        <div style={{maxWidth:1200,margin:"0 auto"}}>
          <div style={{textAlign:"left",marginBottom:40}}>
            <span className="sec-label" style={{display:"block"}}>Selected Work</span>
            <h2 className={clsx('gsap-h-f', 'section-title')} style={{fontFamily:"'Roboto',sans-serif",fontSize:"clamp(30px,4vw,44px)",fontWeight:800,letterSpacing:"-.02em",marginBottom:16,color:theme.text,opacity:.9}}>Selected Work</h2>
            <p style={{fontSize:16,color:theme.textMuted,lineHeight:1.75,maxWidth:600}}>A selection of enterprise engagements — from greenfield architecture to complex systems integration at scale.</p>
          </div>
          <div className="projects-grid" style={{
            display:"grid",
            gridTemplateColumns:"repeat(2,1fr)",
            gap:24,
            "@media (max-width: 768px)": {
              gridTemplateColumns:"1fr"
            }
          }}>
          {PROJECTS.map((project,i)=>(
            <ScrollReveal key={project.id} theme={theme} direction="up" delay={0.4+i*0.1}>
              <ProjectCard project={project} theme={theme} onSelect={setSel}/>
            </ScrollReveal>
          ))}
          </div>
        </div>
      </ScrollReveal>
      {devMode&&<DevBadge id="projects" devMode={devMode} theme={theme}/>}
    </section>

    {/* TIMELINE — branch style */}
    <section ref={timelineRef} id="experience" className="forest-timeline" style={{padding:"110px 40px",position:"relative"}}>
      <ScrollReveal theme={theme} direction="left" delay={0.4}>
        <div style={{maxWidth:660,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:58}}><span className="sec-label" style={{display:"block",textAlign:"center"}}>Journey</span><h2 className={clsx('gsap-h-f', 'section-title')} style={{fontFamily:"'Roboto',sans-serif",fontSize:"clamp(28px,4vw,44px)",fontWeight:800,letterSpacing:"-.02em",color:theme.text,opacity:.9}}>Experience & Education</h2></div>
        <div style={{position:"relative"}}>
          <div className="timeline-line" style={{position:"absolute",left:21,top:0,bottom:0,width:2,background:theme.borderMid,opacity:.4,borderRadius:99}}/>
          {TIMELINE.map((t,i)=><div key={i} className="tl-item" style={{display:"flex",gap:26,marginBottom:42}}>
            <div style={{width:43,height:43,borderRadius:"48% 52% 62% 38% / 44% 56% 44% 56%",background:"transparent",border:`1px solid ${theme.borderMid}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,flexShrink:0,boxShadow:theme.shadow,opacity:.6}}>{t.type==="edu"?"◦":"■"}</div>
            <div style={{paddingTop:5}}>
              <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:6,flexWrap:"wrap"}}>
                <span style={{fontFamily:"'Space Mono',monospace",fontSize:14,color:theme.textMuted,fontWeight:700,background:"transparent",padding:"3px 9px",borderRadius:"8px 2px 8px 2px",border:`1px solid ${theme.border}`}}>{t.year}</span>
                <span style={{fontSize:14,color:theme.accent,fontWeight:700,opacity:.8}}>{t.place}</span>
              </div>
              <h3 style={{fontFamily:"'Roboto',sans-serif",fontSize:20,fontWeight:700,marginBottom:8,color:theme.text,opacity:.9}}>{t.title}</h3>
              <p style={{fontSize:16,color:theme.textMuted,lineHeight:1.75,opacity:.8}}>{t.desc}</p>
            </div>
          </div>)}
        </div>
        </div>
      </ScrollReveal>
      {devMode&&<DevBadge id="experience" devMode={devMode} theme={theme}/>}
    </section>

    {/* SERVICES — single card with vertical layout */}
    <section ref={servicesRef} id="services" className="forest-services" style={{padding:"110px 40px",borderTop:`1px solid ${theme.border}`,borderBottom:`1px solid ${theme.border}`,position:"relative"}}>
      <ScrollReveal theme={theme} direction="up" delay={0.3}>
        <div style={{maxWidth:1100,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:58}}><span className="sec-label" style={{display:"block",textAlign:"center"}}>What I Do</span><h2 className={clsx('gsap-h-f', 'section-title')} style={{fontFamily:"'Roboto',sans-serif",fontSize:"clamp(28px,4vw,44px)",fontWeight:800,letterSpacing:"-.02em",color:theme.text,opacity:.9}}>Services</h2></div>
        {(() => {
          const [cardHover, setCardHover] = useState(false);
          return (
            <div 
              className="services-card" 
              onMouseEnter={() => setCardHover(true)}
              onMouseLeave={() => setCardHover(false)}
              style={{background:"transparent",border:`1px solid rgba(242, 239, 231, ${cardHover ? 0.7 : 0.3})`,borderRadius:12,padding:"30px",transition:"border-color .2s"}}
            >
              <div style={{display:"flex",flexDirection:"column",gap:0}}>
                {SERVICES.map((s,i)=><div key={s.title} className="srv-item" style={{display:"flex",alignItems:"flex-start",gap:28,padding:"35px 40px",background:"transparent",borderRadius:8,transition:"background .2s",cursor:"default",borderBottom:i===SERVICES.length-1?"none":`1px solid rgba(242, 239, 231, ${cardHover ? 0.7 : 0.3})`}}
                  onMouseEnter={e=>{e.currentTarget.style.background="rgba(0,0,0,0.03)";}}
                  onMouseLeave={e=>{e.currentTarget.style.background="transparent";}}>
                  <div style={{fontSize:36,opacity:.4,lineHeight:1,flexShrink:0,marginTop:2}}>{s.icon}</div>
                  <div>
                    <h3 style={{fontFamily:"'Roboto',sans-serif",fontSize:19,fontWeight:700,marginBottom:10,color:theme.text}}>{s.title}</h3>
                    <p style={{fontSize:15,color:theme.textMuted,lineHeight:1.8}}>{s.desc}</p>
                  </div>
                </div>)}
              </div>
            </div>
          );
        })()}
        </div>
      </ScrollReveal>
      {devMode&&<DevBadge id="services" devMode={devMode} theme={theme}/>}
    </section>

    {/* CONTACT — combined connect and form in unique organic layout */}
    <section ref={contactRef} id="contact" className="forest-contact" style={{borderTop:`1px solid ${theme.border}`,position:"relative"}}>
      <ScrollReveal theme={theme} direction="up" delay={0.5}>
        <div style={{maxWidth:1100,margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:50}}>
            <span className="sec-label" style={{display:"block",textAlign:"center"}}>Connect</span>
            <h2 className={clsx('gsap-h-f', 'section-title')} style={{fontFamily:"'Roboto',sans-serif",fontSize:"clamp(28px,4vw,44px)",fontWeight:800,letterSpacing:"-.02em",color:theme.text,opacity:.9}}>Let's Work Together</h2>
          </div>
          {/* Organic split layout */}
          <div className="contact-grid" style={{display:"grid",gridTemplateColumns:"1fr 1.5fr",gap:50,alignItems:"start"}}>
            {/* Left side - Contact info as organic cards */}
            <div style={{display:"flex",flexDirection:"column",gap:20}}>
              <p className="contact-desc" style={{fontSize:15,lineHeight:1.8,color:theme.text,opacity:.8,marginBottom:8}}>I'm always interested in hearing about new projects and opportunities. Whether you have a question or just want to say hi, feel free to reach out!</p>
              {CONTACT_INFO.map((c,i)=>(
                <a
                  key={i}
                  className="contact-card"
                  href={c.link}
                  onClick={(e)=>{if(c.action==="scroll"){e.preventDefault();scrollTo("contact");}}}
                  target={c.action==="scroll"?"_self":"_blank"}
                  rel="noopener noreferrer"
                  style={{
                    background:"transparent",
                    border:`1px solid ${theme.border}`,
                    borderRadius:i===0?"50% 50% 50% 50% / 60% 40% 60% 40%":i===1?"40% 60% 40% 60% / 50% 50% 50% 50%":"50% 50% 50% 50% / 40% 60% 40% 60%",
                    padding:"24px",
                    textDecoration:"none",
                    display:"flex",
                    alignItems:"center",
                    gap:16,
                    transition:"all .3s",
                    opacity:.9,
                    position:"relative"
                  }}
                  onMouseOver={e=>{
                    e.currentTarget.style.borderColor=theme.accent;
                    e.currentTarget.style.opacity=1;
                    e.currentTarget.style.transform="scale(1.02)";
                  }}
                  onMouseOut={e=>{
                    e.currentTarget.style.borderColor=theme.border;
                    e.currentTarget.style.opacity=.9;
                    e.currentTarget.style.transform="scale(1)";
                  }}
                >
                  <div className="contact-icon" style={{width:52,height:52,borderRadius:"50%",background:theme.accent,opacity:.2,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,color:theme.accent,flexShrink:0}}>{c.icon}</div>
                  <div>
                    <div className="contact-title" style={{fontSize:16,fontWeight:700,color:theme.text,fontFamily:"'Roboto',sans-serif",marginBottom:4}}>{c.title}</div>
                    <div className="contact-value" style={{fontSize:13,color:theme.textMuted,opacity:.8}}>{c.value}</div>
                  </div>
                </a>
              ))}
            </div>
            {/* Right side - Contact form */}
            <div className="contact-form" style={{background:theme.surfaceAlt,border:`1px solid ${theme.border}`,borderRadius:"18px 4px 18px 4px",backdropFilter:"blur(12px)",boxShadow:theme.shadow}}>
              {sent?<div style={{textAlign:"center",padding:"30px 0"}}><div style={{fontSize:24,marginBottom:16,opacity:.6}}>✓</div><h3 style={{fontFamily:"'Roboto',sans-serif",fontSize:20,fontWeight:800,color:theme.text}}>Message Sent!</h3><p style={{color:theme.textMuted,fontSize:14}}>Michael will reply shortly.</p></div>:<>
                {[{l:"Name",k:"name",t:"text",p:"Your name"},{l:"Email",k:"email",t:"email",p:"hello@example.com"},{l:"Subject",k:"subject",t:"text",p:"Project Inquiry"}].map(f=><div key={f.k} style={{marginBottom:14}}>
                  <label className="form-label" style={{display:"block",fontSize:14,fontWeight:700,letterSpacing:".17em",textTransform:"uppercase",color:theme.text,marginBottom:5,fontFamily:"'Space Mono',monospace",opacity:.8}}>{f.l}</label>
                  <input className="form-input" style={{width:"100%",padding:"12px 14px",background:theme.surface,border:`1px solid ${theme.border}`,borderRadius:"12px 3px 12px 3px",color:theme.text,fontSize:15,fontFamily:"'DM Sans',sans-serif",outline:"none"}} type={f.t} placeholder={f.p} value={form[f.k]} onChange={e=>setForm(d=>({...d,[f.k]:e.target.value}))}/>
                </div>)}
                <div style={{marginBottom:20}}>
                  <label className="form-label" style={{display:"block",fontSize:14,fontWeight:700,letterSpacing:".17em",textTransform:"uppercase",color:theme.text,marginBottom:5,fontFamily:"'Space Mono',monospace",opacity:.8}}>Message</label>
                  <textarea className="form-textarea" style={{width:"100%",padding:"12px 14px",background:theme.surface,border:`1px solid ${theme.border}`,borderRadius:"12px 3px 12px 3px",color:theme.text,fontSize:15,fontFamily:"'DM Sans',sans-serif",outline:"none",resize:"vertical"}} rows={5} placeholder="Tell me about your project..." value={form.message} onChange={e=>setForm(d=>({...d,message:e.target.value}))}/>
                </div>
                <button className={clsx('bp', 'form-button')} onClick={()=>{
                  const subject = encodeURIComponent(form.subject || "Portfolio Contact");
                  const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`);
                  window.open(`mailto:michaelgaitho47@gmail.com?subject=${subject}&body=${body}`);
                  setSent(true);
                }} style={{width:"100%",display:"flex",justifyContent:"center",fontSize:14,padding:"14px",borderRadius:"12px 3px 12px 3px"}}>Send Message →</button>
              </>}
            </div>
          </div>
        </div>
      </ScrollReveal>
      {devMode&&<DevBadge id="contact" devMode={devMode} theme={theme}/>}
    </section>
    </div>
  </>;
}
