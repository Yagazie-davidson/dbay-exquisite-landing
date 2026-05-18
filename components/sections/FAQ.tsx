"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { FAQ_ITEMS, LINKS } from "@/lib/constants";
import { defaultViewport, fadeUp, staggerContainer } from "@/lib/motion";
import { MotionLink } from "@/components/ui/MotionLink";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="border-b border-border py-20 lg:py-28">
      <motion.div
        className="mx-auto max-w-6xl px-5 lg:px-8"
        initial="hidden"
        whileInView="visible"
        viewport={defaultViewport}
        variants={staggerContainer}
      >
        <motion.div variants={fadeUp} className="max-w-2xl mb-12">
          <p className="section-label mb-3">FAQ</p>
          <h2 className="display-heading text-3xl text-ink sm:text-4xl">
            Common questions
          </h2>
        </motion.div>

        <motion.ul variants={fadeUp} className="divide-y divide-border border border-border bg-paper">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <li key={item.question}>
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-accent"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                >
                  <span className="font-medium text-ink">{item.question}</span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="shrink-0 text-xl text-accent leading-none"
                    aria-hidden
                  >
                    +
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-5 text-muted leading-relaxed">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </motion.ul>

        <motion.div variants={fadeUp} className="mt-12 text-center">
          <p className="text-muted mb-4">Ready to send a product link?</p>
          <MotionLink href={LINKS.x} className="btn-primary">
            Get a quote on X
          </MotionLink>
        </motion.div>
      </motion.div>
    </section>
  );
}
