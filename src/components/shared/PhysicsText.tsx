import { useEffect, useRef } from "react";
import Matter from "matter-js";

interface PhysicsTextProps {
  text: string;
  className?: string;
  fontSize?: number;
  color?: string;
}

export default function PhysicsText({ text, className = "", fontSize = 72, color = "#ffffff" }: PhysicsTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const W = container.offsetWidth;
    const H = container.offsetHeight;
    canvas.width = W;
    canvas.height = H;

    // Build character bodies using bounding boxes
    const chars = text.split("");

    // Measure each character
    const tempCanvas = document.createElement("canvas");
    const tempCtx = tempCanvas.getContext("2d")!;
    tempCtx.font = `bold ${fontSize}px "SF Pro Display", system-ui, sans-serif`;

    const charData: { char: string; width: number; x: number }[] = [];
    let totalWidth = 0;
    chars.forEach((char) => {
      if (char === " ") {
        charData.push({ char, width: fontSize * 0.3, x: totalWidth });
        totalWidth += fontSize * 0.3;
      } else {
        const w = tempCtx.measureText(char).width;
        charData.push({ char, width: w, x: totalWidth });
        totalWidth += w + 2;
      }
    });

    const startX = (W - totalWidth) / 2;

    const engine = Matter.Engine.create({ gravity: { x: 0, y: 0.8 } });
    const runner = Matter.Runner.create();
    Matter.Runner.run(runner, engine);

    const bodies: { body: Matter.Body; char: string }[] = [];

    charData.forEach((cd) => {
      if (cd.char === " ") return;
      const bw = cd.width;
      const bh = fontSize * 0.9;
      const body = Matter.Bodies.rectangle(
        startX + cd.x + bw / 2,
        -100 - Math.random() * 400, // drop from above
        bw,
        bh,
        {
          restitution: 0.4,
          friction: 0.3,
          frictionAir: 0.015,
          angle: (Math.random() - 0.5) * 0.5,
          label: cd.char,
        }
      );
      bodies.push({ body, char: cd.char });
      Matter.Composite.add(engine.world, body);
    });

    // Ground + walls
    const ground = Matter.Bodies.rectangle(W / 2, H + 25, W * 2, 50, { isStatic: true });
    const wallL = Matter.Bodies.rectangle(-25, H / 2, 50, H * 2, { isStatic: true });
    const wallR = Matter.Bodies.rectangle(W + 25, H / 2, 50, H * 2, { isStatic: true });
    Matter.Composite.add(engine.world, [ground, wallL, wallR]);

    // Custom canvas renderer
    const ctx = canvas.getContext("2d")!;
    let rafId = 0;

    const draw = () => {
      rafId = requestAnimationFrame(draw);
      Matter.Engine.update(engine, 1000 / 60);

      ctx.clearRect(0, 0, W, H);

      ctx.font = `bold ${fontSize}px "SF Pro Display", system-ui, sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      bodies.forEach(({ body, char }) => {
        const { x, y } = body.position;
        const angle = body.angle;

        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angle);

        // Glow effect
        ctx.shadowBlur = 20;
        ctx.shadowColor = "rgba(59,130,246,0.8)";
        ctx.fillStyle = color;
        ctx.fillText(char, 0, 2);

        // Second pass for stronger glow
        ctx.shadowBlur = 40;
        ctx.shadowColor = "rgba(59,130,246,0.4)";
        ctx.fillText(char, 0, 2);

        ctx.restore();
      });
    };
    draw();

    // Mouse interaction
    const mouse = Matter.Mouse.create(canvas);
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse,
      constraint: { stiffness: 0.2, render: { visible: false } },
    });
    Matter.Composite.add(engine.world, mouseConstraint);

    return () => {
      cancelAnimationFrame(rafId);
      Matter.Runner.stop(runner);
      Matter.Engine.clear(engine);
      Matter.Composite.clear(engine.world, false);
    };
  }, [text, fontSize, color]);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        style={{ display: "block" }}
      />
    </div>
  );
}
