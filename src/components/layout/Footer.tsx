import { personalInfo } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-surface/50 py-10">
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <p className="text-lg font-semibold text-white">
          {personalInfo.name} &copy; 2026
        </p>
        <p className="mt-2 text-sm text-text-muted">
          Frontend Developer | BS AI Student | Graphic Designer
        </p>
        <p className="mt-4 text-xs text-text-muted/70">
          Built with Next.js, Tailwind CSS, and Framer Motion.
        </p>
      </div>
    </footer>
  );
}
