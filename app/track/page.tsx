"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { COMPANY, LINKS } from "@/lib/constants";
import { fadeUp } from "@/lib/motion";
import { MotionLink } from "@/components/ui/MotionLink";

export default function TrackPage() {
  return (
    <div className="mx-auto max-w-2xl px-5 py-24 lg:py-32 text-center">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
      >
        <p className="section-label mb-4">Coming soon</p>
        <h1 className="display-heading text-3xl sm:text-4xl text-ink">
          Track your order
        </h1>
        <p className="mt-6 text-muted leading-relaxed">
          Order tracking is on the way. For now, message us on X with your order
          details and we will update you on status.
        </p>

        <motion.div
          className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <MotionLink href={LINKS.x} className="btn-primary">
            Message on X
          </MotionLink>
          <Link href="/" className="btn-secondary">
            Back to home
          </Link>
        </motion.div>

        <p className="mt-12 text-xs text-muted">
          {COMPANY.name} · {COMPANY.rc}
        </p>
      </motion.div>
    </div>
  );
}
