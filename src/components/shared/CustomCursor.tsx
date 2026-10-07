import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  hue: number;
}

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorInnerRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [cursorText, setCursorText] = useState("");
  const [cursorMode, setCursorMode] = useState<"default" | "hover" | "click" | "text" | "drag">("default");

  useEffect(() => {
    const cursor = cursorRef.current;
    const inner = cursorInnerRef.current;
    const ring = cursorRingRef.current;
    const canvas = canvasRef.current;
    if (!cursor || !inner || !ring || !canvas) return;

    const isFine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!isFine || reducedMotion) {
      gsap.set([cursor, ring, canvas], { display: "none" });
      return;
    }

    // Hide native cursor globally
    document.documentElement.style.cursor = "none";

    const ctx = canvas.getContext("2d")!;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const onResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);

    let mx = -200, my = -200;
    let curX = -200, curY = -200;
    let ringX = -200, ringY = -200;
    let particles: Particle[] = [];
    let particleId = 0;
    let isClicking = false;
    let hue = 220; // blue base hue
    let frameId = 0;

    // Physics spring for ring
    let vx = 0, vy = 0;
    const SPRING_STIFFNESS = 0.15;
    const SPRING_DAMPING = 0.75;

    gsap.set(cursor, { xPercent: -50, yPercent: -50, opacity: 0 });
    gsap.set(ring, { xPercent: -50, yPercent: -50, opacity: 0 });

    const spawnParticle = (x: number, y: number, burst = false) => {
      const count = burst ? 8 : 1;
      for (let i = 0; i < count; i++) {
        const angle = burst ? (i / count) * Math.PI * 2 : Math.random() * Math.PI * 2;
        const speed = burst ? (Math.random() * 4 + 2) : (Math.random() * 1.5 + 0.3);
        particles.push({
          id: particleId++,
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1,
          maxLife: burst ? 60 : 35 + Math.random() * 20,
          size: burst ? (Math.random() * 4 + 2) : (Math.random() * 2 + 1),
          hue: hue + (Math.random() - 0.5) * 40,
        });
      }
    };

    let lastParticleTime = 0;
    const animate = (timestamp: number) => {
      frameId = requestAnimationFrame(animate);

      // Physics spring for cursor main
      const dx = mx - curX;
      const dy = my - curY;
      curX += dx * 0.18;
      curY += dy * 0.18;

      // Physics spring for ring (more inertia)
      const rdx = curX - ringX;
      const rdy = curY - ringY;
      vx = vx * SPRING_DAMPING + rdx * SPRING_STIFFNESS;
      vy = vy * SPRING_DAMPING + rdy * SPRING_STIFFNESS;
      ringX += vx;
      ringY += vy;

      gsap.set(cursor, { x: curX, y: curY });
      gsap.set(ring, { x: ringX, y: ringY });

      // Spawn trail particles
      if (timestamp - lastParticleTime > 16 && (Math.abs(dx) > 1 || Math.abs(dy) > 1)) {
        spawnParticle(curX, curY);
        lastParticleTime = timestamp;
      }

      // Draw particles
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles = particles.filter(p => p.life > 0);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.94;
        p.vy *= 0.94;
        p.vy += 0.05; // gravity
        p.life -= 1 / p.maxLife;

        const alpha = Math.max(0, p.life * 0.7);
        const size = Math.max(0, p.size * p.life);
        const radius = Math.max(0, size * 3);

        ctx.beginPath();
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, radius);
        gradient.addColorStop(0, `hsla(${p.hue}, 90%, 75%, ${alpha})`);
        gradient.addColorStop(0.5, `hsla(${p.hue}, 80%, 60%, ${alpha * 0.5})`);
        gradient.addColorStop(1, `hsla(${p.hue}, 70%, 50%, 0)`);
        ctx.fillStyle = gradient;
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fill();
      }
    };
    frameId = requestAnimationFrame(animate);

    const onFirstMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY;
      curX = mx; curY = my;
      ringX = mx; ringY = my;
      gsap.to([cursor, ring], { opacity: 1, duration: 0.5 });
      window.removeEventListener("mousemove", onFirstMove);
    };
    window.addEventListener("mousemove", onFirstMove);

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      // Shift hue slowly as cursor moves
      hue = 220 + (e.clientX / window.innerWidth) * 60;
    };
    window.addEventListener("mousemove", onMove);

    const onDown = (e: MouseEvent) => {
      isClicking = true;
      setCursorMode("click");
      spawnParticle(e.clientX, e.clientY, true);
      gsap.to(cursor, { scale: 0.7, duration: 0.12, ease: "power2.out", overwrite: "auto" });
      gsap.to(ring, { scale: 1.4, opacity: 0.8, duration: 0.2, ease: "power2.out", overwrite: "auto" });
    };
    const onUp = () => {
      isClicking = false;
      setCursorMode("default");
      gsap.to(cursor, { scale: 1, duration: 0.4, ease: "elastic.out(1, 0.5)", overwrite: "auto" });
      gsap.to(ring, { scale: 1, opacity: 0.6, duration: 0.35, ease: "power2.out", overwrite: "auto" });
    };
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    const onOut = () => gsap.to([cursor, ring], { opacity: 0, duration: 0.3 });
    const onIn = () => gsap.to([cursor, ring], { opacity: 1, duration: 0.3 });
    document.addEventListener("mouseleave", onOut);
    document.addEventListener("mouseenter", onIn);

    // Interactive element detection
    const INTERACTIVE = "a, button, [role=button], input, textarea, select, label, [tabindex], [data-cursor]";

    const bindHover = () => {
      document.querySelectorAll<HTMLElement>(INTERACTIVE).forEach(el => {
        if (el.dataset.cursorBound) return;
        el.dataset.cursorBound = "1";
        el.style.cursor = "none";

        el.addEventListener("mouseenter", () => {
          if (isClicking) return;
          const label = el.dataset.cursor || "";
          setCursorText(label);
          setCursorMode("hover");
          gsap.to(cursor, { scale: 1.6, duration: 0.35, ease: "power3.out", overwrite: "auto" });
          gsap.to(ring, { scale: 1.8, opacity: 0.9, duration: 0.4, ease: "power3.out", overwrite: "auto" });
          gsap.to(inner, { scale: 0.4, duration: 0.3, overwrite: "auto" });
        });

        el.addEventListener("mouseleave", () => {
          setCursorText("");
          setCursorMode("default");
          gsap.to(cursor, { scale: 1, duration: 0.35, ease: "power3.out", overwrite: "auto" });
          gsap.to(ring, { scale: 1, opacity: 0.6, duration: 0.35, ease: "power3.out", overwrite: "auto" });
          gsap.to(inner, { scale: 1, duration: 0.3, overwrite: "auto" });
        });
      });
    };

    bindHover();
    const mo = new MutationObserver(bindHover);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.documentElement.style.cursor = "";
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onFirstMove);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", onOut);
      document.removeEventListener("mouseenter", onIn);
      mo.disconnect();
    };
  }, []);

  const modeStyles = {
    default: {
      width: 12, height: 12,
      background: "radial-gradient(circle, rgba(147,197,253,1) 0%, rgba(59,130,246,0.8) 60%, transparent 100%)",
      boxShadow: "0 0 20px rgba(59,130,246,0.8), 0 0 40px rgba(59,130,246,0.4)",
    },
    hover: {
      width: 12, height: 12,
      background: "radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(147,197,253,0.9) 60%, transparent 100%)",
      boxShadow: "0 0 30px rgba(147,197,253,1), 0 0 60px rgba(59,130,246,0.6)",
    },
    click: {
      width: 12, height: 12,
      background: "radial-gradient(circle, rgba(255,200,100,1) 0%, rgba(255,150,50,0.8) 60%, transparent 100%)",
      boxShadow: "0 0 30px rgba(255,150,50,1), 0 0 60px rgba(255,100,0,0.6)",
    },
    text: {
      width: 2, height: 24,
      borderRadius: "2px",
      background: "rgba(147,197,253,1)",
      boxShadow: "0 0 10px rgba(59,130,246,0.8)",
    },
    drag: {
      width: 12, height: 12,
      background: "radial-gradient(circle, rgba(167,139,250,1) 0%, rgba(139,92,246,0.8) 60%, transparent 100%)",
      boxShadow: "0 0 30px rgba(139,92,246,1), 0 0 60px rgba(139,92,246,0.4)",
    },
  };

  return (
    <>
      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-[9990]"
        style={{ mixBlendMode: "screen" }}
      />

      {/* Magnetic ring with physics spring */}
      <div
        ref={cursorRingRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9996] will-change-transform"
        style={{
          width: 40, height: 40,
          border: "1px solid rgba(96,165,250,0.5)",
          borderRadius: "50%",
          transform: "translate(-50%, -50%)",
          opacity: 0.6,
          backdropFilter: "blur(1px)",
          boxShadow: "0 0 15px rgba(59,130,246,0.2), inset 0 0 15px rgba(59,130,246,0.05)",
          transition: "width 0.3s ease, height 0.3s ease, border-color 0.3s ease",
        }}
      />

      {/* Core cursor dot */}
      <div
        ref={cursorRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9998] will-change-transform flex items-center justify-center"
        style={{
          borderRadius: "50%",
          transform: "translate(-50%, -50%)",
          ...modeStyles[cursorMode],
          transition: "width 0.3s ease, height 0.3s ease, border-radius 0.3s ease",
        }}
      >
        <div ref={cursorInnerRef} className="w-1 h-1 rounded-full bg-white/80" />
      </div>

      {/* Cursor label */}
      {cursorText && (
        <div
          className="pointer-events-none fixed z-[9999] text-[10px] tracking-widest uppercase text-white/80 font-medium"
          style={{
            left: cursorRef.current ? parseFloat(cursorRef.current.style.transform) : 0,
            transform: "translate(20px, -50%)",
          }}
        >
          {cursorText}
        </div>
      )}
    </>
  );
}
