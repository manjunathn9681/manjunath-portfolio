import { useEffect, useRef } from "react";

type Skill = { name: string };
type Category = { category: string; icon: string; skills: Skill[] };

const SKILLS: Category[] = [
  {
    category: "Frontend",
    icon: "◈",
    skills: [
      { name: "React" },
      { name: "TypeScript" },
      { name: "JavaScript" },
      { name: "HTML5" },
      { name: "CSS3" },
      { name: "Tailwind CSS" },
    ],
  },
  {
    category: "Motion",
    icon: "◎",
    skills: [
      { name: "GSAP" },
      { name: "ScrollTrigger" },
      { name: "Micro-interactions" },
      { name: "CSS Animations" },
    ],
  },
  {
    category: "Programming",
    icon: "◉",
    skills: [
      { name: "C" },
      { name: "C++" },
      { name: "Java" },
      { name: "Python" },
    ],
  },
  {
    category: "Tools",
    icon: "◇",
    skills: [
      { name: "Git" },
      { name: "GitHub" },
      { name: "VS Code" },
      { name: "Figma" },
    ],
  },
];

export default function Skills() {
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
      id="skills"
      ref={sectionRef}
      className="relative bg-[#050505] py-28 px-6 md:px-10 overflow-hidden"
    >
      {/* Background accent */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 50% 50% at 20% 60%, rgba(59,130,246,0.05), transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Section label */}
        <div className="section-hidden flex items-center gap-4 mb-16">
          <span className="text-[10px] tracking-[0.45em] text-[#3B82F6] uppercase font-medium">02</span>
          <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, rgba(59,130,246,0.4), transparent)" }} />
          <span className="text-[10px] tracking-[0.45em] text-[#A1A1AA] uppercase">Skills</span>
        </div>

        {/* Heading */}
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
            Technical Skills
          </h2>
          <p className="mt-3 text-[#A1A1AA] text-sm max-w-lg">
            Technologies and tools I work with to build modern digital experiences.
          </p>
        </div>

        {/* Skill categories grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {SKILLS.map((cat, ci) => (
            <div
              key={cat.category}
              className="section-hidden group"
              style={{ transitionDelay: `${0.1 + ci * 0.08}s` }}
            >
              <div
                className="h-full relative rounded-[22px] p-6 transition-all duration-500"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  backdropFilter: "blur(12px)",
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.borderColor = "rgba(59,130,246,0.25)";
                  el.style.background = "rgba(59,130,246,0.05)";
                  el.style.boxShadow = "0 0 30px rgba(59,130,246,0.08)";
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.borderColor = "rgba(255,255,255,0.08)";
                  el.style.background = "rgba(255,255,255,0.03)";
                  el.style.boxShadow = "none";
                }}
              >
                {/* Top highlight */}
                <div
                  className="absolute top-0 left-4 right-4 h-px"
                  style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)" }}
                />

                {/* Category header */}
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-[#3B82F6] text-base">{cat.icon}</span>
                  <h3 className="text-xs tracking-[0.25em] uppercase text-[#A1A1AA] font-medium">
                    {cat.category}
                  </h3>
                </div>

                {/* Skill pills */}
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map(skill => (
                    <span
                      key={skill.name}
                      className="text-[11px] px-3 py-1.5 rounded-full text-white transition-all duration-300 cursor-default"
                      style={{
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.08)",
                      }}
                      onMouseEnter={e => {
                        const el = e.currentTarget as HTMLSpanElement;
                        el.style.background = "rgba(59,130,246,0.15)";
                        el.style.borderColor = "rgba(59,130,246,0.35)";
                      }}
                      onMouseLeave={e => {
                        const el = e.currentTarget as HTMLSpanElement;
                        el.style.background = "rgba(255,255,255,0.05)";
                        el.style.borderColor = "rgba(255,255,255,0.08)";
                      }}
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
