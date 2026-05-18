"use client";

import { useReducedMotion } from "motion/react";

export const defaultViewport = {
  once: true,
  amount: 0.25,
} as const;

export const springTransition = {
  type: "spring" as const,
  stiffness: 300,
  damping: 28,
};

export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.06,
    },
  },
};

export const staggerItem = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: springTransition,
  },
};

export function useMotionSafe() {
  const prefersReducedMotion = useReducedMotion();

  return {
    prefersReducedMotion: !!prefersReducedMotion,
    initial: prefersReducedMotion ? false : ("hidden" as const),
    animate: prefersReducedMotion ? undefined : ("visible" as const),
    transition: prefersReducedMotion ? { duration: 0 } : undefined,
    whileInView: prefersReducedMotion
      ? undefined
      : ("visible" as const),
    viewport: defaultViewport,
  };
}
