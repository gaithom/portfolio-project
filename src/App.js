import { useState, useEffect, useRef } from "react";
import { GSAPLoader } from "./hooks/useGSAP";
import { THEMES } from "./data/themes";
import { ParticleCanvas, CustomCursor, ScrollBar, Modal, ScrollProgress, ParallaxElement, ScrollReveal, ScrollIndicator } from "./components/Shared";
import { DevBadge, PerfMeter, AnimDebugBand, GridGuide } from "./components/DeveloperMode";
import { ForestLayout } from "./layouts/ForestLayout";
import { MidnightLayout } from "./layouts/MidnightLayout";
import { VoidLayout } from "./layouts/VoidLayout";
import { LightLayout } from "./layouts/LightLayout";

export default function App() {
  const [themeKey,setThemeKey]=useState("light");
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
  const [mobileMenuOpen,setMobileMenuOpen]=useState(false);
  const navRef=useRef(null);

  useEffect(()=>{let p=0;const iv=setInterval(()=>{p+=Math.random()*22;setLoadPct(Math.min(p,100));if(p>=100){clearInterval(iv);setTimeout(()=>setLoading(false),400);}},80);return()=>clearInterval(iv);},[]);
  const scrollTo=id=>document.getElementById(id)?.scrollIntoView({behavior:"smooth"});

  // NAV labels per layout
  const navLabels={forest:["About","Skills","Projects","Services","Experience","Contact"],midnight:["About","Skills","Projects","Services","Experience","Contact"],void:["About","Skills","Projects","Services","Experience","Contact"],light:["About","Skills","Projects","Services","Experience","Contact"]};

  const layoutProps={theme,devMode,showGrid,scrollTo,tIdx,setTIdx,sel,setSel,sent,setSent,form,setForm,themeKey};

  // Global CSS
  const css=`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Space+Mono:wght@400;700&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,400&family=Playfair+Display:wght@400;600;700;800;900&family=Merriweather:wght@300;400;700;900&family=Space+Grotesk:wght@300;400;500;600;700&family=Poppins:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600;700;800&family=Lora:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&family=Fira+Code:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600;700&family=SF+Mono:wght@400;500;600;700&display=swap');
    *{margin:0;padding:0;box-sizing:border-box;}
    html{scroll-behavior:smooth;}
    body{background:${theme.bg};color:${theme.text};font-family:${theme.bodyFont};overflow-x:hidden;}
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
    .nl{opacity:.5;transition:opacity .2s,color .2s;background:none;border:none;cursor:pointer;font-family:${theme.bodyFont};color:${theme.text};font-size:11px;font-weight:700;letterSpacing:.1em;text-transform:uppercase;}
    .nl:hover{opacity:.9;color:${theme.accent};}
    .bp{display:inline-block;padding:12px 26px;background:${theme.accent};color:${theme.bg};border:none;border-radius:${theme.cardRadius||"8px"};font-weight:700;font-size:13px;cursor:pointer;letterSpacing:.05em;font-family:${theme.bodyFont};transition:transform .2s,box-shadow .2s,opacity .2s;text-decoration:none;opacity:.88;}
    .bp:hover{transform:translateY(-2px);box-shadow:${theme.shadowMd};opacity:1;}
    .bg{display:inline-block;padding:12px 26px;background:transparent;color:${theme.text};border:1px solid ${theme.borderMid};border-radius:${theme.cardRadius||"8px"};font-weight:700;font-size:13px;cursor:pointer;letterSpacing:.05em;font-family:${theme.bodyFont};transition:all .2s;text-decoration:none;opacity:.65;}
    .bg:hover{border-color:${theme.accent};color:${theme.accent};transform:translateY(-2px);opacity:1;}
    .sec-label{font-size:10px;letterSpacing:.25em;text-transform:uppercase;color:${theme.textMuted};font-family:${theme.monoFont};opacity:.65;}
    input::placeholder,textarea::placeholder{color:${theme.textMuted};opacity:.5;}
    /* Dev mode outline */
    [data-dev-section]:hover{outline:1px dashed ${theme.devAccent};outline-offset:2px;}
    /* Global responsive styles */
    @media (max-width: 768px) {
      body { font-size: 14px; }
      .bp, .bg { padding: 10px 18px; font-size: 12px; }
      /* Navigation responsive */
      nav { padding: 0 20px !important; }
      .nav-logo { font-size: 16px !important; }
      /* Footer responsive */
      footer { padding: 20px 30px !important; }
      footer > div { flex-direction: column !important; text-align: center !important; gap: 12px !important; }
      footer .social-links { gap: 14px !important; flex-wrap: wrap !important; justify-content: center !important; }
      footer .social-links a { font-size: 10px !important; }
      footer .copyright { font-size: 9px !important; }
      /* Theme switcher responsive */
      .theme-switcher { right: 8px !important; gap: 4px !important; }
      .theme-switcher button { width: 30px !important; height: 30px !important; font-size: 11px !important; }
      .theme-switcher .layout-label { font-size: 7px !important; }
      /* Dev mode responsive */
      .dev-mode-toggle { bottom: 16px !important; right: 12px !important; gap: 6px !important; }
      .dev-mode-toggle button { padding: 6px 10px !important; font-size: 9px !important; gap: 5px !important; }
      .dev-mode-toggle button span { font-size: 10px !important; }
      .dev-mode-toggle .grid-btn { padding: 4px 8px !important; font-size: 8px !important; gap: 4px !important; }
    }
    
    @media (max-width: 480px) {
      body { font-size: 13px; }
      .bp, .bg { padding: 8px 14px; font-size: 11px; }
      /* Navigation responsive */
      nav { padding: 0 16px !important; }
      .nav-logo { font-size: 15px !important; }
      /* Footer responsive */
      footer { padding: 16px 20px !important; }
      footer .social-links { gap: 12px !important; }
      footer .copyright { font-size: 9px !important; }
    }
    
    /* LightLayout responsive styles */
    @media (max-width: 768px) {
      .hero-section { padding: 100px 20px 60px !important; min-height: 85vh !important; }
      .hero-content { max-width: 100% !important; }
      .hero-title { font-size: clamp(28px, 8vw, 48px) !important; }
      .hero-subtitle { font-size: 14px !important; max-width: 100% !important; }
      .hero-description { font-size: 12px !important; max-width: 100% !important; }
      .hero-cta { gap: 8px !important; }
      .hero-stats { gap: 32px !important; margin-top: 40px !important; }
      .hero-stats .stat-number { font-size: 24px !important; }
      .hero-stats .stat-label { text-align: center !important; }
      
      .about-section { padding: 60px 30px !important; }
      .about-section .section-title { font-size: clamp(20px, 5vw, 32px) !important; }
      .about-cards { grid-template-columns: 1fr !important; gap: 16px !important; }
      .about-card { padding: 24px !important; }
      .about-card .icon { font-size: 28px !important; }
      .about-card h3 { font-size: 16px !important; }
      .about-card p { font-size: 12px !important; }
      
      .skills-section { padding: 60px 30px !important; }
      .skills-section .section-title { font-size: clamp(20px, 5vw, 32px) !important; }
      .skills-grid { grid-template-columns: 1fr !important; gap: 30px !important; }
      
      .projects-section { padding: 60px 30px !important; }
      .projects-section .section-title { font-size: clamp(20px, 5vw, 32px) !important; }
      .projects-grid { grid-template-columns: 1fr !important; gap: 16px !important; }
      
      .services-section { padding: 60px 30px !important; }
      .services-section .section-title { font-size: clamp(20px, 5vw, 32px) !important; }
      .services-grid { grid-template-columns: 1fr !important; gap: 12px !important; }
      
      .timeline-section { padding: 60px 30px !important; }
      .timeline-section .section-title { font-size: clamp(20px, 5vw, 32px) !important; }
      .timeline-grid { grid-template-columns: 1fr !important; gap: 30px !important; }
      .timeline-line { display: none !important; }
      
      .contact-section { padding: 60px 30px !important; }
      .contact-section .section-title { font-size: clamp(20px, 5vw, 32px) !important; }
      .contact-form { max-width: 100% !important; padding: 28px !important; }
      .contact-info-grid { grid-template-columns: 1fr !important; gap: 16px !important; }
    }
    
    @media (max-width: 480px) {
      .hero-section { padding: 80px 16px 40px !important; min-height: 80vh !important; }
      .hero-title { font-size: clamp(24px, 8vw, 40px) !important; }
      .hero-subtitle { font-size: 13px !important; }
      .hero-description { font-size: 11px !important; }
      .hero-stats { gap: 24px !important; margin-top: 30px !important; }
      .hero-stats .stat-number { font-size: 20px !important; }
      
      .about-section { padding: 40px 20px !important; }
      .about-cards { gap: 12px !important; }
      .about-card { padding: 20px !important; }
      .about-card .icon { font-size: 24px !important; }
      .about-card h3 { font-size: 15px !important; }
      .about-card p { font-size: 11px !important; }
      
      .skills-section { padding: 40px 20px !important; }
      .skills-grid { gap: 20px !important; }
      
      .projects-section { padding: 40px 20px !important; }
      .projects-grid { gap: 12px !important; }
      
      .services-section { padding: 40px 20px !important; }
      .services-grid { gap: 10px !important; }
      
      .timeline-section { padding: 40px 20px !important; }
      .timeline-grid { gap: 20px !important; }
      
      .contact-section { padding: 40px 20px !important; }
      .contact-form { padding: 24px !important; }
      .contact-info-grid { gap: 12px !important; }
    }
    
    /* Hamburger menu styles */
    .hamburger {
      display: none;
      flex-direction: column;
      gap: 4px;
      background: none;
      border: none;
      cursor: pointer;
      padding: 8px;
    }
    
    .hamburger span {
      width: 20px;
      height: 2px;
      background: ${theme.text};
      transition: all 0.3s ease;
    }
    
    .mobile-menu {
      display: none;
      position: fixed;
      top: ${isVoid?72:isMidnight?68:62}px;
      left: 0;
      right: 0;
      background: ${theme.bg};
      border-bottom: ${isVoid?"none":`1px solid ${theme.border}`};
      z-index: 999;
      padding: 20px;
      box-shadow: ${theme.shadow};
    }
    
    .mobile-menu.active {
      display: block;
    }
    
    @media (max-width: 768px) {
      .hamburger { display: flex; }
      .desktop-nav { display: none; }
      .mobile-menu { display: none; }
      .mobile-menu.active { display: block; }
    }
    
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
      <nav ref={navRef} className="main-nav" style={{
        position:"fixed",top:0,left:0,right:0,zIndex:1000,
        padding:`0 ${isVoid?"20px":isMidnight?"24px":"20px"}`,
        height:isVoid?72:isMidnight?68:62,display:"flex",alignItems:"center",justifyContent:"space-between",
        background:isVoid?theme.bg:isMidnight?`linear-gradient(180deg, ${theme.bg} 0%, ${theme.bgAlt} 100%)`:isLight?`rgba(255,255,255,0.95)`:`${theme.bg}CC`,
        backdropFilter:isVoid?"none":isLight?"blur(20px)":"blur(14px)",
        borderBottom:isVoid?"none":isMidnight?`2px solid ${theme.accent}22`:isLight?`1px solid ${theme.border}`:`${isForest?"2px":"1px"} solid ${theme.border}`,
        boxShadow:isLight?"0 2px 20px rgba(0,0,0,0.08)":isVoid?"none":isMidnight?"0 4px 30px rgba(90,139,200,0.15)":"0 2px 20px rgba(0,0,0,0.3)",
        transition:"all .4s cubic-bezier(0.4, 0, 0.2, 1)",
        ...(isVoid && {clipPath:"polygon(0 0, 100% 0, 100% calc(100% - 4px), calc(100% - 4px) 100%, 0 100%)"}),
        ...(isForest && {borderLeft:`4px solid ${theme.accent}`}),
      }}>
        <div className="nav-logo" style={{
          fontFamily:isVoid?theme.monoFont:theme.headingFont, 
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
        
        {/* Desktop Navigation */}
        <div className="desktop-nav" style={{display:"flex",gap:isVoid?24:isMidnight?28:22,alignItems:"center"}}>
          {navLabels[themeKey].map(l=><button 
            key={l} 
            className="nl" 
            onClick={()=>scrollTo(l.toLowerCase())}
            style={{
              fontFamily:isVoid?theme.monoFont:theme.bodyFont,
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

        {/* Mobile Hamburger Menu */}
        <button 
          className="hamburger" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{
            display: 'none'
          }}
        >
          <span style={{
            transform: mobileMenuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none'
          }}></span>
          <span style={{
            opacity: mobileMenuOpen ? 0 : 1
          }}></span>
          <span style={{
            transform: mobileMenuOpen ? 'rotate(-45deg) translate(7px, -6px)' : 'none'
          }}></span>
        </button>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${mobileMenuOpen ? 'active' : ''}`} style={{
        display: 'none',
        '@media (max-width: 768px)': {
          display: mobileMenuOpen ? 'block' : 'none'
        }
      }}>
        <div style={{display:"flex",flexDirection:"column",gap:12}}>
          {navLabels[themeKey].map(l=><button 
            key={l} 
            className="nl" 
            onClick={() => {
              scrollTo(l.toLowerCase());
              setMobileMenuOpen(false);
            }}
            style={{
              fontFamily:isVoid?theme.monoFont:theme.bodyFont,
              fontSize:14,
              fontWeight:isVoid?700:isMidnight?600:500,
              letterSpacing:isVoid?".15em":isMidnight?".08em":".02em",
              textTransform:isVoid?"uppercase":"none",
              padding:"12px 16px",
              borderRadius:isVoid?"0":isMidnight?"2px":"4px",
              border:isVoid?`1px solid ${theme.border}`:isMidnight?`1px solid ${theme.border}33`:"none",
              background:isVoid?"transparent":isMidnight?"transparent":isLight?"rgba(58,122,82,0.1)":"transparent",
              color:theme.text,
              opacity:isVoid?.6:.8,
              transition:"all .2s ease",
              cursor:"pointer",
              textAlign:"left",
              width:"100%"
            }}
          >{isVoid?l.toUpperCase():isMidnight?l:l}</button>)}
        </div>
      </div>

      {/* Theme Switcher */}
      <div className="theme-switcher" style={{position:"fixed",right:14,top:"50%",transform:"translateY(-50%)",zIndex:1001,display:"flex",flexDirection:"column",gap:6}}>
        {Object.entries(THEMES).map(([k,t])=>(
          <button key={k} onClick={()=>{setThemeKey(k);setSent(false);}} title={`${t.name} — ${t.layout} layout`}
            style={{width:35,height:35,borderRadius:themeKey==="void"?"0":"50%",cursor:"pointer",fontSize:13,display:"flex",alignItems:"center",justifyContent:"center",border:`1px solid ${themeKey===k?theme.borderMid:theme.border}`,background:t.surface,opacity:themeKey===k?.9:.35,transition:"all .2s"}}
            onMouseEnter={e=>e.currentTarget.style.opacity=.9}
            onMouseLeave={e=>e.currentTarget.style.opacity=themeKey===k?.9:.35}>
            {t.icon}
          </button>
        ))}
        {/* Layout label */}
        <div className="layout-label" style={{marginTop:4,fontSize:8,fontFamily:"'Space Mono',monospace",color:theme.textMuted,opacity:.45,textAlign:"center",letterSpacing:".06em",textTransform:"uppercase",lineHeight:1.4}}>
          {theme.layout}
        </div>
      </div>

      {/* Developer Mode toggle */}
      <div className="dev-mode-toggle" style={{position:"fixed",bottom:20,right:16,zIndex:9991,display:"flex",flexDirection:"column",gap:8,alignItems:"flex-end"}}>
        <button onClick={()=>setDevMode(v=>!v)} style={{
          display:"flex",alignItems:"center",gap:7,
          background:devMode?theme.devAccent:theme.surface,
          color:devMode?"#000":theme.textMuted,
          border:`1px solid ${devMode?theme.devAccent:theme.borderMid}`,
          borderRadius:themeKey==="void"?0:8,
          padding:"8px 14px",fontSize:10,fontWeight:700,
          fontFamily:theme.monoFont,cursor:"pointer",
          letterSpacing:".07em",transition:"all .2s",
          boxShadow:devMode?"0 4px 20px rgba(0,0,0,.5)":theme.shadow,
        }}>
          <span style={{fontSize:12}}>{devMode?"◉":"○"}</span>
          DEV MODE
        </button>
        {devMode&&<button className="grid-btn" onClick={()=>setShowGrid(v=>!v)} style={{
          display:"flex",alignItems:"center",gap:7,
          background:showGrid?`${theme.devAccent}22`:"transparent",
          color:theme.devAccent,
          border:`1px solid ${theme.devBorder}`,
          borderRadius:themeKey==="void"?0:6,
          padding:"6px 12px",fontSize:9,fontWeight:700,
          fontFamily:theme.monoFont,cursor:"pointer",
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
          <div style={{fontFamily:theme.headingFont,fontWeight:800,fontSize:isVoid?13:15,color:theme.text,opacity:.7,letterSpacing:isVoid?".1em":"-.01em",textTransform:isVoid?"uppercase":"none"}}>
            {isVoid?"MG_PORTFOLIO":"M"}<span style={{color:theme.accent}}>{isVoid?"":"."}</span>{isVoid?"":"Gaitho"}
          </div>
          <div className="social-links" style={{display:"flex",gap:18}}>
            {["GitHub","LinkedIn","Twitter","Dribbble"].map(s=><a key={s} href="#" style={{fontSize:11,color:theme.textMuted,textDecoration:"none",fontWeight:isVoid?700:500,opacity:.45,transition:"opacity .2s,color .2s",letterSpacing:isVoid?".08em":"0",textTransform:isVoid?"uppercase":"none",fontFamily:theme.bodyFont}} onMouseEnter={e=>{e.target.style.opacity=.85;e.target.style.color=theme.text;}} onMouseLeave={e=>{e.target.style.opacity=.45;e.target.style.color=theme.textMuted;}}>{s}</a>)}
          </div>
          <div className="copyright" style={{fontSize:10,color:theme.textMuted,opacity:.35,fontFamily:isVoid?theme.monoFont:theme.bodyFont}}>© 2025 Michael Gaitho · Nakuru, KE</div>
        </div>
      </footer>
    </div>
  );
}
