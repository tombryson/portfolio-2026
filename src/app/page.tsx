import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { AlphaEdgeShowcase } from "@/components/sections/AlphaEdgeShowcase";
import { Projects } from "@/components/sections/Projects";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <div className="scroll-progress" aria-hidden="true" />
      <Nav />
      <main id="main-content">
        <Hero />
        <AlphaEdgeShowcase />
        <Projects />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
