"use client";

import { useEffect, useRef, useState } from "react";
import { useCursorPosition } from "@/components/providers/CursorProvider";

interface Trail {
  id: number;
  x: number;
  y: number;
  opacity: number;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
}

export default function PremiumCursor() {
  const { smoothX, smoothY, x, y, isMoving, enabled } = useCursorPosition();
  const [trails, setTrails] = useState<Trail[]>([]);
  const [particles, setParticles] = useState<Particle[]>([]);
  const trailId = useRef(0);
  const particleId = useRef(0);
  const lastSpawn = useRef(0);

  useEffect(() => {
    if (!enabled || !isMoving) return;

    const now = Date.now();
    if (now - lastSpawn.current < 40) return;
    lastSpawn.current = now;

    trailId.current += 1;
    setTrails((prev) => [
      ...prev.slice(-8),
      { id: trailId.current, x, y, opacity: 0.35 },
    ]);

    if (Math.random() > 0.5) {
      particleId.current += 1;
      setParticles((prev) => [
        ...prev.slice(-12),
        {
          id: particleId.current,
          x,
          y,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          life: 1,
        },
      ]);
    }
  }, [x, y, isMoving, enabled]);

  useEffect(() => {
    if (!enabled) return;
    const interval = setInterval(() => {
      setTrails((prev) =>
        prev
          .map((t) => ({ ...t, opacity: t.opacity - 0.06 }))
          .filter((t) => t.opacity > 0),
      );
      setParticles((prev) =>
        prev
          .map((p) => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            life: p.life - 0.08,
          }))
          .filter((p) => p.life > 0),
      );
    }, 32);
    return () => clearInterval(interval);
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999]" aria-hidden="true">
      {trails.map((trail) => (
        <div
          key={trail.id}
          className="absolute rounded-full"
          style={{
            left: trail.x - 20,
            top: trail.y - 20,
            width: 40,
            height: 40,
            background: `radial-gradient(circle, rgba(255,255,255,${trail.opacity * 0.15}) 0%, transparent 70%)`,
          }}
        />
      ))}

      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute h-1 w-1 rounded-full bg-white"
          style={{
            left: p.x,
            top: p.y,
            opacity: p.life * 0.5,
          }}
        />
      ))}

      <div
        className="absolute rounded-full mix-blend-screen"
        style={{
          left: smoothX - 20,
          top: smoothY - 20,
          width: 40,
          height: 40,
          background:
            "radial-gradient(circle, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 40%, transparent 70%)",
          boxShadow: "0 0 30px rgba(255,255,255,0.08), 0 0 60px rgba(255,255,255,0.04)",
          transition: "width 0.2s, height 0.2s",
        }}
      />

      <div
        className="absolute h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
        style={{
          left: smoothX,
          top: smoothY,
          boxShadow: "0 0 8px rgba(255,255,255,0.8)",
        }}
      />
    </div>
  );
}
