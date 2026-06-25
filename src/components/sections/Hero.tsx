"use client";

import { motion } from "framer-motion";
import { ArrowDown, Download, Mail, FolderOpen } from "lucide-react";
import { heroContent, personalInfo, stats } from "@/lib/data";
import TypingEffect from "@/components/ui/TypingEffect";
import Button from "@/components/ui/Button";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { scrollToSection } from "@/lib/utils";

const headlineWords = "Building Modern Web Experiences with AI, Design & Development".split(
  " ",
);

const wordVariants = {
  hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, delay: 2.6 + i * 0.06, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export default function Hero() {
  return (
    <section
      id="home"
      className="relative z-10 flex min-h-screen items-center justify-center overflow-hidden pt-20"
    >
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 2.4 }}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-text-muted backdrop-blur-sm"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
            Available for opportunities
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 2.5 }}
            className="mb-6 text-lg text-text-muted md:text-xl"
          >
            Hi, I&apos;m{" "}
            <span className="font-semibold text-white">{personalInfo.name}</span>
          </motion.p>

          <h1 className="max-w-5xl text-4xl font-bold leading-[1.1] tracking-tight md:text-6xl lg:text-7xl">
            {headlineWords.map((word, i) => (
              <motion.span
                key={i}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={wordVariants}
                className="mr-[0.25em] inline-block text-white last:mr-0"
              >
                {word}
              </motion.span>
            ))}
          </h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.2 }}
            className="mt-6 text-xl font-light text-text-muted md:text-2xl"
          >
            <TypingEffect texts={heroContent.typingTexts} />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 3.4 }}
            className="mt-8 max-w-2xl text-base leading-relaxed text-text-muted md:text-lg"
          >
            {heroContent.subheadline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 3.6 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <Button onClick={() => scrollToSection("projects")} size="lg">
              <FolderOpen size={18} />
              View Projects
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => scrollToSection("contact")}
            >
              <Mail size={18} />
              Contact Me
            </Button>
            <Button
              variant="outline"
              size="lg"
              href={`mailto:${personalInfo.email}?subject=Resume Request`}
            >
              <Download size={18} />
              Download Resume
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 3.8 }}
            className="mt-20 grid grid-cols-2 gap-8 sm:grid-cols-4 md:gap-12"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-bold text-white md:text-4xl">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="mt-2 text-xs uppercase tracking-widest text-text-muted md:text-sm">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4.2 }}
          className="mt-16 flex justify-center"
        >
          <motion.button
            onClick={() => scrollToSection("about")}
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            className="interactive flex flex-col items-center gap-2 text-text-muted transition-colors hover:text-white"
            aria-label="Scroll to about"
          >
            <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
            <ArrowDown size={18} />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
