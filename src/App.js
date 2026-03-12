import { useState, useEffect, useRef } from "react";
import { GSAPLoader } from "./hooks/useGSAP";
import { THEMES } from "./data/themes";
import { TESTIMONIALS } from "./data/content";
import { ParticleCanvas, CustomCursor, ScrollBar, Modal, ScrollProgress, ParallaxElement, ScrollReveal, ScrollIndicator } from "./components/Shared";
import { DevBadge, PerfMeter, AnimDebugBand, GridGuide } from "./components/DeveloperMode";
import { ForestLayout } from "./layouts/ForestLayout";
import { MidnightLayout } from "./layouts/MidnightLayout";
import { VoidLayout } from "./layouts/VoidLayout";
import { LightLayout } from "./layouts/LightLayout";

export default function App() {
  const [themeKey,setThemeKey]=useState("forest");
  const theme=THEMES[themeKey];
  const isForest=themeKey==="forest";
  const isMidnight=themeKey==="midnight";
  const isVoid=themeKey==="void";
  const isLight=themeKey==="light";
  const [devMode,setDevMode]=useState(false);
  const [showGrid,setShowGrid]=useState(false);
  const [loading,setLoading]=useState(true);
  const [loadPct,setLoadPct]=useState(0);
  const [tIdx,setTIdx]=useState(0);
  const [sel,setSel]=useState(null);
  const [sent,setSent]=useState(false);
  const [form,setForm]=useState({name:"",email:"",subject:"",message:""});
  const navRef=useRef(null);

  useEffect(()=>{let p=0;const iv=setInterval(()=>{p+=Math.random()*22;setLoadPct(Math.min(p,100));if(p>=100){clearInterval(iv);setTimeout(()=>setLoading(false),400);}},80);return()=>clearInterval(iv);},[]);
  useEffect(()=>{const t=setInterval(()=>setTIdx(i=>(i+1)%TESTIMONIALS.length),4500);return()=>clearInterval(t);},[]);
  const scrollTo=id=>document.getElementById(id)?.scrollIntoView({behavior:"smooth"});

  // NAV labels per layout
  const navLabels={forest:["About","Skills","Projects","Services","Experience","Contact"],midnight:["About","Skills","Projects","Services","Experience","Contact"],void:["About","Skills","Projects","Services","Experience","Contact"],light:["About","Skills","Projects","Services","Experience","Contact"]};

  const layoutProps={theme,devMode,showGrid,scrollTo,tIdx,setTIdx,sel,setSel,sent,setSent,form,setForm,themeKey};

  // Global CSS
  const css=`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Space+Mono:wght@400;700&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap');
    *{margin:0;padding:0;box-sizing:border-box;}
    html{scroll-behavior:smooth;}
    body{background:${theme.bg};color:${theme.text};font-family:'DM Sans',sans-serif;overflow-x:hidden;}
    ::-webkit-scrollbar{width:4px}::-webkit-scrollbar-track{background:${theme.bg}}::-webkit-scrollbar-thumb{background:${theme.textMuted};border-radius:99px;opacity:.45}
    @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
    @keyframes fadeIn{from{opacity:0}to{opacity:1}}
    @keyframes slideUp{from{opacity:0;transform:translateY(32px)}to{opacity:1;transform:translateY(0)}}
    @keyframes floatY{0%,100%{transform:translateY(0)}50%{transform:translateY(-14px)}}
    @keyframes floatYR{0%,100%{transform:translateY(0)}50%{transform:translateY(12px)}}
    @keyframes spinSlow{from{transform:rotate(0)}to{transform:rotate(360deg)}}
    @keyframes spinSlowR{from{transform:rotate(0)}to{transform:rotate(-360deg)}}
    @keyframes breathe{0%,100%{opacity:.5;transform:translate(-50%,-50%) scale(1)}50%{opacity:1;transform:translate(-50%,-50%) scale(1.06)}}
    @keyframes pulse{0%,100%{transform:scale(1);opacity:.45}50%{transform:scale(1.1);opacity:.75}}
    @keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}
    @keyframes scrollBounce{0%,20%,50%,80%,100%{transform:translateX(-50%) translateY(0)}40%{transform:translateX(-50%) translateY(-8px)}60%{transform:translateX(-50%) translateY(-4px)}}
    .nl{opacity:.5;transition:opacity .2s,color .2s;background:none;border:none;cursor:pointer;font-family:'Syne',sans-serif;color:${theme.text};font-size:11px;font-weight:700;letterSpacing:.1em;text-transform:uppercase;}
    .nl:hover{opacity:.9;color:${theme.accent};}
    .bp{display:inline-block;padding:12px 26px;background:${theme.accent};color:${theme.bg};border:none;border-radius:${theme.cardRadius||"8px"};font-weight:700;font-size:13px;cursor:pointer;letterSpacing:.05em;font-family:'Syne',sans-serif;transition:transform .2s,box-shadow .2s,opacity .2s;text-decoration:none;opacity:.88;}
    .bp:hover{transform:translateY(-2px);box-shadow:${theme.shadowMd};opacity:1;}
    .bg{display:inline-block;padding:12px 26px;background:transparent;color:${theme.text};border:1px solid ${theme.borderMid};border-radius:${theme.cardRadius||"8px"};font-weight:700;font-size:13px;cursor:pointer;letterSpacing:.05em;font-family:'Syne',sans-serif;transition:all .2s;text-decoration:none;opacity:.65;}
    .bg:hover{border-color:${theme.accent};color:${theme.accent};transform:translateY(-2px);opacity:1;}
    .sec-label{font-size:10px;letterSpacing:.25em;text-transform:uppercase;color:${theme.textMuted};font-family:"'Space Mono',monospace";opacity:.65;}
    input::placeholder,textarea::placeholder{color:${theme.textMuted};opacity:.5;}
    /* Dev mode outline */
    [data-dev-section]:hover{outline:1px dashed ${theme.devAccent};outline-offset:2px;}
    /* Theme transition */
    *{transition:background-color .35s,border-color .35s,color .15s;}
    button,input,textarea{transition:none!important;}
  `;

  if(loading) return (
    <div style={{position:"fixed",inset:0,background:theme.bg,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",zIndex:99999}}>
      <GSAPLoader/><style>{css}</style>
      <div style={{position:"relative",width:68,height:68,marginBottom:30}}>
        <div style={{position:"absolute",inset:0,borderRadius:"50%",border:`1px solid ${theme.border}`,animation:"spinSlow 8s linear infinite"}}/>
        <div style={{position:"absolute",inset:8,borderRadius:"50%",border:`1px solid ${theme.borderMid}`,borderTopColor:"transparent",animation:"spinSlow 3s linear infinite",opacity:.6}}/>
        <div style={{position:"absolute",inset:18,borderRadius:"50%",border:`1px solid ${theme.textMuted}`,borderTopColor:"transparent",animation:"spinSlow 1.5s linear infinite",opacity:.4}}/>
        <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:12,color:theme.textMuted,opacity:.7}}>MG</div>
      </div>
      <div style={{fontSize:9,letterSpacing:".28em",textTransform:"uppercase",color:theme.textMuted,marginBottom:18,fontFamily:"'Space Mono',monospace",opacity:.5}}>Loading</div>
      <div style={{width:130,height:1,background:theme.border,borderRadius:99,overflow:"hidden"}}><div style={{height:"100%",width:`${loadPct}%`,background:theme.textMuted,transition:"width .1s",opacity:.5}}/></div>
      <div style={{marginTop:9,fontSize:11,color:theme.textMuted,fontFamily:"'Space Mono',monospace",opacity:.4}}>{Math.round(loadPct)}%</div>
    </div>
  );

  
  return (
    <div style={{background:theme.bg,color:theme.text,minHeight:"100vh",overflowX:"hidden",position:"relative"}}>
      <GSAPLoader/><style>{css}</style>
      <CustomCursor theme={theme}/>
      <ScrollBar theme={theme}/>
      <ScrollProgress theme={theme}/>
      <ScrollIndicator theme={theme}/>
      <GridGuide showGrid={showGrid} theme={theme}/>

      {/* NAV */}
      <nav ref={navRef} style={{
        position:"fixed",top:0,left:0,right:0,zIndex:1000,
        padding:`0 ${isVoid?"60px":isMidnight?"80px":"40px"}`,
        height:isVoid?72:isMidnight?68:62,display:"flex",alignItems:"center",justifyContent:"space-between",
        background:isVoid?theme.bg:isMidnight?`linear-gradient(180deg, ${theme.bg} 0%, ${theme.bgAlt} 100%)`:isLight?`rgba(255,255,255,0.95)`:`${theme.bg}CC`,
        backdropFilter:isVoid?"none":isLight?"blur(20px)":"blur(14px)",
        borderBottom:isVoid?"none":isMidnight?`2px solid ${theme.accent}22`:isLight?`1px solid ${theme.border}`:`${isForest?"2px":"1px"} solid ${theme.border}`,
        boxShadow:isLight?"0 2px 20px rgba(0,0,0,0.08)":isVoid?"none":isMidnight?"0 4px 30px rgba(90,139,200,0.15)":"0 2px 20px rgba(0,0,0,0.3)",
        transition:"all .4s cubic-bezier(0.4, 0, 0.2, 1)",
        ...(isVoid && {clipPath:"polygon(0 0, 100% 0, 100% calc(100% - 4px), calc(100% - 4px) 100%, 0 100%)"}),
        ...(isForest && {borderLeft:`4px solid ${theme.accent}`}),
      }}>
        <div style={{
          fontFamily:isVoid?"'Space Mono',monospace":"'Syne',sans-serif", 
          fontWeight:isVoid?400:800, 
          fontSize:isVoid?12:isMidnight?18:17, 
          letterSpacing:isVoid?".2em":isMidnight?".01em":"-.02em",
          color:theme.text, 
          opacity:isVoid?.7:.9, 
          textTransform:isVoid?"uppercase":"none",
          ...(isForest && {textShadow:"0 1px 3px rgba(0,0,0,0.3)"})
        }}>
          {isVoid?"MG":isMidnight?"MICHAEL GAITHO":"M"}<span style={{color:theme.accent}}>{isVoid?"_":isMidnight?"":"."}</span>{isVoid?"":isMidnight?"":"Gaitho"}
        </div>
        <div style={{display:"flex",gap:isVoid?24:isMidnight?28:22,alignItems:"center"}}>
          {navLabels[themeKey].map(l=><button 
            key={l} 
            className="nl" 
            onClick={()=>scrollTo(l.toLowerCase())}
            style={{
              fontFamily:isVoid?"'Space Mono',monospace":"'Syne',sans-serif",
              fontSize:isVoid?9:isMidnight?11:10,
              fontWeight:isVoid?700:isMidnight?600:500,
              letterSpacing:isVoid?".15em":isMidnight?".08em":".02em",
              textTransform:isVoid?"uppercase":"none",
              padding:isVoid?"8px 12px":isMidnight?"6px 14px":"4px 8px",
              borderRadius:isVoid?"0":isMidnight?"2px":"4px",
              border:isVoid?`1px solid ${theme.border}`:isMidnight?`1px solid ${theme.border}33`:"none",
              background:isVoid?"transparent":isMidnight?"transparent":isLight?"rgba(58,122,82,0.1)":"transparent",
              color:theme.text,
              opacity:isVoid?.6:.8,
              transition:"all .2s ease",
              cursor:"pointer"
            }}
          >{isVoid?l.toUpperCase():isMidnight?l:l}</button>)}
        </div>
      </nav>

      {/* Theme Switcher */}
      <div style={{position:"fixed",right:14,top:"50%",transform:"translateY(-50%)",zIndex:1001,display:"flex",flexDirection:"column",gap:6}}>
        {Object.entries(THEMES).map(([k,t])=>(
          <button key={k} onClick={()=>{setThemeKey(k);setSent(false);}} title={`${t.name} — ${t.layout} layout`}
            style={{width:35,height:35,borderRadius:themeKey==="void"?"0":"50%",cursor:"pointer",fontSize:13,display:"flex",alignItems:"center",justifyContent:"center",border:`1px solid ${themeKey===k?theme.borderMid:theme.border}`,background:t.surface,opacity:themeKey===k?.9:.35,transition:"all .2s"}}
            onMouseEnter={e=>e.currentTarget.style.opacity=.9}
            onMouseLeave={e=>e.currentTarget.style.opacity=themeKey===k?.9:.35}>
            {t.icon}
          </button>
        ))}
        {/* Layout label */}
        <div style={{marginTop:4,fontSize:8,fontFamily:"'Space Mono',monospace",color:theme.textMuted,opacity:.45,textAlign:"center",letterSpacing:".06em",textTransform:"uppercase",lineHeight:1.4}}>
          {theme.layout}
        </div>
      </div>

      {/* Developer Mode toggle */}
      <div style={{position:"fixed",bottom:20,right:16,zIndex:9991,display:"flex",flexDirection:"column",gap:8,alignItems:"flex-end"}}>
        <button onClick={()=>setDevMode(v=>!v)} style={{
          display:"flex",alignItems:"center",gap:7,
          background:devMode?theme.devAccent:theme.surface,
          color:devMode?"#000":theme.textMuted,
          border:`1px solid ${devMode?theme.devAccent:theme.borderMid}`,
          borderRadius:themeKey==="void"?0:8,
          padding:"8px 14px",fontSize:10,fontWeight:700,
          fontFamily:"'Space Mono',monospace",cursor:"pointer",
          letterSpacing:".07em",transition:"all .2s",
          boxShadow:devMode?"0 4px 20px rgba(0,0,0,.5)":theme.shadow,
        }}>
          <span style={{fontSize:12}}>{devMode?"◉":"○"}</span>
          DEV MODE
        </button>
        {devMode&&<button onClick={()=>setShowGrid(v=>!v)} style={{
          display:"flex",alignItems:"center",gap:7,
          background:showGrid?`${theme.devAccent}22`:"transparent",
          color:theme.devAccent,
          border:`1px solid ${theme.devBorder}`,
          borderRadius:themeKey==="void"?0:6,
          padding:"6px 12px",fontSize:9,fontWeight:700,
          fontFamily:"'Space Mono',monospace",cursor:"pointer",
          letterSpacing:".07em",transition:"all .2s",
        }}>
          <span>⊞</span> GRID {showGrid?"ON":"OFF"}
        </button>}
      </div>

      {/* Dev Mode indicators */}
      {devMode&&<>
        <PerfMeter devMode={devMode} theme={theme}/>
        <AnimDebugBand devMode={devMode} theme={theme}/>
        {/* Dev mode banner */}
        <div style={{position:"fixed",top:62,left:0,right:0,zIndex:999,background:theme.devBg,borderBottom:`1px solid ${theme.devBorder}`,padding:"6px 20px",display:"flex",alignItems:"center",gap:12,fontFamily:"'Space Mono',monospace"}}>
          <span style={{fontSize:9,color:theme.devAccent,fontWeight:700,letterSpacing:".1em"}}>◉ DEV MODE ACTIVE</span>
          <span style={{fontSize:9,color:theme.textMuted,opacity:.6}}>Hover sections to inspect components · See code snippets · Check performance metrics</span>
          <span style={{marginLeft:"auto",fontSize:9,color:theme.textMuted,opacity:.5}}>Layout: <span style={{color:theme.devAccent}}>{theme.layout.toUpperCase()}</span></span>
        </div>
      </>}

      {/* Layout engine */}
      <div style={{paddingTop: devMode ? 94 : 62}}>
        {themeKey==="forest"   && <ForestLayout   {...layoutProps}/>}
        {themeKey==="midnight" && <MidnightLayout {...layoutProps}/>}
        {themeKey==="void"     && <VoidLayout     {...layoutProps}/>}
        {themeKey==="light"    && <LightLayout    {...layoutProps}/>}
      </div>

      {sel&&<Modal project={sel} theme={theme} onClose={()=>setSel(null)}/>}

      {/* FOOTER */}
      <footer style={{borderTop:`${isVoid?"2px":"1px"} solid ${theme.border}`,padding:`${isVoid?"28px 60px":"28px 40px"}`,background:theme.bg}}>
        <div style={{maxWidth:isVoid||isMidnight?1200:1010,margin:"0 auto",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:16}}>
          <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:isVoid?13:15,color:theme.text,opacity:.7,letterSpacing:isVoid?".1em":"-.01em",textTransform:isVoid?"uppercase":"none"}}>
            {isVoid?"MG_PORTFOLIO":"M"}<span style={{color:theme.accent}}>{isVoid?"":"."}</span>{isVoid?"":"Gaitho"}
          </div>
          <div style={{display:"flex",gap:18}}>
            {["GitHub","LinkedIn","Twitter","Dribbble"].map(s=><a key={s} href="#" style={{fontSize:11,color:theme.textMuted,textDecoration:"none",fontWeight:isVoid?700:500,opacity:.45,transition:"opacity .2s,color .2s",letterSpacing:isVoid?".08em":"0",textTransform:isVoid?"uppercase":"none"}} onMouseEnter={e=>{e.target.style.opacity=.85;e.target.style.color=theme.text;}} onMouseLeave={e=>{e.target.style.opacity=.45;e.target.style.color=theme.textMuted;}}>{s}</a>)}
          </div>
          <div style={{fontSize:10,color:theme.textMuted,opacity:.35,fontFamily:isVoid?"'Space Mono',monospace":"'DM Sans',sans-serif"}}>© 2025 Michael Gaitho · Nakuru, KE</div>
        </div>
      </footer>
    </div>
  );
}
