"use client";

import { useEffect, useRef } from "react";

function drawHexGrid(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  offset: number,
) {
  const size = 28;
  const hexW = size * 2;
  const hexH = Math.sqrt(3) * size;

  ctx.clearRect(0, 0, width, height);
  ctx.strokeStyle = "rgba(255, 255, 255, 0.04)";
  ctx.lineWidth = 0.5;

  const cols = Math.ceil(width / (hexW * 0.75)) + 2;
  const rows = Math.ceil(height / hexH) + 2;

  for (let row = -1; row < rows; row++) {
    for (let col = -1; col < cols; col++) {
      const cx = col * hexW * 0.75 + offset;
      const cy = row * hexH + (col % 2 === 0 ? 0 : hexH / 2) + offset * 0.5;

      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i - Math.PI / 6;
        const px = cx + size * Math.cos(angle);
        const py = cy + size * Math.sin(angle);
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.stroke();
    }
  }
}

export default function GlobalBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const offsetRef = useRef(0);
  const rafRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    const animate = () => {
      offsetRef.current += 0.15;
      drawHexGrid(ctx, canvas.width, canvas.height, offsetRef.current);
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      <div
        className="animate-mesh-drift absolute -left-1/4 top-0 h-[600px] w-[600px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)",
        }}
      />
      <div
        className="animate-mesh-drift absolute -right-1/4 top-1/3 h-[500px] w-[500px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)",
          animationDelay: "-7s",
        }}
      />
      <div
        className="animate-pulse-soft absolute bottom-0 left-1/3 h-[400px] w-[400px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.035) 0%, transparent 70%)",
        }}
      />

      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          background:
            "radial-gradient(ellipse at var(--cursor-x, 50%) var(--cursor-y, 50%), rgba(255,255,255,0.15) 0%, transparent 50%)",
        }}
      />

      <div className="noise-overlay absolute inset-0" />

      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="animate-float-slow absolute h-1 w-1 rounded-full bg-white/20"
          style={{
            left: `${10 + i * 12}%`,
            top: `${15 + (i % 4) * 20}%`,
            animationDelay: `${i * 0.8}s`,
            animationDuration: `${7 + i}s`,
          }}
        />
      ))}
    </div>
  );
}
