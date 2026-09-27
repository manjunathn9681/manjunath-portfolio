import { useEffect, useRef } from "react";

export default function Education() {
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
      id="education"
      ref={sectionRef}
      className="relative bg-[#050505] py-28 px-6 md:px-10 overflow-hidden"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 40% 35% at 20% 50%, rgba(59,130,246,0.05), transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Section label */}
        <div className="section-hidden flex items-center gap-4 mb-16">
          <span className="text-[10px] tracking-[0.45em] text-[#3B82F6] uppercase font-medium">05</span>
          <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, rgba(59,130,246,0.4), transparent)" }} />
          <span className="text-[10px] tracking-[0.45em] text-[#A1A1AA] uppercase">Education</span>
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
            Education
          </h2>
        </div>

        {/* Education card */}
        <div
          className="section-hidden relative"
          style={{ transitionDelay: "0.15s" }}
        >
          <div
            className="relative rounded-[24px] p-8 md:p-10 overflow-hidden group transition-all duration-500"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLDivElement;
              el.style.borderColor = "rgba(59,130,246,0.2)";
              el.style.boxShadow = "0 0 40px rgba(59,130,246,0.07)";
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLDivElement;
              el.style.borderColor = "rgba(255,255,255,0.08)";
              el.style.boxShadow = "none";
            }}
          >
            {/* Background glow */}
            <div
              className="absolute -inset-1 rounded-[24px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
              style={{
                background: "radial-gradient(ellipse at 20% 50%, rgba(59,130,246,0.08), transparent 60%)",
              }}
            />

            {/* Top accent */}
            <div
              className="absolute top-0 left-8 right-8 h-px"
              style={{ background: "linear-gradient(90deg, transparent, rgba(59,130,246,0.4), transparent)" }}
            />

            <div className="relative flex flex-col md:flex-row md:items-start gap-8">
              {/* Logo/icon */}
              <div
                className="flex-shrink-0 w-14 h-14 rounded-[14px] flex items-center justify-center text-xl font-bold text-[#3B82F6]"
                style={{
                  background: "rgba(59,130,246,0.1)",
                  border: "1px solid rgba(59,130,246,0.2)",
                }}
              >
                RU
              </div>

              {/* Info */}
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-3">
                  <h3 className="text-white text-xl font-semibold tracking-tight">
                    REVA University
                  </h3>
                  <span
                    className="text-[10px] tracking-[0.25em] uppercase px-3 py-1.5 rounded-full self-start md:self-auto"
                    style={{
                      background: "rgba(59,130,246,0.1)",
                      border: "1px solid rgba(59,130,246,0.25)",
                      color: "#60A5FA",
                    }}
                  >
                    Current
                  </span>
                </div>

                <p className="text-[#A1A1AA] text-sm mb-1">
                  B.Tech — Computer Science & Engineering
                </p>
                <p className="text-[#A1A1AA]/60 text-xs tracking-[0.1em]">
                  Bengaluru, Karnataka, India
                </p>

                {/* Thin divider */}
                <div className="my-5 h-px" style={{ background: "rgba(255,255,255,0.05)" }} />

                <p className="text-[#A1A1AA] text-sm leading-relaxed max-w-2xl">
                  Pursuing a Bachelor of Technology in Computer Science & Engineering with a focus on
                  software development, web technologies and modern programming paradigms.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
