import { useState, useRef } from "react";
import { useGSAP } from "../hooks/useGSAP";
import { Typewriter, SkillBar, Modal } from "../components/Shared";
import { PacManGame } from "../components/PacManGame";
import { DevBadge } from "../components/DeveloperMode";
import { PROJECTS, SKILLS, TECH, SERVICES, TIMELINE, CONTACT_INFO } from "../data/content";

export function MidnightLayout({ theme, devMode, scrollTo, tIdx, setTIdx, sel, setSel, sent, setSent, form, setForm, themeKey }) {
  const heroRef=useRef(null),heroTitleRef=useRef(null),heroBadgeRef=useRef(null),heroSubRef=useRef(null),heroCtaRef=useRef(null);
  const aboutRef=useRef(null),aboutImgRef=useRef(null),aboutTxtRef=useRef(null);
  const servicesRef=useRef(null),timelineRef=useRef(null),contactRef=useRef(null);
  const hPanelRef=useRef(null),hTrackRef=useRef(null);

  useGSAP((gsap,ST)=>{
    const tl=gsap.timeline({delay:.2});
    tl.fromTo(heroBadgeRef.current,{y:16,opacity:0},{y:0,opacity:1,duration:.65,ease:"expo.out"})
      .fromTo(heroTitleRef.current,{y:40,opacity:0},{y:0,opacity:1,duration:1,ease:"expo.out"},"-=.25")
      .fromTo(heroSubRef.current,{y:20,opacity:0},{y:0,opacity:1,duration:.65,ease:"expo.out"},"-=.35")
      .fromTo(heroCtaRef.current,{y:16,opacity:0},{y:0,opacity:1,duration:.65,ease:"expo.out"},"-=.3");
    gsap.fromTo(aboutImgRef.current,{x:-50,opacity:0},{x:0,opacity:1,duration:1.1,ease:"expo.out",scrollTrigger:{trigger:aboutRef.current,start:"top 78%",toggleActions:"play none none none"}});
    gsap.fromTo(aboutTxtRef.current,{x:50,opacity:0},{x:0,opacity:1,duration:1.1,ease:"expo.out",delay:.1,scrollTrigger:{trigger:aboutRef.current,start:"top 78%",toggleActions:"play none none none"}});
    const sc=servicesRef.current?.querySelectorAll(".srv-card");
    if(sc)gsap.fromTo(sc,{y:40,opacity:0,scale:.97},{y:0,opacity:1,scale:1,stagger:.08,duration:.8,ease:"expo.out",scrollTrigger:{trigger:servicesRef.current,start:"top 82%"}});
    const ti=timelineRef.current?.querySelectorAll(".tl-item");
    if(ti)gsap.fromTo(ti,{x:-35,opacity:0},{x:0,opacity:1,stagger:.12,duration:.75,ease:"expo.out",scrollTrigger:{trigger:timelineRef.current,start:"top 82%"}});
    gsap.fromTo(contactRef.current,{y:30,opacity:0},{y:0,opacity:1,duration:.85,ease:"expo.out",scrollTrigger:{trigger:contactRef.current,start:"top 84%"}});
  },[]);

  return <>
    {/* HERO — editorial wide left-aligned with Pac-Man */}
    <section ref={heroRef} id="hero" style={{minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"flex-start",justifyContent:"center",padding:"120px 60px 80px",textAlign:"left",position:"relative","@media (max-width: 768px)":{padding:"80px 20px 60px",alignItems:"center",textAlign:"center"}}}>
      <div style={{position:"absolute",inset:0,backgroundImage:`linear-gradient(${theme.animFg} 1px,transparent 1px),linear-gradient(90deg,${theme.animFg} 1px,transparent 1px)`,backgroundSize:"72px 72px",pointerEvents:"none",opacity:.4}}/>
      <div style={{position:"relative",zIndex:1,display:"flex",gap:"60px",alignItems:"center",width:"100%",maxWidth:1200,"@media (max-width: 768px)":{flexDirection:"column",gap:"40px"}}}>
        {/* Left side - Hero content */}
        <div style={{flex:1}}>
          <div ref={heroBadgeRef} style={{display:"inline-flex",alignItems:"center",gap:8,border:`1px solid ${theme.border}`,borderRadius:2,padding:"7px 18px",marginBottom:32,background:theme.surfaceAlt,backdropFilter:"blur(16px)",fontSize:12,letterSpacing:".18em",textTransform:"uppercase",color:theme.text,fontFamily:"'Space Mono',monospace"}}>
            <span style={{width:5,height:5,borderRadius:"50%",background:theme.accent,display:"inline-block",opacity:.7,animation:"pulse 2.5s ease-in-out infinite"}}/>Available for Select Projects
          </div>
          <h1 ref={heroTitleRef} style={{fontFamily:"'Syne',sans-serif",fontSize:"clamp(48px,9vw,110px)",fontWeight:800,lineHeight:.95,letterSpacing:"-.04em",marginBottom:24,color:theme.text}}>
            Michael<br/>Gaitho
          </h1>
          <div ref={heroSubRef} style={{fontFamily:"'Space Mono',monospace",fontSize:"clamp(14px,2vw,20px)",marginBottom:36,minHeight:30,letterSpacing:".08em"}}><Typewriter words={["Frontend Architect","UI/UX Designer","Motion Engineer","Creative Technologist"]} theme={theme}/></div>
          <p style={{fontSize:17,color:theme.textMuted,maxWidth:520,margin:"0 0 40px 0",lineHeight:1.85,opacity:.85,fontFamily:"'DM Sans',sans-serif"}}>Crafting exceptional digital experiences at the intersection of design and engineering — Nakuru, Kenya 🇰🇪</p>
          <div ref={heroCtaRef} style={{display:"flex",gap:14,justifyContent:"flex-start",flexWrap:"wrap"}}>
            <button className="bp" onClick={()=>scrollTo("projects")} style={{borderRadius:2,letterSpacing:".08em"}}>View Portfolio ↓</button>
            <button className="bg" onClick={()=>scrollTo("contact")} style={{borderRadius:2,letterSpacing:".08em"}}>Start Conversation</button>
          </div>
        </div>
        
        {/* Right side - Pac-Man Game */}
        <div style={{flex:0,display:"flex",flexDirection:"column",alignItems:"center"}}>
          <div style={{marginBottom:20,fontSize:14,letterSpacing:".1em",textTransform:"uppercase",color:theme.text,fontFamily:"'Space Mono',monospace",opacity:.9}}>
            Take a Break & Play
          </div>
          <PacManGame theme={theme} />
        </div>
      </div>
      {devMode&&<DevBadge id="hero" devMode={devMode} theme={theme}/>}
    </section>

    {/* Marquee */}
    <div style={{overflow:"hidden",background:theme.bgAlt,borderTop:`1px solid ${theme.border}`,borderBottom:`1px solid ${theme.border}`,padding:"10px 0"}}>
      <div style={{display:"flex",gap:32,whiteSpace:"nowrap",animation:"marquee 20s linear infinite"}}>
        {[...TECH,...TECH].map((t,i)=><span key={i} style={{fontSize:12,fontWeight:600,letterSpacing:".18em",textTransform:"uppercase",color:theme.text,opacity:.6,fontFamily:"'Space Mono',monospace"}}>{t}<span style={{marginLeft:18,opacity:.2}}>&times;</span></span>)}
      </div>
    </div>

    {/* ABOUT — editorial split */}
    <section ref={aboutRef} id="about" style={{padding:"100px 60px",maxWidth:1200,margin:"0 auto",position:"relative"}}>
      <div className="about-img-container" style={{display:"grid",gridTemplateColumns:"1fr 1.2fr",gap:100,alignItems:"center"}}>
        <div ref={aboutImgRef} style={{position:"relative"}}>
          <div style={{width:"100%",maxWidth:400,aspectRatio:"1",borderRadius:"2px",background:`linear-gradient(135deg,${theme.surface},${theme.bgAlt})`,border:`1px solid ${theme.borderMid}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:88,boxShadow:theme.shadowMd,position:"relative",overflow:"hidden"}}>
            <div style={{position:"absolute",inset:0,background:`radial-gradient(circle at 40% 40%,${theme.animOrb},transparent 70%)`,opacity:.6}}/>
            <span style={{position:"relative",zIndex:1}}>👨🏾‍💻</span>
          </div>
          <div style={{position:"absolute",bottom:12,right:-20,background:theme.surface,border:`1px solid ${theme.borderMid}`,borderRadius:2,padding:"12px 18px",boxShadow:theme.shadow}}>
            <div style={{fontSize:11,color:theme.text,letterSpacing:".12em",marginBottom:3,opacity:.8,fontFamily:"'Space Mono',monospace"}}>LOCATION</div>
            <div style={{fontWeight:600,fontSize:15,color:theme.text,fontFamily:"'Space Mono',monospace"}}>📍 Nakuru, Kenya</div>
          </div>
        </div>
        <div ref={aboutTxtRef} className="about-content">
          <span className="sec-label" style={{fontFamily:"'Space Mono',monospace",letterSpacing:".18em"}}>About</span>
          <h2 style={{fontFamily:"'Syne',sans-serif",fontSize:"clamp(32px,4vw,56px)",fontWeight:800,lineHeight:.95,letterSpacing:"-.03em",marginBottom:24,color:theme.text}}>
            Crafting digital<br/><span style={{color:theme.accent}}>experiences that matter</span>
          </h2>
          <div className="expertise-education" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:40,marginBottom:32}}>
            <div>
              <h3 style={{fontFamily:"'Syne',sans-serif",fontSize:16,fontWeight:700,marginBottom:12,color:theme.accent,letterSpacing:".08em",textTransform:"uppercase"}}>Expertise</h3>
              <p style={{color:theme.text,lineHeight:1.9,fontSize:16,marginBottom:20}}>Frontend Developer & UI/UX Designer specializing in AI-powered interfaces and real-time analytics.</p>
            </div>
            <div>
              <h3 style={{fontFamily:"'Syne',sans-serif",fontSize:16,fontWeight:700,marginBottom:12,color:theme.accent,letterSpacing:".08em",textTransform:"uppercase"}}>Education</h3>
              <p style={{color:theme.text,lineHeight:1.9,fontSize:16,marginBottom:20}}>Bachelor of IT student focusing on software engineering and human-computer interaction.</p>
            </div>
          </div>
          <div className="about-buttons" style={{display:"flex",gap:12}}><button className="bp" onClick={() => window.open('/resume.pdf', '_blank')} style={{borderRadius:2,letterSpacing:".08em"}}>Download Resume</button><button className="bg" onClick={()=>scrollTo("projects")} style={{borderRadius:2,letterSpacing:".08em"}}>View Work →</button></div>
        </div>
      </div>
      {devMode&&<DevBadge id="about" devMode={devMode} theme={theme}/>}
    </section>

    {/* SKILLS — editorial grid */}
    <section id="skills" style={{padding:"100px 60px",background:theme.bgAlt,borderTop:`1px solid ${theme.border}`,borderBottom:`1px solid ${theme.border}`,"@media (max-width: 768px)":{padding:"60px 20px"}}}>
      <div style={{maxWidth:1200,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:60}}>
          <span className="sec-label" style={{fontFamily:"'Space Mono',monospace",letterSpacing:".18em"}}>Capabilities</span>
          <h2 style={{fontFamily:"'Syne',sans-serif",fontSize:"clamp(32px,4vw,56px)",fontWeight:800,letterSpacing:"-.03em",color:theme.text}}>Technical Proficiency</h2>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:40,"@media (max-width: 768px)":{gridTemplateColumns:"1fr",gap:"30px"}}}>
          {SKILLS.map((s,i)=><div key={s.label} style={{background:theme.surface,border:`1px solid ${theme.border}`,borderRadius:2,padding:24,boxShadow:theme.shadow}}>
            <div style={{fontFamily:"'Space Mono',monospace",fontSize:13,color:theme.accent,fontWeight:700,letterSpacing:".08em",textTransform:"uppercase",marginBottom:12}}>{s.pct}%</div>
            <h3 style={{fontFamily:"'Syne',sans-serif",fontSize:16,fontWeight:700,marginBottom:8,color:theme.text}}>{s.label}</h3>
            <div style={{height:2,background:theme.border,borderRadius:99}}>
              <div style={{height:"100%",width:`${s.pct}%`,background:theme.accent,borderRadius:99,opacity:.7}}/>
            </div>
          </div>)}
        </div>
        <div style={{marginTop:48,textAlign:"center"}}>
          <h3 style={{fontFamily:"'Syne',sans-serif",fontSize:16,fontWeight:700,marginBottom:20,color:theme.text,letterSpacing:".08em",textTransform:"uppercase"}}>Tech Stack</h3>
          <div style={{display:"flex",flexWrap:"wrap",gap:8,justifyContent:"center"}}>
            {TECH.map(t=><span key={t} style={{padding:"8px 14px",background:theme.surface,border:`1px solid ${theme.border}`,borderRadius:2,fontSize:12,fontWeight:500,color:theme.text,fontFamily:"'Space Mono',monospace",letterSpacing:".04em",transition:"all .2s",cursor:"default"}}
              onMouseEnter={e=>{e.target.style.borderColor=theme.accent;e.target.style.color=theme.accent;}}
              onMouseLeave={e=>{e.target.style.borderColor=theme.border;e.target.style.color=theme.text;}}>{t}</span>)}
          </div>
        </div>
      </div>
      {devMode&&<DevBadge id="skills" devMode={devMode} theme={theme}/>}
    </section>

    {/* PROJECTS — editorial horizontal scroll */}
    <section id="projects" style={{position:"relative"}}>
      <div style={{maxWidth:1200,margin:"0 auto",textAlign:"center"}}>
        <span className="sec-label" style={{fontFamily:"'Space Mono',monospace",letterSpacing:".18em"}}>Portfolio</span>
        <h2 className="section-title" style={{fontFamily:"'Syne',sans-serif",fontSize:"clamp(32px,4vw,56px)",fontWeight:800,letterSpacing:"-.03em",marginBottom:24,color:theme.text}}>Projects</h2>
      </div>
      <div ref={hPanelRef} className="projects-container" style={{overflow:"hidden",position:"relative",height:"100vh"}}>
        <div ref={hTrackRef} className="projects-track" style={{display:"flex",gap:24,padding:"0 40px",height:"100%",alignItems:"center"}}>
          {PROJECTS.map((project,i)=>(
            <div key={project.id} className="project-card" style={{width:340,flexShrink:0,background:theme.surfaceAlt,border:`1px solid ${theme.border}`,borderRadius:2,overflow:"hidden",cursor:"pointer",transform:"translateY(0)",transition:"all .3s",boxShadow:theme.shadow}}>
              <div className="project-image" style={{height:160,background:project.cardBg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:52}}>{project.emoji}</div>
              <div className="project-content" style={{padding:"20px 24px 28px"}}>
                <h3 className="project-title" style={{fontSize:17,fontWeight:700,margin:"0 0 8px",fontFamily:"'Syne', sans-serif",color:theme.text,letterSpacing:"-.01em"}}>{project.title}</h3>
                <p className="project-desc" style={{fontSize:13,color:theme.textMuted,margin:0,lineHeight:1.8}}>{project.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {devMode&&<DevBadge id="projects" devMode={devMode} theme={theme}/>}
    </section>

    {/* SERVICES — editorial grid */}
    <section ref={servicesRef} id="services" style={{padding:"100px 60px",background:theme.bgAlt,borderTop:`1px solid ${theme.border}`,borderBottom:`1px solid ${theme.border}`}}>
      <div style={{maxWidth:1200,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:60}}>
          <span className="sec-label" style={{fontFamily:"'Space Mono',monospace",letterSpacing:".18em"}}>Services</span>
          <h2 className="section-title" style={{fontFamily:"'Syne',sans-serif",fontSize:"clamp(32px,4vw,56px)",fontWeight:800,letterSpacing:"-.03em",color:theme.text}}>What I Offer</h2>
        </div>
        <div className="services-grid" style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:24}}>
          {SERVICES.map(s=><div key={s.title} className="srv-card" style={{background:theme.surface,border:`1px solid ${theme.border}`,borderRadius:2,padding:32,boxShadow:theme.shadow,transition:"all .25s",cursor:"default"}}
            onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-4px)";e.currentTarget.style.boxShadow=theme.shadowMd;e.currentTarget.style.borderColor=theme.borderMid;}}
            onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow=theme.shadow;e.currentTarget.style.borderColor=theme.border;}}>
            <div className="service-icon" style={{fontSize:36,marginBottom:16,opacity:.8}}>{s.icon}</div>
            <h3 style={{fontFamily:"'Syne',sans-serif",fontSize:18,fontWeight:700,marginBottom:12,color:theme.text,letterSpacing:"-.01em"}}>{s.title}</h3>
            <p style={{fontSize:14,color:theme.textMuted,lineHeight:1.8}}>{s.desc}</p>
          </div>)}
        </div>
      </div>
      {devMode&&<DevBadge id="services" devMode={devMode} theme={theme}/>}
    </section>

    {/* TIMELINE — editorial */}
    <section ref={timelineRef} id="experience" style={{padding:"100px 60px",position:"relative","@media (max-width: 768px)":{padding:"60px 20px"}}}>
      <div style={{maxWidth:900,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:60}}>
          <span className="sec-label" style={{fontFamily:"'Space Mono',monospace",letterSpacing:".18em"}}>Journey</span>
          <h2 style={{fontFamily:"'Syne',sans-serif",fontSize:"clamp(32px,4vw,56px)",fontWeight:800,letterSpacing:"-.03em",color:theme.text}}>Experience</h2>
        </div>
        <div style={{position:"relative"}}>
          <div style={{position:"absolute",left:24,top:0,bottom:0,width:1,background:theme.borderMid,opacity:.5,"@media (max-width: 768px)":{left:16}}}/>
          {TIMELINE.map((t,i)=><div key={i} className="tl-item" style={{display:"flex",gap:32,marginBottom:48,"@media (max-width: 768px)":{gap:"20px",marginBottom:"32px"}}}>
            <div style={{width:48,height:48,borderRadius:2,background:theme.surface,border:`1px solid ${theme.borderMid}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0,boxShadow:theme.shadow,"@media (max-width: 768px)":{width:40,height:40,fontSize:16}}}>{t.type==="edu"?"🎓":"💼"}</div>
            <div style={{flex:1}}>
              <div style={{display:"flex",gap:12,alignItems:"center",marginBottom:8,flexWrap:"wrap"}}>
                <span style={{fontFamily:"'Space Mono',monospace",fontSize:12,color:theme.textMuted,fontWeight:700,background:theme.bgAlt,padding:"4px 10px",borderRadius:2,border:`1px solid ${theme.border}`,"@media (max-width: 768px)":{fontSize:11,padding:"3px 8px"}}}>{t.year}</span>
                <span style={{fontSize:13,color:theme.accent,fontWeight:600,fontFamily:"'Space Mono',monospace",letterSpacing:".04em","@media (max-width: 768px)":{fontSize:12}}}>{t.place}</span>
              </div>
              <h3 style={{fontFamily:"'Syne',sans-serif",fontSize:18,fontWeight:700,marginBottom:8,color:theme.text,letterSpacing:"-.01em","@media (max-width: 768px)":{fontSize:16,marginBottom:6}}}>{t.title}</h3>
              <p style={{fontSize:14,color:theme.textMuted,lineHeight:1.8,"@media (max-width: 768px)":{fontSize:13,lineHeight:1.7}}}>{t.desc}</p>
            </div>
          </div>)}
        </div>
      </div>
      {devMode&&<DevBadge id="experience" devMode={devMode} theme={theme}/>}
    </section>

    {/* GET IN TOUCH */}
    <section style={{padding:"100px 60px",background:theme.bgAlt,borderTop:`1px solid ${theme.border}`,borderBottom:`1px solid ${theme.border}`,"@media (max-width: 768px)":{padding:"60px 20px"}}}>
      <div style={{maxWidth:800,margin:"0 auto",textAlign:"center"}}>
        <span className="sec-label" style={{fontFamily:"'Space Mono',monospace",letterSpacing:".18em"}}>Connect</span>
        <h2 style={{fontFamily:"'Syne',sans-serif",fontSize:"clamp(32px,4vw,56px)",fontWeight:800,letterSpacing:"-.03em",marginBottom:40,color:theme.text,"@media (max-width: 768px)":{marginBottom:30}}}>Let's Work Together</h2>
        <p style={{fontSize:16,lineHeight:1.9,color:theme.text,opacity:.8,marginBottom:40,fontFamily:"'DM Sans',sans-serif","@media (max-width: 768px)":{fontSize:15,marginBottom:30}}}>I'm always interested in hearing about new projects and opportunities. Whether you have a question or just want to say hi, feel free to reach out!</p>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:24,marginBottom:40,"@media (max-width: 768px)":{gridTemplateColumns:"1fr",gap:"20px",marginBottom:30}}}>
          {CONTACT_INFO.map((c,i)=>(
            <a key={i} href={c.link} target="_blank" rel="noopener noreferrer" style={{background:theme.surface,border:`1px solid ${theme.border}`,borderRadius:16,padding:"32px 24px",textDecoration:"none",display:"flex",flexDirection:"column",alignItems:"center",gap:16,transition:"all .3s",opacity:.9}} onMouseOver={e=>{e.currentTarget.style.transform="translateY(-6px)";e.currentTarget.style.borderColor=theme.accent;e.currentTarget.style.opacity=1}} onMouseOut={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.borderColor=theme.border;e.currentTarget.style.opacity=.9}}>
              <div style={{fontSize:40}}>{c.icon}</div>
              <div style={{fontSize:16,fontWeight:600,color:theme.text,fontFamily:"'Syne',sans-serif"}}>{c.title}</div>
              <div style={{fontSize:14,color:theme.textMuted,opacity:.8}}>{c.value}</div>
            </a>
          ))}
        </div>
      </div>
    </section>

    {/* CONTACT */}
    <section ref={contactRef} id="contact" style={{padding:"100px 60px",position:"relative","@media (max-width: 768px)":{padding:"60px 20px"}}}>
      <div style={{maxWidth:700,margin:"0 auto",textAlign:"center"}}>
        <span className="sec-label" style={{fontFamily:"'Space Mono',monospace",letterSpacing:".18em"}}>Contact</span>
        <h2 style={{fontFamily:"'Syne',sans-serif",fontSize:"clamp(32px,4vw,56px)",fontWeight:800,letterSpacing:"-.03em",marginBottom:32,color:theme.text,"@media (max-width: 768px)":{marginBottom:24}}}>Let's Connect</h2>
        <div style={{background:theme.surface,border:`1px solid ${theme.border}`,borderRadius:2,padding:40,boxShadow:theme.shadow,"@media (max-width: 768px)":{padding:"24px 20px"}}}>
          {sent?<div style={{textAlign:"center",padding:"40px 0"}}><div style={{fontSize:52,marginBottom:20}}>✅</div><h3 style={{fontFamily:"'Syne',sans-serif",fontSize:22,fontWeight:800,color:theme.text,letterSpacing:"-.01em"}}>Thank You</h3><p style={{color:theme.textMuted,fontSize:15,fontFamily:"'DM Sans',sans-serif"}}>Your message has been received. I'll respond within 24 hours.</p></div>:<>
            {[{l:"Name",k:"name",t:"text",p:"Your full name"},{l:"Email",k:"email",t:"email",p:"your@email.com"},{l:"Subject",k:"subject",t:"text",p:"Project details"}].map(f=><div key={f.k} style={{marginBottom:16,textAlign:"left"}}>
              <label style={{display:"block",fontSize:11,fontWeight:700,letterSpacing:".15em",textTransform:"uppercase",color:theme.textMuted,marginBottom:6,fontFamily:"'Space Mono',monospace",opacity:.8}}>{f.l}</label>
              <input style={{width:"100%",padding:"14px 16px",background:theme.bgAlt,border:`1px solid ${theme.border}`,borderRadius:2,color:theme.text,fontSize:15,fontFamily:"'DM Sans',sans-serif",outline:"none",transition:"border-color .2s","@media (max-width: 768px)":{padding:"12px 14px",fontSize:14}}} type={f.t} placeholder={f.p} value={form[f.k]} onChange={e=>setForm(d=>({...d,[f.k]:e.target.value}))}/>
            </div>)}
            <div style={{marginBottom:24,textAlign:"left"}}>
              <label style={{display:"block",fontSize:11,fontWeight:700,letterSpacing:".15em",textTransform:"uppercase",color:theme.textMuted,marginBottom:6,fontFamily:"'Space Mono',monospace",opacity:.8}}>Message</label>
              <textarea style={{width:"100%",padding:"14px 16px",background:theme.bgAlt,border:`1px solid ${theme.border}`,borderRadius:2,color:theme.text,fontSize:15,fontFamily:"'DM Sans',sans-serif",outline:"none",resize:"vertical",transition:"border-color .2s","@media (max-width: 768px)":{padding:"12px 14px",fontSize:14}}} rows={6} placeholder="Tell me about your project..." value={form.message} onChange={e=>setForm(d=>({...d,message:e.target.value}))}/>
            </div>
            <button className="bp" onClick={()=>{
              const subject = encodeURIComponent(form.subject || "Portfolio Contact");
              const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`);
              window.open(`mailto:michaelgaitho47@gmail.com?subject=${subject}&body=${body}`);
              setSent(true);
            }} style={{width:"100%",display:"flex",justifyContent:"center",fontSize:14,padding:"16px",borderRadius:2,letterSpacing:".08em","@media (max-width: 768px)":{fontSize:13,padding:"14px"}}}>Send Message →</button>
          </>}
        </div>
      </div>
      {devMode&&<DevBadge id="contact" devMode={devMode} theme={theme}/>}
    </section>
  </>;
}
