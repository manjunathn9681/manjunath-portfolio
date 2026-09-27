import { useEffect, useRef } from "react";

export default function Certificates() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.querySelectorAll(".section-hidden").forEach(c =>
            c.classList.add("section-visible")
          );
          io.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      id="certificates"
      ref={sectionRef}
      className="relative bg-[#050505] py-28 px-6 md:px-10 overflow-hidden"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 40% 40% at 50% 60%, rgba(59,130,246,0.05), transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Section label */}
        <div className="section-hidden flex items-center gap-4 mb-16">
          <span className="text-[10px] tracking-[0.45em] text-[#3B82F6] uppercase font-medium">04</span>
          <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, rgba(59,130,246,0.4), transparent)" }} />
          <span className="text-[10px] tracking-[0.45em] text-[#A1A1AA] uppercase">Certificates</span>
        </div>

        <div className="section-hidden mb-12" style={{ transitionDelay: "0.1s" }}>
          <h2
            className="font-semibold leading-tight"
            style={{
              fontSize: "clamp(2rem, 4.5vw, 3.2rem)",
              letterSpacing: "-0.02em",
              background: "linear-gradient(180deg, #fff 50%, rgba(255,255,255,0.6) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Certificates
          </h2>
        </div>

        {/* Empty state — ready for future uploads */}
        <div
          className="section-hidden"
          style={{ transitionDelay: "0.15s" }}
        >
          <div
            className="relative rounded-[28px] py-20 px-10 flex flex-col items-center justify-center text-center"
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px dashed rgba(255,255,255,0.1)",
              minHeight: "320px",
            }}
          >
            {/* Decorative icon */}
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
              style={{
                background: "rgba(59,130,246,0.08)",
                border: "1px solid rgba(59,130,246,0.2)",
              }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(59,130,246,0.7)" strokeWidth="1.5">
                <circle cx="12" cy="8" r="5" />
                <path d="M8.21 13.89L7 23l5-3 5 3-1.21-9.12" />
              </svg>
            </div>

            <h3 className="text-white text-base font-medium mb-3">
              Achievements & Certifications
            </h3>
            <p className="text-[#A1A1AA] text-sm leading-relaxed max-w-sm">
              Your achievements and certifications will appear here.
              This section is ready for future uploads — add certificate images or PDFs to showcase your accomplishments.
            </p>

            {/* Placeholder slots */}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-2xl">
              {[1, 2, 3].map(n => (
                <div
                  key={n}
                  className="rounded-[16px] h-28 flex flex-col items-center justify-center gap-2"
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    border: "1px dashed rgba(255,255,255,0.06)",
                  }}
                >
                  <div className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px dashed rgba(255,255,255,0.08)" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2">
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  </div>
                  <span className="text-[9px] tracking-[0.25em] text-[#A1A1AA]/40 uppercase">Certificate {n}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
