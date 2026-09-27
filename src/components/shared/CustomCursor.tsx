import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function CustomCursor() {
  const glowRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const glow = glowRef.current;
    const trail = trailRef.current;
    const ring = ringRef.current;
    if (!glow || !trail || !ring) return;

    // Only on desktop fine-pointer devices — NO touch
    const isFine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!isFine) {
      gsap.set([glow, trail, ring], { display: "none" });
      return;
    }

    // Respect prefers-reduced-motion
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      gsap.set([glow, trail, ring], { display: "none" });
      return;
    }

    // DO NOT hide native cursor — this is critical
    // The system cursor stays completely untouched

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let isHoveringInteractive = false;
    let isHoveringCard = false;

    // Initialise off-screen, hidden until first move
    gsap.set([glow, trail, ring], { x: mx, y: my, xPercent: -50, yPercent: -50, opacity: 0 });

    // Fade in after first move
    const onFirstMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      gsap.to([glow, trail], { opacity: 1, duration: 0.5, overwrite: "auto" });
      window.removeEventListener("mousemove", onFirstMove);
    };
    window.addEventListener("mousemove", onFirstMove);

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;

      // Trail dot — follows with ~80ms lag
      gsap.to(trail, {
        x: mx,
        y: my,
        duration: 0.12,
        ease: "power2.out",
        overwrite: true,
      });

      // Glow — follows with ~150ms smooth lag
      gsap.to(glow, {
        x: mx,
        y: my,
        duration: 0.25,
        ease: "power3.out",
        overwrite: true,
      });

      // Ring — follows with glow
      gsap.to(ring, {
        x: mx,
        y: my,
        duration: 0.3,
        ease: "power3.out",
        overwrite: true,
      });
    };

    // Hover: interactive elements (buttons, links)
    const onEnterInteractive = () => {
      isHoveringInteractive = true;
      gsap.to(glow, {
        scale: 1.4,
        opacity: 0.65,
        duration: 0.3,
        ease: "power3.out",
        overwrite: "auto",
      });
      gsap.to(trail, {
        scale: 1.3,
        opacity: 0.9,
        duration: 0.2,
        ease: "power3.out",
        overwrite: "auto",
      });
    };

    const onLeaveInteractive = () => {
      isHoveringInteractive = false;
      if (!isHoveringCard) {
        gsap.to(glow, {
          scale: 1,
          opacity: 0.45,
          duration: 0.35,
          ease: "power3.out",
          overwrite: "auto",
        });
        gsap.to(trail, {
          scale: 1,
          opacity: 0.7,
          duration: 0.25,
          ease: "power3.out",
          overwrite: "auto",
        });
        gsap.to(ring, {
          opacity: 0,
          scale: 0.8,
          duration: 0.3,
          ease: "power3.out",
          overwrite: "auto",
        });
      }
    };

    // Hover: mission cards — subtle ring pulse
    const onEnterCard = () => {
      isHoveringCard = true;
      gsap.to(ring, {
        opacity: 0.6,
        scale: 1,
        duration: 0.35,
        ease: "power3.out",
        overwrite: "auto",
      });
      gsap.to(glow, {
        scale: 1.3,
        opacity: 0.55,
        duration: 0.3,
        ease: "power3.out",
        overwrite: "auto",
      });
    };

    const onLeaveCard = () => {
      isHoveringCard = false;
      if (!isHoveringInteractive) {
        gsap.to(ring, {
          opacity: 0,
          scale: 0.8,
          duration: 0.3,
          ease: "power3.out",
          overwrite: "auto",
        });
        gsap.to(glow, {
          scale: 1,
          opacity: 0.45,
          duration: 0.35,
          ease: "power3.out",
          overwrite: "auto",
        });
      }
    };

    // Mouse down / up
    const onDown = () => {
      gsap.to(glow, { scale: 0.8, duration: 0.12, overwrite: "auto" });
      gsap.to(trail, { scale: 0.6, duration: 0.1, overwrite: "auto" });
    };
    const onUp = () => {
      const targetScale = isHoveringInteractive || isHoveringCard ? 1.3 : 1;
      gsap.to(glow, { scale: targetScale, duration: 0.25, ease: "elastic.out(1, 0.5)", overwrite: "auto" });
      gsap.to(trail, { scale: isHoveringInteractive ? 1.3 : 1, duration: 0.2, overwrite: "auto" });
    };

    // Attach hover listeners
    const INTERACTIVE_SELECTORS = "a, button, [role=button], input, textarea, select, label, [tabindex]";
    const CARD_SELECTOR = "[data-mission-card]";

    const bindHover = () => {
      document.querySelectorAll<HTMLElement>(INTERACTIVE_SELECTORS).forEach(el => {
        if (el.dataset.cursorBound) return;
        el.dataset.cursorBound = "1";
        el.addEventListener("mouseenter", onEnterInteractive);
        el.addEventListener("mouseleave", onLeaveInteractive);
      });
      document.querySelectorAll<HTMLElement>(CARD_SELECTOR).forEach(el => {
        if (el.dataset.cursorCardBound) return;
        el.dataset.cursorCardBound = "1";
        el.addEventListener("mouseenter", onEnterCard);
        el.addEventListener("mouseleave", onLeaveCard);
      });
    };
    bindHover();

    // Re-bind on DOM changes
    const mo = new MutationObserver(bindHover);
    mo.observe(document.body, { childList: true, subtree: true });

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    // Cursor leaves/enters viewport
    const onOut = () => {
      gsap.to([glow, trail, ring], { opacity: 0, duration: 0.3, overwrite: "auto" });
    };
    const onIn = () => {
      gsap.to([glow, trail], { opacity: 1, duration: 0.3, overwrite: "auto" });
    };
    document.addEventListener("mouseleave", onOut);
    document.addEventListener("mouseenter", onIn);

    return () => {
      window.removeEventListener("mousemove", onFirstMove);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", onOut);
      document.removeEventListener("mouseenter", onIn);
      mo.disconnect();
      document.querySelectorAll<HTMLElement>(INTERACTIVE_SELECTORS).forEach(el => {
        el.removeEventListener("mouseenter", onEnterInteractive);
        el.removeEventListener("mouseleave", onLeaveInteractive);
        delete el.dataset.cursorBound;
      });
      document.querySelectorAll<HTMLElement>(CARD_SELECTOR).forEach(el => {
        el.removeEventListener("mouseenter", onEnterCard);
        el.removeEventListener("mouseleave", onLeaveCard);
        delete el.dataset.cursorCardBound;
      });
    };
  }, []);

  return (
    <>
      {/* Soft radial glow — largest, slowest, ~20-24px */}
      <div
        ref={glowRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9997] rounded-full will-change-transform"
        style={{
          width: 24,
          height: 24,
          background: "radial-gradient(circle, rgba(59,130,246,0.25) 0%, rgba(59,130,246,0.08) 40%, transparent 70%)",
          transform: "translate(-50%, -50%)",
          filter: "blur(1px)",
          opacity: 0.45,
        }}
      />

      {/* Subtle ring — visible on card/interactive hover */}
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9998] rounded-full will-change-transform"
        style={{
          width: 28,
          height: 28,
          border: "1px solid rgba(96,165,250,0.4)",
          transform: "translate(-50%, -50%)",
          opacity: 0,
          boxShadow: "0 0 6px rgba(59,130,246,0.15)",
        }}
      />

      {/* Trailing dot — small, follows with slight delay */}
      <div
        ref={trailRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9998] rounded-full will-change-transform"
        style={{
          width: 4,
          height: 4,
          background: "rgba(147,197,253,0.8)",
          transform: "translate(-50%, -50%)",
          boxShadow: "0 0 6px rgba(59,130,246,0.6), 0 0 12px rgba(59,130,246,0.25)",
          opacity: 0.7,
        }}
      />
    </>
  );
}
