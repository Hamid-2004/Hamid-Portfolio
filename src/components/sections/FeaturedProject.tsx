"use client";

import { motion } from "framer-motion";
import { ExternalLink, Shield, Users } from "lucide-react";
import { GitHubIcon } from "@/components/ui/SocialIcons";
import { featuredProject } from "@/lib/data";
import SectionWrapper from "@/components/ui/SectionWrapper";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";

export default function FeaturedProject() {
  return (
    <SectionWrapper
      id="featured-project"
      title="Featured Project"
      subtitle="Primary showcase"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <GlassCard className="overflow-hidden !p-0">
          <div className="border-b border-white/5 bg-white/[0.02] p-8 md:p-10">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-text-muted">
              <Shield size={14} />
              Featured Project
            </div>

            <h3 className="text-2xl font-bold text-white md:text-3xl">
              {featuredProject.title}
            </h3>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-text-muted">
              {featuredProject.description}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {featuredProject.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1 text-xs font-medium text-text-muted"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="grid gap-6 p-8 md:grid-cols-2 md:p-10">
            {featuredProject.portals.map((portal, i) => (
              <motion.div
                key={portal.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="rounded-[20px] border border-white/5 bg-white/[0.02] p-6"
              >
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white">
                    {i === 0 ? <Users size={18} /> : <Shield size={18} />}
                  </div>
                  <h4 className="text-lg font-semibold text-white">{portal.name}</h4>
                </div>

                <ul className="mb-6 space-y-2">
                  {portal.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-sm text-text-muted"
                    >
                      <span className="h-1 w-1 rounded-full bg-white/60" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {portal.repo ? (
                  <Button
                    href={portal.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="outline"
                    size="sm"
                  >
                    <GitHubIcon size={16} />
                    View Repository
                    <ExternalLink size={14} />
                  </Button>
                ) : (
                  <span className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2 text-xs text-text-muted">
                    Repository coming soon
                  </span>
                )}
              </motion.div>
            ))}
          </div>
        </GlassCard>
      </motion.div>
    </SectionWrapper>
  );
}
