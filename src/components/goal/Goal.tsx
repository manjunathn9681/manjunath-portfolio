import { useEffect, useRef } from "react";

export default function Goal() {
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
      id="goal"
      ref={sectionRef}
      className="relative bg-[#050505] py-28 px-6 md:px-10 overflow-hidden"
    >
      {/* Background accent */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(59,130,246,0.05), transparent 70%)",
        }}
      />

      <div className="max-w-4xl mx-auto text-center">
        {/* Section label */}
        <div className="section-hidden flex items-center justify-center gap-4 mb-10">
          <div className="w-12 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(59,130,246,0.4))" }} />
          <span className="text-[10px] tracking-[0.45em] text-[#3B82F6] uppercase font-medium">My Goal</span>
          <div className="w-12 h-px" style={{ background: "linear-gradient(90deg, rgba(59,130,246,0.4), transparent)" }} />
        </div>

        {/* Goal Content */}
        <div className="section-hidden" style={{ transitionDelay: "0.1s" }}>
          <div
            className="relative rounded-[24px] p-10 md:p-14 overflow-hidden inline-block w-full"
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.06)",
              backdropFilter: "blur(12px)",
            }}
          >
            {/* Top highlight */}
            <div
              className="absolute top-0 left-1/4 right-1/4 h-px"
              style={{ background: "linear-gradient(90deg, transparent, rgba(59,130,246,0.4), transparent)" }}
            />
            
            <p className="text-[#A1A1AA] text-lg md:text-xl leading-relaxed font-light italic">
              "[ADD YOUR CAREER OR LEARNING GOAL]"
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
