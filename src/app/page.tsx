import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BackToTop from "@/components/layout/BackToTop";
import LoadingScreen from "@/components/layout/LoadingScreen";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import FeaturedProject from "@/components/sections/FeaturedProject";
import Projects from "@/components/sections/Projects";
import Services from "@/components/sections/Services";
import Education from "@/components/sections/Education";
import Experience from "@/components/sections/Experience";
import Contact from "@/components/sections/Contact";
import GlobalBackground from "@/components/ui/GlobalBackground";
import PremiumCursor from "@/components/ui/PremiumCursor";
import { CursorProvider } from "@/components/providers/CursorProvider";

export default function Home() {
  return (
    <CursorProvider>
      <GlobalBackground />
      <PremiumCursor />
      <LoadingScreen />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <FeaturedProject />
        <Projects />
        <Services />
        <Education />
        <Experience />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </CursorProvider>
  );
}
