"use client";

import { motion } from "motion/react";
import { COMPANY, LINKS, TESTIMONIALS } from "@/lib/constants";
import { defaultViewport, fadeUp, staggerContainer, staggerItem } from "@/lib/motion";
import { MotionLink } from "@/components/ui/MotionLink";

export function Trust() {
  return (
    <section className="border-b border-border py-20 lg:py-28">
      <motion.div
        className="mx-auto max-w-6xl px-5 lg:px-8"
        initial="hidden"
        whileInView="visible"
        viewport={defaultViewport}
        variants={staggerContainer}
      >
        <motion.div variants={fadeUp} className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <div>
            <p className="section-label mb-3">Trust</p>
            <h2 className="display-heading text-3xl text-ink sm:text-4xl">
              A registered company, active since 2020
            </h2>
            <ul className="mt-8 space-y-4 text-muted">
              <li className="flex gap-3">
                <span className="text-accent font-medium" aria-hidden>•</span>
                <span>
                  <strong className="text-ink">{COMPANY.name}</strong>
                  <br />
                  {COMPANY.rc}
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent font-medium" aria-hidden>•</span>
                <span>Based in {COMPANY.location}</span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent font-medium" aria-hidden>•</span>
                <span>Verified on X, with thousands of orders fulfilled</span>
              </li>
            </ul>
            <motion.div variants={staggerItem} className="mt-8">
              <MotionLink href={LINKS.x} className="btn-secondary">
                See highlights on X
              </MotionLink>
            </motion.div>
          </div>

          <motion.ul variants={staggerContainer} className="space-y-4">
            {TESTIMONIALS.map((item) => (
              <motion.li
                key={item.source}
                variants={staggerItem}
                className="border border-border bg-paper/80 p-6 backdrop-blur-sm"
                whileHover={{ y: -3 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
              >
                <p className="text-ink leading-relaxed">&ldquo;{item.quote}&rdquo;</p>
                <p className="mt-4 text-xs tracking-wide uppercase text-muted">
                  {item.source}
                </p>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </motion.div>
    </section>
  );
}
