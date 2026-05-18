"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

type MotionLinkProps = {
  href: string;
  className: string;
  children: ReactNode;
  external?: boolean;
};

export function MotionLink({
  href,
  className,
  children,
  external = true,
}: MotionLinkProps) {
  return (
    <motion.a
      href={href}
      className={className}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      {children}
    </motion.a>
  );
}
