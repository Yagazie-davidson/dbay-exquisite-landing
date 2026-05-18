"use client";

import { motion } from "motion/react";
import { STEPS } from "@/lib/constants";
import { defaultViewport, fadeUp, staggerContainer, staggerItem } from "@/lib/motion";

export function HowItWorks() {
  return (
    <section id="how-it-works" className="border-b border-border py-20 lg:py-28">
      <motion.div
        className="mx-auto max-w-6xl px-5 lg:px-8"
        initial="hidden"
        whileInView="visible"
        viewport={defaultViewport}
        variants={staggerContainer}
      >
        <motion.div variants={fadeUp} className="max-w-2xl mb-16">
          <p className="section-label mb-3">Process</p>
          <h2 className="display-heading text-3xl text-ink sm:text-4xl">
            How it works
          </h2>
          <p className="mt-4 text-muted leading-relaxed">
            Five steps from US listing to your doorstep. Same flow we share with
            every new customer on X.
          </p>
        </motion.div>

        <div className="relative">
          <motion.div
            className="absolute left-[1.125rem] top-4 bottom-4 w-px bg-border hidden sm:block"
            aria-hidden
          />
          <ol className="relative">
            {STEPS.map((step, index) => (
              <motion.li
                key={step.number}
                variants={staggerItem}
                className="relative flex gap-6 sm:gap-10 pb-12 last:pb-0"
              >
                <motion.div
                  className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-sea bg-paper text-xs font-medium text-sea"
                  whileInView={{ scale: [0.85, 1.05, 1] }}
                  viewport={{ once: true, amount: 0.8 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  {step.number}
                </motion.div>
                <motion.div
                  className="pt-0.5"
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                >
                  <h3 className="display-heading text-xl text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-2 max-w-xl text-muted leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              </motion.li>
            ))}
          </ol>
        </div>
      </motion.div>
    </section>
  );
}
