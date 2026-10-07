import { useEffect, useRef } from "react";

interface Node {
  x: number; y: number;
  vx: number; vy: number;
  radius: number;
  hue: number;
  pulse: number;
  pulseSpeed: number;
}

interface PhysicsBackgroundProps {
  nodeCount?: number;
  interactive?: boolean;
  className?: string;
}

export default function PhysicsBackground({ nodeCount = 60, interactive = true, className = "" }: PhysicsBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

    let W = canvas.width, H = canvas.height;
    let mouseX = -9999, mouseY = -9999;

    const nodes: Node[] = Array.from({ length: nodeCount }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 2 + 1,
      hue: 200 + Math.random() * 60,
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: 0.01 + Math.random() * 0.02,
    }));

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };
    const onMouseLeave = () => { mouseX = -9999; mouseY = -9999; };

    if (interactive) {
      canvas.addEventListener("mousemove", onMouseMove);
      canvas.addEventListener("mouseleave", onMouseLeave);
    }

    const CONNECTION_DIST = 120;
    const MOUSE_REPEL_DIST = 100;
    const MOUSE_REPEL_FORCE = 0.5;

    let rafId = 0;
    const draw = () => {
      rafId = requestAnimationFrame(draw);
      W = canvas.width;
      H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      // Update nodes
      nodes.forEach(n => {
        n.pulse += n.pulseSpeed;

        // Mouse repulsion
        if (interactive) {
          const dx = n.x - mouseX;
          const dy = n.y - mouseY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MOUSE_REPEL_DIST && dist > 0) {
            const force = (MOUSE_REPEL_DIST - dist) / MOUSE_REPEL_DIST * MOUSE_REPEL_FORCE;
            n.vx += (dx / dist) * force;
            n.vy += (dy / dist) * force;
          }
        }

        // Friction
        n.vx *= 0.99;
        n.vy *= 0.99;

        n.x += n.vx;
        n.y += n.vy;

        // Bounce off walls
        if (n.x < 0) { n.x = 0; n.vx *= -1; }
        if (n.x > W) { n.x = W; n.vx *= -1; }
        if (n.y < 0) { n.y = 0; n.vy *= -1; }
        if (n.y > H) { n.y = H; n.vy *= -1; }
      });

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DIST) {
            const alpha = (1 - dist / CONNECTION_DIST) * 0.3;
            const hue = (a.hue + b.hue) / 2;
            ctx.beginPath();
            ctx.strokeStyle = `hsla(${hue}, 80%, 65%, ${alpha})`;
            ctx.lineWidth = alpha * 1.5;
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      nodes.forEach(n => {
        const pulse = Math.sin(n.pulse) * 0.5 + 0.5;
        const r = n.radius + pulse * 1.5;
        const alpha = 0.5 + pulse * 0.4;

        const gradient = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, r * 4);
        gradient.addColorStop(0, `hsla(${n.hue}, 90%, 75%, ${alpha})`);
        gradient.addColorStop(0.4, `hsla(${n.hue}, 80%, 60%, ${alpha * 0.5})`);
        gradient.addColorStop(1, `hsla(${n.hue}, 70%, 50%, 0)`);

        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.arc(n.x, n.y, r * 4, 0, Math.PI * 2);
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.fillStyle = `hsla(${n.hue}, 90%, 85%, ${alpha})`;
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fill();
      });

      // Mouse attractor ring
      if (mouseX > 0 && interactive) {
        const ringAlpha = 0.15 + Math.sin(Date.now() * 0.003) * 0.05;
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, MOUSE_REPEL_DIST, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(96,165,250,${ringAlpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    };
    draw();

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      if (interactive) {
        canvas.removeEventListener("mousemove", onMouseMove);
        canvas.removeEventListener("mouseleave", onMouseLeave);
      }
    };
  }, [nodeCount, interactive]);

  return (
    <canvas
      ref={canvasRef}
      className={`block w-full h-full ${className}`}
      style={{ mixBlendMode: "screen" }}
    />
  );
}
