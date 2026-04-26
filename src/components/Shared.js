import { useState, useEffect, useRef } from "react";

// ── Shared small components ───────────────────────────────────────────────────
export function ParticleCanvas({ theme }) {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current; if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let W = canvas.width = canvas.offsetWidth, H = canvas.height = canvas.offsetHeight;
    window.addEventListener("resize", () => { W = canvas.width = canvas.offsetWidth; H = canvas.height = canvas.offsetHeight; });
    const rgb = theme.particleRgb;
    const pts = Array.from({length:45},()=>({x:Math.random()*W,y:Math.random()*H,r:Math.random()*.9+.2,vx:(Math.random()-.5)*.16,vy:(Math.random()-.5)*.16,a:Math.random()*.1+.03}));
    let raf;
    const draw = () => {
      ctx.clearRect(0,0,W,H);
      pts.forEach(p=>{p.x=(p.x+p.vx+W)%W;p.y=(p.y+p.vy+H)%H;ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fillStyle=`rgba(${rgb},${p.a})`;ctx.fill();});
      for(let i=0;i<pts.length;i++)for(let j=i+1;j<pts.length;j++){const dx=pts[i].x-pts[j].x,dy=pts[i].y-pts[j].y,d=Math.sqrt(dx*dx+dy*dy);if(d<95){ctx.beginPath();ctx.moveTo(pts[i].x,pts[i].y);ctx.lineTo(pts[j].x,pts[j].y);ctx.strokeStyle=`rgba(${rgb},${.035*(1-d/95)})`;ctx.lineWidth=.35;ctx.stroke();}}
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, [theme]);
  return <canvas ref={ref} style={{position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none",opacity:.75}}/>;
}

export function CustomCursor({ theme }) {
  const dot=useRef(null),ring=useRef(null),mx=useRef(0),my=useRef(0),rx=useRef(0),ry=useRef(0);
  useEffect(()=>{
    const mv=e=>{mx.current=e.clientX;my.current=e.clientY;};
    window.addEventListener("mousemove",mv);
    let raf;const tick=()=>{rx.current+=(mx.current-rx.current)*.11;ry.current+=(my.current-ry.current)*.11;if(dot.current)dot.current.style.transform=`translate(${mx.current-4}px,${my.current-4}px)`;if(ring.current)ring.current.style.transform=`translate(${rx.current-13}px,${ry.current-13}px)`;raf=requestAnimationFrame(tick);};tick();
    return()=>{window.removeEventListener("mousemove",mv);cancelAnimationFrame(raf);};
  },[]);
  return <><div ref={dot} style={{position:"fixed",top:0,left:0,width:8,height:8,borderRadius:"50%",background:theme.textMuted,pointerEvents:"none",zIndex:9999,opacity:.65}}/><div ref={ring} style={{position:"fixed",top:0,left:0,width:26,height:26,borderRadius:"50%",border:`1px solid ${theme.textMuted}`,pointerEvents:"none",zIndex:9998,opacity:.28}}/></>;
}

export function ScrollBar({ theme }) {
  const [p,setP]=useState(0);
  useEffect(()=>{const fn=()=>{const e=document.documentElement;setP(e.scrollTop/(e.scrollHeight-e.clientHeight)*100);};window.addEventListener("scroll",fn);return()=>window.removeEventListener("scroll",fn);},[]);
  return <div style={{position:"fixed",top:0,left:0,height:2,width:`${p}%`,background:`linear-gradient(90deg,${theme.textMuted},${theme.accent})`,zIndex:9997,transition:"width .08s",opacity:.55}}/>;
}

// ── Enhanced Scroll Components ───────────────────────────────────────────────────
export function ScrollProgress({ theme }) {
  const [scrollY, setScrollY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrolled / maxScroll) * 100;
      
      setScrollY(scrolled);
      setScrollProgress(progress);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <div style={{
      position: 'fixed',
      bottom: 20,
      left: 20,
      zIndex: 1000,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 8
    }}>
      <div style={{
        width: 40,
        height: 40,
        borderRadius: '50%',
        border: `2px solid ${theme.border}`,
        position: 'relative',
        background: theme.surface
      }}>
        <div style={{
          position: 'absolute',
          inset: 2,
          borderRadius: '50%',
          background: `conic-gradient(${theme.accent} ${scrollProgress * 3.6}deg, ${theme.bg} 0deg)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{
            width: 28,
            height: 28,
            borderRadius: '50%',
            background: theme.surface,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 8,
            fontWeight: 700,
            color: theme.textMuted,
            fontFamily: '"Space Mono", monospace'
          }}>
            {Math.round(scrollProgress)}%
          </div>
        </div>
      </div>
    </div>
  );
}

export function ParallaxElement({ children, speed = 0.5, theme }) {
  const ref = useRef(null);
  const [offset, setOffset] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const scrolled = window.scrollY;
        const rate = scrolled * -speed;
        setOffset(rate);
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);
  
  return (
    <div ref={ref} style={{
      transform: `translateY(${offset}px)`,
      willChange: 'transform'
    }}>
      {children}
    </div>
  );
}

export function ScrollReveal({ children, direction = 'up', delay = 0, theme }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), delay * 1000);
        }
      },
      { threshold: 0.1 }
    );
    
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);
  
  const getTransform = () => {
    if (visible) return 'translate(0, 0)';
    switch (direction) {
      case 'up': return 'translate(0, 60px)';
      case 'down': return 'translate(0, -60px)';
      case 'left': return 'translate(60px, 0)';
      case 'right': return 'translate(-60px, 0)';
      default: return 'translate(0, 60px)';
    }
  };
  
  return (
    <div ref={ref} style={{
      transform: getTransform(),
      opacity: visible ? 1 : 0,
      transition: `transform 0.8s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1)`,
      transitionDelay: `${delay}s`
    }}>
      {children}
    </div>
  );
}

export function ScrollIndicator({ theme }) {
  const [visible, setVisible] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      setScrollY(scrolled);
      setVisible(scrolled < 100);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <div style={{
      position: 'fixed',
      bottom: 30,
      left: '50%',
      transform: `translateX(-50%) ${visible ? 'translateY(0)' : 'translateY(20px)'}`,
      opacity: visible ? 1 : 0,
      transition: 'all 0.3s ease',
      zIndex: 100,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 8
    }}>
      <div style={{
        width: 24,
        height: 40,
        border: `2px solid ${theme.textMuted}`,
        borderRadius: 12,
        position: 'relative',
        opacity: 0.6
      }}>
        <div style={{
          position: 'absolute',
          top: 8,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 4,
          height: 8,
          background: theme.textMuted,
          borderRadius: 2,
          animation: 'scrollBounce 2s infinite'
        }} />
      </div>
      <span style={{
        fontSize: 10,
        color: theme.textMuted,
        fontFamily: '"Space Mono", monospace',
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        opacity: 0.5
      }}>
        Scroll
      </span>
    </div>
  );
}

export function Typewriter({ words, theme }) {
  const [idx,setIdx]=useState(0);const [txt,setTxt]=useState("");const [del,setDel]=useState(false);
  useEffect(()=>{const w=words[idx%words.length];const t=setTimeout(()=>{if(!del){setTxt(w.slice(0,txt.length+1));if(txt.length+1===w.length)setTimeout(()=>setDel(true),1400);}else{setTxt(w.slice(0,txt.length-1));if(txt.length===0){setDel(false);setIdx(i=>i+1);}}},del?50:105);return()=>clearTimeout(t);},[txt,del,idx,words]);
  return <span style={{color:theme.text,opacity:.8}}>{txt}<span style={{display:"inline-block",width:2,height:"1em",background:theme.textMuted,marginLeft:3,verticalAlign:"middle",animation:"blink 1.1s step-end infinite",opacity:.6}}/></span>;
}

export function Modal({ project, theme, onClose }) {
  useEffect(()=>{const fn=e=>e.key==="Escape"&&onClose();window.addEventListener("keydown",fn);return()=>window.removeEventListener("keydown",fn);},[onClose]);
  if(!project) return null;
  const cr = theme.cardRadius || "14px";
  return <div onClick={onClose} style={{position:"fixed",inset:0,background:"rgba(0,0,0,.78)",zIndex:9000,display:"flex",alignItems:"center",justifyContent:"center",padding:20,backdropFilter:"blur(8px)",animation:"fadeIn .2s ease"}}>
    <div onClick={e=>e.stopPropagation()} style={{background:theme.surface,border:`1px solid ${theme.borderMid}`,borderRadius:cr,width:"100%",maxWidth:510,maxHeight:"88vh",overflowY:"auto",animation:"slideUp .35s cubic-bezier(.16,1,.3,1)",position:"relative",boxShadow:theme.shadowMd}}>
      <div style={{height:280,background:project.image ? `url(${project.image}) center/cover no-repeat` : project.cardBg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:66,borderRadius:`${cr} ${cr} 0 0`,position:"relative"}}>
        {!project.image && project.emoji}
        <div style={{position:"absolute",bottom:0,left:0,right:0,height:80,background:`linear-gradient(to top,${theme.surface},transparent)`}} />
      </div>
      <div style={{padding:28}}>
        <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:12}}>
          {project.tags.map(tag => <span key={tag} style={{fontSize:10,fontWeight:600,letterSpacing:".1em",textTransform:"uppercase",color:theme.accent,border:`1px solid ${theme.border}`,borderRadius:4,padding:"3px 8px",opacity:.9}}>{tag}</span>)}
        </div>
        <p style={{color:theme.textMuted,lineHeight:1.85,marginBottom:20,fontSize:13}}>{project.longDesc}</p>
        <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:22}}>{project.stack.map(s=><span key={s} style={{background:theme.bgAlt,color:theme.text,border:`1px solid ${theme.border}`,borderRadius:6,padding:"4px 10px",fontSize:12,opacity:.85}}>{s}</span>)}</div>
        <div style={{display:"flex",gap:10}}>
          {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" style={{flex:1,textAlign:"center",padding:"12px",background:theme.accent,color:theme.bg,borderRadius:8,fontWeight:700,fontSize:13,textDecoration:"none",opacity:.9}}>Live Demo ↗</a>}
          <a href="#" onClick={onClose} style={{flex:1,textAlign:"center",padding:"12px",background:"transparent",color:theme.text,border:`1px solid ${theme.borderMid}`,borderRadius:8,fontWeight:700,fontSize:13,textDecoration:"none"}}>Close →</a>
        </div>
      </div>
      <button onClick={onClose} style={{position:"absolute",top:12,right:12,background:"rgba(0,0,0,.4)",border:"none",color:"#fff",width:30,height:30,borderRadius:"50%",cursor:"pointer",fontSize:14,display:"flex",alignItems:"center",justifyContent:"center",opacity:.65}}>✕</button>
    </div>
  </div>;
}

export function SkillBar({ label, pct, theme, delay=0 }) {
  const ref=useRef(null);const [f,setF]=useState(false);
  useEffect(()=>{const obs=new IntersectionObserver(([e])=>{if(e.isIntersecting)setTimeout(()=>setF(true),delay*1000)},{threshold:.5});if(ref.current)obs.observe(ref.current);return()=>obs.disconnect();},[delay]);
  return <div ref={ref} style={{marginBottom:14}}>
    <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}>
      <span style={{fontSize:13,fontWeight:500,color:theme.text,opacity:.8}}>{label}</span>
      <span style={{fontSize:11,color:theme.textMuted,fontFamily:"'Space Mono',monospace",opacity:.7}}>{pct}%</span>
    </div>
    <div style={{height:2,background:theme.animFg,borderRadius:99,overflow:"hidden"}}>
      <div style={{height:"100%",width:f?`${pct}%`:"0%",background:`linear-gradient(90deg,${theme.textMuted},${theme.accent})`,borderRadius:99,transition:"width 1.5s cubic-bezier(.4,0,.2,1)",opacity:.75}}/>
    </div>
  </div>;
}
