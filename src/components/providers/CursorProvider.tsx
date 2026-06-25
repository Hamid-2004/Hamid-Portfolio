"use client";

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";

interface CursorState {
  x: number;
  y: number;
  smoothX: number;
  smoothY: number;
  isMoving: boolean;
  enabled: boolean;
}

const CursorContext = createContext<CursorState>({
  x: 0,
  y: 0,
  smoothX: 0,
  smoothY: 0,
  isMoving: false,
  enabled: false,
});

export function useCursorPosition() {
  return useContext(CursorContext);
}

export function CursorProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<CursorState>({
    x: 0,
    y: 0,
    smoothX: 0,
    smoothY: 0,
    isMoving: false,
    enabled: false,
  });

  const target = useRef({ x: 0, y: 0 });
  const smooth = useRef({ x: 0, y: 0 });
  const movingTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rafId = useRef<number>(0);

  useEffect(() => {
    const prefersFine = window.matchMedia("(pointer: fine)").matches;
    if (!prefersFine) return;

    document.body.classList.add("custom-cursor");
    setState((s) => ({ ...s, enabled: true }));

    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
      document.documentElement.style.setProperty("--cursor-x", `${e.clientX}px`);
      document.documentElement.style.setProperty("--cursor-y", `${e.clientY}px`);

      if (movingTimeout.current) clearTimeout(movingTimeout.current);
      setState((s) => ({ ...s, isMoving: true }));
      movingTimeout.current = setTimeout(() => {
        setState((s) => ({ ...s, isMoving: false }));
      }, 100);
    };

    const animate = () => {
      smooth.current.x += (target.current.x - smooth.current.x) * 0.12;
      smooth.current.y += (target.current.y - smooth.current.y) * 0.12;

      setState((s) => ({
        ...s,
        x: target.current.x,
        y: target.current.y,
        smoothX: smooth.current.x,
        smoothY: smooth.current.y,
      }));

      rafId.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId.current);
      document.body.classList.remove("custom-cursor");
      if (movingTimeout.current) clearTimeout(movingTimeout.current);
    };
  }, []);

  return (
    <CursorContext.Provider value={state}>{children}</CursorContext.Provider>
  );
}
