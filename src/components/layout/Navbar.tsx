"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navLinks } from "@/lib/data";
import { useActiveSection } from "@/hooks/useActiveSection";
import { scrollToSection, cn } from "@/lib/utils";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const activeSection = useActiveSection();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    const id = href.replace("#", "");
    scrollToSection(id);
    setIsOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, delay: 2.2 }}
      className={cn(
        "fixed top-0 right-0 left-0 z-50 transition-all duration-500",
        scrolled ? "glass-nav" : "bg-transparent",
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <button
          onClick={() => handleNavClick("#home")}
          className="interactive text-xl font-bold tracking-tight text-white"
        >
          <span className="text-white">HA</span>
          <span className="ml-1 hidden text-text-muted sm:inline">amid Ali</span>
        </button>

        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => {
            const id = link.href.replace("#", "");
            const isActive = activeSection === id;
            return (
              <li key={link.href}>
                <button
                  onClick={() => handleNavClick(link.href)}
                  className={cn(
                    "interactive relative rounded-full px-4 py-2 text-sm font-medium transition-all duration-300",
                    isActive
                      ? "bg-white text-black"
                      : "text-text-muted hover:text-white",
                  )}
                >
                  {link.label}
                  {!isActive && (
                    <motion.span
                      className="absolute bottom-1 left-1/2 h-px w-0 -translate-x-1/2 bg-white/40"
                      whileHover={{ width: "60%" }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </button>
              </li>
            );
          })}
        </ul>

        <button
          onClick={() => handleNavClick("#contact")}
          className="interactive hidden rounded-xl border border-white bg-black px-5 py-2 text-sm font-medium text-white transition-all duration-300 hover:bg-white hover:text-black lg:block"
        >
          Hire Me
        </button>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="interactive rounded-lg p-2 text-white lg:hidden"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="glass-nav border-t border-white/5 lg:hidden"
          >
            <ul className="flex flex-col gap-1 px-4 py-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className="interactive w-full rounded-lg px-4 py-3 text-left text-sm font-medium text-text-muted transition-colors hover:bg-white/5 hover:text-white"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => handleNavClick("#contact")}
                  className="interactive mt-2 w-full rounded-xl border border-white bg-black px-4 py-3 text-sm font-medium text-white hover:bg-white hover:text-black"
                >
                  Hire Me
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
