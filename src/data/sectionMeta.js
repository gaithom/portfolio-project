export const SECTION_META = {
  hero:{component:"HeroSection",stack:["React","GSAP","Canvas API","CSS Keyframes"],animations:["Entrance timeline (6 steps)","Title parallax scrub:1.8","Ring parallax multi-speed","Typewriter loop","Particle rAF canvas"],description:"Full-viewport landing with cinematic GSAP timeline entrance, multi-layer parallax, and 45-node particle canvas.",code:`const tl = gsap.timeline({ delay: 0.2 });
tl.fromTo(badge, { y:20, opacity:0 }, { y:0, opacity:1, ease:"expo.out" })
  .fromTo(title, { y:64, skewY:2.5 }, { y:0, skewY:0,  ease:"expo.out" }, "-=.3")
  .fromTo(sub,   { y:28, opacity:0 }, { y:0, opacity:1, ease:"expo.out" }, "-=.55");

// Parallax scrub
gsap.to(titleRef, { yPercent:-20,
  scrollTrigger: { scrub:1.8, start:"top top", end:"bottom top" }
});`},
  about:{component:"AboutSection",stack:["React","GSAP ScrollTrigger","CSS Grid","CSS Animations"],animations:["Opposing slide-in x-axis","Rotating decorative rings","Float badge keyframes"],description:"Split-grid with opposing GSAP slide-in at 78% viewport. Rings use pure CSS rotation.",code:`gsap.fromTo(imgRef, { x:-65, opacity:0, rotate:-1.5 },
  { x:0, opacity:1, rotate:0, duration:1.1, ease:"expo.out",
    scrollTrigger: { trigger: aboutRef, start:"top 78%" }
  }
);
gsap.fromTo(txtRef, { x:65, opacity:0 },
  { x:0, opacity:1, delay:.1,
    scrollTrigger: { trigger: aboutRef, start:"top 78%" }
  }
);`},
  skills:{component:"SkillsSection",stack:["React","Intersection Observer","CSS Transitions"],animations:["Stagger fade-up rows","Animated fill bars","Hover scale tags"],description:"IntersectionObserver triggers CSS width transitions. Tech stack uses hover scale transforms.",code:`const obs = new IntersectionObserver(([e]) => {
  if (e.isIntersecting) setTimeout(() => setFilled(true), delay * 1000);
}, { threshold: 0.5 });

// CSS fills the bar on trigger
width: filled ? \`\${pct}%\` : "0%",
transition: "width 1.5s cubic-bezier(.4,0,.2,1)"`},
  projects:{component:"ProjectsSection",stack:["React","GSAP ScrollTrigger","CSS Perspective","Mouse Events"],animations:["Pinned horizontal scroll","3D tilt on hover","Scroll-triggered card entrance"],description:"GSAP ScrollTrigger pin creates Webflow-style horizontal scroll. Cards use perspective+rotateXY 3D tilt on mouse.",code:`ScrollTrigger.create({
  trigger: panel, pin: true, scrub: 1.1,
  end: () => \`+=\${totalWidth}\`,
  onUpdate: self => {
    track.style.transform = \`translateX(-\${self.progress * totalWidth}px)\`;
  }
});`},
  services:{component:"ServicesSection",stack:["React","GSAP ScrollTrigger","CSS Transforms"],animations:["Stagger fan-in (y+scale)","Hover lift"],description:"GSAP stagger triggered at 82% viewport with CSS hover lift.",code:`gsap.fromTo(cards,
  { y:46, opacity:0, scale:.96 },
  { y:0, opacity:1, scale:1, stagger:.1,
    scrollTrigger: { start:"top 82%" }
  }
);`},
  experience:{component:"TimelineSection",stack:["React","GSAP ScrollTrigger"],animations:["Stagger slide from left"],description:"Timeline items slide in from left with stagger via GSAP ScrollTrigger.",code:`gsap.fromTo(items, { x:-38, opacity:0 },
  { x:0, opacity:1, stagger:.15,
    scrollTrigger: { start:"top 82%" }
  }
);`},
  contact:{component:"ContactSection",stack:["React","GSAP ScrollTrigger","Controlled Inputs"],animations:["Fade-up reveal on scroll"],description:"Controlled React form with GSAP ScrollTrigger reveal at 84% viewport.",code:`gsap.fromTo(contactRef, { y:36, opacity:0 },
  { y:0, opacity:1, duration:.95, ease:"expo.out",
    scrollTrigger: { start:"top 84%" }
  }
);`},
};
