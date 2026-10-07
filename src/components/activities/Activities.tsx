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
    colorRgb: "59,130,246",
    emoji: "⚡",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
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
    github: "https://github.com/manjunathn9681/Hello-World",
  },
  {
    id: "02",
    title: "GIT & GITHUB SETUP",
    subtitle: "Version Control",
    category: "VERSION CONTROL",
    color: "#60A5FA",
    colorRgb: "96,165,250",
    emoji: "🔗",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
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
    github: "https://github.com/manjunathn9681/Hello-World",
  },
  {
    id: "03",
    title: "GITLENS & LIVE SHARE",
    subtitle: "Collaboration Tools",
    category: "COLLABORATION",
    color: "#93C5FD",
    colorRgb: "147,197,253",
    emoji: "🤝",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
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
    github: "https://github.com/manjunathn9681/Hello-World",
  },
  {
    id: "04",
    title: "LEETCODE PRACTICE",
    subtitle: "Problem Solving",
    category: "PROBLEM SOLVING",
    color: "#BFDBFE",
    colorRgb: "191,219,254",
    emoji: "🧠",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
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
    github: "https://github.com/manjunathn9681/leetcode-solutions",
  },
];

/* ─── Train SVG Component ──────────────────────────────── */
function TrainSVG({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 120 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Engine body */}
      <rect x="4" y="12" width="68" height="34" rx="6" fill={`rgba(${color},0.15)`} stroke={`rgba(${color},0.7)`} strokeWidth="1.5"/>
      {/* Engine cab */}
      <rect x="56" y="6" width="22" height="20" rx="4" fill={`rgba(${color},0.2)`} stroke={`rgba(${color},0.8)`} strokeWidth="1.5"/>
      {/* Chimney */}
      <rect x="12" y="4" width="8" height="10" rx="2" fill={`rgba(${color},0.3)`} stroke={`rgba(${color},0.6)`} strokeWidth="1"/>
      {/* Smoke puffs */}
      <circle cx="16" cy="2" r="3" fill={`rgba(${color},0.2)`} className="animate-pulse" />
      <circle cx="22" cy="0" r="2" fill={`rgba(${color},0.12)`} className="animate-pulse" />
      {/* Windows */}
      <rect x="14" y="18" width="14" height="10" rx="2" fill={`rgba(${color},0.25)`} stroke={`rgba(${color},0.5)`} strokeWidth="1"/>
      <rect x="34" y="18" width="14" height="10" rx="2" fill={`rgba(${color},0.25)`} stroke={`rgba(${color},0.5)`} strokeWidth="1"/>
      {/* Cab window */}
      <rect x="60" y="10" width="14" height="10" rx="2" fill={`rgba(${color},0.4)`} stroke={`rgba(${color},0.7)`} strokeWidth="1"/>
      {/* Headlight */}
      <circle cx="76" cy="29" r="4" fill={`rgba(${color},0.6)`} stroke={`rgba(${color},1)`} strokeWidth="1.5"/>
      <circle cx="76" cy="29" r="2" fill={`rgba(${color},1)`} />
      {/* Wheels */}
      {[14, 30, 46, 62].map(x => (
        <g key={x}>
          <circle cx={x} cy="46" r="8" fill={`rgba(${color},0.1)`} stroke={`rgba(${color},0.6)`} strokeWidth="1.5"/>
          <circle cx={x} cy="46" r="3" fill={`rgba(${color},0.4)`}/>
          <line x1={x} y1="38" x2={x} y2="54" stroke={`rgba(${color},0.4)`} strokeWidth="1"/>
          <line x1={x-8} y1="46" x2={x+8} y2="46" stroke={`rgba(${color},0.4)`} strokeWidth="1"/>
        </g>
      ))}
      {/* Connecting rods */}
      <line x1="14" y1="46" x2="30" y2="46" stroke={`rgba(${color},0.3)`} strokeWidth="2"/>
      <line x1="30" y1="46" x2="46" y2="46" stroke={`rgba(${color},0.3)`} strokeWidth="2"/>
      {/* Glow effect */}
      <rect x="4" y="12" width="68" height="34" rx="6" fill="none"
        stroke={`rgba(${color},0.3)`} strokeWidth="4" style={{filter:`blur(4px)`}}/>
    </svg>
  );
}

/* ─── Wagon SVG Component ──────────────────────────────── */
function WagonSVG({ color, label }: { color: string; label: string }) {
  return (
    <svg viewBox="0 0 90 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Wagon body */}
      <rect x="4" y="10" width="82" height="34" rx="5" fill={`rgba(${color},0.1)`} stroke={`rgba(${color},0.6)`} strokeWidth="1.5"/>
      {/* Top stripe */}
      <rect x="4" y="10" width="82" height="6" rx="5" fill={`rgba(${color},0.2)`}/>
      {/* Cargo label */}
      <text x="45" y="31" textAnchor="middle" fill={`rgba(${color},0.9)`}
        style={{fontSize:"9px", fontFamily:"monospace", fontWeight:"bold", letterSpacing:"0.1em"}}>
        {label}
      </text>
      {/* Connector left */}
      <rect x="0" y="26" width="6" height="4" rx="1" fill={`rgba(${color},0.4)`}/>
      {/* Connector right */}
      <rect x="84" y="26" width="6" height="4" rx="1" fill={`rgba(${color},0.4)`}/>
      {/* Wheels */}
      {[18, 46, 72].map(x => (
        <g key={x}>
          <circle cx={x} cy="46" r="7" fill={`rgba(${color},0.08)`} stroke={`rgba(${color},0.5)`} strokeWidth="1.2"/>
          <circle cx={x} cy="46" r="2.5" fill={`rgba(${color},0.3)`}/>
        </g>
      ))}
    </svg>
  );
}

/* ─── Train Canvas Animation ──────────────────────────── */
function TrainCanvas({ activeIdx, onWagonClick }: {
  activeIdx: number | null;
  onWagonClick: (idx: number) => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const trainXRef = useRef(0);
  const sparkParticles = useRef<{x:number;y:number;vx:number;vy:number;life:number;color:string}[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const W = () => canvas.width;
    const H = () => canvas.height;
    const TRACK_Y = () => H() * 0.72;
    const TRAIN_SPEED = 0.4; // px per frame
    const WAGON_SPACING = 110;
    const TRAIN_W = 140; // engine width
    const WAGON_W = 95;
    const TOTAL_TRAIN_W = TRAIN_W + ACTIVITIES.length * WAGON_SPACING;

    let rafId = 0;
    let lastTime = 0;
    let tx = -TOTAL_TRAIN_W; // start off-screen left

    const spawnSparks = (x: number, y: number, color: string) => {
      for (let i = 0; i < 3; i++) {
        sparkParticles.current.push({
          x, y,
          vx: (Math.random() - 0.5) * 3,
          vy: -Math.random() * 2 - 1,
          life: 1,
          color,
        });
      }
    };

    const drawTrack = () => {
      const gy = TRACK_Y();
      // Rail 1
      ctx.beginPath();
      ctx.strokeStyle = "rgba(59,130,246,0.2)";
      ctx.lineWidth = 3;
      ctx.moveTo(0, gy + 18);
      ctx.lineTo(W(), gy + 18);
      ctx.stroke();
      // Rail 2
      ctx.beginPath();
      ctx.strokeStyle = "rgba(59,130,246,0.2)";
      ctx.lineWidth = 3;
      ctx.moveTo(0, gy + 22);
      ctx.lineTo(W(), gy + 22);
      ctx.stroke();

      // Sleepers (ties)
      ctx.strokeStyle = "rgba(59,130,246,0.1)";
      ctx.lineWidth = 2;
      const sleeperSpacing = 40;
      const offset = ((tx * 0.8) % sleeperSpacing + sleeperSpacing) % sleeperSpacing;
      for (let sx = -offset; sx < W() + sleeperSpacing; sx += sleeperSpacing) {
        ctx.beginPath();
        ctx.moveTo(sx, gy + 14);
        ctx.lineTo(sx, gy + 26);
        ctx.stroke();
      }

      // Glowing rail glow
      const glowGrad = ctx.createLinearGradient(0, 0, W(), 0);
      glowGrad.addColorStop(0, "transparent");
      glowGrad.addColorStop(0.3, "rgba(59,130,246,0.08)");
      glowGrad.addColorStop(0.7, "rgba(59,130,246,0.08)");
      glowGrad.addColorStop(1, "transparent");
      ctx.fillStyle = glowGrad;
      ctx.fillRect(0, gy + 10, W(), 16);
    };

    const drawSmoke = (x: number, y: number, t: number) => {
      for (let i = 0; i < 3; i++) {
        const age = ((t * 0.001 + i * 0.33) % 1);
        const sx = x + age * 30;
        const sy = y - age * 40;
        const r = 8 + age * 15;
        const alpha = (1 - age) * 0.25;
        ctx.beginPath();
        ctx.arc(sx, sy, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(150,180,255,${alpha})`;
        ctx.fill();
      }
    };

    const drawEngine = (x: number, y: number, t: number) => {
      const rgb = "59,130,246";
      // Glow under engine
      const grad = ctx.createRadialGradient(x + 60, y, 0, x + 60, y, 60);
      grad.addColorStop(0, `rgba(${rgb},0.15)`);
      grad.addColorStop(1, "transparent");
      ctx.fillStyle = grad;
      ctx.fillRect(x, y - 30, 140, 80);

      // Engine body
      ctx.beginPath();
      roundRect(ctx, x + 4, y - 30, 100, 44, 8);
      ctx.fillStyle = `rgba(${rgb},0.12)`;
      ctx.fill();
      ctx.strokeStyle = `rgba(${rgb},0.8)`;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Cab
      ctx.beginPath();
      roundRect(ctx, x + 80, y - 38, 36, 32, 6);
      ctx.fillStyle = `rgba(${rgb},0.18)`;
      ctx.fill();
      ctx.strokeStyle = `rgba(${rgb},0.9)`;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Chimney
      ctx.beginPath();
      roundRect(ctx, x + 12, y - 42, 10, 14, 3);
      ctx.fillStyle = `rgba(${rgb},0.25)`;
      ctx.fill();
      ctx.strokeStyle = `rgba(${rgb},0.5)`;
      ctx.lineWidth = 1;
      ctx.stroke();

      // Smoke
      drawSmoke(x + 17, y - 42, t);

      // Windows
      [[16, y-24], [36, y-24]].forEach(([wx, wy]) => {
        ctx.beginPath();
        roundRect(ctx, wx as number, wy as number, 16, 12, 3);
        ctx.fillStyle = `rgba(${rgb},0.3)`;
        ctx.fill();
        ctx.strokeStyle = `rgba(${rgb},0.5)`;
        ctx.lineWidth = 1;
        ctx.stroke();
        // Shine
        ctx.beginPath();
        ctx.moveTo((wx as number) + 3, (wy as number) + 2);
        ctx.lineTo((wx as number) + 7, (wy as number) + 2);
        ctx.strokeStyle = `rgba(255,255,255,0.3)`;
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // Cab window
      ctx.beginPath();
      roundRect(ctx, x + 84, y - 32, 18, 12, 3);
      ctx.fillStyle = `rgba(${rgb},0.4)`;
      ctx.fill();
      ctx.strokeStyle = `rgba(${rgb},0.7)`;
      ctx.lineWidth = 1;
      ctx.stroke();

      // Headlight glow
      const hlGrad = ctx.createRadialGradient(x + 118, y - 8, 0, x + 118, y - 8, 20);
      hlGrad.addColorStop(0, `rgba(${rgb},0.9)`);
      hlGrad.addColorStop(0.3, `rgba(${rgb},0.4)`);
      hlGrad.addColorStop(1, "transparent");
      ctx.fillStyle = hlGrad;
      ctx.beginPath();
      ctx.arc(x + 118, y - 8, 20, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.arc(x + 118, y - 8, 5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${rgb},1)`;
      ctx.fill();

      // Wheels with rotation
      const wRot = t * 0.003;
      [x + 16, x + 38, x + 62, x + 84].forEach((wx) => {
        const wy = y + 14;
        // Wheel shadow
        ctx.beginPath();
        ctx.ellipse(wx, wy + 9, 10, 3, 0, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0,0,0,0.3)";
        ctx.fill();
        // Wheel
        ctx.beginPath();
        ctx.arc(wx, wy, 10, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb},0.1)`;
        ctx.fill();
        ctx.strokeStyle = `rgba(${rgb},0.7)`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        // Spokes
        for (let s = 0; s < 4; s++) {
          const angle = wRot + (s / 4) * Math.PI * 2;
          ctx.beginPath();
          ctx.moveTo(wx, wy);
          ctx.lineTo(wx + Math.cos(angle) * 9, wy + Math.sin(angle) * 9);
          ctx.strokeStyle = `rgba(${rgb},0.4)`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
        // Hub
        ctx.beginPath();
        ctx.arc(wx, wy, 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb},0.6)`;
        ctx.fill();

        // Spark occasionally
        if (Math.random() < 0.005) spawnSparks(wx, wy + 10, `rgb(${rgb})`);
      });

      // Connecting rods
      ctx.beginPath();
      ctx.moveTo(x + 16, y + 14);
      ctx.lineTo(x + 84, y + 14);
      ctx.strokeStyle = `rgba(${rgb},0.35)`;
      ctx.lineWidth = 2;
      ctx.stroke();
    };

    const drawWagon = (x: number, y: number, idx: number, active: boolean, t: number) => {
      const a = ACTIVITIES[idx];
      const rgb = a.colorRgb;
      const bounce = Math.sin(t * 0.002 + idx * 1.2) * 1.5;
      const wy = y + bounce;

      // Wagon coupler
      ctx.beginPath();
      ctx.moveTo(x, wy - 2);
      ctx.lineTo(x - 10, wy - 2);
      ctx.strokeStyle = `rgba(${rgb},0.5)`;
      ctx.lineWidth = 2;
      ctx.stroke();

      // Glow if active
      if (active) {
        const grad = ctx.createRadialGradient(x + 45, wy - 16, 0, x + 45, wy - 16, 55);
        grad.addColorStop(0, `rgba(${rgb},0.2)`);
        grad.addColorStop(1, "transparent");
        ctx.fillStyle = grad;
        ctx.fillRect(x - 10, wy - 50, 110, 80);
      }

      // Wagon body
      ctx.beginPath();
      roundRect(ctx, x, wy - 34, 90, 34, 6);
      ctx.fillStyle = active ? `rgba(${rgb},0.2)` : `rgba(${rgb},0.08)`;
      ctx.fill();
      ctx.strokeStyle = active ? `rgba(${rgb},0.9)` : `rgba(${rgb},0.5)`;
      ctx.lineWidth = active ? 1.8 : 1.2;
      ctx.stroke();

      // Top accent stripe
      ctx.beginPath();
      roundRect(ctx, x, wy - 34, 90, 5, 6);
      ctx.fillStyle = `rgba(${rgb},${active ? 0.35 : 0.15})`;
      ctx.fill();

      // Rivets
      [[8, wy-30], [8, wy-12], [82, wy-30], [82, wy-12]].forEach(([rx, ry]) => {
        ctx.beginPath();
        ctx.arc(x + (rx as number), ry as number, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb},0.4)`;
        ctx.fill();
      });

      // Mission number badge
      ctx.beginPath();
      ctx.arc(x + 15, wy - 20, 10, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${rgb},${active ? 0.3 : 0.12})`;
      ctx.fill();
      ctx.strokeStyle = `rgba(${rgb},${active ? 0.8 : 0.4})`;
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.fillStyle = `rgba(${rgb},1)`;
      ctx.font = "bold 9px monospace";
      ctx.textAlign = "center";
      ctx.fillText(a.id, x + 15, wy - 16);

      // Title text
      ctx.fillStyle = `rgba(${rgb},${active ? 0.95 : 0.6})`;
      ctx.font = `${active ? 'bold ' : ''}8.5px monospace`;
      ctx.textAlign = "center";
      ctx.fillText(a.title.length > 14 ? a.title.slice(0, 14) + "…" : a.title, x + 53, wy - 18);
      ctx.fillStyle = `rgba(${rgb},0.5)`;
      ctx.font = "7px monospace";
      ctx.fillText(a.category, x + 53, wy - 8);

      // Wheels with rotation
      const wRot = t * 0.002;
      [x + 16, x + 45, x + 74].forEach((wx) => {
        const wheelY = wy + 8;
        ctx.beginPath();
        ctx.ellipse(wx, wheelY + 8, 8, 2.5, 0, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0,0,0,0.25)";
        ctx.fill();

        ctx.beginPath();
        ctx.arc(wx, wheelY, 9, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb},0.08)`;
        ctx.fill();
        ctx.strokeStyle = `rgba(${rgb},${active ? 0.7 : 0.4})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();

        for (let s = 0; s < 3; s++) {
          const angle = wRot + idx * 0.5 + (s / 3) * Math.PI * 2;
          ctx.beginPath();
          ctx.moveTo(wx, wheelY);
          ctx.lineTo(wx + Math.cos(angle) * 8, wheelY + Math.sin(angle) * 8);
          ctx.strokeStyle = `rgba(${rgb},0.3)`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
        ctx.beginPath();
        ctx.arc(wx, wheelY, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb},0.5)`;
        ctx.fill();
      });

      // Active pulse ring
      if (active) {
        const pulseR = 8 + Math.sin(t * 0.005) * 4;
        ctx.beginPath();
        ctx.arc(x + 45, wy - 17, pulseR + 14, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${rgb},${0.2 + Math.sin(t * 0.005) * 0.1})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    };

    const drawSparks = () => {
      sparkParticles.current = sparkParticles.current.filter(p => p.life > 0);
      sparkParticles.current.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.1;
        p.life -= 0.04;
        const radius = Math.max(0, 2 * p.life);
        if (radius > 0) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
          ctx.fillStyle = p.color.replace("rgb", "rgba").replace(")", `,${Math.max(0, p.life)})`);
          ctx.fill();
        }
      });
    };

    // Speed boost when wagon clicked
    let speedBoost = 1;

    const draw = (timestamp: number) => {
      rafId = requestAnimationFrame(draw);
      const dt = Math.min(timestamp - lastTime, 32);
      lastTime = timestamp;

      ctx.clearRect(0, 0, W(), H());

      // Advance train
      tx += TRAIN_SPEED * speedBoost;
      speedBoost = Math.max(1, speedBoost - 0.02);

      // Loop train: when fully off screen right, restart from left
      if (tx > W() + TOTAL_TRAIN_W + 200) {
        tx = -TOTAL_TRAIN_W - 200;
      }

      drawTrack();

      const gy = TRACK_Y();
      const engineX = tx;
      const engineY = gy - 24;

      // Draw wagons (right to left order so engine overlaps)
      for (let i = ACTIVITIES.length - 1; i >= 0; i--) {
        const wagonX = engineX - (i + 1) * WAGON_SPACING + 10;
        drawWagon(wagonX, engineY + 4, i, activeIdx === i, timestamp);
      }

      // Draw engine on top
      drawEngine(engineX, engineY, timestamp);

      drawSparks();

      // Speed boost on train passing
      if (speedBoost <= 1.02) speedBoost = 1;
    };

    rafId = requestAnimationFrame(draw);

    // Cursor interaction for speed
    let lastMouseX = -1;
    let lastMouseTime = 0;
    const onMouseMove = (e: MouseEvent) => {
      const currentTime = performance.now();
      if (lastMouseX !== -1) {
        const dx = e.clientX - lastMouseX;
        const dt = currentTime - lastMouseTime;
        if (dt > 0) {
          const velocity = Math.abs(dx / dt);
          if (velocity > 0.2) {
             speedBoost = Math.max(speedBoost, 1 + velocity * 1.5);
             if (speedBoost > 6) speedBoost = 6; // Cap maximum speed
          }
        }
      }
      lastMouseX = e.clientX;
      lastMouseTime = currentTime;
    };
    canvas.addEventListener("mousemove", onMouseMove);

    // Click detection on wagons
    const onClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;
      const gy = canvas.height * 0.72;
      const engineY = gy - 24;

      for (let i = 0; i < ACTIVITIES.length; i++) {
        const wagonX = tx - (i + 1) * WAGON_SPACING + 10;
        const wy = engineY + 4;
        if (cx >= wagonX && cx <= wagonX + 90 && cy >= wy - 34 && cy <= wy + 18) {
          onWagonClick(i);
          speedBoost = 1.8;
          // Spawn burst sparks
          for (let s = 0; s < 12; s++) {
            sparkParticles.current.push({
              x: wagonX + 45, y: wy - 10,
              vx: (Math.random() - 0.5) * 6,
              vy: -Math.random() * 4 - 1,
              life: 1,
              color: `rgb(${ACTIVITIES[i].colorRgb})`,
            });
          }
          break;
        }
      }
    };
    canvas.addEventListener("click", onClick);

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("click", onClick);
    };
  }, [activeIdx, onWagonClick]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full block cursor-pointer"
      style={{ height: 200 }}
    />
  );
}

/* ─── Helper: roundRect ──────────────────────────────── */
function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.arcTo(x + w, y, x + w, y + r, r);
  ctx.lineTo(x + w, y + h - r);
  ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
  ctx.lineTo(x + r, y + h);
  ctx.arcTo(x, y + h, x, y + h - r, r);
  ctx.lineTo(x, y + r);
  ctx.arcTo(x, y, x + r, y, r);
  ctx.closePath();
}

/* ─── Mission Detail Panel ──────────────────────────── */
function MissionDetail({ activity, onClose }: {
  activity: typeof ACTIVITIES[0];
  onClose: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = panelRef.current;
    if (!el) return;
    gsap.fromTo(el,
      { opacity: 0, y: 30, scale: 0.96 },
      { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "power3.out" }
    );
  }, [activity]);

  const rgb = activity.colorRgb;

  return (
    <div
      ref={panelRef}
      className="relative rounded-[22px] overflow-hidden"
      style={{
        background: "rgba(5,5,5,0.9)",
        border: `1px solid rgba(${rgb},0.35)`,
        backdropFilter: "blur(30px)",
        boxShadow: `0 0 60px rgba(${rgb},0.12), 0 20px 40px rgba(0,0,0,0.5)`,
      }}
    >
      {/* Top glow bar */}
      <div style={{
        height: 2,
        background: `linear-gradient(90deg, transparent, rgba(${rgb},0.8), transparent)`,
      }} />

      <div className="p-7 md:p-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <div
              className="w-12 h-12 rounded-[14px] flex items-center justify-center text-2xl"
              style={{ background: `rgba(${rgb},0.12)`, border: `1px solid rgba(${rgb},0.25)` }}
            >
              {activity.emoji}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[9px] tracking-[0.3em] uppercase font-medium" style={{ color: `rgba(${rgb},0.8)` }}>
                  MISSION {activity.id}
                </span>
                <span className="text-[8px] px-2 py-0.5 rounded-full tracking-widest uppercase"
                  style={{ background: `rgba(${rgb},0.1)`, border: `1px solid rgba(${rgb},0.2)`, color: `rgba(${rgb},0.7)` }}>
                  {activity.category}
                </span>
              </div>
              <h3 className="font-bold text-white" style={{ fontSize: "1.1rem", letterSpacing: "-0.01em" }}>
                {activity.title}
              </h3>
              <p className="text-[11px] mt-0.5" style={{ color: "rgba(161,161,170,0.7)" }}>
                {activity.subtitle}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200"
            style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.12)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.06)"; }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5">
              <line x1="2" y1="2" x2="10" y2="10"/><line x1="10" y1="2" x2="2" y2="10"/>
            </svg>
          </button>
        </div>

        {/* Description */}
        <p className="text-[13px] leading-relaxed mb-6" style={{ color: "rgba(161,161,170,0.85)" }}>
          {activity.what}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Steps */}
          <div>
            <p className="text-[9px] tracking-[0.3em] uppercase mb-3 font-semibold" style={{ color: `rgba(${rgb},0.8)` }}>
              Steps Completed
            </p>
            <ul className="flex flex-col gap-2.5">
              {activity.steps.map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span
                    className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold"
                    style={{ background: `rgba(${rgb},0.12)`, border: `1px solid rgba(${rgb},0.25)`, color: `rgba(${rgb},1)` }}
                  >
                    {i + 1}
                  </span>
                  <span className="text-[12px] leading-snug" style={{ color: "rgba(161,161,170,0.8)" }}>{step}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tools + Outcome */}
          <div className="flex flex-col gap-4">
            <div>
              <p className="text-[9px] tracking-[0.3em] uppercase mb-2.5 font-semibold" style={{ color: `rgba(${rgb},0.8)` }}>
                Tools Used
              </p>
              <div className="flex flex-wrap gap-1.5">
                {activity.extensions.map(ext => (
                  <span
                    key={ext}
                    className="text-[10px] px-2.5 py-1 rounded-full"
                    style={{
                      background: `rgba(${rgb},0.1)`,
                      border: `1px solid rgba(${rgb},0.2)`,
                      color: `rgba(${rgb},0.9)`,
                    }}
                  >
                    {ext}
                  </span>
                ))}
              </div>
            </div>

            <div
              className="rounded-[14px] p-4 flex-1"
              style={{ background: `rgba(${rgb},0.06)`, border: `1px solid rgba(${rgb},0.15)` }}
            >
              <p className="text-[9px] tracking-[0.3em] uppercase mb-2 font-semibold" style={{ color: `rgba(${rgb},0.8)` }}>
                Outcome
              </p>
              <p className="text-[12px] leading-relaxed" style={{ color: "rgba(161,161,170,0.85)" }}>
                {activity.outcome}
              </p>
            </div>

            {activity.github && (
              <a
                href={activity.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 transition-all duration-300"
                style={{
                  background: `rgba(${rgb},0.08)`,
                  border: `1px solid rgba(${rgb},0.2)`,
                  borderRadius: "12px",
                  padding: "9px 14px",
                  textDecoration: "none",
                  width: "fit-content",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLAnchorElement).style.background = `rgba(${rgb},0.18)`;
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = `rgba(${rgb},0.45)`;
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = `0 0 20px rgba(${rgb},0.2)`;
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLAnchorElement).style.background = `rgba(${rgb},0.08)`;
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = `rgba(${rgb},0.2)`;
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill={`rgba(${rgb},0.9)`}>
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                <span className="text-[10px] tracking-[0.15em] uppercase font-semibold" style={{ color: `rgba(${rgb},0.9)` }}>
                  View on GitHub →
                </span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Activities Section ───────────────────── */
export default function Activities() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const trainAreaRef = useRef<HTMLDivElement>(null);
  const cardsRowRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  const handleWagonClick = useCallback((idx: number) => {
    setActiveIdx(prev => prev === idx ? null : idx);
  }, []);

  // Scroll reveal
  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const trainArea = trainAreaRef.current;
    const cardsRow = cardsRowRef.current;
    if (!section || !title || !trainArea || !cardsRow) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 75%",
        once: true,
      },
    });

    tl.fromTo(title, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" })
      .fromTo(trainArea, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.3")
      .fromTo(cardsRow.children, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out", stagger: 0.08 }, "-=0.4");

    return () => { tl.kill(); };
  }, []);

  return (
    <section
      id="activities"
      ref={sectionRef}
      className="relative bg-[#050505] py-28 px-6 md:px-10 overflow-hidden"
    >
      {/* Background */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse 70% 50% at 50% 60%, rgba(37,99,235,0.05), transparent 70%)",
        }} />
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(59,130,246,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.025) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }} />
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Title */}
        <div ref={titleRef} className="mb-12" style={{ opacity: 0 }}>
          <div className="flex items-center gap-4 mb-6">
            <span className="text-[10px] tracking-[0.45em] text-[#3B82F6] uppercase font-medium">02</span>
            <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, rgba(59,130,246,0.4), transparent)" }} />
            <span className="text-[10px] tracking-[0.45em] text-[#A1A1AA] uppercase">Activities</span>
          </div>
          <h2 className="font-semibold leading-tight mb-3" style={{
            fontSize: "clamp(2rem, 4.5vw, 3.2rem)",
            letterSpacing: "-0.02em",
            background: "linear-gradient(180deg, #fff 50%, rgba(255,255,255,0.6) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>
            Tech Missions
          </h2>
          <p className="text-[#A1A1AA] text-sm max-w-lg">
            Four hands-on technical missions — click a wagon on the train to explore each one.
          </p>
        </div>

        {/* ── Train Canvas ─────────────────────────────── */}
        <div
          ref={trainAreaRef}
          className="relative rounded-[22px] mb-6 overflow-hidden"
          style={{
            background: "rgba(255,255,255,0.015)",
            border: "1px solid rgba(59,130,246,0.12)",
            opacity: 0,
          }}
        >
          {/* Train canvas */}
          <TrainCanvas activeIdx={activeIdx} onWagonClick={handleWagonClick} />

          {/* Hint overlay */}
          <div className="absolute bottom-3 left-0 right-0 flex justify-center pointer-events-none">
            <span className="text-[9px] tracking-[0.3em] uppercase"
              style={{ color: "rgba(96,165,250,0.4)" }}>
              🚂 Click a wagon to reveal its mission
            </span>
          </div>
        </div>

        {/* ── Wagon Selector Pills ─────────────────────── */}
        <div ref={cardsRowRef} className="flex flex-wrap gap-3 mb-8">
          {ACTIVITIES.map((a, i) => (
            <button
              key={a.id}
              onClick={() => handleWagonClick(i)}
              className="flex items-center gap-2.5 rounded-full px-4 py-2 transition-all duration-300"
              style={{
                background: activeIdx === i ? `rgba(${a.colorRgb},0.18)` : "rgba(255,255,255,0.04)",
                border: `1px solid ${activeIdx === i ? `rgba(${a.colorRgb},0.5)` : "rgba(255,255,255,0.08)"}`,
                boxShadow: activeIdx === i ? `0 0 20px rgba(${a.colorRgb},0.2)` : "none",
                opacity: 0,
              }}
            >
              <span style={{ fontSize: "14px" }}>{a.emoji}</span>
              <span className="text-[10px] tracking-[0.15em] uppercase font-semibold"
                style={{ color: activeIdx === i ? `rgba(${a.colorRgb},1)` : "rgba(161,161,170,0.7)" }}>
                {a.id} · {a.subtitle}
              </span>
              {activeIdx === i && (
                <span className="w-1.5 h-1.5 rounded-full animate-pulse-glow"
                  style={{ background: `rgba(${a.colorRgb},1)`, boxShadow: `0 0 6px rgba(${a.colorRgb},0.8)` }} />
              )}
            </button>
          ))}
        </div>

        {/* ── Mission Detail Panel ────────────────────── */}
        {activeIdx !== null && (
          <MissionDetail
            key={activeIdx}
            activity={ACTIVITIES[activeIdx]}
            onClose={() => setActiveIdx(null)}
          />
        )}
      </div>
    </section>
  );
}
