"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Send, CheckCircle, ExternalLink } from "lucide-react";
import { GitHubIcon, LinkedInIcon, BehanceIcon } from "@/components/ui/SocialIcons";
import { personalInfo, socialLinks } from "@/lib/data";
import SectionWrapper from "@/components/ui/SectionWrapper";
import GlassCard from "@/components/ui/GlassCard";
import CopyButton from "@/components/ui/CopyButton";
import Button from "@/components/ui/Button";

const socialIconMap = {
  github: GitHubIcon,
  linkedin: LinkedInIcon,
  behance: BehanceIcon,
  mail: Mail,
};

const contactPlatforms = [
  {
    name: "GitHub",
    url: "https://github.com/Hamid-2004",
    visitLabel: "Visit GitHub",
    icon: GitHubIcon,
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/hamidali04",
    visitLabel: "Visit LinkedIn",
    icon: LinkedInIcon,
  },
  {
    name: "Behance",
    url: "https://www.behance.net/hamidali28082004",
    visitLabel: "Visit Behance",
    icon: BehanceIcon,
  },
] as const;

export default function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const mailtoLink = `mailto:${personalInfo.email}?subject=Portfolio Contact from ${formState.name}&body=${encodeURIComponent(
      `Name: ${formState.name}\nEmail: ${formState.email}\n\nMessage:\n${formState.message}`,
    )}`;

    window.location.href = mailtoLink;

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormState({ name: "", email: "", message: "" });
      setTimeout(() => setSubmitted(false), 4000);
    }, 1000);
  };

  return (
    <SectionWrapper
      id="contact"
      title="Contact"
      subtitle="Let's work together"
      className="bg-surface/30"
    >
      <div className="grid gap-10 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-bold text-white">Get in Touch</h3>
          <p className="mt-4 text-base leading-relaxed text-text-muted">
            I&apos;m open to internships, freelance projects, and software development
            opportunities. Feel free to reach out — I&apos;d love to hear from you.
          </p>

          <div className="mt-8 space-y-4">
            <GlassCard hover={false} className="!p-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex min-w-0 items-start gap-3">
                  <Mail size={18} className="mt-0.5 shrink-0 text-primary" />
                  <div className="min-w-0">
                    <p className="text-xs text-text-muted">Email</p>
                    <a
                      href={`mailto:${personalInfo.email}`}
                      className="mt-1 block text-sm font-medium break-all text-white transition-colors hover:text-primary"
                    >
                      {personalInfo.email}
                    </a>
                  </div>
                </div>
                <CopyButton text={personalInfo.email} className="shrink-0 self-start sm:self-center" />
              </div>
            </GlassCard>

            {contactPlatforms.map((platform) => {
              const Icon = platform.icon;
              return (
                <GlassCard key={platform.name} hover={false} className="!p-4">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-start gap-3">
                      <Icon size={18} className="mt-0.5 shrink-0 text-primary" />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs text-text-muted">{platform.name}</p>
                        <a
                          href={platform.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-1 block text-sm font-medium break-all text-white transition-colors hover:text-primary"
                        >
                          {platform.url}
                        </a>
                      </div>
                      <CopyButton text={platform.url} className="shrink-0" />
                    </div>
                    <Button
                      href={platform.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="outline"
                      size="sm"
                      className="w-full sm:w-auto"
                    >
                      <ExternalLink size={14} />
                      {platform.visitLabel}
                    </Button>
                  </div>
                </GlassCard>
              );
            })}
          </div>

          <div className="mt-8 flex gap-4">
            {socialLinks.map((link) => {
              const Icon = socialIconMap[link.icon];
              return (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 text-text-muted transition-all hover:border-primary/50 hover:bg-primary/10 hover:text-white"
                  aria-label={link.name}
                >
                  <Icon size={18} />
                </a>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <GlassCard>
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    <CheckCircle size={48} className="text-green-400" />
                  </motion.div>
                  <h4 className="mt-4 text-xl font-semibold text-white">
                    Message Ready!
                  </h4>
                  <p className="mt-2 text-sm text-text-muted">
                    Your email client should open shortly.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  <div>
                    <label htmlFor="name" className="mb-2 block text-sm font-medium text-white">
                      Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) =>
                        setFormState((s) => ({ ...s, name: e.target.value }))
                      }
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-text-muted/50 outline-none transition-colors focus:border-primary/50 focus:ring-1 focus:ring-primary/30"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-2 block text-sm font-medium text-white">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) =>
                        setFormState((s) => ({ ...s, email: e.target.value }))
                      }
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-text-muted/50 outline-none transition-colors focus:border-primary/50 focus:ring-1 focus:ring-primary/30"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="mb-2 block text-sm font-medium text-white">
                      Message
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={5}
                      value={formState.message}
                      onChange={(e) =>
                        setFormState((s) => ({ ...s, message: e.target.value }))
                      }
                      className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-text-muted/50 outline-none transition-colors focus:border-primary/50 focus:ring-1 focus:ring-primary/30"
                      placeholder="Tell me about your project..."
                    />
                  </div>
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    disabled={loading}
                  >
                    {loading ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="h-5 w-5 rounded-full border-2 border-white/30 border-t-white"
                      />
                    ) : (
                      <>
                        <Send size={18} />
                        Send Message
                      </>
                    )}
                  </Button>
                </motion.form>
              )}
            </AnimatePresence>
          </GlassCard>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
