import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface MagneticTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  tag?: "h1" | "h2" | "h3" | "p" | "span";
}

export default function MagneticText({ text, className = "", style = {}, tag: Tag = "h1" }: MagneticTextProps) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const isFine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!isFine) return;

    const chars = container.querySelectorAll<HTMLSpanElement>("[data-char]");
    const cleanups: (() => void)[] = [];

    chars.forEach((charEl) => {
      const onMove = (e: MouseEvent) => {
        const rect = charEl.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const radius = 140; // Interaction radius

        if (dist < radius) {
          const force = (1 - dist / radius);
          // Water droplet physics:
          // - Pulls towards cursor (magnetic)
          // - Bulges (scale up significantly like a liquid drop)
          // - Glows and refracts (bright blue text-shadow)
          gsap.to(charEl, {
            x: dx * force * 0.4,
            y: dy * force * 0.4,
            scale: 1 + force * 0.6,
            color: `rgba(255,255,255,${1 - force * 0.1})`,
            textShadow: `
              0 0 ${force * 12}px rgba(255,255,255,${force * 0.8}),
              0 ${force * 8}px ${force * 20}px rgba(59,130,246,${force * 0.9}),
              0 -${force * 4}px ${force * 15}px rgba(96,165,250,${force * 0.6})
            `,
            filter: `brightness(${1 + force * 0.3}) blur(${force * 0.8}px)`,
            duration: 0.3,
            ease: "power2.out",
            overwrite: "auto",
          });
        } else {
          gsap.to(charEl, {
            x: 0, y: 0, scale: 1,
            color: "rgba(255,255,255,1)",
            textShadow: "none",
            filter: "brightness(1) blur(0px)",
            duration: 0.7,
            ease: "elastic.out(1.2, 0.3)", // Liquid jiggle settling
            overwrite: "auto",
          });
        }
      };

      window.addEventListener("mousemove", onMove);
      cleanups.push(() => window.removeEventListener("mousemove", onMove));
    });

    return () => cleanups.forEach(c => c());
  }, [text]);

  const words = text.split(" ");

  return (
    <Tag
      // @ts-ignore
      ref={containerRef}
      className={className}
      style={{ display: "flex", flexWrap: "wrap", gap: "0 0.25em", justifyContent: "center", ...style }}
    >
      {words.map((word, wi) => (
        <span key={wi} style={{ display: "inline-flex" }}>
          {word.split("").map((char, ci) => (
            <span
              key={`${wi}-${ci}`}
              data-char="true"
              style={{
                display: "inline-block",
                willChange: "transform, filter, text-shadow",
                position: "relative",
                color: "rgba(255,255,255,1)", // Explicitly solid white by default
                zIndex: 10,
              }}
            >
              {char}
            </span>
          ))}
        </span>
      ))}
    </Tag>
  );
}
