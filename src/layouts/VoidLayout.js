import { useState, useRef } from "react";
import { useGSAP } from "../hooks/useGSAP";
import { Typewriter, Modal } from "../components/Shared";
import { DevBadge } from "../components/DeveloperMode";
import { PROJECTS, SKILLS, TECH, SERVICES, TIMELINE, TESTIMONIALS } from "../data/content";

export function VoidLayout({ theme, devMode, scrollTo, tIdx, setTIdx, sel, setSel, sent, setSent, form, setForm, themeKey }) {
  const heroRef=useRef(null),heroTitleRef=useRef(null),heroBadgeRef=useRef(null),heroSubRef=useRef(null),heroCtaRef=useRef(null);
  const aboutRef=useRef(null),aboutImgRef=useRef(null),aboutTxtRef=useRef(null);
  const servicesRef=useRef(null),timelineRef=useRef(null),contactRef=useRef(null);
  const [filter,setFilter]=useState("All");
  const filtered=filter==="All"?PROJECTS:PROJECTS.filter(p=>p.tags.includes(filter));

  useGSAP((gsap,ST)=>{
    const tl=gsap.timeline({delay:.15});
    tl.fromTo(heroBadgeRef.current,{y:12,opacity:0},{y:0,opacity:1,duration:.5,ease:"power2.out"})
      .fromTo(heroTitleRef.current,{y:30,opacity:0},{y:0,opacity:1,duration:.8,ease:"power2.out"},"-=.2")
      .fromTo(heroSubRef.current,{y:15,opacity:0},{y:0,opacity:1,duration:.5,ease:"power2.out"},"-=.25")
      .fromTo(heroCtaRef.current,{y:12,opacity:0},{y:0,opacity:1,duration:.5,ease:"power2.out"},"-=.2");
    gsap.fromTo(aboutImgRef.current,{x:-40,opacity:0},{x:0,opacity:1,duration:.9,ease:"power2.out",scrollTrigger:{trigger:aboutRef.current,start:"top 80%",toggleActions:"play none none none"}});
    gsap.fromTo(aboutTxtRef.current,{x:40,opacity:0},{x:0,opacity:1,duration:.9,ease:"power2.out",delay:.1,scrollTrigger:{trigger:aboutRef.current,start:"top 80%",toggleActions:"play none none none"}});
    const sc=servicesRef.current?.querySelectorAll(".srv-card");
    if(sc)gsap.fromTo(sc,{y:30,opacity:0},{y:0,opacity:1,stagger:.06,duration:.6,ease:"power2.out",scrollTrigger:{trigger:servicesRef.current,start:"top 85%"}});
    const ti=timelineRef.current?.querySelectorAll(".tl-item");
    if(ti)gsap.fromTo(ti,{x:-30,opacity:0},{x:0,opacity:1,stagger:.1,duration:.6,ease:"power2.out",scrollTrigger:{trigger:timelineRef.current,start:"top 85%"}});
    gsap.fromTo(contactRef.current,{y:25,opacity:0},{y:0,opacity:1,duration:.7,ease:"power2.out",scrollTrigger:{trigger:contactRef.current,start:"top 86%"}});
  },[]);

  return <>
    {/* HERO — brutalist full bleed */}
    <section ref={heroRef} id="hero" style={{minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"140px 60px 100px",textAlign:"center",position:"relative",background:theme.bg}}>
      <div style={{position:"relative",zIndex:1,maxWidth:1000}}>
        <div ref={heroBadgeRef} style={{display:"inline-flex",alignItems:"center",gap:10,border:`2px solid ${theme.borderMid}`,borderRadius:0,padding:"8px 20px",marginBottom:40,background:theme.surface,fontSize:11,letterSpacing:".2em",textTransform:"uppercase",color:theme.textMuted,fontFamily:"'Space Mono',monospace",fontWeight:700}}>
          <span style={{width:6,height:6,borderRadius:0,background:theme.accent,display:"inline-block",opacity:.8,transform:"rotate(45deg)"}}/>AVAILABLE FOR WORK
        </div>
        <h1 ref={heroTitleRef} style={{fontFamily:"'Syne',sans-serif",fontSize:"clamp(56px,10vw,120px)",fontWeight:800,lineHeight:.85,letterSpacing:"-.05em",marginBottom:32,color:theme.text,textTransform:"uppercase"}}>
          MICHAEL<br/>GAITHO
        </h1>
        <div ref={heroSubRef} style={{fontFamily:"'Space Mono',monospace",fontSize:"clamp(16px,2.5vw,24px)",marginBottom:40,minHeight:32,letterSpacing:".1em",color:theme.accent}}><Typewriter words={["FRONTEND DEVELOPER","UI/UX DESIGNER","CREATIVE CODER","PROBLEM SOLVER"]} theme={theme}/></div>
        <p style={{fontSize:18,color:theme.textMuted,maxWidth:600,margin:"0 auto 48px",lineHeight:1.8,opacity:.9,fontFamily:"'DM Sans',sans-serif",fontWeight:500}}>BUILDING RAW DIGITAL EXPERIENCES — NAKURU, KENYA 🇰🇪</p>
        <div ref={heroCtaRef} style={{display:"flex",gap:16,justifyContent:"center",flexWrap:"wrap"}}>
          <button className="bp" onClick={()=>scrollTo("projects")} style={{borderRadius:0,letterSpacing:".1em",textTransform:"uppercase",fontSize:12,fontWeight:800}}>VIEW WORK ↓</button>
          <button className="bg" onClick={()=>scrollTo("contact")} style={{borderRadius:0,letterSpacing:".1em",textTransform:"uppercase",fontSize:12,fontWeight:800}}>CONTACT</button>
        </div>
      </div>
      {devMode&&<DevBadge id="hero" devMode={devMode} theme={theme}/>}
    </section>

    <div style={{overflow:"hidden",borderBottom:`2px solid ${theme.borderMid}`,padding:"10px 0"}}>
      <div style={{display:"flex",gap:30,whiteSpace:"nowrap",animation:"marquee 18s linear infinite"}}>
        {[...TECH,...TECH].map((t,i)=><span key={i} style={{fontSize:10,fontWeight:700,letterSpacing:".18em",textTransform:"uppercase",color:theme.textMuted,opacity:.4,fontFamily:"'Space Mono',monospace"}}>{t}<span style={{marginLeft:16,opacity:.2}}>&times;</span></span>)}
      </div>
    </div>

    {/* ABOUT — raw, text-heavy */}
    <section id="about" style={{padding:"80px 60px",borderBottom:`2px solid ${theme.borderMid}`,position:"relative"}}>
      <div style={{display:"grid",gridTemplateColumns:"200px 1fr",gap:60}}>
        <div><div style={{fontFamily:"'Space Mono',monospace",fontSize:9,color:theme.textMuted,letterSpacing:".25em",textTransform:"uppercase",opacity:.5,marginTop:6}}>/ ABOUT</div></div>
        <div>
          <h2 style={{fontFamily:"'Syne',sans-serif",fontSize:"clamp(32px,5vw,64px)",fontWeight:800,lineHeight:.9,letterSpacing:"-.03em",marginBottom:40,color:theme.text,textTransform:"uppercase"}}>BUILDING<br/>THINGS<br/><span style={{color:theme.accent,opacity:.85}}>THAT WORK</span></h2>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:40}}>
            <div style={{borderTop:`2px solid ${theme.borderMid}`,paddingTop:20}}>
              <p style={{color:theme.textMuted,lineHeight:1.9,fontSize:14}}>Frontend Developer & UI/UX designer at <span style={{color:theme.text,fontWeight:700}}>LishAI Labs</span>, Nakuru. I build AI-powered interfaces that actually work.</p>
            </div>
            <div style={{borderTop:`2px solid ${theme.borderMid}`,paddingTop:20}}>
              <p style={{color:theme.textMuted,lineHeight:1.9,fontSize:14}}>Pursuing Bachelor of IT at <span style={{color:theme.text,fontWeight:700}}>Kabarak University</span>. Bridging academic theory with real-world production code.</p>
            </div>
          </div>
          <div style={{marginTop:40,display:"flex",gap:10}}><button className="bp" style={{borderRadius:0,letterSpacing:".08em",textTransform:"uppercase",fontSize:11}}>CV.PDF</button><button className="bg" onClick={()=>scrollTo("projects")} style={{borderRadius:0,letterSpacing:".08em",textTransform:"uppercase",fontSize:11}}>WORK →</button></div>
        </div>
      </div>
      {devMode&&<DevBadge id="about" devMode={devMode} theme={theme}/>}
    </section>

    {/* SKILLS — big numbers */}
    <section id="skills" style={{padding:"80px 60px",background:theme.bgAlt,borderBottom:`2px solid ${theme.borderMid}`,position:"relative"}}>
      <div style={{display:"grid",gridTemplateColumns:"200px 1fr",gap:60}}>
        <div><div style={{fontFamily:"'Space Mono',monospace",fontSize:9,color:theme.textMuted,letterSpacing:".25em",textTransform:"uppercase",opacity:.5,marginTop:6}}>/ SKILLS</div></div>
        <div>
          {SKILLS.map((s,i)=><div key={s.label} style={{display:"grid",gridTemplateColumns:"1fr 120px",gap:30,alignItems:"center",borderTop:`1px solid ${theme.border}`,padding:"16px 0"}}>
            <div style={{fontFamily:"'Syne',sans-serif",fontSize:16,fontWeight:700,color:theme.text,opacity:.85,textTransform:"uppercase",letterSpacing:".04em"}}>{s.label}</div>
            <div style={{textAlign:"right"}}>
              <span style={{fontFamily:"'Syne',sans-serif",fontSize:32,fontWeight:800,color:theme.textMuted,opacity:.45,lineHeight:1}}>{s.pct}<span style={{fontSize:16,opacity:.5}}>%</span></span>
              <div style={{height:2,background:theme.border,marginTop:6}}><div style={{height:"100%",width:`${s.pct}%`,background:theme.accent,opacity:.55}}/></div>
            </div>
          </div>)}
          <div style={{marginTop:30,display:"flex",flexWrap:"wrap",gap:6,borderTop:`1px solid ${theme.border}`,paddingTop:20}}>
            {TECH.map(t=><span key={t} style={{padding:"4px 10px",background:"transparent",border:`1px solid ${theme.borderMid}`,fontSize:10,fontWeight:700,color:theme.textMuted,textTransform:"uppercase",letterSpacing:".06em",transition:"all .15s",cursor:"default"}}
              onMouseEnter={e=>{e.target.style.background=theme.accent;e.target.style.color=theme.bg;e.target.style.borderColor=theme.accent;}}
              onMouseLeave={e=>{e.target.style.background="transparent";e.target.style.color=theme.textMuted;e.target.style.borderColor=theme.borderMid;}}>{t}</span>)}
          </div>
        </div>
      </div>
      {devMode&&<DevBadge id="skills" devMode={devMode} theme={theme}/>}
    </section>

    {/* PROJECTS — brutalist numbered list */}
    <section id="projects" style={{borderBottom:`2px solid ${theme.borderMid}`,position:"relative"}}>
      <div style={{display:"grid",gridTemplateColumns:"200px 1fr",gap:60,padding:"80px 60px 30px"}}>
        <div><div style={{fontFamily:"'Space Mono',monospace",fontSize:9,color:theme.textMuted,letterSpacing:".25em",textTransform:"uppercase",opacity:.5,marginTop:6}}>/ WORK</div></div>
        <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
          {["All","UI/UX","Web App","Research"].map(f=><button key={f} onClick={()=>setFilter(f)} style={{padding:"5px 12px",fontSize:10,fontWeight:700,cursor:"pointer",fontFamily:"'Space Mono',monospace",letterSpacing:".08em",textTransform:"uppercase",border:`1px solid ${filter===f?theme.accent:theme.borderMid}`,borderRadius:0,background:filter===f?theme.accent:"transparent",color:filter===f?theme.bg:theme.textMuted,transition:"all .15s"}}>{f}</button>)}
        </div>
      </div>
      {filtered.map((p,i)=>{
        const [h,setH]=useState(false);
        return <div key={p.id} onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)} onClick={()=>setSel(p)} style={{display:"grid",gridTemplateColumns:"200px 1fr auto",gap:60,padding:"28px 60px",borderTop:`1px solid ${theme.border}`,cursor:"pointer",background:h?theme.surfaceAlt:"transparent",transition:"background .15s"}}>
          <div style={{fontFamily:"'Space Mono',monospace",fontSize:9,color:theme.textMuted,opacity:.4,paddingTop:6}}>{String(i+1).padStart(2,"0")}</div>
          <div>
            <h3 style={{fontFamily:"'Syne',sans-serif",fontSize:20,fontWeight:700,color:theme.text,opacity:.9,textTransform:"uppercase",letterSpacing:".02em",marginBottom:4}}>{p.title}</h3>
            <p style={{fontSize:12,color:theme.textMuted,opacity:.7}}>{p.desc}</p>
          </div>
          <div style={{display:"flex",gap:5,alignItems:"center",flexWrap:"wrap"}}>
            {p.tags.map(t=><span key={t} style={{fontSize:9,fontWeight:700,color:theme.textMuted,border:`1px solid ${theme.border}`,padding:"2px 7px",letterSpacing:".08em",textTransform:"uppercase"}}>{t}</span>)}
            <span style={{fontSize:12,color:theme.textMuted,opacity:h?.7:.25,transition:"opacity .15s",marginLeft:10}}>→</span>
          </div>
        </div>;
      })}
      {devMode&&<DevBadge id="projects" devMode={devMode} theme={theme}/>}
    </section>

    {/* SERVICES — table layout */}
    <section ref={servicesRef} id="services" style={{padding:"80px 60px",background:theme.bgAlt,borderBottom:`2px solid ${theme.borderMid}`,position:"relative"}}>
      <div style={{display:"grid",gridTemplateColumns:"200px 1fr",gap:60}}>
        <div><div style={{fontFamily:"'Space Mono',monospace",fontSize:9,color:theme.textMuted,letterSpacing:".25em",textTransform:"uppercase",opacity:.5,marginTop:6}}>/ SERVICES</div></div>
        <div style={{border:`1px solid ${theme.borderMid}`}}>
          {SERVICES.map((s,i)=><div key={s.title} className="srv-card" style={{display:"grid",gridTemplateColumns:"60px 200px 1fr",borderBottom:i<SERVICES.length-1?`1px solid ${theme.border}`:"none",transition:"background .15s",cursor:"default"}}
            onMouseEnter={e=>e.currentTarget.style.background=theme.surface}
            onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
            <div style={{padding:"20px 0 20px 20px",borderRight:`1px solid ${theme.border}`,fontSize:24,opacity:.6}}>{s.icon}</div>
            <div style={{padding:"20px",borderRight:`1px solid ${theme.border}`}}><h3 style={{fontFamily:"'Syne',sans-serif",fontSize:14,fontWeight:700,color:theme.text,opacity:.85,textTransform:"uppercase",letterSpacing:".04em"}}>{s.title}</h3></div>
            <div style={{padding:"20px"}}><p style={{fontSize:12,color:theme.textMuted,lineHeight:1.75,opacity:.8}}>{s.desc}</p></div>
          </div>)}
        </div>
      </div>
      {devMode&&<DevBadge id="services" devMode={devMode} theme={theme}/>}
    </section>

    {/* TIMELINE */}
    <section ref={timelineRef} id="experience" style={{padding:"80px 60px",borderBottom:`2px solid ${theme.borderMid}`,position:"relative"}}>
      <div style={{display:"grid",gridTemplateColumns:"200px 1fr",gap:60}}>
        <div><div style={{fontFamily:"'Space Mono',monospace",fontSize:9,color:theme.textMuted,letterSpacing:".25em",textTransform:"uppercase",opacity:.5,marginTop:6}}>/ EXPERIENCE</div></div>
        <div>
          {TIMELINE.map((t,i)=><div key={i} className="tl-item" style={{display:"grid",gridTemplateColumns:"100px 1fr",gap:30,borderTop:`1px solid ${theme.border}`,padding:"24px 0"}}>
            <div style={{fontFamily:"'Space Mono',monospace",fontSize:13,fontWeight:700,color:theme.textMuted,opacity:.7}}>{t.year}</div>
            <div>
              <div style={{fontFamily:"'Space Mono',monospace",fontSize:9,fontWeight:700,letterSpacing:".12em",textTransform:"uppercase",color:theme.accent,opacity:.7,marginBottom:8}}>{t.place}</div>
              <h3 style={{fontFamily:"'Syne',sans-serif",fontSize:18,fontWeight:700,marginBottom:8,color:theme.text,opacity:.88,textTransform:"uppercase",letterSpacing:".02em"}}>{t.title}</h3>
              <p style={{fontSize:13,color:theme.textMuted,lineHeight:1.82,opacity:.7}}>{t.desc}</p>
            </div>
          </div>)}
        </div>
      </div>
      {devMode&&<DevBadge id="experience" devMode={devMode} theme={theme}/>}
    </section>

    {/* TESTIMONIALS */}
    <section style={{padding:"80px 60px",background:theme.bgAlt,borderBottom:`2px solid ${theme.borderMid}`}}>
      <div style={{display:"grid",gridTemplateColumns:"200px 1fr",gap:60}}>
        <div><div style={{fontFamily:"'Space Mono',monospace",fontSize:9,color:theme.textMuted,letterSpacing:".25em",textTransform:"uppercase",opacity:.5,marginTop:6}}>/ WORDS</div></div>
        <div>
          <div style={{overflow:"hidden"}}><div style={{display:"flex",transform:`translateX(-${tIdx*100}%)`,transition:"transform .6s cubic-bezier(.16,1,.3,1)"}}>
            {TESTIMONIALS.map((t,i)=><div key={i} style={{minWidth:"100%"}}>
              <p style={{fontSize:18,lineHeight:1.75,color:theme.text,opacity:.8,marginBottom:20,borderLeft:`3px solid ${theme.accent}`,paddingLeft:20}}>"{t.text}"</p>
              <div style={{fontFamily:"'Space Mono',monospace",fontSize:11,color:theme.textMuted,opacity:.6}}>{t.name} — {t.role}</div>
            </div>)}
          </div></div>
          <div style={{display:"flex",gap:5,marginTop:20}}>{TESTIMONIALS.map((_,i)=><button key={i} onClick={()=>setTIdx(i)} style={{width:24,height:3,border:"none",cursor:"pointer",background:tIdx===i?theme.accent:theme.borderMid,transition:"background .2s"}}/>)}</div>
        </div>
      </div>
    </section>

    {/* CONTACT */}
    <section ref={contactRef} id="contact" style={{padding:"80px 60px",position:"relative"}}>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:80}}>
        <div>
          <div style={{fontFamily:"'Space Mono',monospace",fontSize:9,color:theme.textMuted,letterSpacing:".25em",textTransform:"uppercase",opacity:.5,marginBottom:30}}>/ CONTACT</div>
          <h2 style={{fontFamily:"'Syne',sans-serif",fontSize:"clamp(36px,5vw,80px)",fontWeight:800,lineHeight:.88,letterSpacing:"-.04em",marginBottom:30,color:theme.text,textTransform:"uppercase"}}>WORK<br/><span style={{color:theme.accent}}>WITH<br/>ME</span></h2>
        </div>
        <div>
          {sent?<div style={{padding:"30px 0"}}><div style={{fontSize:40,marginBottom:16}}>✅</div><h3 style={{fontFamily:"'Syne',sans-serif",fontSize:20,fontWeight:800,color:theme.text,textTransform:"uppercase"}}>SENT.</h3></div>:<>
            {[{l:"Name",k:"name",t:"text",p:"Your name"},{l:"Email",k:"email",t:"email",p:"hello@example.com"},{l:"Subject",k:"subject",t:"text",p:"Project Inquiry"}].map(f=><div key={f.k} style={{marginBottom:14}}>
              <label style={{display:"block",fontSize:9,fontWeight:700,letterSpacing:".17em",textTransform:"uppercase",color:theme.textMuted,marginBottom:5,fontFamily:"'Space Mono',monospace",opacity:.6}}>{f.l}</label>
              <input style={{width:"100%",padding:"12px 14px",background:"transparent",border:`1px solid ${theme.borderMid}`,borderRadius:0,color:theme.text,fontSize:14,fontFamily:"'DM Sans',sans-serif",outline:"none"}} type={f.t} placeholder={f.p} value={form[f.k]} onChange={e=>setForm(d=>({...d,[f.k]:e.target.value}))}/>
            </div>)}
            <div style={{marginBottom:20}}>
              <label style={{display:"block",fontSize:9,fontWeight:700,letterSpacing:".17em",textTransform:"uppercase",color:theme.textMuted,marginBottom:5,fontFamily:"'Space Mono',monospace",opacity:.6}}>Message</label>
              <textarea style={{width:"100%",padding:"12px 14px",background:"transparent",border:`1px solid ${theme.borderMid}`,borderRadius:0,color:theme.text,fontSize:14,fontFamily:"'DM Sans',sans-serif",outline:"none",resize:"vertical"}} rows={5} placeholder="Brief me." value={form.message} onChange={e=>setForm(d=>({...d,message:e.target.value}))}/>
            </div>
            <button className="bp" onClick={()=>setSent(true)} style={{width:"100%",display:"flex",justifyContent:"center",fontSize:11,padding:"14px",borderRadius:0,letterSpacing:".1em",textTransform:"uppercase"}}>SEND →</button>
          </>}
        </div>
      </div>
      {devMode&&<DevBadge id="contact" devMode={devMode} theme={theme}/>}
    </section>
  </>;
}
