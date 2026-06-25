"use client";

import { motion } from "framer-motion";
import {
  Bot,
  Briefcase,
  Building2,
  Code2,
  Layers,
  Layout,
  Palette,
  RefreshCw,
  Sparkles,
} from "lucide-react";
import { services } from "@/lib/data";
import SectionWrapper from "@/components/ui/SectionWrapper";
import GlassCard from "@/components/ui/GlassCard";

const iconMap = {
  code: Code2,
  building: Building2,
  briefcase: Briefcase,
  layout: Layout,
  refresh: RefreshCw,
  palette: Palette,
  sparkles: Sparkles,
  layers: Layers,
  bot: Bot,
};

export default function Services() {
  return (
    <SectionWrapper id="services" title="Services" subtitle="What I offer">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, i) => {
          const Icon = iconMap[service.icon];
          return (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <GlassCard className="h-full">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 text-primary">
                  <Icon size={22} />
                </div>
                <h3 className="text-lg font-semibold text-white">{service.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">
                  {service.description}
                </p>
              </GlassCard>
            </motion.div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
