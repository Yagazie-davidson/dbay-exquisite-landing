"use client";

import { motion } from "motion/react";
import { CATEGORIES } from "@/lib/constants";
import { defaultViewport, fadeUp, staggerContainer, staggerItem } from "@/lib/motion";

export function WhatWeSource() {
  return (
    <section className="border-b border-border bg-sea/5 py-20 lg:py-28">
      <motion.div
        className="mx-auto max-w-6xl px-5 lg:px-8"
        initial="hidden"
        whileInView="visible"
        viewport={defaultViewport}
        variants={staggerContainer}
      >
        <motion.div variants={fadeUp} className="max-w-2xl mb-12">
          <p className="section-label mb-3">Categories</p>
          <h2 className="display-heading text-3xl text-ink sm:text-4xl">
            What we source
          </h2>
          <p className="mt-4 text-muted leading-relaxed">
            Tech and gadgets from US stores — send any product link and we will
            tell you if we can source it reliably.
          </p>
        </motion.div>

        <motion.ul
          variants={staggerContainer}
          className="flex flex-wrap gap-3"
        >
          {CATEGORIES.map((category) => (
            <motion.li
              key={category}
              variants={staggerItem}
              whileHover={{ y: -2, borderColor: "var(--sea)" }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <span className="inline-block border border-border bg-paper px-5 py-2.5 text-sm font-medium text-ink">
                {category}
              </span>
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>
    </section>
  );
}
