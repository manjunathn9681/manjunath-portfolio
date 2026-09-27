import { useEffect, useRef, type CSSProperties, type RefObject } from "react";
import { gsap } from "gsap";

type Props = {
  src: string;
  alt: string;
  className?: string;
  /** Element whose pointer events drive the effect (the hero section). Falls back to the parent. */
  zoneRef?: RefObject<HTMLElement | null>;
};

// Max parallax travel in px per layer (portrait 9px, foreground 12px: inside the 6–12px brief).
const DEPTH = { glow: 3, glass: 6, portrait: 9, fore: 12 } as const;
type LayerKey = keyof typeof DEPTH;

const BLUE = "59,130,246";
const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));

export default function MagneticDepthPortrait({ src, alt, className = "", zoneRef }: Props) {
  const root = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    const cursor = cursorRef.current;
    if (!el || !cursor) return;
    const zone: HTMLElement = zoneRef?.current ?? el.parentElement ?? el;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");

    const pick = <T extends HTMLElement>(sel: string) => el.querySelector<T>(sel)!;
    const layer = (k: LayerKey) => pick(`[data-layer="${k}"]`);
    const scaler = pick("[data-el=scaler]");
    const rim = pick("[data-el=rim]");
    const lift = pick("[data-el=lift]");
    const sweep = pick("[data-el=sweep]");

    gsap.set(sweep, { skewX: -18, xPercent: -200, opacity: 0 });

    const makeSetters = (duration: number) =>
      (Object.keys(DEPTH) as LayerKey[]).map((k) => ({
        d: DEPTH[k],
        x: gsap.quickTo(layer(k), "x", { duration, ease: "power3.out" }),
        y: gsap.quickTo(layer(k), "y", { duration, ease: "power3.out" }),
      }));

    /* ---------- Desktop: magnetic parallax + proximity depth ---------- */
    const desktop = () => {
      const setters = makeSetters(1.1);
      const cx = gsap.quickTo(cursor, "x", { duration: 0.35, ease: "power3.out" });
      const cy = gsap.quickTo(cursor, "y", { duration: 0.35, ease: "power3.out" });

      let zr = zone.getBoundingClientRect();
      let er = el.getBoundingClientRect(); // untransformed wrapper, so it stays stable
      const measure = () => {
        zr = zone.getBoundingClientRect();
        er = el.getBoundingClientRect();
      };
      const ro = new ResizeObserver(measure);
      ro.observe(zone);
      ro.observe(el);
      window.addEventListener("scroll", measure, { passive: true });

      let near = false;
      let lastSweep = -Infinity;
      let idle = 0;

      const playSweep = () => {
        lastSweep = performance.now();
        gsap
          .timeline()
          .fromTo(sweep, { xPercent: -200 }, { xPercent: 2200, duration: 2, ease: "power2.inOut" }, 0)
          .fromTo(sweep, { opacity: 0 }, { opacity: 1, duration: 0.5, ease: "sine.out" }, 0)
          .to(sweep, { opacity: 0, duration: 0.7, ease: "sine.in" }, 1.3);
      };

      const setNear = (next: boolean) => {
        if (next === near) return;
        near = next;
        gsap.to(scaler, { scale: next ? 1.02 : 1, duration: 1.2, ease: "power3.out", overwrite: "auto" });
        gsap.to(lift, { opacity: next ? 0.35 : 0, duration: 1, ease: "power2.out", overwrite: "auto" });
        gsap.to(rim, { opacity: next ? 0.6 : 0, duration: 1, ease: "power2.out", overwrite: "auto" });
        gsap.to(cursor, { scale: next ? 1.7 : 1, duration: 0.5, ease: "power3.out", overwrite: "auto" });
        // Occasional only: needs a genuine approach and a long cooldown.
        if (next && performance.now() - lastSweep > 8000) playSweep();
      };

      const settle = () => setters.forEach((s) => (s.x(0), s.y(0)));

      const onMove = (e: PointerEvent) => {
        const nx = clamp((e.clientX - (zr.left + zr.width / 2)) / (zr.width / 2), -1, 1);
        const ny = clamp((e.clientY - (zr.top + zr.height / 2)) / (zr.height / 2), -1, 1);
        // Opposite to the cursor: the environment leans away from your presence.
        setters.forEach((s) => (s.x(-nx * s.d), s.y(-ny * s.d)));

        const m = 48;
        const inside =
          e.clientX > er.left - m && e.clientX < er.right + m && e.clientY > er.top - m && e.clientY < er.bottom + m;
        setNear(inside);

        // Soft glow, gently pulled toward the portrait's centre when close.
        const pull = inside ? 0.1 : 0;
        cx(e.clientX + (er.left + er.width / 2 - e.clientX) * pull);
        cy(e.clientY + (er.top + er.height / 2 - e.clientY) * pull);

        window.clearTimeout(idle);
        idle = window.setTimeout(settle, 1600);
      };

      const onEnter = (e: PointerEvent) => {
        measure();
        gsap.set(cursor, { x: e.clientX, y: e.clientY });
        gsap.to(cursor, { opacity: 1, duration: 0.4, overwrite: "auto" });
      };

      const onLeave = () => {
        window.clearTimeout(idle);
        settle();
        setNear(false);
        gsap.to(cursor, { opacity: 0, duration: 0.4, overwrite: "auto" });
      };

      zone.addEventListener("pointerenter", onEnter);
      zone.addEventListener("pointermove", onMove, { passive: true });
      zone.addEventListener("pointerleave", onLeave);

      return () => {
        window.clearTimeout(idle);
        ro.disconnect();
        window.removeEventListener("scroll", measure);
        zone.removeEventListener("pointerenter", onEnter);
        zone.removeEventListener("pointermove", onMove);
        zone.removeEventListener("pointerleave", onLeave);
      };
    };

    /* ---------- Touch: gentle scroll parallax only ---------- */
    const touch = () => {
      const setters = makeSetters(0.6);
      let visible = true;
      let raf = 0;
      const io = new IntersectionObserver(([en]) => (visible = en.isIntersecting));
      io.observe(el);

      const update = () => {
        raf = 0;
        if (!visible) return;
        const r = el.getBoundingClientRect();
        const p = clamp((r.top + r.height / 2 - innerHeight / 2) / innerHeight, -1, 1);
        setters.forEach((s) => s.y(p * s.d * 1.2));
      };
      const onScroll = () => {
        if (!raf) raf = requestAnimationFrame(update);
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      update();

      return () => {
        cancelAnimationFrame(raf);
        io.disconnect();
        window.removeEventListener("scroll", onScroll);
      };
    };

    let teardown: () => void = () => {};
    const reset = () => {
      gsap.set([cursor, scaler, rim, lift, ...(Object.keys(DEPTH) as LayerKey[]).map(layer)], {
        clearProps: "transform,opacity",
      });
      gsap.set(sweep, { opacity: 0 });
    };
    const setup = () => {
      teardown();
      gsap.killTweensOf([cursor, scaler, rim, lift, sweep]);
      reset();
      teardown = reduce.matches ? () => {} : fine.matches ? desktop() : touch();
    };

    setup();
    reduce.addEventListener("change", setup);
    fine.addEventListener("change", setup);

    return () => {
      reduce.removeEventListener("change", setup);
      fine.removeEventListener("change", setup);
      teardown();
      gsap.killTweensOf([cursor, scaler, rim, lift, sweep]);
    };
  }, [zoneRef]);

  // Alpha-mask so light effects only ever land on the subject, never on empty background.
  const subject = `url(${src})`;
  const maskBase = { WebkitMaskImage: subject, maskImage: subject, WebkitMaskSize: "100% 100%", maskSize: "100% 100%" };
  // Second mask carves the face out of the sweep so it never washes over it.
  const faceCarve = "radial-gradient(ellipse 21% 28% at 44% 27%, transparent 68%, #000 100%)";
  const sweepMask = {
    WebkitMaskImage: `${subject}, ${faceCarve}`,
    maskImage: `${subject}, ${faceCarve}`,
    WebkitMaskSize: "100% 100%",
    maskSize: "100% 100%",
    WebkitMaskComposite: "source-in",
    maskComposite: "intersect",
  } as CSSProperties;

  return (
    <div ref={root} className={`relative isolate aspect-[1100/1073] select-none ${className}`}>
      {/* L1 — atmospheric blue light */}
      <div
        data-layer="glow"
        aria-hidden
        className="pointer-events-none absolute -inset-[18%] will-change-transform"
        style={{
          background: `radial-gradient(closest-side, rgba(${BLUE},.24), rgba(${BLUE},.07) 55%, transparent 78%)`,
        }}
      />

      {/* L2 — glass panes: they blur the light behind them, the portrait stays crisp above */}
      <div data-layer="glass" aria-hidden className="pointer-events-none absolute inset-0 will-change-transform">
        {[
          "right-[-4%] top-[8%] h-[46%] w-[34%] rotate-[8deg]",
          "left-[-6%] bottom-[6%] h-[34%] w-[30%] -rotate-[6deg]",
          "left-[22%] top-[-5%] h-[16%] w-[38%] rotate-[-3deg]",
        ].map((pos) => (
          <div
            key={pos}
            className={`absolute rounded-[28px] border border-[rgba(120,170,255,.16)] ${pos}`}
            style={{
              background: "linear-gradient(135deg, rgba(120,170,255,.10), rgba(120,170,255,.015))",
              backdropFilter: "blur(14px) saturate(1.3)",
              WebkitBackdropFilter: "blur(14px) saturate(1.3)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,.08)",
            }}
          />
        ))}
      </div>

      {/* L3 — portrait (parallax layer → scaler, so transforms never collide) */}
      <div data-layer="portrait" className="absolute inset-0 will-change-transform">
        <div data-el="scaler" className="absolute inset-0 will-change-transform">
          {/* blue rim: a static blurred copy behind the subject; only opacity animates */}
          <img
            data-el="rim"
            src={src}
            alt=""
            aria-hidden
            draggable={false}
            className="absolute inset-0 h-full w-full opacity-0"
            style={{ filter: `drop-shadow(0 0 7px rgba(${BLUE},.95)) drop-shadow(0 0 22px rgba(${BLUE},.5))` }}
          />
          <img
            src={src}
            alt={alt}
            width={1100}
            height={1073}
            decoding="async"
            fetchPriority="high"
            draggable={false}
            className="absolute inset-0 h-full w-full"
          />
          {/* brightness lift, restricted to the subject */}
          <div
            data-el="lift"
            aria-hidden
            className="absolute inset-0 opacity-0"
            style={{ ...maskBase, background: "#fff", mixBlendMode: "soft-light" }}
          />
          {/* light sweep, restricted to the subject and away from the face */}
          <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden" style={sweepMask}>
            <div
              data-el="sweep"
              className="absolute inset-y-[-10%] left-0 w-[5%] opacity-0"
              style={{
                background: `linear-gradient(90deg, transparent, rgba(${BLUE},.12) 30%, rgba(170,205,255,.6) 50%, rgba(${BLUE},.12) 70%, transparent)`,
                mixBlendMode: "screen",
              }}
            />
          </div>
        </div>
      </div>

      {/* L4 — barely-there foreground hairlines */}
      <div data-layer="fore" aria-hidden className="pointer-events-none absolute inset-0 will-change-transform">
        <span className="absolute left-[2%] top-[4%] h-4 w-4 border-l border-t border-[rgba(147,197,253,.35)]" />
        <span className="absolute bottom-[3%] right-[2%] h-4 w-4 border-b border-r border-[rgba(147,197,253,.35)]" />
        <span className="absolute right-[10%] top-[2%] h-px w-[14%] bg-gradient-to-r from-transparent to-[rgba(147,197,253,.3)]" />
      </div>

      {/* Minimal cursor glow (desktop only; native cursor stays visible) */}
      <div
        ref={cursorRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-50 -ml-3.5 -mt-3.5 h-7 w-7 rounded-full opacity-0"
        style={{
          background: `radial-gradient(circle, rgba(147,197,253,.9) 0 12%, rgba(${BLUE},.35) 42%, transparent 70%)`,
          mixBlendMode: "screen",
        }}
      />
    </div>
  );
}
