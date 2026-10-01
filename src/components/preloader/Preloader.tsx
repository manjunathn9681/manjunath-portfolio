import { useEffect, useRef, useState } from "react";

export default function Preloader() {
  const [hidden, setHidden] = useState(false);
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number>(0);
  const startRef = useRef<number>(0);
  const DURATION = 1800; // ms

  useEffect(() => {
    startRef.current = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startRef.current;
      const p = Math.min(elapsed / DURATION, 1);
      // Ease out expo
      const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
      setProgress(Math.round(eased * 100));

      if (p < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setTimeout(() => setHidden(true), 300);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div
      id="preloader"
      className={hidden ? "hidden" : ""}
      aria-hidden={hidden}
    >
      {/* Logo */}
      <img
        src={`${import.meta.env.BASE_URL}logo.jpeg`}
        alt="MANJUNATH"
        className="h-14 w-auto object-contain rounded-full"
        style={{ filter: "drop-shadow(0 0 18px rgba(59,130,246,0.4))", border: "1px solid rgba(59,130,246,0.3)" }}
      />

      {/* Progress bar */}
      <div className="flex flex-col items-center gap-3">
        <div
          className="w-40 h-px relative overflow-hidden"
          style={{ background: "rgba(255,255,255,0.08)" }}
        >
          <div
            className="absolute inset-y-0 left-0 transition-none"
            style={{
              width: `${progress}%`,
              background: "linear-gradient(90deg, #2563EB, #60A5FA)",
              boxShadow: "0 0 8px rgba(59,130,246,0.8)",
              transition: "width 0.05s linear",
            }}
          />
        </div>
        <span className="text-[10px] tracking-[0.4em] text-[#A1A1AA]">
          {progress}%
        </span>
      </div>

      {/* Tagline */}
      <p className="text-[11px] tracking-[0.3em] text-[#A1A1AA] uppercase">
        Initializing
      </p>
    </div>
  );
}
