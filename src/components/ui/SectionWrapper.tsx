"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  id: string;
  children: ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
}

export default function SectionWrapper({
  id,
  children,
  className,
  title,
  subtitle,
}: SectionWrapperProps) {
  return (
    <section id={id} className={cn("relative py-20 md:py-28", className)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {(title || subtitle) && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center md:mb-16"
          >
            {subtitle && (
              <p className="mb-2 text-sm font-medium uppercase tracking-widest text-accent">
                {subtitle}
              </p>
            )}
            {title && (
              <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">
                {title}
              </h2>
            )}
            <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-primary via-secondary to-accent" />
          </motion.div>
        )}
        {children}
      </div>
    </section>
  );
}
