import { useState, useEffect } from "react";
import { SECTION_META } from "../data/sectionMeta";

// ── Developer Mode Components ─────────────────────────────────────────────────
export function DevBadge({ id, devMode, theme }) {
  const [h,setH]=useState(false);const [showCode,setShowCode]=useState(false);
  const meta = SECTION_META[id];
  if(!devMode||!meta) return null;
  const da=theme.devAccent, db=theme.devBg, dbr=theme.devBorder;
  return <div onMouseEnter={()=>setH(true)} onMouseLeave={()=>{setH(false);setShowCode(false);}} style={{position:"absolute",top:8,right:8,zIndex:900,userSelect:"none"}}>
    <div style={{background:da,color:"#000",fontSize:9,fontWeight:800,fontFamily:"'Space Mono',monospace",padding:"3px 9px",borderRadius:4,cursor:"pointer",letterSpacing:".06em"}} onClick={()=>setShowCode(v=>!v)}>
      ⬡ &lt;{meta.component}&gt;
    </div>
    {(h||showCode)&&<div style={{position:"absolute",top:22,right:0,background:db,border:`1px solid ${dbr}`,borderRadius:8,padding:"14px 16px",minWidth:270,maxWidth:340,backdropFilter:"blur(20px)",boxShadow:"0 8px 40px rgba(0,0,0,.7)",zIndex:901}}>
      <div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:9}}>
        {meta.stack.map(s=><span key={s} style={{fontSize:9,fontWeight:700,fontFamily:"'Space Mono',monospace",color:da,border:`1px solid ${dbr}`,borderRadius:3,padding:"2px 6px"}}>{s}</span>)}
      </div>
      <p style={{fontSize:11,color:theme.textMuted,lineHeight:1.7,marginBottom:9}}>{meta.description}</p>
      <div style={{marginBottom:9}}>
        <div style={{fontSize:9,letterSpacing:".1em",textTransform:"uppercase",color:da,opacity:.7,marginBottom:4,fontFamily:"'Space Mono',monospace"}}>ANIMATIONS</div>
        {meta.animations.map(a=><div key={a} style={{fontSize:10,color:theme.textMuted,display:"flex",gap:5,marginBottom:2}}><span style={{color:da,opacity:.7}}>▸</span>{a}</div>)}
      </div>
      <button onClick={e=>{e.stopPropagation();setShowCode(v=>!v);}} style={{background:showCode?da:"transparent",color:showCode?"#000":da,border:`1px solid ${dbr}`,borderRadius:4,padding:"4px 10px",fontSize:9,fontWeight:700,fontFamily:"'Space Mono',monospace",cursor:"pointer",letterSpacing:".06em"}}>
        {showCode?"✕ Hide":"{ } Code"}
      </button>
      {showCode&&<div style={{marginTop:9,background:"rgba(0,0,0,.55)",border:`1px solid ${dbr}`,borderRadius:5,padding:"10px 12px",overflow:"auto",maxHeight:200}}>
        <pre style={{fontSize:9,color:da,fontFamily:"'Space Mono',monospace",lineHeight:1.65,margin:0,whiteSpace:"pre-wrap",wordBreak:"break-word"}}>{meta.code}</pre>
      </div>}
    </div>}
  </div>;
}

export function PerfMeter({ devMode, theme }) {
  const [fps,setFps]=useState(60);const [ft,setFt]=useState(16);const [expanded,setExpanded]=useState(false);
  const [loadTime,setLoadTime]=useState(null);const [mem,setMem]=useState(null);
  useEffect(()=>{
    let frames=0,last=performance.now(),raf;
    const tick=now=>{frames++;if(now-last>=500){setFps(Math.min(Math.round(frames/((now-last)/1000)),120));setFt(Math.round((now-last)/frames));frames=0;last=now;}raf=requestAnimationFrame(tick);};
    raf=requestAnimationFrame(tick);return()=>cancelAnimationFrame(raf);
  },[]);
  useEffect(()=>{const nav=performance.getEntriesByType("navigation")[0];setLoadTime(nav?Math.round(nav.loadEventEnd-nav.startTime):Math.round(performance.now()));},[]);
  useEffect(()=>{if(performance.memory){const u=()=>setMem(Math.round(performance.memory.usedJSHeapSize/1048576));u();const iv=setInterval(u,2000);return()=>clearInterval(iv);}},[]);
  if(!devMode) return null;
  const da=theme.devAccent,db=theme.devBg,dbr=theme.devBorder;
  const fc=fps>=55?"#00FF88":fps>=30?"#FFCC00":"#FF4444";
  return <div style={{position:"fixed",bottom:20,left:20,zIndex:9990,background:db,border:`1px solid ${dbr}`,borderRadius:10,overflow:"hidden",boxShadow:"0 8px 40px rgba(0,0,0,.7)",backdropFilter:"blur(20px)",fontFamily:"'Space Mono',monospace",minWidth:140}}>
    <div onClick={()=>setExpanded(v=>!v)} style={{display:"flex",alignItems:"center",gap:8,padding:"8px 12px",cursor:"pointer",borderBottom:expanded?`1px solid ${dbr}`:"none"}}>
      <span style={{fontSize:8,color:fc,animation:"pulse 1s ease-in-out infinite"}}>●</span>
      <span style={{fontSize:10,color:da,fontWeight:700}}>{fps} FPS</span>
      <span style={{fontSize:9,color:theme.textMuted,marginLeft:"auto",opacity:.5}}>{expanded?"▲":"▼"}</span>
    </div>
    {expanded&&<div style={{padding:"10px 12px"}}>
      {[{l:"FPS",v:`${fps}/120`,bar:(fps/120)*100,c:fc},{l:"Frame",v:`${ft}ms`,bar:Math.min((ft/33)*100,100),c:ft<=18?"#00FF88":ft<=33?"#FFCC00":"#FF4444"}].map(r=><div key={r.l} style={{marginBottom:9}}>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}><span style={{fontSize:9,color:theme.textMuted}}>{r.l}</span><span style={{fontSize:9,color:r.c}}>{r.v}</span></div>
        <div style={{height:2,background:"rgba(255,255,255,.08)",borderRadius:99}}><div style={{height:"100%",width:`${r.bar}%`,background:r.c,borderRadius:99,transition:"width .4s"}}/></div>
      </div>)}
      <div style={{borderTop:`1px solid ${dbr}`,paddingTop:8,display:"flex",flexDirection:"column",gap:4}}>
        <div style={{display:"flex",justifyContent:"space-between"}}><span style={{fontSize:9,color:theme.textMuted}}>Load</span><span style={{fontSize:9,color:da}}>{loadTime?`${loadTime}ms`:"—"}</span></div>
        {mem&&<div style={{display:"flex",justifyContent:"space-between"}}><span style={{fontSize:9,color:theme.textMuted}}>JS Heap</span><span style={{fontSize:9,color:da}}>{mem}MB</span></div>}
      </div>
    </div>}
  </div>;
}

export function AnimDebugBand({ devMode, theme }) {
  const [visible,setVisible]=useState(true);
  if(!devMode) return null;
  const da=theme.devAccent,db=theme.devBg,dbr=theme.devBorder;
  const anims=[{n:"Hero TL",t:"timeline",s:"✓ fired"},{n:"Title Parallax",t:"scrollTrigger",s:"scrub:1.8"},{n:"About Slide",t:"scrollTrigger",s:"top 78%"},{n:"Services Stagger",t:"scrollTrigger",s:"top 82%"},{n:"Timeline Draw",t:"scrollTrigger",s:"top 82%"},{n:"Contact Reveal",t:"scrollTrigger",s:"top 84%"},{n:"H-Scroll Pin",t:"pin",s:"active"},{n:"Particles",t:"rAF",s:"45 nodes"}];
  const colors={timeline:"#F0A500",scrollTrigger:da,pin:"#FF6B6B",rAF:"#80FFB4",interval:"#C084FF"};
  return <div style={{position:"fixed",bottom:20,right:76,zIndex:9990,background:db,border:`1px solid ${dbr}`,borderRadius:10,overflow:"hidden",backdropFilter:"blur(20px)",boxShadow:"0 8px 40px rgba(0,0,0,.7)",fontFamily:"'Space Mono',monospace",maxWidth:260}}>
    <div onClick={()=>setVisible(v=>!v)} style={{display:"flex",alignItems:"center",gap:7,padding:"8px 12px",cursor:"pointer",borderBottom:visible?`1px solid ${dbr}`:"none"}}>
      <span style={{fontSize:9,color:da}}>◈</span>
      <span style={{fontSize:10,color:da,fontWeight:700}}>GSAP DEBUG</span>
      <span style={{fontSize:9,color:theme.textMuted,marginLeft:"auto",opacity:.5}}>{visible?"▲":"▼"}</span>
    </div>
    {visible&&<div style={{padding:"8px 12px",display:"flex",flexDirection:"column",gap:5}}>
      {anims.map(a=><div key={a.n} style={{display:"flex",alignItems:"center",gap:8}}>
        <span style={{width:7,height:7,borderRadius:theme.layout==="brutalist"?"0":"50%",background:colors[a.t]||da,flexShrink:0,opacity:.85}}/>
        <span style={{fontSize:9,color:theme.textMuted,flex:1}}>{a.n}</span>
        <span style={{fontSize:8,color:colors[a.t]||da,opacity:.7,fontFamily:"'Space Mono',monospace"}}>{a.s}</span>
      </div>)}
      <div style={{borderTop:`1px solid ${dbr}`,marginTop:4,paddingTop:6,display:"flex",gap:10,flexWrap:"wrap"}}>
        {Object.entries(colors).map(([k,c])=><div key={k} style={{display:"flex",alignItems:"center",gap:4}}><span style={{width:5,height:5,borderRadius:2,background:c,display:"inline-block"}}/><span style={{fontSize:8,color:theme.textMuted,opacity:.7}}>{k}</span></div>)}
      </div>
    </div>}
  </div>;
}

export function GridGuide({ showGrid, theme }) {
  if(!showGrid) return null;
  return <div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:8990,backgroundImage:`linear-gradient(rgba(255,100,100,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(255,100,100,0.06) 1px,transparent 1px)`,backgroundSize:"40px 40px"}}>
    {[...Array(12)].map((_,i)=><div key={i} style={{position:"absolute",top:0,bottom:0,left:`calc(${(i/12)*100}% + 40px)`,width:`calc(${(1/12)*100}% - 80px/12)`,background:"rgba(255,80,80,0.035)",borderLeft:`1px solid rgba(255,80,80,0.09)`}}/>)}
  </div>;
}
