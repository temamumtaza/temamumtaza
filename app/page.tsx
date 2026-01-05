import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { WhatIDo } from "@/components/sections/WhatIDo";
import { Playground } from "@/components/sections/Playground";
import { Vision } from "@/components/sections/Vision";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-background selection:bg-white/10">
      <Navbar />

      <Hero />
      <WhatIDo />
      <Playground />
      <Vision />
      <About />
      <Contact />

      <Footer />
    </main>
  );
}
