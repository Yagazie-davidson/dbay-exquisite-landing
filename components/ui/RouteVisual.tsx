"use client";

import { motion, useReducedMotion } from "motion/react";
import { defaultViewport } from "@/lib/motion";

const routePath =
  "M 40 180 C 80 120, 120 100, 180 95 S 280 70, 340 55 S 420 40, 480 120 S 520 200, 560 220";

export function RouteVisual() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className="relative w-full max-w-lg aspect-[4/3] mx-auto lg:mx-0"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={defaultViewport}
      transition={{ duration: 0.6 }}
    >
      <svg
        viewBox="0 0 600 280"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        aria-hidden
      >
        <defs>
          <linearGradient id="routeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0F2A33" />
            <stop offset="50%" stopColor="#C45C3E" />
            <stop offset="100%" stopColor="#0F2A33" />
          </linearGradient>
        </defs>

        {/* Latitude arcs */}
        {[60, 120, 180].map((y) => (
          <path
            key={y}
            d={`M 20 ${y} Q 300 ${y - 20} 580 ${y}`}
            stroke="rgba(26,23,20,0.08)"
            strokeWidth="1"
            fill="none"
          />
        ))}

        {/* Route line */}
        <motion.path
          d={routePath}
          stroke="url(#routeGrad)"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: prefersReducedMotion ? 1 : 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={defaultViewport}
          transition={{
            duration: prefersReducedMotion ? 0 : 1.8,
            ease: [0.22, 1, 0.36, 1],
          }}
        />

        {/* Origin — US */}
        <motion.g
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={defaultViewport}
          transition={{ delay: prefersReducedMotion ? 0 : 0.3 }}
        >
          <circle cx="40" cy="180" r="8" fill="#0F2A33" />
          <text
            x="40"
            y="210"
            textAnchor="middle"
            className="fill-ink text-[11px] font-medium"
            style={{ fontFamily: "var(--font-ibm-plex)" }}
          >
            US stores
          </text>
        </motion.g>

        {/* Mid — Atlantic */}
        <motion.g
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={defaultViewport}
          transition={{ delay: prefersReducedMotion ? 0 : 0.9 }}
        >
          <circle cx="340" cy="55" r="6" fill="#C45C3E" fillOpacity="0.9" />
          <text
            x="340"
            y="35"
            textAnchor="middle"
            className="fill-muted text-[10px]"
            style={{ fontFamily: "var(--font-ibm-plex)" }}
          >
            In transit
          </text>
        </motion.g>

        {/* Destination — Nigeria */}
        <motion.g
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={defaultViewport}
          transition={{ delay: prefersReducedMotion ? 0 : 1.5 }}
        >
          <circle cx="560" cy="220" r="8" fill="#C45C3E" />
          <text
            x="560"
            y="250"
            textAnchor="middle"
            className="fill-ink text-[11px] font-medium"
            style={{ fontFamily: "var(--font-ibm-plex)" }}
          >
            Nigeria
          </text>
        </motion.g>
      </svg>

      <div className="absolute top-4 right-4 px-3 py-1.5 bg-surface/90 backdrop-blur-sm border border-border text-[10px] tracking-widest uppercase text-muted">
        Est. ~15 working days
      </div>
    </motion.div>
  );
}
