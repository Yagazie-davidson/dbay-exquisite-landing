import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { WhatWeSource } from "@/components/sections/WhatWeSource";
import { Trust } from "@/components/sections/Trust";
import { FAQ } from "@/components/sections/FAQ";
import { CtaBanner } from "@/components/sections/CtaBanner";

export default function Home() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <WhatWeSource />
      <Trust />
      <FAQ />
      <CtaBanner />
    </>
  );
}
