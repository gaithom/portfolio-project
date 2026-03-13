import { useState, useRef } from "react";
import { useGSAP } from "../hooks/useGSAP";
import { ParticleCanvas, Typewriter, SkillBar, Modal, ParallaxElement, ScrollReveal } from "../components/Shared";
import { CarDrivingGame } from "../components/CarDrivingGame";
import { DevBadge } from "../components/DeveloperMode";
import { PROJECTS, SKILLS, TECH, SERVICES, TIMELINE, CONTACT_INFO } from "../data/content";

// ── Project Card Component ───────────────────────────────────────────────────
function ProjectCard({ project, theme, onSelect }) {
  const [hovered, setHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const ref = useRef(null);
  
  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    setTilt({
      x: ((e.clientY - rect.top - rect.height / 2) / rect.height) * -7,
      y: ((e.clientX - rect.left - rect.width / 2) / rect.width) * 7
    });
  };
  
  return (
    <div 
      ref={ref} 
      onMouseEnter={() => setHovered(true)} 
      onMouseLeave={() => { setHovered(false); setTilt({ x: 0, y: 0 }); }} 
      onMouseMove={handleMouseMove} 
      onClick={() => onSelect(project)} 
      style={{
        width: 305,
        flexShrink: 0,
        background: hovered ? theme.surface : theme.surfaceAlt,
        border: `1px solid ${hovered ? theme.borderMid : theme.border}`,
        borderRadius: "18px 4px 18px 4px",
        overflow: "hidden",
        cursor: "pointer",
        transform: hovered 
          ? `perspective(700px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(-5px)` 
          : "perspective(700px) rotateX(0) rotateY(0)",
        transition: "all .3s",
        boxShadow: hovered ? theme.shadowMd : theme.shadow,
        backdropFilter: "blur(12px)"
      }}
    >
      <div style={{ height: 148, background: project.cardBg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 46 }}>
        {project.emoji}
      </div>
      <div style={{ padding: "15px 20px 22px" }}>
        <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 9 }}>
          {project.tags.map(t => (
            <span key={t} style={{ fontSize: 9, fontWeight: 600, letterSpacing: ".11em", textTransform: "uppercase", color: theme.textMuted, border: `1px solid ${theme.border}`, borderRadius: 99, padding: "2px 8px", opacity: .8 }}>
              {t}
            </span>
          ))}
        </div>
        <h3 style={{ fontSize: 15, fontWeight: 700, margin: "0 0 6px", fontFamily: "'Syne', sans-serif", color: theme.text }}>
          {project.title}
        </h3>
        <p style={{ fontSize: 12, color: theme.textMuted, margin: 0, lineHeight: 1.75 }}>
          {project.desc}
        </p>
      </div>
    </div>
  );
}

export function ForestLayout({ theme, devMode, showGrid, scrollTo, tIdx, setTIdx, sel, setSel, sent, setSent, form, setForm, themeKey }) {
  const heroRef=useRef(null),heroTitleRef=useRef(null),heroBadgeRef=useRef(null),heroSubRef=useRef(null),heroCtaRef=useRef(null),heroStatsRef=useRef(null);
  const aboutRef=useRef(null),aboutImgRef=useRef(null),aboutTxtRef=useRef(null);
  const servicesRef=useRef(null),timelineRef=useRef(null),contactRef=useRef(null);
  const hPanelRef=useRef(null),hTrackRef=useRef(null);
  const [filter,setFilter]=useState("All");
  const filtered=filter==="All"?PROJECTS:PROJECTS.filter(p=>p.tags.includes(filter));

  useGSAP((gsap,ST)=>{
    const tl=gsap.timeline({delay:.2});
    tl.fromTo(heroBadgeRef.current,{y:20,opacity:0},{y:0,opacity:1,duration:.7,ease:"expo.out"})
      .fromTo(heroTitleRef.current,{y:64,opacity:0,skewY:2.5},{y:0,opacity:1,skewY:0,duration:1.1,ease:"expo.out"},"-=.3")
      .fromTo(heroSubRef.current,{y:28,opacity:0},{y:0,opacity:1,duration:.8,ease:"expo.out"},"-=.55")
      .fromTo(heroCtaRef.current,{y:20,opacity:0},{y:0,opacity:1,duration:.7,ease:"expo.out"},"-=.4")
      .fromTo(heroStatsRef.current,{y:16,opacity:0},{y:0,opacity:1,duration:.7,ease:"expo.out"},"-=.35");
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
  useGSAP((gsap,ST)=>{
    if(!hPanelRef.current||!hTrackRef.current) return;
    const track=hTrackRef.current,panel=hPanelRef.current,totalW=track.scrollWidth-panel.offsetWidth;
    const hst=ST.create({trigger:panel,start:"top top",end:()=>`+=${totalW+100}`,pin:true,scrub:1.1,anticipatePin:1,onUpdate:self=>{track.style.transform=`translateX(-${self.progress*totalW}px)`;}});
    return()=>hst.kill();
  },[filter]);

  return <>
    {/* HERO — organic curved bottom with car game */}
    <section ref={heroRef} id="hero" style={{minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"100px 40px 120px",position:"relative",overflow:"hidden",textAlign:"center",clipPath:"ellipse(120% 100% at 50% 0%)"}}>
      <ParallaxElement theme={theme} speed={0.3}>
        <ParticleCanvas theme={theme}/>
        <div style={{position:"absolute",inset:0,pointerEvents:"none",backgroundImage:`linear-gradient(${theme.animFg} 1px,transparent 1px),linear-gradient(90deg,${theme.animFg} 1px,transparent 1px)`,backgroundSize:"64px 64px",maskImage:"radial-gradient(ellipse 75% 75% at 50% 50%,black 20%,transparent 100%)",WebkitMaskImage:"radial-gradient(ellipse 75% 75% at 50% 50%,black 20%,transparent 100%)"}}/>
        {/* Organic blob rings */}
        {[360,200,140,260,110].map((s,i)=><div key={i} className="f-ring" style={{position:"absolute",width:s,height:s,borderRadius:`${[48,62,55,70,58][i]}% ${[52,38,45,30,42][i]}% ${[44,60,50,66,52][i]}% ${[56,40,50,34,48][i]}%`,border:`1px solid ${theme.animDot}`,left:[`5%`,"68%","6%","62%","41%"][i],top:["7%","12%","58%","50%","73%"][i],pointerEvents:"none",opacity:.5,animation:[`spinSlow 30s linear infinite`,`spinSlowR 40s linear infinite`,`spinSlow 36s linear infinite`,`spinSlowR 50s linear infinite`,`spinSlow 24s linear infinite`][i]}}/>)}
        <div style={{position:"absolute",width:480,height:480,borderRadius:"50%",background:`radial-gradient(circle,${theme.animOrb} 0%,transparent 68%)`,top:"50%",left:"50%",transform:"translate(-50%,-50%)",animation:"breathe 6s ease-in-out infinite",pointerEvents:"none"}}/>
      </ParallaxElement>
      
      <div style={{position:"relative",zIndex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:"40px",maxWidth:1200,width:"100%"}}>
        {/* Hero content */}
        <div style={{textAlign:"center"}}>
          <div ref={heroBadgeRef} style={{display:"inline-flex",alignItems:"center",gap:7,border:`1px solid ${theme.border}`,borderRadius:99,padding:"6px 16px",marginBottom:26,background:theme.surfaceAlt,backdropFilter:"blur(14px)",fontSize:10,letterSpacing:".14em",textTransform:"uppercase",color:theme.textMuted,opacity:.9}}>
            <span style={{width:6,height:6,borderRadius:"50%",background:theme.accent,display:"inline-block",opacity:.65,animation:"pulse 2.8s ease-in-out infinite"}}/>Available for Freelance Projects
          </div>
          <h1 ref={heroTitleRef} style={{fontFamily:"'Syne',sans-serif",fontSize:"clamp(42px,8.5vw,90px)",fontWeight:800,lineHeight:1.02,letterSpacing:"-.03em",marginBottom:12,color:theme.text,opacity:.9}}>Michael<br/><span style={{color:theme.accent,opacity:.85}}>Gaitho</span></h1>
          <div ref={heroSubRef} style={{fontFamily:"'Space Mono',monospace",fontSize:"clamp(13px,1.8vw,17px)",marginBottom:32,minHeight:26}}><Typewriter words={["Frontend Developer","UI/UX Designer","Creative Coder","Problem Solver"]} theme={theme}/></div>
          <p style={{fontSize:15,color:theme.textMuted,maxWidth:460,margin:"0 auto 36px",lineHeight:1.9,opacity:.85}}>Building premium digital experiences — Nakuru, Kenya 🇰🇪</p>
          <div ref={heroCtaRef} style={{display:"flex",gap:11,justifyContent:"center",flexWrap:"wrap"}}>
            <button className="bp" onClick={()=>scrollTo("projects")}>View My Work ↓</button>
            <button className="bg" onClick={()=>scrollTo("contact")}>Let's Build</button>
          </div>
        </div>
        
        {/* Car Driving Game */}
        <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
          <div style={{marginBottom:15,fontSize:12,letterSpacing:".1em",textTransform:"uppercase",color:theme.textMuted,fontFamily:"'Space Mono',monospace",opacity:.7}}>
            Drive Through the Forest 🌲
          </div>
          <CarDrivingGame theme={theme} scrollTo={scrollTo} />
        </div>
      </div>
      
      {devMode&&<DevBadge id="hero" devMode={devMode} theme={theme}/>}
    </section>

    {/* Marquee */}
    <div style={{overflow:"hidden",background:theme.bgAlt,borderTop:`1px solid ${theme.border}`,borderBottom:`1px solid ${theme.border}`,padding:"10px 0"}}>
      <div style={{display:"flex",gap:30,whiteSpace:"nowrap",animation:"marquee 22s linear infinite"}}>
        {[...TECH,...TECH].map((t,i)=><span key={i} style={{fontSize:10,fontWeight:600,letterSpacing:".15em",textTransform:"uppercase",color:theme.textMuted,opacity:.45}}>{t}<span style={{marginLeft:16,opacity:.25}}>·</span></span>)}
      </div>
    </div>

    {/* ABOUT — diagonal offset */}
    <section ref={aboutRef} id="about" style={{padding:"110px 40px",maxWidth:1010,margin:"0 auto",position:"relative"}}>
      <ScrollReveal theme={theme} direction="up" delay={0.1}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1.3fr",gap:80,alignItems:"center"}}>
        <div ref={aboutImgRef} style={{position:"relative"}}>
          {/* Organic shape frame */}
          <div style={{width:"100%",maxWidth:350,aspectRatio:"1",borderRadius:"48% 52% 62% 38% / 44% 56% 44% 56%",background:`linear-gradient(140deg,${theme.surface},${theme.bgAlt})`,border:`1px solid ${theme.border}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:82,boxShadow:theme.shadowMd,position:"relative",overflow:"hidden"}}>
            <div style={{position:"absolute",inset:0,background:`radial-gradient(circle at 35% 30%,${theme.animOrb},transparent 62%)`}}/>
            <span style={{position:"relative",zIndex:1}}>👨🏾‍💻</span>
          </div>
          <div style={{position:"absolute",inset:-16,borderRadius:"48% 52% 62% 38% / 44% 56% 44% 56%",border:`1px dashed ${theme.animDot}`,animation:"spinSlow 30s linear infinite",pointerEvents:"none"}}/>
          <div style={{position:"absolute",bottom:8,right:-18,background:theme.surface,border:`1px solid ${theme.border}`,borderRadius:"12px 4px 12px 4px",padding:"9px 15px",backdropFilter:"blur(12px)",animation:"floatY 5s ease-in-out infinite",boxShadow:theme.shadow}}>
            <div style={{fontSize:8,color:theme.textMuted,letterSpacing:".12em",marginBottom:2,opacity:.65}}>BASED IN</div>
            <div style={{fontWeight:600,fontSize:12,color:theme.text,opacity:.85}}>📍 Nakuru, Kenya</div>
          </div>
          <div style={{position:"absolute",top:8,left:-18,background:theme.surface,border:`1px solid ${theme.border}`,borderRadius:"4px 12px 4px 12px",padding:"9px 15px",backdropFilter:"blur(12px)",animation:"floatYR 4.5s ease-in-out infinite .4s",boxShadow:theme.shadow}}>
            <div style={{fontSize:8,color:theme.textMuted,letterSpacing:".12em",marginBottom:2,opacity:.65}}>AT</div>
            <div style={{fontWeight:600,fontSize:12,color:theme.text,opacity:.85}}>🧠 AI Interfaces</div>
          </div>
        </div>
        <div ref={aboutTxtRef}>
          <span className="sec-label">About Me</span>
          <h2 className="gsap-h-f" style={{fontFamily:theme.headingFont,fontSize:"clamp(26px,3.5vw,40px)",fontWeight:800,lineHeight:1.15,letterSpacing:"-.02em",marginBottom:20,color:theme.text,opacity:.9}}>
            Crafting interfaces<br/><span style={{color:theme.accent,opacity:.82}}>worth remembering</span>
          </h2>
          <p style={{color:theme.textMuted,lineHeight:1.9,marginBottom:14,fontSize:14}}>Frontend Developer & UI/UX designer specializing in AI-powered interfaces and real-time analytics.</p>
          <p style={{color:theme.textMuted,lineHeight:1.9,marginBottom:28,fontSize:14}}>Bachelor of IT student, blending academic rigour with real-world craft.</p>
          <div style={{display:"flex",gap:11,flexWrap:"wrap"}}><button className="bp">Download CV</button><button className="bg" onClick={()=>scrollTo("projects")}>See My Work</button></div>
        </div>
        </div>
      </ScrollReveal>
      {devMode&&<DevBadge id="about" devMode={devMode} theme={theme}/>}
    </section>

    {/* SKILLS — organic layout */}
    <section id="skills" style={{padding:"110px 40px",background:theme.bgAlt,borderTop:`1px solid ${theme.border}`,borderBottom:`1px solid ${theme.border}`,position:"relative"}}>
      <ScrollReveal theme={theme} direction="up" delay={0.2}>
        <div style={{maxWidth:1010,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:58}}><span className="sec-label" style={{display:"block",textAlign:"center"}}>Expertise</span><h2 className="gsap-h-f" style={{fontFamily:"'Syne',sans-serif",fontSize:"clamp(26px,4vw,42px)",fontWeight:800,letterSpacing:"-.02em",color:theme.text,opacity:.9}}>Skills & Proficiency</h2></div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:62}}>
          <div>{SKILLS.map((s,i)=><SkillBar key={s.label} {...s} theme={theme} delay={i*.09}/>)}</div>
          <div>
            <h3 style={{fontFamily:"'Syne',sans-serif",fontSize:13,fontWeight:700,marginBottom:20,color:theme.textMuted,letterSpacing:".08em",textTransform:"uppercase",opacity:.7}}>Tech Stack</h3>
            <div style={{display:"flex",flexWrap:"wrap",gap:7}}>
              {TECH.map(t=><span key={t} style={{padding:"6px 13px",background:theme.surfaceAlt,border:`1px solid ${theme.border}`,borderRadius:"12px 3px 12px 3px",fontSize:12,fontWeight:500,color:theme.text,opacity:.7,backdropFilter:"blur(10px)",transition:"all .2s",cursor:"default"}}
                onMouseEnter={e=>{e.target.style.opacity=1;e.target.style.borderColor=theme.borderMid;}}
                onMouseLeave={e=>{e.target.style.opacity=.7;e.target.style.borderColor=theme.border;}}>{t}</span>)}
            </div>
          </div>
        </div>
        </div>
      </ScrollReveal>
      {devMode&&<DevBadge id="skills" devMode={devMode} theme={theme}/>}
    </section>

    {/* PROJECTS — horizontal scroll */}
    <section id="projects" style={{padding:"80px 0 0",position:"relative"}}>
      <div style={{textAlign:"center",marginBottom:34,padding:"0 40px"}}>
        <span className="sec-label" style={{display:"block",textAlign:"center"}}>Portfolio</span>
        <h2 className="gsap-h-f" style={{fontFamily:"'Syne',sans-serif",fontSize:"clamp(26px,4vw,42px)",fontWeight:800,letterSpacing:"-.02em",marginBottom:20,color:theme.text,opacity:.9}}>Selected Work</h2>
        <div style={{display:"flex",gap:6,justifyContent:"center",flexWrap:"wrap"}}>
          {["All","UI/UX","Web App","Research"].map(f=><button key={f} onClick={()=>setFilter(f)} style={{padding:"7px 18px",borderRadius:99,fontSize:11,fontWeight:700,cursor:"pointer",fontFamily:"'Syne',sans-serif",letterSpacing:".07em",border:`1px solid ${filter===f?theme.borderMid:theme.border}`,background:filter===f?theme.surface:"transparent",color:filter===f?theme.text:theme.textMuted,opacity:filter===f?.9:.55,transition:"all .2s"}}>{f}</button>)}
        </div>
      </div>
      <div ref={hPanelRef} style={{overflow:"hidden",position:"relative",height:"100vh"}}>
        <div ref={hTrackRef} style={{display:"flex",gap:20,padding:"55px 55px 55px 48px",willChange:"transform",alignItems:"center",height:"100%",width:"max-content"}}>
          {filtered.map((project,i) => (
            <ProjectCard key={project.id} project={project} theme={theme} onSelect={setSel} />
          ))}
        </div>
        <div style={{position:"absolute",bottom:18,right:38,fontSize:9,color:theme.textMuted,letterSpacing:".15em",textTransform:"uppercase",opacity:.3}}>scroll →</div>
      </div>
      {devMode&&<DevBadge id="projects" devMode={devMode} theme={theme}/>}
    </section>

    {/* SERVICES — organic asymmetric grid */}
    <section ref={servicesRef} id="services" style={{padding:"110px 40px",background:theme.bgAlt,borderTop:`1px solid ${theme.border}`,borderBottom:`1px solid ${theme.border}`,position:"relative"}}>
      <ScrollReveal theme={theme} direction="up" delay={0.3}>
        <div style={{maxWidth:1010,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:58}}><span className="sec-label" style={{display:"block",textAlign:"center"}}>What I Do</span><h2 className="gsap-h-f" style={{fontFamily:"'Syne',sans-serif",fontSize:"clamp(26px,4vw,42px)",fontWeight:800,letterSpacing:"-.02em",color:theme.text,opacity:.9}}>Services</h2></div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14}}>
          {SERVICES.map((s,i)=><div key={s.title} className="srv-card" style={{background:theme.surfaceAlt,border:`1px solid ${theme.border}`,borderRadius:["18px 4px 18px 4px","4px 18px 4px 18px","18px 4px 18px 4px","4px 18px 4px 18px"][i],padding:26,backdropFilter:"blur(12px)",transition:"transform .3s,box-shadow .3s,border-color .3s",cursor:"default",marginTop:i%2===1?24:0}}
            onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-6px)";e.currentTarget.style.boxShadow=theme.shadowMd;e.currentTarget.style.borderColor=theme.borderMid;}}
            onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="none";e.currentTarget.style.borderColor=theme.border;}}>
            <div style={{fontSize:32,marginBottom:14,opacity:.75}}>{s.icon}</div>
            <h3 style={{fontFamily:"'Syne',sans-serif",fontSize:16,fontWeight:700,marginBottom:8,color:theme.text,opacity:.88}}>{s.title}</h3>
            <p style={{fontSize:13,color:theme.textMuted,lineHeight:1.78,opacity:.85}}>{s.desc}</p>
          </div>)}
        </div>
        </div>
      </ScrollReveal>
      {devMode&&<DevBadge id="services" devMode={devMode} theme={theme}/>}
    </section>

    {/* TIMELINE — branch style */}
    <section ref={timelineRef} id="experience" style={{padding:"110px 40px",position:"relative"}}>
      <ScrollReveal theme={theme} direction="left" delay={0.4}>
        <div style={{maxWidth:660,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:58}}><span className="sec-label" style={{display:"block",textAlign:"center"}}>Journey</span><h2 className="gsap-h-f" style={{fontFamily:"'Syne',sans-serif",fontSize:"clamp(26px,4vw,42px)",fontWeight:800,letterSpacing:"-.02em",color:theme.text,opacity:.9}}>Experience & Education</h2></div>
        <div style={{position:"relative"}}>
          <div style={{position:"absolute",left:21,top:0,bottom:0,width:2,background:`linear-gradient(to bottom,${theme.borderMid},transparent)`,opacity:.4,borderRadius:99}}/>
          {TIMELINE.map((t,i)=><div key={i} className="tl-item" style={{display:"flex",gap:26,marginBottom:42}}>
            <div style={{width:43,height:43,borderRadius:"48% 52% 62% 38% / 44% 56% 44% 56%",background:theme.surface,border:`1px solid ${theme.borderMid}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:15,flexShrink:0,boxShadow:theme.shadow,opacity:.85}}>{t.type==="edu"?"🎓":"💼"}</div>
            <div style={{paddingTop:5}}>
              <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:6,flexWrap:"wrap"}}>
                <span style={{fontFamily:"'Space Mono',monospace",fontSize:10,color:theme.textMuted,fontWeight:700,background:theme.bgAlt,padding:"3px 9px",borderRadius:"8px 2px 8px 2px",border:`1px solid ${theme.border}`}}>{t.year}</span>
                <span style={{fontSize:11,color:theme.accent,fontWeight:700,opacity:.8}}>{t.place}</span>
              </div>
              <h3 style={{fontFamily:"'Syne',sans-serif",fontSize:15,fontWeight:700,marginBottom:4,color:theme.text,opacity:.9}}>{t.title}</h3>
              <p style={{fontSize:12,color:theme.textMuted,lineHeight:1.75,opacity:.8}}>{t.desc}</p>
            </div>
          </div>)}
        </div>
        </div>
      </ScrollReveal>
      {devMode&&<DevBadge id="experience" devMode={devMode} theme={theme}/>}
    </section>

    {/* GET IN TOUCH */}
    <section style={{padding:"110px 40px",background:theme.bgAlt,borderTop:`1px solid ${theme.border}`,borderBottom:`1px solid ${theme.border}`}}>
      <div style={{maxWidth:680,margin:"0 auto",textAlign:"center"}}>
        <span className="sec-label" style={{display:"block",textAlign:"center"}}>Connect</span>
        <h2 className="gsap-h-f" style={{fontFamily:"'Syne',sans-serif",fontSize:"clamp(26px,4vw,42px)",fontWeight:800,letterSpacing:"-.02em",marginBottom:40,color:theme.text,opacity:.9}}>Let's Work Together</h2>
        <p style={{fontSize:15,lineHeight:1.9,color:theme.text,opacity:.8,marginBottom:40}}>I'm always interested in hearing about new projects and opportunities. Whether you have a question or just want to say hi, feel free to reach out!</p>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:20,marginBottom:40}}>
          {CONTACT_INFO.map((c,i)=>(
            <a key={i} href={c.link} target="_blank" rel="noopener noreferrer" style={{background:theme.surface,border:`1px solid ${theme.border}`,borderRadius:12,padding:"24px 20px",textDecoration:"none",display:"flex",flexDirection:"column",alignItems:"center",gap:12,transition:"all .3s",opacity:.9}} onMouseOver={e=>{e.currentTarget.style.transform="translateY(-4px)";e.currentTarget.style.borderColor=theme.accent;e.currentTarget.style.opacity=1}} onMouseOut={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.borderColor=theme.border;e.currentTarget.style.opacity=.9}}>
              <div style={{fontSize:32}}>{c.icon}</div>
              <div style={{fontSize:14,fontWeight:600,color:theme.text,fontFamily:"'Syne',sans-serif"}}>{c.title}</div>
              <div style={{fontSize:12,color:theme.textMuted,opacity:.8}}>{c.value}</div>
            </a>
          ))}
        </div>
      </div>
    </section>

    {/* CONTACT */}
    <section ref={contactRef} id="contact" style={{padding:"110px 40px",position:"relative"}}>
      <ScrollReveal theme={theme} direction="up" delay={0.5}>
        <div style={{maxWidth:680,margin:"0 auto",textAlign:"center"}}>
        <span className="sec-label" style={{display:"block",textAlign:"center"}}>Get In Touch</span>
        <h2 className="gsap-h-f" style={{fontFamily:"'Syne',sans-serif",fontSize:"clamp(26px,4vw,42px)",fontWeight:800,letterSpacing:"-.02em",marginBottom:40,color:theme.text,opacity:.9}}>Let's Create Together</h2>
        <div style={{background:theme.surfaceAlt,border:`1px solid ${theme.border}`,borderRadius:"18px 4px 18px 4px",padding:34,backdropFilter:"blur(12px)",boxShadow:theme.shadow}}>
          {sent?<div style={{textAlign:"center",padding:"30px 0"}}><div style={{fontSize:46,marginBottom:16}}>✅</div><h3 style={{fontFamily:"'Syne',sans-serif",fontSize:20,fontWeight:800,color:theme.text}}>Message Sent!</h3><p style={{color:theme.textMuted,fontSize:14}}>Michael will reply shortly.</p></div>:<>
            {[{l:"Name",k:"name",t:"text",p:"Your name"},{l:"Email",k:"email",t:"email",p:"hello@example.com"},{l:"Subject",k:"subject",t:"text",p:"Project Inquiry"}].map(f=><div key={f.k} style={{marginBottom:14}}>
              <label style={{display:"block",fontSize:9,fontWeight:700,letterSpacing:".17em",textTransform:"uppercase",color:theme.textMuted,marginBottom:5,fontFamily:"'Space Mono',monospace",opacity:.6}}>{f.l}</label>
              <input style={{width:"100%",padding:"12px 14px",background:theme.surface,border:`1px solid ${theme.border}`,borderRadius:"12px 3px 12px 3px",color:theme.text,fontSize:14,fontFamily:"'DM Sans',sans-serif",outline:"none"}} type={f.t} placeholder={f.p} value={form[f.k]} onChange={e=>setForm(d=>({...d,[f.k]:e.target.value}))}/>
            </div>)}
            <div style={{marginBottom:20}}>
              <label style={{display:"block",fontSize:9,fontWeight:700,letterSpacing:".17em",textTransform:"uppercase",color:theme.textMuted,marginBottom:5,fontFamily:"'Space Mono',monospace",opacity:.6}}>Message</label>
              <textarea style={{width:"100%",padding:"12px 14px",background:theme.surface,border:`1px solid ${theme.border}`,borderRadius:"12px 3px 12px 3px",color:theme.text,fontSize:14,fontFamily:"'DM Sans',sans-serif",outline:"none",resize:"vertical"}} rows={5} placeholder="Tell me about your project..." value={form.message} onChange={e=>setForm(d=>({...d,message:e.target.value}))}/>
            </div>
            <button className="bp" onClick={()=>setSent(true)} style={{width:"100%",display:"flex",justifyContent:"center",fontSize:13,padding:"14px",borderRadius:"12px 3px 12px 3px"}}>Send Message →</button>
          </>}
        </div>
        </div>
      </ScrollReveal>
      {devMode&&<DevBadge id="contact" devMode={devMode} theme={theme}/>}
    </section>
  </>;
}
