import { useEffect, useRef, useState } from "react";

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
      { name: "Tailwind" },
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

const ALL_SKILLS = SKILLS.flatMap(c => c.skills.map(s => ({ ...s, category: c.category, icon: c.icon })));
const CATEGORY_COLORS: Record<string, string> = {
  Frontend: "59,130,246",
  Motion: "167,139,250",
  Programming: "52,211,153",
  Tools: "251,191,36",
};

// ─── Interactive Skill Catcher Game ─────────────────────────────
function SkillsBreakoutGame() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState<"start" | "playing" | "won" | "gameover">("start");

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const W = container.offsetWidth;
    const H = container.offsetHeight;
    canvas.width = W;
    canvas.height = H;

    const ctx = canvas.getContext("2d")!;
    let rafId = 0;
    
    // Game variables
    const paddleW = 120;
    const paddleH = 16;
    let paddleX = W / 2;
    
    type FallingSkill = { x: number; y: number; text: string; category: string; speed: number; caught: boolean; missed: boolean; bw: number };
    let activeSkills: FallingSkill[] = [];
    let skillsQueue = [...ALL_SKILLS].sort(() => Math.random() - 0.5); // Shuffle
    let spawnTimer = 0;
    let caughtCount = 0;
    let missedCount = 0;

    let currentGameState = "start";

    // Mouse control
    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      paddleX = Math.max(paddleW / 2, Math.min(W - paddleW / 2, mx));
    };
    canvas.addEventListener("mousemove", onMouseMove);

    const onClick = () => {
      if (currentGameState === "start" || currentGameState === "gameover" || currentGameState === "won") {
        // Reset game
        skillsQueue = [...ALL_SKILLS].sort(() => Math.random() - 0.5);
        activeSkills = [];
        caughtCount = 0;
        missedCount = 0;
        setScore(0);
        currentGameState = "playing";
        setGameState("playing");
      }
    };
    canvas.addEventListener("click", onClick);

    ctx.font = "bold 11px system-ui, sans-serif";

    const draw = () => {
      rafId = requestAnimationFrame(draw);
      ctx.clearRect(0, 0, W, H);
      
      if (currentGameState !== "playing") {
        // Just draw paddle and exit
        ctx.beginPath();
        ctx.roundRect(paddleX - paddleW / 2, H - 40, paddleW, paddleH, 8);
        ctx.fillStyle = "rgba(59,130,246,0.3)";
        ctx.fill();
        ctx.strokeStyle = "rgba(59,130,246,0.8)";
        ctx.lineWidth = 2;
        ctx.stroke();
        return;
      }

      // Spawn logic
      spawnTimer++;
      if (spawnTimer > 60 && skillsQueue.length > 0) { // Spawn roughly every 1 sec
        spawnTimer = 0;
        const s = skillsQueue.pop()!;
        const textW = ctx.measureText(s.name).width;
        const bw = Math.max(textW + 24, 70);
        activeSkills.push({
          x: Math.random() * (W - bw) + bw / 2,
          y: -30,
          text: s.name,
          category: s.category,
          speed: 2 + Math.random() * 2, // Falling speed
          caught: false,
          missed: false,
          bw
        });
      }

      // Update & Draw Skills
      for (let i = activeSkills.length - 1; i >= 0; i--) {
        const s = activeSkills[i];
        
        if (!s.caught && !s.missed) {
          s.y += s.speed;
          
          // Collision with paddle
          const paddleTop = H - 40;
          const paddleBottom = H - 40 + paddleH;
          const paddleLeft = paddleX - paddleW / 2;
          const paddleRight = paddleX + paddleW / 2;
          
          const bh = 26;
          const skillBottom = s.y + bh / 2;
          const skillLeft = s.x - s.bw / 2;
          const skillRight = s.x + s.bw / 2;
          
          if (
            skillBottom >= paddleTop &&
            skillBottom <= paddleBottom &&
            skillRight >= paddleLeft &&
            skillLeft <= paddleRight
          ) {
            s.caught = true;
            caughtCount++;
            setScore(caughtCount);
            
            if (caughtCount === ALL_SKILLS.length) {
              currentGameState = "won";
              setGameState("won");
            }
          }
          
          // Missed
          if (s.y > H + 50) {
             s.missed = true;
             missedCount++;
             if (missedCount >= 3) {
               currentGameState = "gameover";
               setGameState("gameover");
             }
          }
        }
        
        if (s.caught || s.missed) {
          activeSkills.splice(i, 1);
          continue;
        }

        // Draw skill
        const rgb = CATEGORY_COLORS[s.category] || "59,130,246";
        ctx.save();
        ctx.translate(s.x, s.y);
        ctx.beginPath();
        ctx.roundRect(-s.bw / 2, -13, s.bw, 26, 13);
        ctx.fillStyle = `rgba(${rgb}, 0.15)`;
        ctx.fill();
        ctx.strokeStyle = `rgba(${rgb}, 0.6)`;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.fillStyle = `rgba(255,255,255,1)`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(s.text, 0, 1);
        ctx.restore();
      }

      // Draw Paddle
      ctx.beginPath();
      ctx.roundRect(paddleX - paddleW / 2, H - 40, paddleW, paddleH, 8);
      ctx.fillStyle = "rgba(59,130,246,0.3)";
      ctx.fill();
      ctx.strokeStyle = "rgba(59,130,246,0.8)";
      ctx.lineWidth = 2;
      ctx.stroke();
      
      // Draw Lives
      ctx.fillStyle = "rgba(239,68,68,0.8)";
      ctx.font = "12px sans-serif";
      ctx.textAlign = "right";
      ctx.fillText(`Misses: ${missedCount}/3`, W - 20, 30);
      
      // Check win condition (all skills spawned and active array is empty)
      if (skillsQueue.length === 0 && activeSkills.length === 0 && currentGameState === "playing") {
         if (caughtCount === ALL_SKILLS.length) {
           currentGameState = "won";
           setGameState("won");
         } else {
           currentGameState = "gameover";
           setGameState("gameover");
         }
      }
    };
    draw();

    return () => {
      cancelAnimationFrame(rafId);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden" style={{ height: 420 }}>
      <canvas
        ref={canvasRef}
        className="w-full h-full rounded-[22px] bg-[rgba(0,0,0,0.2)]"
        style={{ cursor: gameState === "playing" ? "none" : "pointer" }}
      />
      
      {/* HUD overlay */}
      <div className="absolute top-6 left-8 pointer-events-none">
        <span className="text-[10px] tracking-[0.3em] text-[#3B82F6] uppercase font-bold">
          Caught: {score} / {ALL_SKILLS.length}
        </span>
      </div>

      {gameState === "start" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none bg-black/40 backdrop-blur-sm rounded-[22px]">
          <div className="w-12 h-12 rounded-full bg-blue-500/20 border border-blue-500/50 flex items-center justify-center mb-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#60A5FA" strokeWidth="2">
              <path d="M12 4v16m-8-8h16" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Skill Catcher</h3>
          <p className="text-[11px] tracking-widest text-[#A1A1AA] uppercase">Click to start · Catch skills with the paddle</p>
        </div>
      )}

      {gameState === "gameover" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none bg-red-900/40 backdrop-blur-md rounded-[22px]">
          <h3 className="text-3xl font-bold text-white mb-2 drop-shadow-[0_0_15px_rgba(239,68,68,0.8)]">Game Over!</h3>
          <p className="text-sm tracking-widest text-red-200 uppercase mb-4">You missed too many skills.</p>
          <p className="text-[11px] tracking-widest text-white/50 uppercase">Click to try again</p>
        </div>
      )}

      {gameState === "won" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none bg-blue-900/40 backdrop-blur-md rounded-[22px]">
          <h3 className="text-3xl font-bold text-white mb-2 drop-shadow-[0_0_15px_rgba(59,130,246,0.8)]">All Skills Caught!</h3>
          <p className="text-sm tracking-widest text-blue-200 uppercase">You are a master.</p>
          <p className="text-[11px] tracking-widest text-white/50 uppercase mt-4">Click to play again</p>
        </div>
      )}
    </div>
  );
}

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
            Technologies and tools I work with to build modern digital experiences. Play the mini-game below!
          </p>
        </div>

        {/* Physics Skills Breakout Game */}
        <div className="section-hidden mb-10 rounded-[22px] overflow-hidden" style={{
          transitionDelay: "0.15s",
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.07)",
          boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
        }}>
          <SkillsBreakoutGame />
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
                        el.style.transform = "scale(1.08)";
                        el.style.boxShadow = "0 0 12px rgba(59,130,246,0.3)";
                      }}
                      onMouseLeave={e => {
                        const el = e.currentTarget as HTMLSpanElement;
                        el.style.background = "rgba(255,255,255,0.05)";
                        el.style.borderColor = "rgba(255,255,255,0.08)";
                        el.style.transform = "scale(1)";
                        el.style.boxShadow = "none";
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
