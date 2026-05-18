"use client";

import { useEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useTransform,
} from "motion/react";
import { defaultViewport } from "@/lib/motion";
import {
  ARC_DRIFT,
  buildRoutePath,
  DRAW_TRANSITION,
  FLOAT_KEYFRAMES,
  LATITUDE_ARC_YS,
  PATH_BREATHE,
  ROUTE_WAYPOINTS,
  STOP_DELAYS,
  TRAVELER,
  type RoutePoint,
} from "@/lib/route-visual";

type StopKey = keyof typeof ROUTE_WAYPOINTS;

const STOP_KEYS: StopKey[] = ["origin", "transit", "destination"];

function RouteStop({
  point,
  yOffset,
  delay,
  prefersReducedMotion,
}: {
  point: RoutePoint;
  yOffset: ReturnType<typeof useMotionValue<number>>;
  delay: number;
  prefersReducedMotion: boolean | null;
}) {
  const cy = useTransform(yOffset, (v) => point.y + v);
  const labelY = useTransform(yOffset, (v) => point.labelY + v);

  return (
    <motion.g
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={defaultViewport}
      transition={{ delay: prefersReducedMotion ? 0 : delay }}
    >
      <motion.circle
        cx={point.x}
        cy={cy}
        r={point.radius}
        fill={point.fill}
        fillOpacity={point.fill === "#C45C3E" && point.radius < 8 ? 0.9 : 1}
      />
      <motion.text
        x={point.x}
        y={labelY}
        textAnchor="middle"
        className={point.labelClass}
        style={{ fontFamily: "var(--font-ibm-plex)" }}
      >
        {point.label}
      </motion.text>
    </motion.g>
  );
}

export function RouteVisual() {
  const prefersReducedMotion = useReducedMotion();
  const pathRef = useRef<SVGPathElement>(null);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [traveler, setTraveler] = useState({ x: 0, y: 0 });

  const originY = useMotionValue(0);
  const transitY = useMotionValue(0);
  const destY = useMotionValue(0);
  const pathY = useMotionValue(0);
  const travelProgress = useMotionValue(0);

  const pathD = useTransform(
    [originY, transitY, destY, pathY],
    (values: number[]) => {
      const [oy, ty, dy, py] = values;
      const o = ROUTE_WAYPOINTS.origin;
      const t = ROUTE_WAYPOINTS.transit;
      const d = ROUTE_WAYPOINTS.destination;
      return buildRoutePath(
        { x: o.x, y: o.y + oy + py },
        { x: t.x, y: t.y + ty + py },
        { x: d.x, y: d.y + dy + py }
      );
    }
  );

  const pathReady = Boolean(prefersReducedMotion) || hasDrawn;

  useEffect(() => {
    if (!pathReady || prefersReducedMotion) return;

    const stops: StopKey[] = ["origin", "transit", "destination"];
    const offsets = { origin: originY, transit: transitY, destination: destY };

    const floatControls = stops.map((key) => {
      const cfg = FLOAT_KEYFRAMES[key];
      return animate(offsets[key], cfg.y, {
        duration: cfg.duration,
        delay: cfg.delay,
        repeat: Infinity,
        ease: "easeInOut",
      });
    });

    const pathControl = animate(pathY, PATH_BREATHE.y, {
      duration: PATH_BREATHE.duration,
      repeat: Infinity,
      ease: "easeInOut",
    });

    const travelControl = animate(travelProgress, [0, 1], {
      duration: TRAVELER.duration,
      repeat: Infinity,
      ease: "linear",
    });

    return () => {
      floatControls.forEach((c) => c.stop());
      pathControl.stop();
      travelControl.stop();
    };
  }, [pathReady, prefersReducedMotion, originY, transitY, destY, pathY, travelProgress]);

  const updateTravelerPosition = (progress: number) => {
    const path = pathRef.current;
    if (!path) return;
    const length = path.getTotalLength();
    if (length <= 0) return;
    const pt = path.getPointAtLength(progress * length);
    setTraveler({ x: pt.x, y: pt.y });
  };

  useMotionValueEvent(travelProgress, "change", updateTravelerPosition);
  useMotionValueEvent(pathD, "change", () => {
    updateTravelerPosition(travelProgress.get());
  });

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
          <filter id="travelerGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {LATITUDE_ARC_YS.map((baseY, i) => (
          <motion.g
            key={baseY}
            animate={
              pathReady && !prefersReducedMotion ? { y: ARC_DRIFT.y } : undefined
            }
            transition={{
              duration: ARC_DRIFT.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.2,
            }}
          >
            <path
              d={`M 20 ${baseY} Q 300 ${baseY - 20} 580 ${baseY}`}
              stroke="rgba(26,23,20,0.08)"
              strokeWidth="1"
              fill="none"
            />
          </motion.g>
        ))}

        <motion.path
          ref={pathRef}
          d={pathD}
          stroke="url(#routeGrad)"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: prefersReducedMotion ? 1 : 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={defaultViewport}
          transition={{
            duration: prefersReducedMotion ? 0 : DRAW_TRANSITION.duration,
            ease: DRAW_TRANSITION.ease,
          }}
          onAnimationComplete={() => setHasDrawn(true)}
        />

        {pathReady && !prefersReducedMotion && (
          <motion.g filter="url(#travelerGlow)">
            <circle
              cx={traveler.x}
              cy={traveler.y}
              r={TRAVELER.glowRadius}
              fill="#C45C3E"
              opacity={0.25}
            />
            <motion.circle
              cx={traveler.x}
              cy={traveler.y}
              r={TRAVELER.radius}
              fill="#C45C3E"
              animate={{ scale: [1, 1.15, 1] }}
              transition={{
                duration: TRAVELER.duration / 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.g>
        )}

        {STOP_KEYS.map((key) => (
          <RouteStop
            key={key}
            point={ROUTE_WAYPOINTS[key]}
            yOffset={
              key === "origin" ? originY : key === "transit" ? transitY : destY
            }
            delay={STOP_DELAYS[key]}
            prefersReducedMotion={prefersReducedMotion}
          />
        ))}
      </svg>

      <motion.div className="absolute top-4 right-4 px-3 py-1.5 bg-surface/90 backdrop-blur-sm border border-border text-[10px] tracking-widest uppercase text-muted">
        Est. ~15 working days
      </motion.div>
    </motion.div>
  );
}
