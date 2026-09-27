import { useEffect, useRef } from "react";

type Project = {
  id: string;
  activityId: string;
  title: string;
  description: string;
  tags: string[];
  github?: string;
  accentColor: string;
};

const PROJECTS: Project[] = [
  {
    id: "vscode-setup",
    activityId: "01",
    title: "VS Code Setup",
    description:
      "Configured Visual Studio Code as the primary development environment. Set up themes, extensions, keybindings, and editor settings for an efficient coding workflow.",
    tags: ["VS Code", "Developer Tools", "Productivity"],
    accentColor: "rgba(59,130,246,0.15)",
  },
  {
    id: "hello-world",
    activityId: "02",
    title: "Hello World Repository",
    description:
      "First GitHub repository created as part of the Git & GitHub activity. Demonstrates basic Git workflow: init, add, commit, and push to remote.",
    tags: ["Git", "GitHub", "Version Control"],
    github: "[ADD GITHUB LINK]",
    accentColor: "rgba(96,165,250,0.12)",
  },
  {
    id: "gitlens-liveshare",
    activityId: "03",
    title: "GitLens & Live Share",
    description:
      "Hands-on activity using GitLens for advanced Git history visualization inside VS Code, and VS Code Live Share for real-time collaborative pair-programming.",
    tags: ["GitLens", "Live Share", "Collaboration", "VS Code"],
    accentColor: "rgba(147,197,253,0.12)",
  },
  {
    id: "leetcode-repo",
    activityId: "04",
    title: "LeetCode Solutions Repository",
    description:
      "A dedicated GitHub repository documenting LeetCode algorithmic practice. Solutions are organized by difficulty and topic with explanations and complexity notes.",
    tags: ["LeetCode", "Algorithms", "GitHub", "Problem Solving"],
    github: "[ADD GITHUB LINK]",
    accentColor: "rgba(191,219,254,0.10)",
  },
];

export default function Projects() {
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
      { threshold: 0.08 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative bg-[#050505] py-28 px-6 md:px-10 overflow-hidden"
    >
      {/* Background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 40% at 75% 30%, rgba(99,102,241,0.05), transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Section label */}
        <div className="section-hidden flex items-center gap-4 mb-16">
          <span className="text-[10px] tracking-[0.45em] text-[#3B82F6] uppercase font-medium">04</span>
          <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, rgba(59,130,246,0.4), transparent)" }} />
          <span className="text-[10px] tracking-[0.45em] text-[#A1A1AA] uppercase">Technical Work</span>
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
            Activity Artifacts
          </h2>
          <p className="mt-3 text-[#A1A1AA] text-sm max-w-lg">
            Technical work produced across four university activities — each representing a real milestone in my learning journey.
          </p>
        </div>

        {/* Project cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {PROJECTS.map((project, i) => (
            <div
              key={project.id}
              id={`project-${project.id}`}
              className="section-hidden group relative"
              style={{ transitionDelay: `${0.1 + i * 0.08}s` }}
            >
              <div
                className="h-full relative rounded-[24px] overflow-hidden transition-all duration-500 cursor-default flex flex-col"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.borderColor = "rgba(59,130,246,0.2)";
                  el.style.transform = "translateY(-4px)";
                  el.style.boxShadow = "0 20px 60px rgba(0,0,0,0.5), 0 0 30px rgba(59,130,246,0.07)";
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.borderColor = "rgba(255,255,255,0.08)";
                  el.style.transform = "translateY(0)";
                  el.style.boxShadow = "none";
                }}
              >
                {/* Visual area */}
                <div
                  className="h-32 w-full relative flex items-center justify-center flex-shrink-0"
                  style={{
                    background: project.accentColor,
                    borderBottom: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <div className="absolute inset-0"
                    style={{ background: `radial-gradient(ellipse at 60% 40%, ${project.accentColor}, transparent 70%)` }} />
                  {/* Activity badge */}
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span
                      className="text-[9px] tracking-[0.3em] uppercase px-2.5 py-1 rounded-full font-semibold"
                      style={{ background: "rgba(59,130,246,0.15)", border: "1px solid rgba(59,130,246,0.3)", color: "#60A5FA" }}
                    >
                      Activity {project.activityId}
                    </span>
                  </div>
                  <span
                    className="text-4xl font-bold text-white/10 select-none tracking-tight"
                    style={{ letterSpacing: "-0.04em" }}
                  >
                    {project.activityId}
                  </span>
                  {/* Shimmer overlay */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 60%)" }} />
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col gap-4 flex-1">
                  <h3 className="text-base font-semibold text-white tracking-tight">{project.title}</h3>
                  <p className="text-[#A1A1AA] text-sm leading-relaxed flex-1">{project.description}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map(tag => (
                      <span
                        key={tag}
                        className="text-[10px] px-2.5 py-1 rounded-full text-[#A1A1AA]"
                        style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* GitHub link */}
                  {project.github && (
                    <div className="flex items-center gap-2 pt-1">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="rgba(59,130,246,0.6)">
                        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
                      </svg>
                      {project.github.startsWith("[") ? (
                        <span className="text-[11px] tracking-[0.1em] uppercase text-[#A1A1AA]/60 italic">
                          {project.github}
                        </span>
                      ) : (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[11px] tracking-[0.15em] uppercase text-[#3B82F6] hover:text-[#60A5FA] transition-colors"
                        >
                          GitHub →
                        </a>
                      )}
                    </div>
                  )}
                </div>

                {/* Top highlight */}
                <div className="absolute top-0 left-6 right-6 h-px"
                  style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent)" }} />
              </div>
            </div>
          ))}
        </div>

        {/* Note about placeholders */}
        <div className="section-hidden mt-8 text-center" style={{ transitionDelay: "0.5s" }}>
          <p className="text-[10px] tracking-[0.2em] text-[#A1A1AA]/40 uppercase">
            GitHub links marked [ADD GITHUB LINK] will be updated with actual repository URLs
          </p>
        </div>
      </div>
    </section>
  );
}
