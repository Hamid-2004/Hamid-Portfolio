"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { ReactNode, useRef } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
  href?: string;
  download?: boolean;
  target?: string;
  rel?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const variants = {
  primary:
    "bg-black border border-white text-white hover:bg-white hover:text-black hover:shadow-[0_0_30px_rgba(255,255,255,0.15)]",
  secondary:
    "bg-black border border-white text-white hover:bg-white hover:text-black hover:shadow-[0_0_30px_rgba(255,255,255,0.15)]",
  outline:
    "bg-black border border-white/40 text-white hover:bg-white hover:text-black hover:border-white hover:shadow-[0_0_30px_rgba(255,255,255,0.12)]",
  ghost: "text-text-muted hover:text-white hover:bg-white/5 border border-transparent",
};

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-3.5 text-base",
};

function MagneticWrapper({
  children,
  className,
  disabled,
}: {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (disabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.15);
    y.set((e.clientY - cy) * 0.15);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  onClick,
  href,
  download,
  target,
  rel,
  type = "button",
  disabled,
}: ButtonProps) {
  const classes = cn(
    "interactive inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-300",
    variants[variant],
    sizes[size],
    className,
  );

  if (href) {
    return (
      <MagneticWrapper disabled={disabled}>
        <motion.a
          href={href}
          download={download}
          target={target}
          rel={rel}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className={classes}
        >
          {children}
        </motion.a>
      </MagneticWrapper>
    );
  }

  return (
    <MagneticWrapper disabled={disabled}>
      <motion.button
        type={type}
        disabled={disabled}
        onClick={onClick}
        whileHover={disabled ? undefined : { scale: 1.05 }}
        whileTap={disabled ? undefined : { scale: 0.97 }}
        className={cn(classes, disabled && "cursor-not-allowed opacity-60")}
      >
        {children}
      </motion.button>
    </MagneticWrapper>
  );
}
