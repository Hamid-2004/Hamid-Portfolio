"use client";

import { motion } from "framer-motion";
import { Brain, Monitor, PenTool, Zap } from "lucide-react";
import { experienceItems } from "@/lib/data";
import SectionWrapper from "@/components/ui/SectionWrapper";
import GlassCard from "@/components/ui/GlassCard";

const iconMap = {
  monitor: Monitor,
  pen: PenTool,
  brain: Brain,
  zap: Zap,
};

export default function Experience() {
  return (
    <SectionWrapper id="experience" title="What I Do" subtitle="My expertise">
      <div className="grid gap-6 sm:grid-cols-2">
        {experienceItems.map((item, i) => {
          const Icon = iconMap[item.icon];
          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <GlassCard className="h-full">
                <div className="mb-4 flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white">
                    <Icon size={24} />
                  </div>
                  <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                </div>
                <p className="text-sm leading-relaxed text-text-muted">
                  {item.description}
                </p>
              </GlassCard>
            </motion.div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
