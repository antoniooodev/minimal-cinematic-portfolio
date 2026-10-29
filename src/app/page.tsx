import { About } from "@/components/sections/About";
import { Career } from "@/components/sections/Career";
import { Contact } from "@/components/sections/Contact";
import { Craft } from "@/components/sections/Craft";
import { Hero } from "@/components/sections/Hero";
import { Manifesto } from "@/components/sections/Manifesto";
import { SkillsBand } from "@/components/sections/SkillsBand";
import { Work } from "@/components/sections/Work";

export default function HomePage() {
  return (
    <>
      <main id="content">
        <Hero />
        <About />
        <Manifesto />
        <SkillsBand />
        <Work />
        <Career />
        <Craft />
      </main>
      <Contact />
    </>
  );
}
