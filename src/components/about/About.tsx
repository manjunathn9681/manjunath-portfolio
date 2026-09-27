import { useEffect, useRef, useCallback, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/* ─── Activity nodes ──────────────────────────────────── */
const ACTIVITIES = [
  {
    id: "01",
    label: "VS CODE",
    sublabel: "Setup",
    angle: -60,     // degrees from top
    radius: 170,    // px from center
    info: "Configured VS Code as the primary development environment. Installed essential extensions, customized settings, themes, and keybindings for an efficient coding workflow.",
    color: "#3B82F6",
  },
  {
    id: "02",
    label: "GIT & GITHUB",
    sublabel: "Setup",
    angle: 30,
    radius: 170,
    info: "Initialized Git version control, configured user identity, created a GitHub account, and pushed the first Hello World repository to establish remote source control.",
    color: "#60A5FA",
  },
  {
    id: "03",
    label: "GITLENS",
    sublabel: "& Live Share",
    angle: 150,
    radius: 170,
    info: "Installed GitLens for advanced Git history visualization and used VS Code Live Share for real-time collaborative coding and pair-programming sessions.",
    color: "#93C5FD",
  },
  {
    id: "04",
    label: "LEETCODE",
    sublabel: "Practice Repo",
    angle: -150,
    radius: 170,
    info: "Created a dedicated LeetCode practice repository on GitHub to document algorithmic problem-solving progress and track solutions over time.",
    color: "#BFDBFE",
  },
];

/* ─── Particles ───────────────────────────────────────── */
const PARTICLES = [
  { x: "10%", y: "15%", r: 2 },
  { x: "88%", y: "20%", r: 1.5 },
  { x: "5%",  y: "58%", r: 1.5 },
  { x: "94%", y: "65%", r: 2 },
  { x: "20%", y: "82%", r: 1 },
  { x: "80%", y: "80%", r: 1.5 },
  { x: "50%", y: "6%",  r: 1 },
  { x: "33%", y: "92%", r: 2 },
  { x: "67%", y: "93%", r: 1 },
  { x: "15%", y: "40%", r: 1.5 },
  { x: "83%", y: "44%", r: 1 },
];

/* ─── Info pills ──────────────────────────────────────── */
const INFO = [
  { label: "University", value: "REVA University",        pos: "top-[14%] left-[4%]"   },
  { label: "Degree",     value: "B.Tech",                 pos: "top-[14%] right-[4%]"  },
  { label: "Branch",     value: "CSE",                    pos: "bottom-[18%] left-[2%]" },
  { label: "Activities", value: "4 Tech Missions",        pos: "bottom-[18%] right-[2%]" },
];

export default function About() {
  const sectionRef        = useRef<HTMLElement>(null);
  const bgGlowRef         = useRef<HTMLDivElement>(null);
  const cursorGlRef       = useRef<HTMLDivElement>(null);
  const glassARef         = useRef<HTMLDivElement>(null);
  const glassBRef         = useRef<HTMLDivElement>(null);
  const geoRef            = useRef<SVGSVGElement>(null);
  const particleContRef   = useRef<HTMLDivElement>(null);
  const headingRef        = useRef<HTMLDivElement>(null);
  const bodyRef           = useRef<HTMLDivElement>(null);
  const pillsRef          = useRef<(HTMLDivElement | null)[]>([]);
  const infoRef           = useRef<(HTMLDivElement | null)[]>([]);
  const coreRef           = useRef<HTMLDivElement>(null);
  const nodeRefs          = useRef<(HTMLDivElement | null)[]>([]);
  const infoPanelRef      = useRef<HTMLDivElement>(null);

  const mouse   = useRef({ tx: 0, ty: 0, cx: 0, cy: 0 });
  const rafRef  = useRef<number>(0);

  const [activeNode, setActiveNode] = useState<number | null>(null);

  /* ─── RAF loop ────────────────────────────────────────── */
  const tick = useCallback(() => {
    const m = mouse.current;
    m.cx = lerp(m.cx, m.tx, 0.055);
    m.cy = lerp(m.cy, m.ty, 0.055);
    const nx = m.cx; const ny = m.cy;

    if (cursorGlRef.current) {
      cursorGlRef.current.style.left = `${((nx + 1) / 2) * 100}%`;
      cursorGlRef.current.style.top  = `${((ny + 1) / 2) * 100}%`;
    }
    if (bgGlowRef.current) bgGlowRef.current.style.transform = `translate(${nx * 18}px, ${ny * 14}px)`;
    if (glassARef.current) glassARef.current.style.transform = `translate(${nx * 10}px, ${ny * 8}px)`;
    if (glassBRef.current) glassBRef.current.style.transform = `translate(${-nx * 12}px, ${-ny * 9}px)`;
    if (geoRef.current)    geoRef.current.style.transform    = `translate(${nx * 6}px, ${ny * 4}px)`;
    if (particleContRef.current) particleContRef.current.style.transform = `translate(${nx * 14}px, ${ny * 10}px)`;
    if (coreRef.current)  coreRef.current.style.transform    = `translate(-50%, -48%) translate(${nx * 5}px, ${ny * 4}px)`;

    rafRef.current = requestAnimationFrame(tick);
  }, []);

  /* ─── Pointer handlers ────────────────────────────────── */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const fine   = window.matchMedia("(hover:hover) and (pointer:fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion:reduce)");
    if (!fine.matches || reduce.matches) return;

    const onEnter = () => {
      if (cursorGlRef.current) gsap.to(cursorGlRef.current, { opacity: 1, duration: 0.5, overwrite: "auto" });
      rafRef.current = requestAnimationFrame(tick);
    };
    const onMove = (e: PointerEvent) => {
      const r = section.getBoundingClientRect();
      mouse.current.tx = ((e.clientX - r.left) / r.width)  * 2 - 1;
      mouse.current.ty = ((e.clientY - r.top)  / r.height) * 2 - 1;
    };
    const onLeave = () => {
      mouse.current.tx = 0; mouse.current.ty = 0;
      if (cursorGlRef.current) gsap.to(cursorGlRef.current, { opacity: 0, duration: 0.6, overwrite: "auto" });
      cancelAnimationFrame(rafRef.current);
    };

    section.addEventListener("pointerenter", onEnter);
    section.addEventListener("pointermove",  onMove, { passive: true });
    section.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(rafRef.current);
      section.removeEventListener("pointerenter", onEnter);
      section.removeEventListener("pointermove",  onMove);
      section.removeEventListener("pointerleave", onLeave);
    };
  }, [tick]);

  /* ─── Scroll entrance ─────────────────────────────────── */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const reduce = window.matchMedia("(prefers-reduced-motion:reduce)");

    section.querySelectorAll<HTMLElement>("[data-particle]").forEach((p, i) => {
      gsap.to(p, { y: -10 - (i % 3) * 4, x: i % 2 === 0 ? 5 : -5, duration: 3 + i * 0.35, ease: "sine.inOut", yoyo: true, repeat: -1, delay: i * 0.3 });
    });

    if (reduce.matches) {
      section.querySelectorAll<HTMLElement>("[data-anim]").forEach(el => gsap.set(el, { opacity: 1, y: 0, scale: 1 }));
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: section, start: "top 75%", once: true }, defaults: { ease: "power3.out" } });
      tl
        .fromTo(bgGlowRef.current, { opacity: 0, scale: 0.7 }, { opacity: 1, scale: 1, duration: 1.4 }, 0)
        .fromTo([glassARef.current, glassBRef.current], { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 1.2, stagger: 0.15 }, 0.1)
        .fromTo(coreRef.current, { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, duration: 1.1 }, 0.25)
        .fromTo(headingRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.85 }, 0.55)
        .fromTo(bodyRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7 }, 0.75)
        .fromTo(infoRef.current.filter(Boolean), { opacity: 0, y: 16, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.1 }, 0.85)
        .fromTo(section.querySelectorAll("[data-particle]"), { opacity: 0 }, { opacity: 1, duration: 0.8, stagger: 0.07 }, 0.95);
    });

    // Orbit animation for nodes
    nodeRefs.current.forEach((node, i) => {
      if (!node) return;
      gsap.to(node, {
        y: i % 2 === 0 ? -8 : 8,
        x: i % 2 === 0 ? 4 : -4,
        duration: 3 + i * 0.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: i * 0.7,
      });
    });

    return () => ctx.revert();
  }, []);

  /* ─── Node hover proximity check ─────────────────────── */
  const handleNodeEnter = (i: number) => setActiveNode(i);
  const handleNodeLeave = () => setActiveNode(null);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative bg-[#050505] overflow-hidden"
      style={{ minHeight: "100svh", paddingTop: "6rem", paddingBottom: "6rem" }}
    >
      {/* L1 – base vignette */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0"
        style={{ background: "radial-gradient(ellipse 90% 80% at 50% 50%, #0a0a10 0%, #050505 70%)" }} />

      {/* L2 – ambient blue haze */}
      <div ref={bgGlowRef} aria-hidden className="pointer-events-none absolute z-[1] will-change-transform"
        style={{ inset: "-20%", background: "radial-gradient(ellipse 55% 55% at 50% 48%, rgba(37,99,235,0.18) 0%, rgba(59,130,246,0.06) 45%, transparent 70%)", filter: "blur(40px)" }} />

      {/* L3 – geometric SVG lines */}
      <svg ref={geoRef} aria-hidden className="pointer-events-none absolute inset-0 w-full h-full z-[2] will-change-transform" preserveAspectRatio="none">
        <line x1="0%" y1="35%" x2="18%" y2="35%" stroke="rgba(59,130,246,0.5)" strokeWidth="0.5" strokeOpacity="0.08" />
        <line x1="82%" y1="35%" x2="100%" y2="35%" stroke="rgba(59,130,246,0.5)" strokeWidth="0.5" strokeOpacity="0.08" />
        <line x1="0%" y1="65%" x2="12%" y2="65%" stroke="rgba(59,130,246,0.5)" strokeWidth="0.5" strokeOpacity="0.06" />
        <line x1="88%" y1="65%" x2="100%" y2="65%" stroke="rgba(59,130,246,0.5)" strokeWidth="0.5" strokeOpacity="0.06" />
        <ellipse cx="50%" cy="52%" rx="32%" ry="20%" fill="none" stroke="rgba(59,130,246,0.07)" strokeWidth="0.5" />
        <ellipse cx="50%" cy="52%" rx="45%" ry="32%" fill="none" stroke="rgba(59,130,246,0.04)" strokeWidth="0.5" />
      </svg>

      {/* L4A – glass blob top-left */}
      <div ref={glassARef} aria-hidden className="pointer-events-none absolute z-[3] will-change-transform"
        style={{ top: "10%", left: "5%", width: "240px", height: "160px", borderRadius: "48px", background: "linear-gradient(135deg, rgba(59,130,246,0.07), rgba(99,102,241,0.02))", border: "1px solid rgba(59,130,246,0.1)", backdropFilter: "blur(18px)", WebkitBackdropFilter: "blur(18px)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)" }} />

      {/* L4B – glass blob bottom-right */}
      <div ref={glassBRef} aria-hidden className="pointer-events-none absolute z-[3] will-change-transform"
        style={{ bottom: "12%", right: "4%", width: "200px", height: "130px", borderRadius: "40px", background: "linear-gradient(225deg, rgba(59,130,246,0.06), rgba(37,99,235,0.02))", border: "1px solid rgba(255,255,255,0.06)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)" }} />

      {/* L5 – particles */}
      <div ref={particleContRef} aria-hidden className="pointer-events-none absolute inset-0 z-[4] will-change-transform">
        {PARTICLES.map((p, i) => (
          <div key={i} data-particle className="absolute rounded-full"
            style={{ left: p.x, top: p.y, width: `${p.r * 2}px`, height: `${p.r * 2}px`, background: "rgba(96,165,250,0.75)", boxShadow: "0 0 6px rgba(59,130,246,0.9), 0 0 12px rgba(59,130,246,0.4)", opacity: 0 }} />
        ))}
      </div>

      {/* ══════════════════════════════════════════════
          ACTIVITY CORE — CSS/SVG centerpiece (replaces motorcycle)
      ══════════════════════════════════════════════ */}
      <div
        ref={coreRef}
        className="pointer-events-none absolute z-[10] will-change-transform"
        style={{ left: "50%", top: "50%", transform: "translate(-50%, -48%)", width: "min(72vw, 560px)", aspectRatio: "1/1" }}
      >
        {/* Atmospheric glow behind core */}
        <div aria-hidden className="absolute inset-[-20%] rounded-full"
          style={{ background: "radial-gradient(ellipse 70% 70% at 50% 50%, rgba(37,99,235,0.22) 0%, rgba(59,130,246,0.07) 55%, transparent 80%)", filter: "blur(28px)" }} />

        {/* Outer orbit ring */}
        <div aria-hidden className="absolute inset-0 rounded-full animate-spin-slow"
          style={{ border: "1px solid rgba(59,130,246,0.08)" }} />

        {/* Mid orbit ring */}
        <div aria-hidden className="absolute inset-[18%] rounded-full"
          style={{ border: "1px dashed rgba(59,130,246,0.12)", animation: "spin-slow 20s linear infinite reverse" }} />

        {/* Inner glow ring */}
        <div aria-hidden className="absolute inset-[32%] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(37,99,235,0.18) 0%, rgba(59,130,246,0.06) 60%, transparent 80%)", border: "1px solid rgba(59,130,246,0.2)", backdropFilter: "blur(10px)", boxShadow: "0 0 40px rgba(37,99,235,0.18), inset 0 0 20px rgba(37,99,235,0.08)" }} />

        {/* Core label */}
        <div className="absolute inset-[32%] flex flex-col items-center justify-center pointer-events-none select-none">
          <span style={{ fontSize: "clamp(0.55rem, 1.5vw, 0.8rem)", letterSpacing: "0.25em", color: "#fff", fontWeight: 700, textAlign: "center", lineHeight: 1.2 }}>
            MANJUNATH
          </span>
          <span style={{ fontSize: "clamp(0.4rem, 1vw, 0.55rem)", letterSpacing: "0.3em", color: "#3B82F6", textTransform: "uppercase", marginTop: "4px", textAlign: "center" }}>
            TECH JOURNEY
          </span>
        </div>

        {/* ── Activity nodes (orbiting) ─────────────── */}
        {ACTIVITIES.map((act, i) => {
          const rad = (act.angle - 90) * (Math.PI / 180);
          const x = 50 + (act.radius / 2.8) * Math.cos(rad); // % of container
          const y = 50 + (act.radius / 2.8) * Math.sin(rad);
          return (
            <div
              key={act.id}
              ref={el => { nodeRefs.current[i] = el; }}
              className="absolute pointer-events-auto"
              style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%, -50%)", zIndex: 20 }}
              onMouseEnter={() => handleNodeEnter(i)}
              onMouseLeave={handleNodeLeave}
              onTouchStart={() => handleNodeEnter(i)}
              onTouchEnd={handleNodeLeave}
            >
              {/* Node glow ring */}
              <div className="relative flex flex-col items-center gap-1 cursor-default">
                <div
                  className="relative flex items-center justify-center rounded-full transition-all duration-300"
                  style={{
                    width: activeNode === i ? "52px" : "42px",
                    height: activeNode === i ? "52px" : "42px",
                    background: activeNode === i
                      ? `radial-gradient(circle, rgba(59,130,246,0.25), rgba(37,99,235,0.1))`
                      : "rgba(37,99,235,0.08)",
                    border: activeNode === i ? "1px solid rgba(59,130,246,0.6)" : "1px solid rgba(59,130,246,0.25)",
                    boxShadow: activeNode === i ? "0 0 24px rgba(59,130,246,0.4), 0 0 48px rgba(59,130,246,0.15)" : "0 0 10px rgba(59,130,246,0.2)",
                    backdropFilter: "blur(12px)",
                    transition: "all 0.35s cubic-bezier(.23,1,.32,1)",
                  }}
                >
                  <span style={{ fontSize: "9px", letterSpacing: "0.1em", color: act.color, fontWeight: 700 }}>{act.id}</span>
                </div>
                {/* Node label */}
                <div
                  className="text-center transition-all duration-300"
                  style={{ opacity: activeNode === i ? 1 : 0.5 }}
                >
                  <p style={{ fontSize: "8px", letterSpacing: "0.2em", color: "#fff", fontWeight: 600, lineHeight: 1.2, whiteSpace: "nowrap" }}>{act.label}</p>
                  <p style={{ fontSize: "7px", letterSpacing: "0.15em", color: "#A1A1AA", lineHeight: 1 }}>{act.sublabel}</p>
                </div>
                {/* Connecting line to center */}
                <svg
                  aria-hidden
                  className="absolute pointer-events-none"
                  style={{
                    left: "50%", top: "50%",
                    width: `${act.radius * 0.72}px`,
                    height: "2px",
                    transformOrigin: "0% 50%",
                    transform: `rotate(${act.angle + 90}deg)`,
                    opacity: activeNode === i ? 0.6 : 0.12,
                    transition: "opacity 0.3s ease",
                  }}
                >
                  <line x1="0" y1="1" x2="100%" y2="1" stroke={act.color} strokeWidth="0.75" strokeDasharray="4 3" />
                </svg>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Activity info panel (appears on node hover) ── */}
      {activeNode !== null && (
        <div
          ref={infoPanelRef}
          className="pointer-events-none absolute z-[25] hidden md:block"
          style={{
            bottom: "8%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "min(90%, 520px)",
          }}
        >
          <div
            style={{
              background: "rgba(5,5,15,0.85)",
              border: "1px solid rgba(59,130,246,0.3)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              borderRadius: "16px",
              padding: "16px 20px",
              boxShadow: "0 0 40px rgba(37,99,235,0.15)",
              animation: "fade-up 0.3s ease both",
            }}
          >
            <div className="flex items-start gap-4">
              <div style={{ background: "rgba(59,130,246,0.12)", border: "1px solid rgba(59,130,246,0.3)", borderRadius: "10px", padding: "8px 12px", flexShrink: 0 }}>
                <span style={{ fontSize: "16px", fontWeight: 700, color: "#3B82F6", letterSpacing: "0.1em" }}>
                  {ACTIVITIES[activeNode].id}
                </span>
              </div>
              <div>
                <p style={{ fontSize: "11px", letterSpacing: "0.2em", color: "#3B82F6", textTransform: "uppercase", marginBottom: "4px" }}>
                  {ACTIVITIES[activeNode].label} {ACTIVITIES[activeNode].sublabel}
                </p>
                <p style={{ fontSize: "12px", color: "#A1A1AA", lineHeight: 1.6 }}>
                  {ACTIVITIES[activeNode].info}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Cursor glow (desktop only) ─────────────────── */}
      <div ref={cursorGlRef} aria-hidden className="pointer-events-none absolute z-[5] opacity-0 will-change-transform"
        style={{ width: "340px", height: "340px", borderRadius: "50%", transform: "translate(-50%, -50%)", background: "radial-gradient(circle, rgba(59,130,246,0.08) 0%, rgba(59,130,246,0.03) 40%, transparent 70%)", filter: "blur(12px)", transition: "left 0.08s linear, top 0.08s linear" }} />

      {/* ══════════════════════════════════════════════
          FLOATING INFO PILLS (z-20)
      ══════════════════════════════════════════════ */}
      {INFO.map((item, i) => (
        <div
          key={item.label}
          ref={el => { infoRef.current[i] = el; }}
          data-anim
          className={`absolute z-[20] ${item.pos} hidden md:flex flex-col gap-0.5`}
          style={{ opacity: 0 }}
        >
          <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", borderRadius: "12px", padding: "8px 14px", minWidth: "130px" }}>
            <span style={{ display: "block", fontSize: "8px", letterSpacing: "0.35em", textTransform: "uppercase", color: "#3B82F6", marginBottom: "3px" }}>{item.label}</span>
            <span style={{ display: "block", fontSize: "11px", color: "#ffffff", fontWeight: 500, lineHeight: 1.4 }}>{item.value}</span>
          </div>
        </div>
      ))}

      {/* ══════════════════════════════════════════════
          FOREGROUND CONTENT (z-30)
      ══════════════════════════════════════════════ */}
      <div className="relative z-[30] flex flex-col items-center px-6 md:px-10 pointer-events-none select-none">

        {/* Section label row */}
        <div
          ref={el => { pillsRef.current[0] = el; }}
          data-anim
          className="flex items-center gap-4 w-full max-w-5xl mb-10"
          style={{ opacity: 0 }}
        >
          <span style={{ fontSize: "10px", letterSpacing: "0.45em", color: "#3B82F6", textTransform: "uppercase", fontWeight: 500 }}>01</span>
          <div style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, rgba(59,130,246,0.4), transparent)" }} />
          <span style={{ fontSize: "10px", letterSpacing: "0.45em", color: "#A1A1AA", textTransform: "uppercase" }}>About</span>
        </div>

        {/* Heading */}
        <div ref={headingRef} data-anim className="text-center mb-4" style={{ opacity: 0 }}>
          <p style={{ fontSize: "10px", letterSpacing: "0.45em", textTransform: "uppercase", color: "#A1A1AA", marginBottom: "12px" }}>About Me</p>
          <h2 style={{ fontSize: "clamp(2.4rem, 7vw, 5.5rem)", fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1.05, background: "linear-gradient(180deg, #fff 55%, rgba(255,255,255,0.55) 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            A Little About<br />Manjunath.
          </h2>
        </div>

        {/* Spacer for Activity Core visual */}
        <div style={{ height: "min(48vw, 420px)" }} />

        {/* Interaction hint (desktop) */}
        <p className="hidden md:block text-center mb-4" style={{ fontSize: "9px", letterSpacing: "0.3em", color: "rgba(96,165,250,0.5)", textTransform: "uppercase" }}>
          ↑ Hover the nodes to explore activities ↑
        </p>
        <p className="block md:hidden text-center mb-4" style={{ fontSize: "9px", letterSpacing: "0.3em", color: "rgba(96,165,250,0.5)", textTransform: "uppercase" }}>
          ↑ Tap the nodes to explore activities ↑
        </p>

        {/* Body text */}
        <div ref={bodyRef} data-anim className="max-w-lg text-center mt-2" style={{ opacity: 0 }}>
          <p style={{ color: "#A1A1AA", fontSize: "clamp(0.875rem, 1.5vw, 1rem)", lineHeight: 1.8, marginBottom: "1rem" }}>
            I'm <span style={{ color: "#fff", fontWeight: 500 }}>Manjunath N.</span> — a Computer Science &amp; Engineering student at{" "}
            <span style={{ color: "#fff", fontWeight: 500 }}>REVA University</span>. I am building my technical foundation through hands-on activities covering development tools, version control, and algorithmic problem-solving.
          </p>
          <p style={{ color: "#71717A", fontSize: "clamp(0.8rem, 1.4vw, 0.9rem)", lineHeight: 1.75 }}>
            This portfolio documents my real technical journey — from setting up VS Code to collaborating with Live Share and practicing algorithms on LeetCode.
          </p>
        </div>

        {/* Mobile activity info panel */}
        {activeNode !== null && (
          <div className="md:hidden mt-6 pointer-events-none w-full max-w-sm">
            <div style={{ background: "rgba(5,5,15,0.9)", border: "1px solid rgba(59,130,246,0.3)", backdropFilter: "blur(24px)", borderRadius: "14px", padding: "14px 16px", animation: "fade-up 0.3s ease both" }}>
              <p style={{ fontSize: "10px", letterSpacing: "0.2em", color: "#3B82F6", textTransform: "uppercase", marginBottom: "6px" }}>
                {ACTIVITIES[activeNode].id} — {ACTIVITIES[activeNode].label}
              </p>
              <p style={{ fontSize: "12px", color: "#A1A1AA", lineHeight: 1.6 }}>
                {ACTIVITIES[activeNode].info}
              </p>
            </div>
          </div>
        )}

        {/* Mobile info pills */}
        <div className="flex flex-wrap justify-center gap-3 mt-10 md:hidden">
          {INFO.map(item => (
            <div key={item.label} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", borderRadius: "12px", padding: "8px 14px", pointerEvents: "auto" }}>
              <span style={{ display: "block", fontSize: "8px", letterSpacing: "0.35em", textTransform: "uppercase", color: "#3B82F6", marginBottom: "3px" }}>{item.label}</span>
              <span style={{ display: "block", fontSize: "11px", color: "#ffffff", fontWeight: 500 }}>{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
