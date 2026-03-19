import { useState, useRef } from "react";
import { useGSAP } from "../hooks/useGSAP";
import { Typewriter, Modal } from "../components/Shared";
import { DevBadge } from "../components/DeveloperMode";
import { PROJECTS, SKILLS, TECH, SERVICES, TIMELINE, CONTACT_INFO } from "../data/content";

export function VoidLayout({ theme, devMode, scrollTo, tIdx, setTIdx, sel, setSel, sent, setSent, form, setForm, themeKey }) {
  const heroRef=useRef(null),heroTitleRef=useRef(null),heroBadgeRef=useRef(null),heroSubRef=useRef(null),heroCtaRef=useRef(null);
  const aboutRef=useRef(null),aboutImgRef=useRef(null),aboutTxtRef=useRef(null);
  const servicesRef=useRef(null),timelineRef=useRef(null),contactRef=useRef(null);

  useGSAP((gsap,ST)=>{
    const tl=gsap.timeline({delay:.15});
    tl.fromTo(heroBadgeRef.current,{y:12,opacity:0},{y:0,opacity:1,duration:.5,ease:"power2.out"})
      .fromTo(heroTitleRef.current,{y:30,opacity:0},{y:0,opacity:1,duration:.8,ease:"power2.out"},"-=.2")
      .fromTo(heroSubRef.current,{y:15,opacity:0},{y:0,opacity:1,duration:.5,ease:"power2.out"},"-=.25")
      .fromTo(heroCtaRef.current,{y:12,opacity:0},{y:0,opacity:1,duration:.5,ease:"power2.out"},"-=.2");
    
    // 3D scrolling animations for background name elements
    gsap.to(".name-bg",{
      yPercent:35,
      scale:1.2,
      rotationX:10,
      rotationY:-8,
      ease:"none",
      scrollTrigger:{
        trigger:heroRef.current,
        start:"top top",
        end:"bottom top",
        scrub:2.5
      }
    });
    
    gsap.to(".name-float-1",{
      xPercent:-35,
      yPercent:-20,
      rotation:-20,
      scale:0.8,
      opacity:0.02,
      ease:"none",
      scrollTrigger:{
        trigger:heroRef.current,
        start:"top top",
        end:"bottom top",
        scrub:2
      }
    });
    
    gsap.to(".name-float-2",{
      xPercent:35,
      yPercent:25,
      rotation:25,
      scale:1.4,
      opacity:0.018,
      ease:"none",
      scrollTrigger:{
        trigger:heroRef.current,
        start:"top top",
        end:"bottom top",
        scrub:2.2
      }
    });
    
    gsap.fromTo(aboutImgRef.current,{x:-40,opacity:0},{x:0,opacity:1,duration:.9,ease:"power2.out",scrollTrigger:{trigger:aboutRef.current,start:"top 80%",toggleActions:"play none none none"}});
    gsap.fromTo(aboutTxtRef.current,{x:40,opacity:0},{x:0,opacity:1,duration:.9,ease:"power2.out",delay:.1,scrollTrigger:{trigger:aboutRef.current,start:"top 80%",toggleActions:"play none none none"}});
    const sc=servicesRef.current?.querySelectorAll(".srv-card");
    if(sc)gsap.fromTo(sc,{y:30,opacity:0},{y:0,opacity:1,stagger:.06,duration:.6,ease:"power2.out",scrollTrigger:{trigger:servicesRef.current,start:"top 85%"}});
    const ti=timelineRef.current?.querySelectorAll(".tl-item");
    if(ti)gsap.fromTo(ti,{x:-30,opacity:0},{x:0,opacity:1,stagger:.1,duration:.6,ease:"power2.out",scrollTrigger:{trigger:timelineRef.current,start:"top 85%"}});
    gsap.fromTo(contactRef.current,{y:25,opacity:0},{y:0,opacity:1,duration:.7,ease:"power2.out",scrollTrigger:{trigger:contactRef.current,start:"top 86%"}});
  },[]);

  return <>
    {/* HERO — brutalist stacked */}
    <section ref={heroRef} id="hero" style={{minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"flex-start",justifyContent:"center",padding:"140px 60px 100px",textAlign:"left",position:"relative",background:theme.bg,"@media (max-width: 768px)":{padding:"60px 20px",alignItems:"center",textAlign:"center"}}}>
      {/* Large blurred name in background */}
      <div className="name-bg" style={{
        position:"absolute",
        top:"50%",
        left:"50%",
        transform:"translate(-50%, -50%)",
        fontSize:"clamp(180px,25vw,450px)",
        fontWeight:900,
        fontFamily:"'Space Mono', monospace",
        color:theme.accent,
        opacity:0.05,
        filter:"blur(4px)",
        letterSpacing:"-0.06em",
        pointerEvents:"none",
        zIndex:0,
        whiteSpace:"nowrap",
        textTransform:"uppercase",
        "@media (max-width: 768px)": {
          fontSize:"clamp(120px,20vw,320px)",
          opacity:0.07
        }
      }}>GAITHO</div>
      
      {/* Additional floating name elements for 3D effect */}
      <div className="name-float-1" style={{
        position:"absolute",
        top:"18%",
        right:"8%",
        fontSize:"clamp(50px,7vw,130px)",
        fontWeight:800,
        fontFamily:"'Syne', sans-serif",
        color:theme.animOrb,
        opacity:0.035,
        filter:"blur(3px)",
        pointerEvents:"none",
        zIndex:0,
        transform:"rotate(-6deg)",
        "@media (max-width: 768px)": {
          fontSize:"clamp(35px,5vw,90px)",
          opacity:0.05,
          top:"12%",
          right:"5%"
        }
      }}>MICHAEL</div>
      
      <div className="name-float-2" style={{
        position:"absolute",
        bottom:"22%",
        left:"10%",
        fontSize:"clamp(40px,6vw,100px)",
        fontWeight:700,
        fontFamily:"'Space Mono', monospace",
        color:theme.animDot,
        opacity:0.03,
        filter:"blur(3.5px)",
        pointerEvents:"none",
        zIndex:0,
        transform:"rotate(3deg)",
        "@media (max-width: 768px)": {
          fontSize:"clamp(30px,4vw,70px)",
          opacity:0.045,
          bottom:"18%",
          left:"6%"
        }
      }}>DEVELOPER</div>
      <div style={{position:"relative",zIndex:1,maxWidth:1000,width:"100%"}}>
        <div ref={heroBadgeRef} style={{display:"inline-flex",alignItems:"center",gap:10,border:`2px solid ${theme.borderMid}`,borderRadius:0,padding:"8px 20px",marginBottom:40,background:theme.surface,fontSize:13,letterSpacing:".2em",textTransform:"uppercase",color:theme.text,fontFamily:"'Space Mono',monospace",fontWeight:700,"@media (max-width: 768px)":{fontSize:11,padding:"6px 16px",marginBottom:24}}}>
          <span style={{width:6,height:6,borderRadius:0,background:theme.accent,display:"inline-block",opacity:.8,transform:"rotate(45deg)"}}/>OPEN TO OPPORTUNITIES
        </div>
        <h1 ref={heroTitleRef} style={{fontFamily:"'Syne',sans-serif",fontSize:"clamp(48px,8vw,96px)",fontWeight:800,lineHeight:.85,letterSpacing:"-.05em",marginBottom:32,color:theme.text,textTransform:"uppercase","@media (max-width: 768px)":{fontSize:"clamp(32px,6vw,64px)",marginBottom:20}}}>
          MICHAEL<br/>GAITHO
        </h1>
        <div ref={heroSubRef} style={{fontFamily:"'Space Mono',monospace",fontSize:"clamp(14px,2vw,20px)",marginBottom:40,minHeight:28,letterSpacing:".1em",color:theme.accent,"@media (max-width: 768px)":{fontSize:"clamp(12px,1.8vw,16px)",marginBottom:24}}}><Typewriter words={["FRONTEND DEVELOPER","UI/UX DESIGNER","CREATIVE CODER","PROBLEM SOLVER"]} theme={theme}/></div>
        <p style={{fontSize:18,color:theme.textMuted,maxWidth:600,margin:"0 0 48px 0",lineHeight:1.8,opacity:.9,fontFamily:"'DM Sans',sans-serif",fontWeight:500,"@media (max-width: 768px)":{fontSize:14,maxWidth:"100%",marginBottom:32,lineHeight:1.6}}}>BUILDING RAW DIGITAL EXPERIENCES — NAKURU, KENYA 🇰🇪</p>
        <div ref={heroCtaRef} style={{display:"flex",gap:16,justifyContent:"flex-start",flexWrap:"wrap","@media (max-width: 768px)":{justifyContent:"center",gap:12}}}>
          <button className="bp" onClick={()=>scrollTo("projects")} style={{borderRadius:0,letterSpacing:".1em",textTransform:"uppercase",fontSize:12,fontWeight:800,"@media (max-width: 768px)":{fontSize:11,padding:"12px 20px"}}}>VIEW WORK ↓</button>
          <button className="bg" onClick={()=>scrollTo("contact")} style={{borderRadius:0,letterSpacing:".1em",textTransform:"uppercase",fontSize:12,fontWeight:800,"@media (max-width: 768px)":{fontSize:11,padding:"12px 20px"}}}>CONTACT</button>
        </div>
      </div>
      {devMode&&<DevBadge id="hero" devMode={devMode} theme={theme}/>}
    </section>

    <div style={{overflow:"hidden",borderBottom:`2px solid ${theme.borderMid}`,padding:"10px 0","@media (max-width: 768px)":{padding:"6px 0"}}}>
      <div style={{display:"flex",gap:20,whiteSpace:"nowrap",animation:"marquee 18s linear infinite","@media (max-width: 768px)":{gap:12,fontSize:9}}}>
        {[...TECH,...TECH].map((t,i)=><span key={i} style={{fontSize:11,fontWeight:700,letterSpacing:".18em",textTransform:"uppercase",color:theme.text,opacity:.6,fontFamily:"'Space Mono',monospace","@media (max-width: 768px)":{fontSize:9}}}>{t}<span style={{marginLeft:12,opacity:.2,"@media (max-width: 768px)":{marginLeft:8}}}>×</span></span>)}
      </div>
    </div>

    {/* ABOUT — raw, text-heavy */}
    <section id="about" style={{padding:"80px 60px",borderBottom:`2px solid ${theme.borderMid}`,position:"relative","@media (max-width: 768px)":{padding:"40px 20px"}}}>
      <div style={{display:"grid",gridTemplateColumns:"200px 1fr",gap:60,"@media (max-width: 768px)":{gridTemplateColumns:"1fr",gap:30,textAlign:"center"}}}>
        <div><div style={{fontFamily:"'Space Mono',monospace",fontSize:11,color:theme.text,letterSpacing:".25em",textTransform:"uppercase",opacity:.7,marginTop:6,"@media (max-width: 768px)":{fontSize:10}}}>/ ABOUT</div></div>
        <div>
          <h2 style={{fontFamily:"'Syne',sans-serif",fontSize:"clamp(28px,4vw,56px)",fontWeight:800,lineHeight:.9,letterSpacing:"-.03em",marginBottom:32,color:theme.text,textTransform:"uppercase","@media (max-width: 768px)":{fontSize:"clamp(24px,3.5vw,42px)",marginBottom:24}}}>BUILDING<br/>THINGS<br/><span style={{color:theme.accent,opacity:.85}}>THAT WORK</span></h2>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:40,"@media (max-width: 768px)":{gridTemplateColumns:"1fr",gap:20}}}>
            <div style={{borderTop:`2px solid ${theme.borderMid}`,paddingTop:20}}>
              <p style={{color:theme.text,lineHeight:1.8,fontSize:15,"@media (max-width: 768px)":{fontSize:14,lineHeight:1.6}}}>Frontend Developer & UI/UX designer specializing in AI-powered interfaces and real-time analytics.</p>
            </div>
            <div style={{borderTop:`2px solid ${theme.borderMid}`,paddingTop:20}}>
              <p style={{color:theme.text,lineHeight:1.8,fontSize:15,"@media (max-width: 768px)":{fontSize:14,lineHeight:1.6}}}>Pursuing Bachelor of IT. Bridging academic theory with real-world production code.</p>
            </div>
          </div>
          <div style={{marginTop:32,display:"flex",gap:10,justifyContent:"flex-start","@media (max-width: 768px)":{justifyContent:"center",marginTop:24}}}><button className="bp" onClick={() => window.open('/resume.pdf', '_blank')} style={{borderRadius:0,letterSpacing:".08em",textTransform:"uppercase",fontSize:13,"@media (max-width: 768px)":{fontSize:12}}}>RESUME.PDF</button><button className="bg" onClick={()=>scrollTo("projects")} style={{borderRadius:0,letterSpacing:".08em",textTransform:"uppercase",fontSize:13,"@media (max-width: 768px)":{fontSize:12}}}>WORK →</button></div>
        </div>
      </div>
      {devMode&&<DevBadge id="about" devMode={devMode} theme={theme}/>}
    </section>

    {/* SKILLS — big numbers */}
    <section id="skills" style={{padding:"80px 60px",background:theme.bgAlt,borderBottom:`2px solid ${theme.borderMid}`,position:"relative","@media (max-width: 768px)":{padding:"40px 20px"}}}>
      <div style={{display:"grid",gridTemplateColumns:"200px 1fr",gap:60,"@media (max-width: 768px)":{gridTemplateColumns:"1fr",gap:30,textAlign:"center"}}}>
        <div><div style={{fontFamily:"'Space Mono',monospace",fontSize:11,color:theme.text,letterSpacing:".25em",textTransform:"uppercase",opacity:.7,marginTop:6,"@media (max-width: 768px)":{fontSize:10}}}>/ SKILLS</div></div>
        <div>
          {SKILLS.map((s,i)=><div key={s.label} style={{display:"grid",gridTemplateColumns:"1fr 80px",gap:20,alignItems:"center",borderTop:`1px solid ${theme.border}`,padding:"12px 0","@media (max-width: 768px)":{gridTemplateColumns:"1fr",gap:12,textAlign:"center",padding:"8px 0"}}}>
            <div style={{fontFamily:"'Syne',sans-serif",fontSize:15,fontWeight:700,color:theme.text,opacity:.85,textTransform:"uppercase",letterSpacing:".04em","@media (max-width: 768px)":{fontSize:13,marginBottom:8}}}>{s.label}</div>
            <div style={{textAlign:"right","@media (max-width: 768px)":{textAlign:"center"}}}>
              <span style={{fontFamily:"'Syne',sans-serif",fontSize:28,fontWeight:800,color:theme.textMuted,opacity:.45,lineHeight:1,"@media (max-width: 768px)":{fontSize:24}}}>{s.pct}<span style={{fontSize:14,opacity:.5,"@media (max-width: 768px)":{fontSize:12}}}>%</span></span>
              <div style={{height:2,background:theme.border,marginTop:6}}><div style={{height:"100%",width:`${s.pct}%`,background:theme.accent,opacity:.55}}/></div>
            </div>
          </div>)}
          <div style={{marginTop:24,display:"flex",flexWrap:"wrap",gap:6,borderTop:`1px solid ${theme.border}`,paddingTop:20,"@media (max-width: 768px)":{justifyContent:"center",gap:4}}}>
            {TECH.map(t=><span key={t} style={{padding:"4px 8px",background:"transparent",border:`1px solid ${theme.borderMid}`,fontSize:10,fontWeight:700,color:theme.text,textTransform:"uppercase",letterSpacing:".06em",transition:"all .15s",cursor:"default","@media (max-width: 768px)":{fontSize:8,padding:"2px 6px"}}}
              onMouseEnter={e=>{e.target.style.background=theme.accent;e.target.style.color=theme.bg;e.target.style.borderColor=theme.accent;}}
              onMouseLeave={e=>{e.target.style.background="transparent";e.target.style.color=theme.textMuted;e.target.style.borderColor=theme.borderMid;}}>{t}</span>)}
          </div>
        </div>
      </div>
      {devMode&&<DevBadge id="skills" devMode={devMode} theme={theme}/>}
    </section>

    {/* PROJECTS — brutalist numbered list */}
    <section id="projects" style={{borderBottom:`2px solid ${theme.borderMid}`,position:"relative"}}>
      <div style={{display:"grid",gridTemplateColumns:"200px 1fr",gap:40,padding:"60px 40px 20px","@media (max-width: 768px)":{gridTemplateColumns:"1fr",gap:20,padding:"30px 16px 16px",textAlign:"center"}}}>
        <div><div style={{fontFamily:"'Space Mono',monospace",fontSize:11,color:theme.text,letterSpacing:".25em",textTransform:"uppercase",opacity:.7,marginTop:6,"@media (max-width: 768px)":{fontSize:10}}}>/ WORK</div></div>
        <div style={{display:"flex",gap:6,flexWrap:"wrap"}}><span style={{fontSize:12,fontWeight:700,letterSpacing:".08em",textTransform:"uppercase",color:theme.text,fontFamily:"'Space Mono',monospace","@media (max-width: 768px)":{fontSize:10}}}>Projects</span></div>
      </div>
      {PROJECTS.map((p,i)=>{
        const [h,setH]=useState(false);
        return <div key={p.id} onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)} onClick={()=>setSel(p)} style={{display:"grid",gridTemplateColumns:"200px 1fr auto",gap:20,padding:"20px 40px",borderTop:`1px solid ${theme.border}`,cursor:"pointer",background:h?theme.surfaceAlt:"transparent",transition:"background .15s","@media (max-width: 768px)":{gridTemplateColumns:"1fr",gap:12,padding:"12px 16px",textAlign:"center"}}}>
          <div style={{fontFamily:"'Space Mono',monospace",fontSize:9,color:theme.textMuted,opacity:.4,paddingTop:6,"@media (max-width: 768px)":{display:"none"}}}>{String(i+1).padStart(2,"0")}</div>
          <div>
            <h3 style={{fontFamily:"'Syne',sans-serif",fontSize:18,fontWeight:700,color:theme.text,opacity:.9,textTransform:"uppercase",letterSpacing:".02em",marginBottom:4,"@media (max-width: 768px)":{fontSize:16,marginBottom:6}}}>{p.title}</h3>
            <p style={{fontSize:11,color:theme.textMuted,opacity:.7,"@media (max-width: 768px)":{fontSize:10}}}>{p.desc}</p>
          </div>
          <div style={{fontSize:36,opacity:.6,"@media (max-width: 768px)":{fontSize:28,margin:"0 auto"}}}>{p.emoji}</div>
        </div>;
      })}
      {devMode&&<DevBadge id="projects" devMode={devMode} theme={theme}/>}
    </section>

    {/* SERVICES — table layout */}
    <section ref={servicesRef} id="services" style={{padding:"30px 16px",background:theme.bgAlt,borderBottom:`2px solid ${theme.borderMid}`,position:"relative","@media (max-width: 768px)":{padding:"20px 12px"}}}>
      <div style={{display:"grid",gridTemplateColumns:"200px 1fr",gap:20,"@media (max-width: 768px)":{gridTemplateColumns:"1fr",gap:12,textAlign:"center"}}}>
        <div><div style={{fontFamily:"'Space Mono',monospace",fontSize:9,color:theme.textMuted,letterSpacing:".25em",textTransform:"uppercase",opacity:.5,marginTop:6,"@media (max-width: 768px)":{fontSize:8}}}>/ SERVICES</div></div>
        <div>
          {SERVICES.map((s,i)=><div key={s.title} className="srv-card" style={{display:"grid",gridTemplateColumns:"60px 200px 1fr",borderBottom:i<SERVICES.length-1?"1px solid ${theme.border}":"none",transition:"background .15s",cursor:"default","@media (max-width: 768px)":{gridTemplateColumns:"1fr",gap:8,padding:"12px 8px",textAlign:"center",borderBottom:i<SERVICES.length-1?"1px solid ${theme.border}":"none"}}}
            onMouseEnter={e=>e.currentTarget.style.background=theme.surface}
            onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
            <div style={{padding:"20px 0 20px 20px",borderRight:`1px solid ${theme.border}`,fontSize:24,opacity:.6,"@media (max-width: 768px)":{borderRight:"none",padding:"0 0 12px 0",textAlign:"center",fontSize:20}}}>{s.icon}</div>
            <div style={{padding:"20px",borderRight:`1px solid ${theme.border}`,"@media (max-width: 768px)":{borderRight:"none",padding:"0 0 12px 0"}}}><h3 style={{fontFamily:"'Syne',sans-serif",fontSize:13,fontWeight:700,color:theme.text,opacity:.85,textTransform:"uppercase",letterSpacing:".04em","@media (max-width: 768px)":{fontSize:12}}}>{s.title}</h3></div>
            <div style={{padding:"20px","@media (max-width: 768px)":{padding:"0"}}}><p style={{fontSize:11,color:theme.textMuted,lineHeight:1.6,opacity:.8,"@media (max-width: 768px)":{fontSize:10}}}>{s.desc}</p></div>
          </div>)}
        </div>
      </div>
      {devMode&&<DevBadge id="services" devMode={devMode} theme={theme}/>}
    </section>

    {/* TIMELINE */}
    <section ref={timelineRef} id="experience" style={{padding:"30px 16px",borderBottom:`2px solid ${theme.borderMid}`,position:"relative","@media (max-width: 768px)":{padding:"20px 12px"}}}>
      <div style={{display:"grid",gridTemplateColumns:"200px 1fr",gap:20,"@media (max-width: 768px)":{gridTemplateColumns:"1fr",gap:12,textAlign:"center"}}}>
        <div><div style={{fontFamily:"'Space Mono',monospace",fontSize:9,color:theme.textMuted,letterSpacing:".25em",textTransform:"uppercase",opacity:.5,marginTop:6,"@media (max-width: 768px)":{fontSize:8}}}>/ EXPERIENCE</div></div>
        <div>
          {TIMELINE.map((t,i)=><div key={i} className="tl-item" style={{display:"grid",gridTemplateColumns:"100px 1fr",gap:16,borderTop:`1px solid ${theme.border}`,padding:"16px 0","@media (max-width: 768px)":{gridTemplateColumns:"1fr",gap:12,padding:"12px 0",textAlign:"center"}}}>
            <div style={{fontFamily:"'Space Mono',monospace",fontSize:12,fontWeight:700,color:theme.textMuted,opacity:.7,"@media (max-width: 768px)":{marginBottom:4,fontSize:11}}}>{t.year}</div>
            <div>
              <div style={{fontFamily:"'Space Mono',monospace",fontSize:8,fontWeight:700,letterSpacing:".12em",textTransform:"uppercase",color:theme.accent,opacity:.7,marginBottom:8,"@media (max-width: 768px)":{fontSize:7,marginBottom:6}}}>{t.place}</div>
              <h3 style={{fontFamily:"'Syne',sans-serif",fontSize:16,fontWeight:700,marginBottom:8,color:theme.text,opacity:.88,textTransform:"uppercase",letterSpacing:".02em","@media (max-width: 768px)":{fontSize:14,marginBottom:6}}}>{t.title}</h3>
              <p style={{fontSize:12,color:theme.textMuted,lineHeight:1.7,opacity:.7,"@media (max-width: 768px)":{fontSize:11,lineHeight:1.6}}}>{t.desc}</p>
            </div>
          </div>)}
        </div>
      </div>
      {devMode&&<DevBadge id="experience" devMode={devMode} theme={theme}/>}
    </section>

    {/* GET IN TOUCH */}
    <section style={{padding:"30px 16px",background:theme.bgAlt,borderBottom:`2px solid ${theme.borderMid}`,"@media (max-width: 768px)":{padding:"20px 12px"}}}>
      <div style={{display:"grid",gridTemplateColumns:"200px 1fr",gap:20,"@media (max-width: 768px)":{gridTemplateColumns:"1fr",gap:12,textAlign:"center"}}}>
        <div><div style={{fontFamily:"'Space Mono',monospace",fontSize:11,color:theme.text,letterSpacing:".25em",textTransform:"uppercase",opacity:.7,marginTop:6,"@media (max-width: 768px)":{fontSize:10}}}>/ CONNECT</div></div>
        <div>
          <h2 style={{fontFamily:"'Syne',sans-serif",fontSize:28,fontWeight:800,letterSpacing:"-.02em",color:theme.text,marginBottom:16,"@media (max-width: 768px)":{fontSize:24,marginBottom:12}}}>Let's Work Together</h2>
          <p style={{fontSize:14,lineHeight:1.7,color:theme.text,opacity:.8,marginBottom:32,"@media (max-width: 768px)":{fontSize:13,marginBottom:24,lineHeight:1.6}}}>I'm always interested in hearing about new projects and opportunities. Whether you have a question or just want to say hi, feel free to reach out!</p>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:16,"@media (max-width: 768px)":{gridTemplateColumns:"1fr",gap:12}}}>
            {CONTACT_INFO.map((c,i)=>(
              <a key={i} href={c.link} target="_blank" rel="noopener noreferrer" style={{background:theme.surface,border:`1px solid ${theme.border}`,borderRadius:8,padding:"16px 12px",textDecoration:"none",display:"flex",alignItems:"center",gap:12,transition:"all .3s",opacity:.9,"@media (max-width: 768px)":{justifyContent:"center",padding:"12px 8px"}}} onMouseOver={e=>{e.currentTarget.style.transform="translateX(4px)";e.currentTarget.style.borderColor=theme.accent;e.currentTarget.style.opacity=1}} onMouseOut={e=>{e.currentTarget.style.transform="translateX(0)";e.currentTarget.style.borderColor=theme.border;e.currentTarget.style.opacity=.9}}>
                <div style={{fontSize:20,"@media (max-width: 768px)":{fontSize:18}}}>{c.icon}</div>
                <div>
                  <div style={{fontSize:12,fontWeight:600,color:theme.text,fontFamily:"'Syne',sans-serif","@media (max-width: 768px)":{fontSize:11}}}>{c.title}</div>
                  <div style={{fontSize:10,color:theme.text,opacity:.9,"@media (max-width: 768px)":{fontSize:9}}}>{c.value}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* CONTACT */}
    <section ref={contactRef} id="contact" style={{padding:"80px 60px",position:"relative","@media (max-width: 768px)":{padding:"30px 16px"}}}>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:60,"@media (max-width: 768px)":{gridTemplateColumns:"1fr",gap:24,textAlign:"center"}}}>
        <div>
          <div style={{fontFamily:"'Space Mono',monospace",fontSize:10,color:theme.text,letterSpacing:".17em",textTransform:"uppercase",opacity:.8,marginBottom:5,"@media (max-width: 768px)":{fontSize:9}}}>/ CONTACT</div>
          <h2 style={{fontFamily:"'Syne',sans-serif",fontSize:"clamp(32px,4vw,64px)",fontWeight:800,lineHeight:.88,letterSpacing:"-.04em",marginBottom:24,color:theme.text,textTransform:"uppercase","@media (max-width: 768px)":{fontSize:"clamp(28px,3.5vw,48px)",marginBottom:20}}}>WORK<br/><span style={{color:theme.accent}}>WITH<br/>ME</span></h2>
        </div>
        <div>
          {sent?<div style={{padding:"30px 0"}}><div style={{fontSize:32,marginBottom:12}}>✅</div><h3 style={{fontFamily:"'Syne',sans-serif",fontSize:18,fontWeight:800,color:theme.text,textTransform:"uppercase"}}>SENT.</h3></div>:<>
            {[{l:"Name",k:"name",t:"text",p:"Your name"},{l:"Email",k:"email",t:"email",p:"hello@example.com"},{l:"Subject",k:"subject",t:"text",p:"Project Inquiry"}].map(f=><div key={f.k} style={{marginBottom:12}}>
              <label style={{display:"block",fontSize:8,fontWeight:700,letterSpacing:".17em",textTransform:"uppercase",color:theme.textMuted,marginBottom:4,fontFamily:"'Space Mono',monospace",opacity:.6}}>{f.l}</label>
              <input style={{width:"100%",padding:"10px 12px",background:"transparent",border:`1px solid ${theme.borderMid}`,borderRadius:0,color:theme.text,fontSize:13,fontFamily:"'DM Sans',sans-serif",outline:"none"}} type={f.t} placeholder={f.p} value={form[f.k]} onChange={e=>setForm(d=>({...d,[f.k]:e.target.value}))}/>
            </div>)}
            <div style={{marginBottom:16}}>
              <label style={{display:"block",fontSize:10,fontWeight:700,letterSpacing:".17em",textTransform:"uppercase",color:theme.text,marginBottom:4,fontFamily:"'Space Mono',monospace",opacity:.8}}>Message</label>
              <textarea style={{width:"100%",padding:"10px 12px",background:"transparent",border:`1px solid ${theme.borderMid}`,borderRadius:0,color:theme.text,fontSize:13,fontFamily:"'DM Sans',sans-serif",outline:"none",resize:"vertical"}} rows={4} placeholder="Brief me." value={form.message} onChange={e=>setForm(d=>({...d,message:e.target.value}))}/>
            </div>
            <button className="bp" onClick={()=>{
              const subject = encodeURIComponent(form.subject || "Portfolio Contact");
              const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`);
              window.open(`mailto:michaelgaitho47@gmail.com?subject=${subject}&body=${body}`);
              setSent(true);
            }} style={{width:"100%",display:"flex",justifyContent:"center",fontSize:10,padding:"12px",borderRadius:0,letterSpacing:".1em",textTransform:"uppercase"}}>SEND →</button>
          </>}
        </div>
      </div>
      {devMode&&<DevBadge id="contact" devMode={devMode} theme={theme}/>}
    </section>
  </>;
}
