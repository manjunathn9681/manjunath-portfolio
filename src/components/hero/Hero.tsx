import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import MagneticDepthPortrait from "./MagneticDepthPortrait";
import MagneticText from "../shared/MagneticText";
import PhysicsBackground from "../shared/PhysicsBackground";

export default function Hero() {
  const zone = useRef<HTMLElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const uniRef = useRef<HTMLParagraphElement>(null);
  const bioRef = useRef<HTMLParagraphElement>(null);
  const btnsRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const portraitWrapRef = useRef<HTMLDivElement>(null);
  const titleContainerRef = useRef<HTMLDivElement>(null);

  // Entrance animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(uniRef.current,     { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7 }, 0.3)
        .fromTo(titleContainerRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1.0 }, 0.45)
        .fromTo(subtitleRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7 }, 0.65)
        .fromTo(portraitWrapRef.current, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 1.2 }, 0.2)
        .fromTo(bioRef.current,     { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7 }, 0.85)
        .fromTo(btnsRef.current,    { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7 }, 1.0)
        .fromTo(scrollRef.current,  { opacity: 0 },         { opacity: 1, duration: 0.6 },       1.4);
    });
    return () => ctx.revert();
  }, []);

  const handleScroll = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      ref={zone}
      className="relative isolate flex flex-col items-center justify-center overflow-hidden bg-[#050505]"
      style={{ minHeight: "100svh" }}
    >
      {/* ── Physics particle background ──────────────────── */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        <PhysicsBackground nodeCount={50} interactive={false} />
      </div>

      {/* ── Ambient background layers ─────────────────────── */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-1">
        {/* Large radial blue haze */}
        <div
          className="absolute"
          style={{
            inset: "-20%",
            background: "radial-gradient(ellipse 70% 55% at 50% 45%, rgba(37,99,235,0.13) 0%, transparent 70%)",
          }}
        />
        {/* Bottom warm fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[40%]"
          style={{
            background: "linear-gradient(to top, rgba(13,13,15,0.9) 0%, transparent 100%)",
          }}
        />
        {/* Left secondary light */}
        <div
          className="absolute left-0 top-1/4 w-[30%] h-[50%] opacity-30"
          style={{
            background: "radial-gradient(ellipse at left, rgba(59,130,246,0.08), transparent 70%)",
          }}
        />
        {/* Right secondary light */}
        <div
          className="absolute right-0 top-1/3 w-[25%] h-[40%] opacity-20"
          style={{
            background: "radial-gradient(ellipse at right, rgba(99,102,241,0.08), transparent 70%)",
          }}
        />

        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.018]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />

        {/* Thin corner hairlines */}
        <span className="absolute top-8 left-8 w-12 h-12 border-l border-t border-white/[0.06]" />
        <span className="absolute top-8 right-8 w-12 h-12 border-r border-t border-white/[0.06]" />
        <span className="absolute bottom-8 left-8 w-12 h-12 border-l border-b border-white/[0.06]" />
        <span className="absolute bottom-8 right-8 w-12 h-12 border-r border-b border-white/[0.06]" />

        {/* Floating glass shapes */}
        <div
          className="absolute top-[12%] right-[8%] w-32 h-20 rounded-[24px] opacity-40 animate-float"
          style={{
            background: "linear-gradient(135deg, rgba(59,130,246,0.06), rgba(59,130,246,0.01))",
            border: "1px solid rgba(59,130,246,0.12)",
            backdropFilter: "blur(10px)",
            animationDelay: "0s",
          }}
        />
        <div
          className="absolute bottom-[18%] left-[6%] w-24 h-16 rounded-[20px] opacity-30 animate-float"
          style={{
            background: "linear-gradient(135deg, rgba(99,102,241,0.06), rgba(59,130,246,0.01))",
            border: "1px solid rgba(255,255,255,0.08)",
            backdropFilter: "blur(10px)",
            animationDelay: "1.2s",
          }}
        />
        <div
          className="absolute top-[40%] left-[3%] w-16 h-28 rounded-[18px] opacity-20 animate-float"
          style={{
            background: "linear-gradient(180deg, rgba(59,130,246,0.08), transparent)",
            border: "1px solid rgba(59,130,246,0.1)",
            animationDelay: "2.1s",
          }}
        />

        {/* Tiny dots / particles */}
        {[
          { top: "18%", left: "18%", delay: "0s" },
          { top: "30%", left: "80%", delay: "0.8s" },
          { top: "70%", left: "85%", delay: "1.5s" },
          { top: "80%", left: "22%", delay: "2.2s" },
          { top: "55%", left: "6%",  delay: "0.4s" },
          { top: "25%", left: "92%", delay: "1.1s" },
        ].map((p, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full animate-pulse-glow"
            style={{
              top: p.top, left: p.left,
              background: "rgba(96,165,250,0.6)",
              boxShadow: "0 0 6px rgba(59,130,246,0.8)",
              animationDelay: p.delay,
            }}
          />
        ))}
      </div>

      {/* ── Hero content ─────────────────────────────────── */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-7xl mx-auto px-6 md:px-10 pt-24 pb-12">

        {/* Top label */}
        <p
          ref={uniRef}
          className="mb-4 text-[10px] md:text-xs tracking-[0.45em] text-[#A1A1AA] uppercase opacity-0"
        >
          REVA University &nbsp;·&nbsp; Computer Science &amp; Engineering
        </p>

        {/* Name — WATER DROPLET per-character interaction */}
        <div ref={titleContainerRef} className="opacity-0">
          <MagneticText
            text="MANJUNATH N."
            tag="h1"
            className="text-center font-semibold tracking-tight leading-none text-white"
            style={{
              fontSize: "clamp(3rem, 9vw, 8rem)",
              letterSpacing: "-0.02em",
              display: "block",
            }}
          />
        </div>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="mt-4 text-sm md:text-base tracking-[0.2em] text-[#A1A1AA] uppercase opacity-0"
        >
          Computer Science &amp; Engineering
        </p>

        {/* Portrait — center stage */}
        <div ref={portraitWrapRef} className="relative mt-10 mb-8 w-full flex justify-center opacity-0">
          {/* Metadata labels — desktop floating */}
          <div
            className="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 flex-col gap-2"
            style={{ minWidth: "140px" }}
          >
            <div className="glass rounded-xl px-4 py-3 flex flex-col gap-1" data-cursor="Uni">
              <span className="text-[9px] tracking-[0.3em] text-[#3B82F6] uppercase">University</span>
              <span className="text-[11px] text-white font-medium leading-snug">REVA University</span>
            </div>
            <div className="glass rounded-xl px-4 py-3 flex flex-col gap-1" data-cursor="CSE">
              <span className="text-[9px] tracking-[0.3em] text-[#3B82F6] uppercase">Branch</span>
              <span className="text-[11px] text-white font-medium leading-snug">CSE</span>
            </div>
          </div>

          <MagneticDepthPortrait
            zoneRef={zone}
            src={`${import.meta.env.BASE_URL}portrait.webp`}
            alt="Manjunath N."
            className="w-full max-w-[320px] md:max-w-[460px] lg:max-w-[520px]"
          />

          {/* Right metadata label — desktop */}
          <div
            className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 flex-col gap-2"
            style={{ minWidth: "140px" }}
          >
            <div className="glass rounded-xl px-4 py-3 flex flex-col gap-1" data-cursor="Dev">
              <span className="text-[9px] tracking-[0.3em] text-[#3B82F6] uppercase">Focus</span>
              <span className="text-[11px] text-white font-medium leading-snug">Frontend Dev</span>
            </div>
            <div className="glass rounded-xl px-4 py-3 flex flex-col gap-1" data-cursor="Stack">
              <span className="text-[9px] tracking-[0.3em] text-[#3B82F6] uppercase">Stack</span>
              <span className="text-[11px] text-white font-medium leading-snug">React · TS · GSAP</span>
            </div>
          </div>
        </div>

        {/* Bio */}
        <p
          ref={bioRef}
          className="max-w-lg text-center text-sm md:text-base leading-relaxed text-[#A1A1AA] opacity-0"
        >
          Computer Science &amp; Engineering student at REVA University, documenting
          my technical journey through hands-on activities with Git, VS Code, and more.
        </p>

        {/* CTA Buttons */}
        <div
          ref={btnsRef}
          className="mt-8 flex flex-wrap justify-center gap-4 opacity-0"
        >
          <button
            id="hero-cta-work"
            data-cursor="View"
            className="btn-magnetic relative group rounded-full px-7 py-3 text-xs font-semibold tracking-[0.18em] uppercase transition-all duration-300"
            onClick={() => handleScroll("#projects")}
            style={{
              background: "linear-gradient(135deg, #2563EB 0%, #1d4ed8 100%)",
              boxShadow: "0 0 24px rgba(37,99,235,0.35), 0 4px 16px rgba(37,99,235,0.2)",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.boxShadow =
                "0 0 36px rgba(37,99,235,0.55), 0 6px 24px rgba(37,99,235,0.3)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.boxShadow =
                "0 0 24px rgba(37,99,235,0.35), 0 4px 16px rgba(37,99,235,0.2)";
            }}
          >
            View My Work
          </button>
          <button
            id="hero-cta-contact"
            data-cursor="Chat"
            className="btn-magnetic rounded-full px-7 py-3 text-xs font-semibold tracking-[0.18em] uppercase transition-all duration-300"
            onClick={() => handleScroll("#contact")}
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.15)",
              backdropFilter: "blur(12px)",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(59,130,246,0.5)";
              (e.currentTarget as HTMLButtonElement).style.background = "rgba(59,130,246,0.08)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.15)";
              (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.04)";
            }}
          >
            Contact Me
          </button>
        </div>
      </div>

      {/* ── Scroll indicator ──────────────────────────────── */}
      <div
        ref={scrollRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0 cursor-pointer z-10"
        onClick={() => handleScroll("#about")}
        role="button"
        aria-label="Scroll to About"
        data-cursor="Scroll"
      >
        <span className="text-[9px] tracking-[0.35em] text-[#A1A1AA] uppercase">Scroll</span>
        <div
          className="w-5 h-8 rounded-full flex items-start justify-center pt-1.5"
          style={{ border: "1px solid rgba(255,255,255,0.15)" }}
        >
          <div
            className="w-1 h-2 rounded-full bg-[#3B82F6] animate-scroll-bounce"
            style={{ boxShadow: "0 0 6px rgba(59,130,246,0.8)" }}
          />
        </div>
      </div>
    </section>
  );
}
