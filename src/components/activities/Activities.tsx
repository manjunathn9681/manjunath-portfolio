import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ─── Activity data ───────────────────────────────────── */
const ACTIVITIES = [
  {
    id: "01",
    title: "VS CODE SETUP",
    subtitle: "Development Environment",
    category: "ENVIRONMENT",
    color: "#3B82F6",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    description: "Configured VS Code as the primary code editor with essential extensions and optimized settings.",
    what: "Configured VS Code as the primary code editor for all upcoming activities.",
    steps: [
      "Installed Visual Studio Code from the official website",
      "Configured editor settings: font, theme, tab size, auto-save",
      "Installed essential extensions for development workflow",
      "Set up keybindings for efficient navigation",
    ],
    extensions: ["GitLens", "Live Share", "Prettier", "ESLint"],
    outcome: "A fully configured, productive development environment ready for all coding activities.",
    github: null,
    seq: 1,
  },
  {
    id: "02",
    title: "GIT & GITHUB SETUP",
    subtitle: "Version Control",
    category: "VERSION CONTROL",
    color: "#60A5FA",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
    description: "Set up Git locally and created a GitHub account to host and share code remotely.",
    what: "Set up Git version control locally and created a GitHub account to host and share code remotely.",
    steps: [
      "Installed Git and configured global user name and email",
      "Created a GitHub account and set up SSH authentication",
      "Initialized a local repository with git init",
      "Pushed the first Hello World commit to GitHub",
    ],
    extensions: ["git init", "git add", "git commit", "git push"],
    outcome: "First remote repository live on GitHub — establishing a version control habit from day one.",
    github: "[ADD GITHUB LINK]",
    seq: 2,
  },
  {
    id: "03",
    title: "GITLENS & LIVE SHARE",
    subtitle: "Collaboration Tools",
    category: "COLLABORATION",
    color: "#93C5FD",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    description: "Installed GitLens for advanced Git visualization and used Live Share for real-time collaboration.",
    what: "Installed GitLens for advanced Git visualization and used VS Code Live Share for real-time collaborative coding.",
    steps: [
      "Installed GitLens extension in VS Code",
      "Explored Git blame, history, and commit annotations",
      "Set up VS Code Live Share for pair programming",
      "Practiced real-time collaborative editing with a partner",
    ],
    extensions: ["GitLens", "Live Share"],
    outcome: "Experienced real-time collaboration and gained visibility into project Git history at every line of code.",
    github: null,
    seq: 3,
  },
  {
    id: "04",
    title: "LEETCODE PRACTICE",
    subtitle: "Repository",
    category: "PROBLEM SOLVING",
    color: "#BFDBFE",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
      </svg>
    ),
    description: "Created a dedicated GitHub repository to track LeetCode solutions and algorithmic learning progress.",
    what: "Created a dedicated GitHub repository to document LeetCode problem-solving progress and organize solutions.",
    steps: [
      "Created a new GitHub repository for LeetCode solutions",
      "Organized folder structure by difficulty and topic",
      "Documented solutions with explanations and complexity notes",
      "Committed regularly to maintain a consistent practice log",
    ],
    extensions: ["GitHub", "Git", "Markdown", "VS Code"],
    outcome: "A living repository that tracks algorithmic learning progress — available for review and future growth.",
    github: "[ADD GITHUB LINK]",
    seq: 4,
  },
];

/* ─── Sequence indicator ────────────────────────── */
function SequenceIndicator({ seq, total }: { seq: number; total: number }) {
  return (
    <div className="flex items-center gap-1 mt-3">
      {Array.from({ length: total }, (_, i) => (
        <div
          key={i}
          className="transition-all duration-300"
          style={{
            width: i < seq ? 6 : 12,
            height: 2,
            borderRadius: 1,
            background: i < seq ? "rgba(59,130,246,0.8)" : "rgba(255,255,255,0.1)",
          }}
        />
      ))}
    </div>
  );
}

/* ─── Mission Card Component ────────────────────── */
function MissionCard({
  activity,
  index,
  isExpanded,
  onToggle,
  hoveredIdx,
  onHover,
}: {
  activity: typeof ACTIVITIES[0];
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
  hoveredIdx: number | null;
  onHover: (idx: number | null) => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const lightRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const expandedRef = useRef<HTMLDivElement>(null);

  // Card mouse tracking for light effect & subtle tilt
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const card = cardRef.current;
    const light = lightRef.current;
    if (!card || !light) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;

    // Move radial light to cursor position
    light.style.background = `radial-gradient(circle 120px at ${x}px ${y}px, rgba(59,130,246,0.12) 0%, transparent 70%)`;
    light.style.opacity = "1";

    // Subtle 3D tilt — max 2.5deg
    const rotateY = ((x - cx) / cx) * 2.5;
    const rotateX = ((cy - y) / cy) * 2.5;
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px) scale(1.018)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    const light = lightRef.current;
    if (!card || !light) return;
    card.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)";
    light.style.opacity = "0";
    onHover(null);
  }, [onHover]);

  const handleMouseEnter = useCallback(() => {
    onHover(index);
  }, [index, onHover]);

  // GSAP expand/collapse animation
  useEffect(() => {
    const expandedEl = expandedRef.current;
    if (!expandedEl) return;

    if (isExpanded) {
      gsap.fromTo(
        expandedEl,
        { height: 0, opacity: 0 },
        { height: "auto", opacity: 1, duration: 0.5, ease: "power3.out" }
      );
    } else {
      gsap.to(expandedEl, { height: 0, opacity: 0, duration: 0.35, ease: "power3.inOut" });
    }
  }, [isExpanded]);

  const isConnected = hoveredIdx !== null && hoveredIdx !== index && (
    Math.abs(hoveredIdx - index) === 1 ||
    (hoveredIdx === 0 && index === 1) ||
    (hoveredIdx === 1 && index === 0) ||
    (hoveredIdx === 1 && index === 2) ||
    (hoveredIdx === 2 && index === 1) ||
    (hoveredIdx === 2 && index === 3) ||
    (hoveredIdx === 3 && index === 2)
  );

  return (
    <div
      ref={cardRef}
      data-mission-card
      className="relative rounded-[20px] overflow-hidden group"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: isConnected
          ? "1px solid rgba(59,130,246,0.35)"
          : "1px solid rgba(255,255,255,0.08)",
        backdropFilter: "blur(20px) saturate(1.3)",
        WebkitBackdropFilter: "blur(20px) saturate(1.3)",
        transition: "transform 0.4s cubic-bezier(0.23,1,0.32,1), border-color 0.4s ease, box-shadow 0.4s ease",
        boxShadow: hoveredIdx === index
          ? "0 8px 32px rgba(59,130,246,0.12), 0 0 0 1px rgba(59,130,246,0.15)"
          : "0 2px 12px rgba(0,0,0,0.3)",
        cursor: "pointer",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      onClick={onToggle}
    >
      {/* Cursor-following radial light */}
      <div
        ref={lightRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[20px] transition-opacity duration-300"
        style={{ opacity: 0 }}
      />

      {/* Top accent line */}
      <div
        aria-hidden
        className="absolute top-0 left-6 right-6 h-px transition-opacity duration-400"
        style={{
          background: `linear-gradient(90deg, transparent, ${activity.color}60, transparent)`,
          opacity: hoveredIdx === index ? 1 : 0.3,
        }}
      />

      {/* Card content */}
      <div ref={contentRef} className="relative p-6 md:p-7">
        {/* Header row */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            {/* Number badge */}
            <div
              className="flex-shrink-0 w-10 h-10 rounded-[12px] flex items-center justify-center transition-all duration-300"
              style={{
                background: "rgba(59,130,246,0.1)",
                border: "1px solid rgba(59,130,246,0.2)",
              }}
            >
              <span
                className="text-[11px] font-bold tracking-[0.15em] transition-colors duration-300"
                style={{ color: hoveredIdx === index ? "#fff" : activity.color }}
              >
                {activity.id}
              </span>
            </div>

            {/* Category badge */}
            <span
              className="text-[8px] tracking-[0.25em] uppercase font-medium px-2.5 py-1 rounded-full"
              style={{
                background: "rgba(59,130,246,0.08)",
                border: "1px solid rgba(59,130,246,0.15)",
                color: "rgba(96,165,250,0.7)",
              }}
            >
              {activity.category}
            </span>
          </div>

          {/* Icon */}
          <div
            className="flex-shrink-0 w-9 h-9 rounded-[10px] flex items-center justify-center transition-all duration-300 group-hover:scale-110"
            style={{
              background: "rgba(59,130,246,0.08)",
              border: "1px solid rgba(59,130,246,0.15)",
              color: activity.color,
            }}
          >
            {activity.icon}
          </div>
        </div>

        {/* Title */}
        <h3
          className="font-semibold text-white leading-tight mb-1 transition-all duration-300"
          style={{
            fontSize: "clamp(0.95rem, 1.8vw, 1.15rem)",
            letterSpacing: "-0.01em",
          }}
        >
          {activity.title}
        </h3>

        {/* Subtitle */}
        <p
          className="text-[11px] tracking-[0.06em] mb-3 transition-colors duration-300"
          style={{ color: "rgba(161,161,170,0.65)" }}
        >
          {activity.subtitle}
        </p>

        {/* Description */}
        <p className="text-[13px] text-[#A1A1AA] leading-relaxed mb-3">
          {activity.description}
        </p>

        {/* Sequence indicator */}
        <SequenceIndicator seq={activity.seq} total={4} />

        {/* Expand hint */}
        <div className="flex items-center gap-2 mt-4">
          <div
            className="w-5 h-5 rounded-full flex items-center justify-center transition-all duration-300"
            style={{
              background: isExpanded ? "rgba(59,130,246,0.2)" : "rgba(255,255,255,0.05)",
              border: isExpanded ? "1px solid rgba(59,130,246,0.4)" : "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <svg
              width="10"
              height="10"
              viewBox="0 0 12 12"
              fill="none"
              stroke={isExpanded ? "#3B82F6" : "#A1A1AA"}
              strokeWidth="1.5"
              className="transition-transform duration-300"
              style={{ transform: isExpanded ? "rotate(45deg)" : "rotate(0deg)" }}
            >
              <line x1="6" y1="2" x2="6" y2="10" />
              <line x1="2" y1="6" x2="10" y2="6" />
            </svg>
          </div>
          <span className="text-[9px] tracking-[0.2em] uppercase" style={{ color: "rgba(161,161,170,0.45)" }}>
            {isExpanded ? "Close" : "View Mission"}
          </span>
        </div>
      </div>

      {/* ── Expanded detail panel ──────────────── */}
      <div ref={expandedRef} className="overflow-hidden" style={{ height: 0, opacity: 0 }}>
        <div className="px-6 md:px-7 pb-7">
          {/* Divider */}
          <div className="h-px mb-6" style={{ background: "rgba(255,255,255,0.06)" }} />

          {/* Activity label */}
          <div className="flex items-center gap-3 mb-4">
            <span
              className="text-[10px] tracking-[0.35em] uppercase font-semibold"
              style={{ color: activity.color }}
            >
              Activity {activity.id}
            </span>
          </div>

          {/* Overview */}
          <div className="mb-5">
            <p className="text-[10px] tracking-[0.3em] text-[#3B82F6] uppercase mb-2">Overview</p>
            <p className="text-[#A1A1AA] text-[13px] leading-relaxed">{activity.what}</p>
          </div>

          {/* Steps */}
          <div className="mb-5">
            <p className="text-[10px] tracking-[0.3em] text-[#3B82F6] uppercase mb-3">Steps Completed</p>
            <ul className="flex flex-col gap-2">
              {activity.steps.map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span
                    className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold"
                    style={{
                      background: "rgba(59,130,246,0.12)",
                      border: "1px solid rgba(59,130,246,0.25)",
                      color: "#3B82F6",
                    }}
                  >
                    {i + 1}
                  </span>
                  <span className="text-[13px] text-[#A1A1AA] leading-snug">{step}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tools Used */}
          <div className="mb-5">
            <p className="text-[10px] tracking-[0.3em] text-[#3B82F6] uppercase mb-3">Tools Used</p>
            <div className="flex flex-wrap gap-2">
              {activity.extensions.map(ext => (
                <span
                  key={ext}
                  className="text-[11px] px-3 py-1.5 rounded-full text-white"
                  style={{
                    background: "rgba(59,130,246,0.1)",
                    border: "1px solid rgba(59,130,246,0.2)",
                  }}
                >
                  {ext}
                </span>
              ))}
            </div>
          </div>

          {/* Outcome */}
          <div
            className="rounded-[14px] p-4"
            style={{
              background: "rgba(37,99,235,0.07)",
              border: "1px solid rgba(59,130,246,0.15)",
            }}
          >
            <p className="text-[10px] tracking-[0.3em] text-[#3B82F6] uppercase mb-2">Outcome</p>
            <p className="text-[13px] text-[#A1A1AA] leading-relaxed">{activity.outcome}</p>
          </div>

          {/* GitHub link */}
          {activity.github && (
            <div className="flex items-center gap-3 pt-4">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="rgba(59,130,246,0.7)">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              {activity.github.startsWith("[") ? (
                <span className="text-[11px] tracking-[0.15em] uppercase text-[#A1A1AA] italic">{activity.github}</span>
              ) : (
                <a
                  href={activity.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] tracking-[0.15em] uppercase text-[#3B82F6] hover:text-[#60A5FA] transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  View on GitHub →
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Main Activities Section ───────────────────── */
export default function Activities() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const connectionsRef = useRef<SVGSVGElement>(null);
  const bgLightRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLCanvasElement>(null);

  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const handleToggle = useCallback((idx: number) => {
    setExpandedIdx(prev => (prev === idx ? null : idx));
  }, []);

  const handleHover = useCallback((idx: number | null) => {
    setHoveredIdx(idx);
  }, []);

  // Background light follows cursor
  useEffect(() => {
    const bgLight = bgLightRef.current;
    const section = sectionRef.current;
    if (!bgLight || !section) return;

    const isFine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!isFine) return;

    const onMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      bgLight.style.background = `radial-gradient(circle 300px at ${x}px ${y}px, rgba(37,99,235,0.06) 0%, transparent 70%)`;
    };

    section.addEventListener("mousemove", onMove);
    return () => section.removeEventListener("mousemove", onMove);
  }, []);

  // Subtle particle canvas
  useEffect(() => {
    const canvas = particlesRef.current;
    if (!canvas) return;

    const isFine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!isFine || reduced) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const particles: { x: number; y: number; vx: number; vy: number; size: number; alpha: number; }[] = [];
    const PARTICLE_COUNT = 25;

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (rect) {
        canvas.width = rect.width;
        canvas.height = rect.height;
      }
    };
    resize();
    window.addEventListener("resize", resize);

    // Init particles
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.3 + 0.05,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(59,130,246,${p.alpha})`;
        ctx.fill();
      });
      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  // GSAP staggered scroll reveal
  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    if (!section || !title || !subtitle) return;

    const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
    const connections = connectionsRef.current;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 75%",
        once: true,
      },
    });

    // Section label
    tl.fromTo(
      title,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }
    );

    // Subtitle
    tl.fromTo(
      subtitle,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
      "-=0.4"
    );

    // Cards — staggered
    cards.forEach((card, i) => {
      tl.fromTo(
        card,
        { opacity: 0, y: 40, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "power3.out" },
        `-=${0.45 - i * 0.08}`
      );
    });

    // Connection lines
    if (connections) {
      tl.fromTo(
        connections,
        { opacity: 0 },
        { opacity: 1, duration: 0.8, ease: "power2.out" },
        "-=0.3"
      );
    }

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      id="activities"
      ref={sectionRef}
      className="relative bg-[#050505] py-28 px-6 md:px-10 overflow-hidden"
    >
      {/* Background layers */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {/* Base radial gradient */}
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse 60% 50% at 50% 40%, rgba(37,99,235,0.06), transparent 70%)",
          }}
        />

        {/* Cursor-reactive light */}
        <div ref={bgLightRef} className="absolute inset-0 transition-none" />

        {/* Subtle grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59,130,246,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59,130,246,0.03) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />

        {/* Particle canvas */}
        <canvas
          ref={particlesRef}
          className="absolute inset-0 w-full h-full"
          style={{ opacity: 0.5 }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Section label + Title */}
        <div ref={titleRef} className="mb-4" style={{ opacity: 0 }}>
          <div className="flex items-center gap-4 mb-6">
            <span className="text-[10px] tracking-[0.45em] text-[#3B82F6] uppercase font-medium">02</span>
            <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, rgba(59,130,246,0.4), transparent)" }} />
            <span className="text-[10px] tracking-[0.45em] text-[#A1A1AA] uppercase">Activities</span>
          </div>

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
            Tech Missions
          </h2>
        </div>

        <p
          ref={subtitleRef}
          className="text-[#A1A1AA] text-sm max-w-lg mb-16"
          style={{ opacity: 0 }}
        >
          Four hands-on technical activities that form the foundation of my learning journey.
        </p>

        {/* ── Cards Grid ──────────────────────────── */}
        <div className="relative">
          {/* Connection SVG — desktop only */}
          <svg
            ref={connectionsRef}
            className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block"
            style={{ opacity: 0, zIndex: 0 }}
            preserveAspectRatio="none"
          >
            {/* Line 01→02 */}
            <line
              x1="48%"
              y1="15%"
              x2="52%"
              y2="15%"
              stroke={hoveredIdx === 0 || hoveredIdx === 1 ? "rgba(59,130,246,0.45)" : "rgba(59,130,246,0.1)"}
              strokeWidth="1"
              strokeDasharray="4 4"
              style={{ transition: "stroke 0.4s ease" }}
            />
            {/* Line 02→03 diagonal */}
            <line
              x1="70%"
              y1="38%"
              x2="30%"
              y2="62%"
              stroke={hoveredIdx === 1 || hoveredIdx === 2 ? "rgba(59,130,246,0.45)" : "rgba(59,130,246,0.08)"}
              strokeWidth="1"
              strokeDasharray="4 4"
              style={{ transition: "stroke 0.4s ease" }}
            />
            {/* Line 01→03 diagonal */}
            <line
              x1="30%"
              y1="38%"
              x2="30%"
              y2="62%"
              stroke={hoveredIdx === 0 || hoveredIdx === 2 ? "rgba(59,130,246,0.35)" : "rgba(59,130,246,0.06)"}
              strokeWidth="1"
              strokeDasharray="4 4"
              style={{ transition: "stroke 0.4s ease" }}
            />
            {/* Line 03→04 */}
            <line
              x1="48%"
              y1="85%"
              x2="52%"
              y2="85%"
              stroke={hoveredIdx === 2 || hoveredIdx === 3 ? "rgba(59,130,246,0.45)" : "rgba(59,130,246,0.1)"}
              strokeWidth="1"
              strokeDasharray="4 4"
              style={{ transition: "stroke 0.4s ease" }}
            />
            {/* Line 02→04 diagonal */}
            <line
              x1="70%"
              y1="38%"
              x2="70%"
              y2="62%"
              stroke={hoveredIdx === 1 || hoveredIdx === 3 ? "rgba(59,130,246,0.35)" : "rgba(59,130,246,0.06)"}
              strokeWidth="1"
              strokeDasharray="4 4"
              style={{ transition: "stroke 0.4s ease" }}
            />
          </svg>

          {/* 2x2 Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6 relative z-10">
            {ACTIVITIES.map((activity, i) => (
              <div
                key={activity.id}
                ref={el => { cardsRef.current[i] = el; }}
                style={{ opacity: 0 }}
              >
                <MissionCard
                  activity={activity}
                  index={i}
                  isExpanded={expandedIdx === i}
                  onToggle={() => handleToggle(i)}
                  hoveredIdx={hoveredIdx}
                  onHover={handleHover}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
