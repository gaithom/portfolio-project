import { useState, useRef, useEffect } from "react";
import { useGSAP } from "../hooks/useGSAP";
import { Typewriter, SkillBar, Modal } from "../components/Shared";
import { DevBadge } from "../components/DeveloperMode";
import { PROJECTS, SKILLS, TECH, SERVICES, TIMELINE, CONTACT_INFO } from "../data/content";

export function LightLayout({ theme, devMode, scrollTo, tIdx, setTIdx, sel, setSel, sent, setSent, form, setForm }) {
  const heroRef=useRef(null),heroTitleRef=useRef(null),heroBadgeRef=useRef(null),heroCtaRef=useRef(null);
  const servicesRef=useRef(null),timelineRef=useRef(null),contactRef=useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Track mouse movement for interactive background
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useGSAP((gsap,ST)=>{
    const tl=gsap.timeline({delay:.2});
    tl.fromTo(heroBadgeRef.current,{y:16,opacity:0},{y:0,opacity:1,duration:.65,ease:"expo.out"})
      .fromTo(heroTitleRef.current,{y:40,opacity:0},{y:0,opacity:1,duration:1,ease:"expo.out"},"-=.25")
      .fromTo(heroCtaRef.current,{y:16,opacity:0},{y:0,opacity:1,duration:.65,ease:"expo.out"},"-=.35");
    const sc=servicesRef.current?.querySelectorAll(".srv-card");
    if(sc)gsap.fromTo(sc,{y:30,opacity:0},{y:0,opacity:1,stagger:.08,duration:.75,ease:"expo.out",scrollTrigger:{trigger:servicesRef.current,start:"top 84%"}});
    const ti=timelineRef.current?.querySelectorAll(".tl-step");
    if(ti)gsap.fromTo(ti,{y:20,opacity:0},{y:0,opacity:1,stagger:.14,duration:.7,ease:"expo.out",scrollTrigger:{trigger:timelineRef.current,start:"top 84%"}});
    gsap.fromTo(contactRef.current,{y:24,opacity:0},{y:0,opacity:1,duration:.8,ease:"expo.out",scrollTrigger:{trigger:contactRef.current,start:"top 86%"}});
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
    {/* HERO — clean left-aligned */}
    <section ref={heroRef} id="hero" className="hero-section" style={{minHeight:"92vh",display:"flex",flexDirection:"column",alignItems:"flex-start",justifyContent:"center",padding:"120px 40px 80px",textAlign:"left",position:"relative",borderBottom:`1px solid ${theme.border}`}}>
      <div className="hero-content" style={{position:"relative",zIndex:1,maxWidth:680,width:"100%"}}>
        <div ref={heroBadgeRef} style={{display:"inline-flex",alignItems:"center",gap:7,border:`1px solid ${theme.border}`,borderRadius:4,padding:"6px 16px",marginBottom:32,background:"rgba(255,255,255,0.8)",backdropFilter:"blur(12px)",fontSize:12,letterSpacing:".14em",textTransform:"uppercase",color:theme.text}}>
          <span style={{width:6,height:6,borderRadius:"50%",background:theme.accent,display:"inline-block",opacity:.7,animation:"pulse 2.5s ease-in-out infinite"}}/>
          Available for Freelance
        </div>
        <h1 ref={heroTitleRef} className="hero-title" style={{fontFamily:"'Syne',sans-serif",fontSize:"clamp(32px,6vw,72px)",fontWeight:800,lineHeight:1.0,letterSpacing:"-.03em",marginBottom:20,color:theme.text}}>
          Michael Gaitho.<span style={{color:theme.accent}}>DEV</span>
        </h1>
        <p className="hero-subtitle" style={{fontSize:16,color:theme.textMuted,maxWidth:440,margin:"0 0 12px 0",lineHeight:1.9}}>UI/UX Designer & Creative Coder based in Nakuru, Kenya 🇰🇪</p>
        <p className="hero-description" style={{fontSize:13,color:theme.textMuted,maxWidth:380,margin:"0 0 40px 0",lineHeight:1.85,opacity:.7}}>Building clean, performant React applications with beautiful motion design.</p>
        <div ref={heroCtaRef} className="hero-cta" style={{display:"flex",gap:12,justifyContent:"flex-start",flexWrap:"wrap"}}>
          <button className="bp" onClick={()=>scrollTo("projects")} style={{borderRadius:4}}>View Projects</button>
          <button className="bg" onClick={()=>scrollTo("contact")} style={{borderRadius:4}}>Say Hello →</button>
        </div>
        <div className="hero-stats" style={{display:"flex",gap:48,justifyContent:"flex-start",marginTop:60}}>
          {[{n:"2+",l:"Years"},{n:"15+",l:"Projects"},{n:"∞",l:"Coffee"}].map(s=><div key={s.l} className="stat-item" style={{textAlign:"left"}}>
            <div className="stat-number" style={{fontFamily:"'Syne',sans-serif",fontSize:28,fontWeight:800,color:theme.text,lineHeight:1,opacity:.8}}>{s.n}</div>
            <div className="stat-label" style={{fontSize:11,color:theme.text,letterSpacing:".14em",textTransform:"uppercase",marginTop:5,opacity:.8}}>{s.l}</div>
          </div>)}
        </div>
      </div>
      {devMode&&<DevBadge id="hero" devMode={devMode} theme={theme}/>}
    </section>

    <div style={{overflow:"hidden",borderBottom:`1px solid ${theme.border}`,padding:"9px 0"}}>
      <div style={{display:"flex",gap:30,whiteSpace:"nowrap",animation:"marquee 25s linear infinite"}}>
        {[...TECH,...TECH].map((t,i)=><span key={i} style={{fontSize:12,fontWeight:600,letterSpacing:".15em",textTransform:"uppercase",color:theme.text,opacity:.6}}>{t}<span style={{marginLeft:16,opacity:.2}}>·</span></span>)}
      </div>
    </div>

    {/* ABOUT — three-column open cards */}
    <section id="about" className="about-section" style={{padding:"100px 60px",position:"relative",borderBottom:`1px solid ${theme.border}`}}>
      <div style={{maxWidth:1100,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:60}}>
          <span style={{fontSize:12,letterSpacing:".25em",textTransform:"uppercase",color:theme.text,fontFamily:"'Space Mono',monospace",opacity:.8,display:"block",marginBottom:12}}>About</span>
          <h2 className="section-title" style={{fontFamily:"'Syne',sans-serif",fontSize:"clamp(24px,4vw,40px)",fontWeight:800,letterSpacing:"-.02em",color:theme.text}}>Who I Am</h2>
        </div>
        <div className="about-cards" style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:20}}>
          <div className="about-card" style={{background:theme.surface,border:`1px solid ${theme.border}`,borderRadius:8,padding:32,boxShadow:theme.shadow}}>
            <div className="icon" style={{fontSize:36,marginBottom:18,opacity:.8}}>👨🏾‍💻</div>
            <h3 style={{fontFamily:"'Syne',sans-serif",fontSize:17,fontWeight:700,marginBottom:10,color:theme.text}}>Michael Gaitho</h3>
            <p style={{color:theme.textMuted,fontSize:13,lineHeight:1.8}}>Frontend Developer & UI/UX designer specializing in AI-powered interfaces and real-time analytics.</p>
          </div>
          <div className="about-card" style={{background:theme.surface,border:`1px solid ${theme.border}`,borderRadius:8,padding:32,boxShadow:theme.shadow}}>
            <div className="icon" style={{fontSize:36,marginBottom:18,opacity:.8}}>🧠</div>
            <h3 style={{fontFamily:"'Syne',sans-serif",fontSize:17,fontWeight:700,marginBottom:10,color:theme.text}}>AI Development</h3>
            <p style={{color:theme.textMuted,fontSize:13,lineHeight:1.8}}>Building AI-powered web interfaces and dashboards. Leading frontend architecture and UI/UX design decisions.</p>
          </div>
          <div className="about-card" style={{background:theme.accent,borderRadius:8,padding:32,boxShadow:theme.shadow}}>
            <div className="icon" style={{fontSize:36,marginBottom:18}}>🎓</div>
            <h3 style={{fontFamily:"'Syne',sans-serif",fontSize:17,fontWeight:700,marginBottom:10,color:theme.bg}}>Education</h3>
            <p style={{color:theme.bg,fontSize:13,lineHeight:1.8,opacity:.8}}>Bachelor of IT — Specializing in software engineering and human-computer interaction. Expected 2026.</p>
          </div>
        </div>
        <div style={{marginTop:24,display:"flex",gap:10,justifyContent:"center"}}><button className="bp" onClick={() => window.open('/resume.pdf', '_blank')} style={{borderRadius:4}}>Download Resume</button><button className="bg" onClick={()=>scrollTo("projects")} style={{borderRadius:4}}>See Work →</button></div>
      </div>
      {devMode&&<DevBadge id="about" devMode={devMode} theme={theme}/>}
    </section>

    {/* SKILLS — dot-grid indicators */}
    <section id="skills" className="skills-section" style={{padding:"100px 60px",borderBottom:`1px solid ${theme.border}`,position:"relative",'@media (max-width: 768px)': {padding:"60px 30px"}, '@media (max-width: 480px)': {padding:"40px 20px"}}}>
      <div style={{maxWidth:1100,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:56}}>
          <span style={{fontSize:12,letterSpacing:".25em",textTransform:"uppercase",color:theme.text,fontFamily:"'Space Mono',monospace",opacity:.8,display:"block",marginBottom:12}}>Expertise</span>
          <h2 className="section-title" style={{fontFamily:"'Syne',sans-serif",fontSize:"clamp(24px,4vw,40px)",fontWeight:800,letterSpacing:"-.02em",color:theme.text}}>Skills</h2>
        </div>
        <div className="skills-grid" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:50,'@media (max-width: 768px)': {gridTemplateColumns:"1fr",gap:30}}}>
          <div>{SKILLS.map((s,i)=><div key={s.label} className="skill-item" style={{marginBottom:18}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
              <span style={{fontSize:13,fontWeight:500,color:theme.text,opacity:.82}}>{s.label}</span>
              <span style={{fontSize:11,color:theme.text,fontFamily:"'Space Mono',monospace",opacity:.8}}>{s.pct}%</span>
            </div>
            {/* Dot progress */}
            <div style={{display:"flex",gap:4}}>
              {Array.from({length:10},(_,d)=><div key={d} style={{width:18,height:4,borderRadius:2,background:d<Math.round(s.pct/10)?theme.accent:theme.border,opacity:d<Math.round(s.pct/10)?.65:.4,transition:"background .3s"}}/>)}
            </div>
          </div>)}</div>
          <div>
            <h3 style={{fontFamily:"'Syne',sans-serif",fontSize:15,fontWeight:700,marginBottom:18,color:theme.text,letterSpacing:".08em",textTransform:"uppercase",opacity:.8}}>Tech Stack</h3>
            <div style={{display:"flex",flexWrap:"wrap",gap:7}}>
              {TECH.map(t=><span key={t} style={{padding:"6px 12px",background:theme.surface,border:`1px solid ${theme.border}`,borderRadius:4,fontSize:12,fontWeight:500,color:theme.text,opacity:.75,transition:"all .2s",cursor:"default",boxShadow:theme.shadow}}
                onMouseEnter={e=>{e.target.style.borderColor=theme.accent;e.target.style.opacity=1;}}
                onMouseLeave={e=>{e.target.style.borderColor=theme.border;e.target.style.opacity=.75;}}>{t}</span>)}
            </div>
          </div>
        </div>
      </div>
      {devMode&&<DevBadge id="skills" devMode={devMode} theme={theme}/>}
    </section>

    {/* PROJECTS — clean card grid */}
    <section id="projects" className="projects-section" style={{padding:"100px 60px",borderBottom:`1px solid ${theme.border}`,position:"relative"}}>
      <div style={{maxWidth:1100,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:40}}>
          <span style={{fontSize:12,letterSpacing:".25em",textTransform:"uppercase",color:theme.text,fontFamily:"'Space Mono',monospace",opacity:.8,display:"block",marginBottom:12}}>Portfolio</span>
          <h2 className="section-title" style={{fontFamily:"'Syne',sans-serif",fontSize:"clamp(24px,4vw,40px)",fontWeight:800,letterSpacing:"-.02em",marginBottom:24,color:theme.text}}>Projects</h2>
        </div>
        <div className="projects-grid" style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(310px,1fr))",gap:18}}>
          {PROJECTS.map((p)=>{
            const [h,setH]=useState(false);
            return <div key={p.id} onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)} onClick={()=>setSel(p)} style={{background:theme.surface,border:`1px solid ${h?theme.borderMid:theme.border}`,borderRadius:8,overflow:"hidden",cursor:"pointer",transform:h?"translateY(-4px)":"translateY(0)",transition:"all .28s",boxShadow:h?theme.shadowMd:theme.shadow}}>
              <div style={{height:140,background:p.cardBg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:42}}>{p.emoji}</div>
              <div style={{padding:"16px 20px 22px"}}>
                <h3 style={{fontSize:15,fontWeight:700,margin:"0 0 6px",fontFamily:"'Syne',sans-serif",color:theme.text}}>{p.title}</h3>
                <p style={{fontSize:13,color:theme.text,margin:0,lineHeight:1.75,opacity:.8}}>{p.desc}</p>
              </div>
            </div>;
          })}
        </div>
      </div>
      {devMode&&<DevBadge id="projects" devMode={devMode} theme={theme}/>}
    </section>

    {/* SERVICES — two-column minimal */}
    <section ref={servicesRef} id="services" className="services-section" style={{padding:"100px 60px",borderBottom:`1px solid ${theme.border}`,position:"relative"}}>
      <div style={{maxWidth:1100,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:56}}><span style={{fontSize:10,letterSpacing:".25em",textTransform:"uppercase",color:theme.textMuted,fontFamily:"'Space Mono',monospace",opacity:.6,display:"block",marginBottom:12}}>Services</span><h2 className="section-title" style={{fontFamily:"'Syne',sans-serif",fontSize:"clamp(24px,4vw,40px)",fontWeight:800,letterSpacing:"-.02em",color:theme.text}}>What I Do</h2></div>
        <div className="services-grid" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
          {SERVICES.map(s=><div key={s.title} className="srv-card" style={{background:theme.surface,border:`1px solid ${theme.border}`,borderRadius:8,padding:"28px 28px 28px 28px",display:"flex",gap:20,alignItems:"flex-start",transition:"all .25s",boxShadow:theme.shadow}}
            onMouseEnter={e=>{e.currentTarget.style.borderColor=theme.borderMid;e.currentTarget.style.boxShadow=theme.shadowMd;e.currentTarget.style.transform="translateY(-3px)";}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor=theme.border;e.currentTarget.style.boxShadow=theme.shadow;e.currentTarget.style.transform="translateY(0)";}}>
            <div style={{fontSize:28,opacity:.75,flexShrink:0,marginTop:2}}>{s.icon}</div>
            <div>
              <h3 style={{fontFamily:"'Syne',sans-serif",fontSize:16,fontWeight:700,marginBottom:8,color:theme.text}}>{s.title}</h3>
              <p style={{fontSize:13,color:theme.textMuted,lineHeight:1.78}}>{s.desc}</p>
            </div>
          </div>)}
        </div>
      </div>
      {devMode&&<DevBadge id="services" devMode={devMode} theme={theme}/>}
    </section>

    {/* TIMELINE — horizontal stepper */}
    <section ref={timelineRef} id="experience" className="timeline-section" style={{padding:"100px 60px",borderBottom:`1px solid ${theme.border}`,position:"relative"}}>
      <div style={{maxWidth:1100,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:60}}><span style={{fontSize:10,letterSpacing:".25em",textTransform:"uppercase",color:theme.textMuted,fontFamily:"'Space Mono',monospace",opacity:.6,display:"block",marginBottom:12}}>Journey</span><h2 className="section-title" style={{fontFamily:"'Syne',sans-serif",fontSize:"clamp(24px,4vw,40px)",fontWeight:800,letterSpacing:"-.02em",color:theme.text}}>Experience & Education</h2></div>
        {/* Horizontal stepper */}
        <div style={{position:"relative"}}>
          <div className="timeline-line" style={{position:"absolute",top:22,left:"calc(50px)",right:"calc(50px)",height:1,background:`linear-gradient(to right,${theme.borderMid},transparent)`,opacity:.5}}/>
          <div className="timeline-grid" style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:20}}>
            {TIMELINE.map((t,i)=><div key={i} className="tl-step" style={{textAlign:"center",paddingTop:0}}>
              <div style={{width:44,height:44,borderRadius:8,background:theme.surface,border:`1px solid ${theme.borderMid}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,margin:"0 auto 20px",boxShadow:theme.shadow}}>{t.type==="edu"?"🎓":"💼"}</div>
              <div style={{fontFamily:"'Space Mono',monospace",fontSize:10,fontWeight:700,color:theme.textMuted,marginBottom:8,opacity:.7,letterSpacing:".06em"}}>{t.year} · {t.place}</div>
              <h3 style={{fontFamily:"'Syne',sans-serif",fontSize:15,fontWeight:700,marginBottom:8,color:theme.text,opacity:.88}}>{t.title}</h3>
              <p style={{fontSize:12,color:theme.textMuted,lineHeight:1.75,opacity:.75}}>{t.desc}</p>
            </div>)}
          </div>
        </div>
      </div>
      {devMode&&<DevBadge id="experience" devMode={devMode} theme={theme}/>}
    </section>

    {/* GET IN TOUCH */}
    <section className="contact-section" style={{padding:"100px 60px",borderBottom:`1px solid ${theme.border}`}}>
      <div style={{maxWidth:680,margin:"0 auto",textAlign:"center"}}>
        <span style={{fontSize:10,letterSpacing:".25em",textTransform:"uppercase",color:theme.textMuted,fontFamily:"'Space Mono',monospace",opacity:.6,display:"block",marginBottom:12}}>Connect</span>
        <h2 className="section-title" style={{fontFamily:"'Syne',sans-serif",fontSize:"clamp(24px,4vw,40px)",fontWeight:800,letterSpacing:"-.02em",color:theme.text,marginBottom:40}}>Let's Work Together</h2>
        <p style={{fontSize:15,lineHeight:1.9,color:theme.text,opacity:.8,marginBottom:40}}>I'm always interested in hearing about new projects and opportunities. Whether you have a question or just want to say hi, feel free to reach out!</p>
        <div className="contact-info-grid" style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:20,marginBottom:40}}>
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
    <section ref={contactRef} id="contact" className="contact-section" style={{padding:"100px 60px",position:"relative"}}>
      <div className="contact-form" style={{maxWidth:560,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:40}}>
          <span style={{fontSize:10,letterSpacing:".25em",textTransform:"uppercase",color:theme.textMuted,fontFamily:"'Space Mono',monospace",opacity:.6,display:"block",marginBottom:12}}>Contact</span>
          <h2 className="section-title" style={{fontFamily:"'Syne',sans-serif",fontSize:"clamp(24px,4vw,40px)",fontWeight:800,letterSpacing:"-.02em",marginBottom:12,color:theme.text}}>Let's Build<br/><span style={{color:theme.accent}}>Something Great</span></h2>
        </div>
        <div className="contact-form" style={{background:theme.surface,border:`1px solid ${theme.border}`,borderRadius:8,padding:34,boxShadow:theme.shadow}}>
          {sent?<div style={{textAlign:"center",padding:"30px 0"}}><div style={{fontSize:46,marginBottom:16}}>✅</div><h3 style={{fontFamily:"'Syne',sans-serif",fontSize:20,fontWeight:800,color:theme.text}}>Message Sent!</h3><p style={{color:theme.textMuted,fontSize:14}}>Michael will reply shortly.</p></div>:<>
            {[{l:"Name",k:"name",t:"text",p:"Your name"},{l:"Email",k:"email",t:"email",p:"hello@example.com"},{l:"Subject",k:"subject",t:"text",p:"Project Inquiry"}].map(f=><div key={f.k} style={{marginBottom:14}}>
              <label style={{display:"block",fontSize:9,fontWeight:700,letterSpacing:".17em",textTransform:"uppercase",color:theme.textMuted,marginBottom:6,fontFamily:"'Space Mono',monospace",opacity:.65}}>{f.l}</label>
              <input style={{width:"100%",padding:"12px 15px",background:theme.bgAlt,border:`1px solid ${theme.border}`,borderRadius:5,color:theme.text,fontSize:14,fontFamily:"'DM Sans',sans-serif",outline:"none",transition:"border-color .2s"}} type={f.t} placeholder={f.p} value={form[f.k]} onChange={e=>setForm(d=>({...d,[f.k]:e.target.value}))} onFocus={e=>e.target.style.borderColor=theme.borderMid} onBlur={e=>e.target.style.borderColor=theme.border}/>
            </div>)}
            <div style={{marginBottom:20}}>
              <label style={{display:"block",fontSize:9,fontWeight:700,letterSpacing:".17em",textTransform:"uppercase",color:theme.textMuted,marginBottom:6,fontFamily:"'Space Mono',monospace",opacity:.65}}>Message</label>
              <textarea style={{width:"100%",padding:"12px 15px",background:theme.bgAlt,border:`1px solid ${theme.border}`,borderRadius:5,color:theme.text,fontSize:14,fontFamily:"'DM Sans',sans-serif",outline:"none",resize:"vertical",transition:"border-color .2s"}} rows={5} placeholder="Tell me about your project..." value={form.message} onChange={e=>setForm(d=>({...d,message:e.target.value}))} onFocus={e=>e.target.style.borderColor=theme.borderMid} onBlur={e=>e.target.style.borderColor=theme.border}/>
            </div>
            <button className="bp" onClick={()=>{
              const subject = encodeURIComponent(form.subject || "Portfolio Contact");
              const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`);
              window.open(`mailto:michaelgaitho47@gmail.com?subject=${subject}&body=${body}`);
              setSent(true);
            }} style={{width:"100%",display:"flex",justifyContent:"center",fontSize:13,padding:"12px 15px",borderRadius:4}}>Send Message →</button>
          </>}
        </div>
      </div>
      {devMode&&<DevBadge id="contact" devMode={devMode} theme={theme}/>}
    </section>
    </div>
    </>;
}
