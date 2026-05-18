"use client";

import { motion } from "motion/react";
import { LINKS } from "@/lib/constants";
import { defaultViewport, fadeUp } from "@/lib/motion";
import { MotionLink } from "@/components/ui/MotionLink";

export function CtaBanner() {
  return (
    <section className="py-16 lg:py-20">
      <motion.div
        className="mx-auto max-w-6xl px-5 lg:px-8"
        initial="hidden"
        whileInView="visible"
        viewport={defaultViewport}
        variants={fadeUp}
      >
        <motion.div
          className="relative overflow-hidden border border-sea bg-sea px-8 py-12 text-center text-paper lg:px-16 lg:py-16"
          whileHover={{ scale: 1.005 }}
          transition={{ type: "spring", stiffness: 200, damping: 30 }}
        >
          <div className="absolute inset-0 grid-lines opacity-20 pointer-events-none" />
          <p className="section-label !text-paper/60 mb-3 relative">Start today</p>
          <h2 className="display-heading text-2xl sm:text-3xl relative">
            Paste a US store link. We handle the rest.
          </h2>
          <motion.div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center relative">
            <MotionLink
              href={LINKS.x}
              className="inline-flex items-center justify-center gap-2 bg-paper text-sea font-medium px-6 py-3.5 hover:bg-paper/90"
            >
              Message on X
            </MotionLink>
            <MotionLink
              href={LINKS.linktree}
              className="inline-flex items-center justify-center gap-2 border border-paper/30 text-paper font-medium px-6 py-3.5 hover:bg-paper/10"
            >
              All links
            </MotionLink>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
