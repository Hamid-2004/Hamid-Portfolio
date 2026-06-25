"use client";

import { motion } from "framer-motion";
import { MapPin, GraduationCap } from "lucide-react";
import { aboutContent, personalInfo } from "@/lib/data";
import SectionWrapper from "@/components/ui/SectionWrapper";
import GlassCard from "@/components/ui/GlassCard";

export default function About() {
  return (
    <SectionWrapper id="about" title={aboutContent.title} subtitle="Get to know me">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex justify-center"
        >
          <div className="premium-border relative rounded-[20px] p-1">
            <div className="flex h-72 w-72 items-center justify-center rounded-[18px] bg-white/[0.02] md:h-80 md:w-80">
              <div className="flex h-48 w-48 items-center justify-center rounded-2xl border border-white/20 bg-black text-6xl font-bold text-white md:h-56 md:w-56 md:text-7xl">
                HA
              </div>
            </div>
          </div>
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="glass absolute -right-4 bottom-8 rounded-xl px-4 py-3 md:-right-8"
          >
            <p className="text-sm font-medium text-white">BS AI Student</p>
            <p className="text-xs text-text-muted">Currently Pursuing</p>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-6"
        >
          {aboutContent.paragraphs.map((paragraph, i) => (
            <p key={i} className="text-base leading-relaxed text-text-muted md:text-lg">
              {paragraph}
            </p>
          ))}

          <div className="grid gap-4 sm:grid-cols-2">
            <GlassCard hover={false} className="!p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="text-xs text-text-muted">Location</p>
                  <p className="text-sm font-medium text-white">{personalInfo.location}</p>
                </div>
              </div>
            </GlassCard>
            <GlassCard hover={false} className="!p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white">
                  <GraduationCap size={18} />
                </div>
                <div>
                  <p className="text-xs text-text-muted">Education</p>
                  <p className="text-sm font-medium text-white">BS Artificial Intelligence</p>
                </div>
              </div>
            </GlassCard>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
