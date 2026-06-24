import { useEffect } from "react";

// ── GSAP Loader ───────────────────────────────────────────────────────────────
export function GSAPLoader() {
  useEffect(() => {
    if (window.gsap) return;
    const s1 = document.createElement("script");
    s1.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js";
    document.head.appendChild(s1);
    s1.onload = () => {
      const s2 = document.createElement("script");
      s2.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js";
      document.head.appendChild(s2);
    };
  }, []);
  return null;
}

export function useGSAP(cb, deps = []) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    let ctx;
    let userCleanup;
    const poll = async () => {
      let t = 0;
      while ((!window.gsap || !window.ScrollTrigger) && t < 60) {
        await new Promise(r => setTimeout(r, 100)); t++;
      }
      if (window.gsap && window.ScrollTrigger) {
        window.gsap.registerPlugin(window.ScrollTrigger);
        ctx = window.gsap.context(() => {
          userCleanup = cb(window.gsap, window.ScrollTrigger);
        });
      }
    };
    poll();
    return () => {
      userCleanup?.();
      ctx?.revert();
    };
  // eslint-disable-next-line
  }, deps);
}
