"use client";

import { motion } from "framer-motion";

interface ProgressBarProps {
  name: string;
  level: number;
  delay?: number;
}

export default function ProgressBar({ name, level, delay = 0 }: ProgressBarProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-white">{name}</span>
        <span className="text-text-muted">{level}%</span>
      </div>
      <div className="h-1 overflow-hidden rounded-full bg-white/5">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] }}
          className="h-full rounded-full bg-white"
        />
      </div>
    </div>
  );
}
