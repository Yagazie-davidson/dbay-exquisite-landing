"use client";

import { motion } from "motion/react";
import { COMPANY, LINKS } from "@/lib/constants";
import { staggerContainer, staggerItem } from "@/lib/motion";
import { MotionLink } from "@/components/ui/MotionLink";
import { RouteVisual } from "@/components/ui/RouteVisual";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="absolute inset-0 grid-lines opacity-40 pointer-events-none" />
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-sea/5 to-transparent pointer-events-none" />

      <motion.div
        className="relative mx-auto max-w-6xl px-5 py-16 lg:px-8 lg:py-24"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div variants={staggerItem} className="max-w-xl">
            <p className="section-label mb-4">{COMPANY.rc}</p>
            <h1 className="display-heading text-4xl text-ink sm:text-5xl lg:text-[3.25rem]">
              US store link in.
              <span className="block text-sea mt-1">Delivered across Nigeria.</span>
            </h1>
            <p className="mt-6 text-lg text-muted leading-relaxed">
              We procure items from eBay, Amazon, and US e-commerce at your
              request. We vet sellers, quote in Naira, ship internationally, and
              deliver to your door.
            </p>
            <motion.div
              variants={staggerItem}
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <MotionLink href={LINKS.x} className="btn-primary">
                Message on X
                <span aria-hidden>→</span>
              </MotionLink>
              <MotionLink href={LINKS.linktree} className="btn-secondary">
                All links
              </MotionLink>
            </motion.div>
            <motion.p
              variants={staggerItem}
              className="mt-6 text-sm text-muted"
            >
              Send a product URL on X to get started. Rates follow the FX market.
            </motion.p>
          </motion.div>

          <motion.div variants={staggerItem} className="relative lg:pl-4">
            <RouteVisual />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
