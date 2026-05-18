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

const STATIC_PATH = buildRoutePath(
  { x: ROUTE_WAYPOINTS.origin.x, y: ROUTE_WAYPOINTS.origin.y },
  { x: ROUTE_WAYPOINTS.transit.x, y: ROUTE_WAYPOINTS.transit.y },
  { x: ROUTE_WAYPOINTS.destination.x, y: ROUTE_WAYPOINTS.destination.y }
);

function getPathFromOffsets(
  oy: number,
  ty: number,
  dy: number,
  py: number
): string {
  const o = ROUTE_WAYPOINTS.origin;
  const t = ROUTE_WAYPOINTS.transit;
  const d = ROUTE_WAYPOINTS.destination;
  return buildRoutePath(
    { x: o.x, y: o.y + oy + py },
    { x: t.x, y: t.y + ty + py },
    { x: d.x, y: d.y + dy + py }
  );
}

/** Safari-safe stop: animate the group transform, not SVG cy/y motion values */
function RouteStop({
  point,
  yOffset,
  delay,
  prefersReducedMotion,
  show,
}: {
  point: RoutePoint;
  yOffset: ReturnType<typeof useMotionValue<number>>;
  delay: number;
  prefersReducedMotion: boolean | null;
  show: boolean;
}) {
  const y = useTransform(yOffset, (v) => v);

  return (
    <motion.g
      style={{ y }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={
        show
          ? { opacity: 1, scale: 1 }
          : { opacity: 0, scale: 0.8 }
      }
      transition={{ delay: prefersReducedMotion ? 0 : delay, duration: 0.45 }}
    >
      <circle
        cx={point.x}
        cy={point.y}
        r={point.radius}
        fill={point.fill}
        fillOpacity={point.fill === "#C45C3E" && point.radius < 8 ? 0.9 : 1}
      />
      <text
        x={point.x}
        y={point.labelY}
        textAnchor="middle"
        className={point.labelClass}
        style={{ fontFamily: "var(--font-ibm-plex)" }}
      >
        {point.label}
      </text>
    </motion.g>
  );
}

export function RouteVisual() {
  const prefersReducedMotion = useReducedMotion();
  const pathRef = useRef<SVGPathElement>(null);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [showStops, setShowStops] = useState(false);
  const [pathD, setPathD] = useState(STATIC_PATH);
  const [traveler, setTraveler] = useState(() => {
    const o = ROUTE_WAYPOINTS.origin;
    return { x: o.x, y: o.y };
  });

  const originY = useMotionValue(0);
  const transitY = useMotionValue(0);
  const destY = useMotionValue(0);
  const pathY = useMotionValue(0);
  const travelProgress = useMotionValue(0);

  const syncPath = (oy: number, ty: number, dy: number, py: number) => {
    setPathD(getPathFromOffsets(oy, ty, dy, py));
  };

  useMotionValueEvent(originY, "change", (oy) => {
    syncPath(oy, transitY.get(), destY.get(), pathY.get());
  });
  useMotionValueEvent(transitY, "change", (ty) => {
    syncPath(originY.get(), ty, destY.get(), pathY.get());
  });
  useMotionValueEvent(destY, "change", (dy) => {
    syncPath(originY.get(), transitY.get(), dy, pathY.get());
  });
  useMotionValueEvent(pathY, "change", (py) => {
    syncPath(originY.get(), transitY.get(), destY.get(), py);
  });

  const reducedMotion = Boolean(prefersReducedMotion);
  const pathReady = reducedMotion || hasDrawn;
  const stopsVisible = reducedMotion || showStops;

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

  useEffect(() => {
    if (pathReady) {
      updateTravelerPosition(travelProgress.get());
    }
  }, [pathD, pathReady, travelProgress]);

  return (
    <motion.div
      className="relative w-full max-w-lg min-h-[210px] sm:min-h-[280px] aspect-[4/3] mx-auto lg:mx-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <svg
        viewBox="0 0 600 280"
        width="100%"
        height="100%"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="block w-full h-full"
        aria-hidden
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="routeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0F2A33" />
            <stop offset="50%" stopColor="#C45C3E" />
            <stop offset="100%" stopColor="#0F2A33" />
          </linearGradient>
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
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: prefersReducedMotion ? 1 : 0, opacity: 1 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: prefersReducedMotion ? 0 : DRAW_TRANSITION.duration,
            ease: DRAW_TRANSITION.ease,
          }}
          onAnimationComplete={() => {
            setHasDrawn(true);
            setShowStops(true);
          }}
        />

        {pathReady && !prefersReducedMotion && (
          <g opacity={0.9}>
            <circle
              cx={traveler.x}
              cy={traveler.y}
              r={TRAVELER.glowRadius}
              fill="#C45C3E"
              opacity={0.25}
            />
            <circle
              cx={traveler.x}
              cy={traveler.y}
              r={TRAVELER.radius}
              fill="#C45C3E"
            />
          </g>
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
            show={stopsVisible}
          />
        ))}
      </svg>

      <motion.div className="absolute top-4 right-4 px-3 py-1.5 bg-surface/90 backdrop-blur-sm border border-border text-[10px] tracking-widest uppercase text-muted">
        Est. ~15 working days
      </motion.div>
    </motion.div>
  );
}
