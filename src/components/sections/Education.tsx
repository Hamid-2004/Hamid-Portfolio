"use client";

import { motion } from "framer-motion";
import { GraduationCap, MapPin, BookOpen } from "lucide-react";
import { education } from "@/lib/data";
import SectionWrapper from "@/components/ui/SectionWrapper";

const timelineItems = [
  {
    year: "Present",
    title: education.degree,
    status: education.status,
    location: education.location,
    description:
      "Studying Artificial Intelligence with focus on machine learning, intelligent systems, and modern software development.",
  },
];

export default function Education() {
  return (
    <SectionWrapper
      id="education"
      title={education.title}
      subtitle="Academic journey"
      className="bg-surface/50"
    >
      <div className="relative mx-auto max-w-3xl">
        <div className="absolute top-0 bottom-0 left-6 w-px bg-white/10 md:left-1/2 md:-translate-x-px" />

        {timelineItems.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative mb-12 pl-16 md:pl-0"
          >
            <div className="absolute left-3.5 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white/30 bg-background md:left-1/2 md:-translate-x-1/2">
              <div className="h-2 w-2 rounded-full bg-white" />
            </div>

            <div className="glass rounded-[20px] p-6 md:mx-auto md:max-w-lg">
              <span className="inline-block rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-text-muted">
                {item.year}
              </span>
              <h3 className="mt-3 text-xl font-bold text-white">{item.title}</h3>
              <p className="mt-1 text-sm font-medium text-white/70">{item.status}</p>

              <div className="mt-4 flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-sm text-text-muted">
                  <MapPin size={14} className="text-white/50" />
                  {item.location}
                </div>
                <div className="flex items-center gap-2 text-sm text-text-muted">
                  <BookOpen size={14} className="text-white/50" />
                  BS AI Program
                </div>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-text-muted">
                {item.description}
              </p>

              <div className="mt-4 flex items-center gap-2">
                <GraduationCap size={18} className="text-white/60" />
                <span className="text-sm text-white">Artificial Intelligence</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
