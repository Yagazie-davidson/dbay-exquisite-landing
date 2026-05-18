export type RoutePoint = {
  x: number;
  y: number;
  label: string;
  labelY: number;
  fill: string;
  radius: number;
  labelClass: string;
};

export const ROUTE_WAYPOINTS = {
  origin: {
    x: 40,
    y: 180,
    label: "US stores",
    labelY: 210,
    fill: "#0F2A33",
    radius: 8,
    labelClass: "fill-ink text-[11px] font-medium",
  },
  transit: {
    x: 340,
    y: 55,
    label: "In transit",
    labelY: 35,
    fill: "#C45C3E",
    radius: 6,
    labelClass: "fill-muted text-[10px]",
  },
  destination: {
    x: 560,
    y: 220,
    label: "Nigeria",
    labelY: 250,
    fill: "#C45C3E",
    radius: 8,
    labelClass: "fill-ink text-[11px] font-medium",
  },
} satisfies Record<string, RoutePoint>;

export const LATITUDE_ARC_YS = [60, 120, 180] as const;

/** Smooth cubic route through origin → transit → destination */
export function buildRoutePath(
  origin: { x: number; y: number },
  transit: { x: number; y: number },
  destination: { x: number; y: number }
): string {
  const c1x = origin.x + (transit.x - origin.x) * 0.4;
  const c1y = origin.y - 60;
  const c2x = origin.x + (transit.x - origin.x) * 0.7;
  const c2y = transit.y + (origin.y - transit.y) * 0.15;

  const c4x = destination.x - (destination.x - transit.x) * 0.45;
  const c4y = destination.y - 40;

  return [
    `M ${origin.x} ${origin.y}`,
    `C ${c1x} ${c1y}, ${c2x} ${c2y}, ${transit.x} ${transit.y}`,
    `S ${c4x} ${c4y}, ${destination.x} ${destination.y}`,
  ].join(" ");
}

export const FLOAT_KEYFRAMES = {
  origin: { y: [0, -10, 4, 0] as number[], duration: 5, delay: 0 },
  transit: { y: [0, 8, -6, 0] as number[], duration: 5.5, delay: 0.4 },
  destination: { y: [0, -8, 6, 0] as number[], duration: 6, delay: 0.8 },
} as const;

export const PATH_BREATHE = {
  y: [0, -5, 3, 0] as number[],
  duration: 5.25,
} as const;

export const ARC_DRIFT = {
  y: [0, -3, 2, 0] as number[],
  duration: 6.5,
} as const;

export const TRAVELER = {
  duration: 4,
  radius: 5,
  glowRadius: 10,
} as const;

export const DRAW_TRANSITION = {
  duration: 1.8,
  ease: [0.22, 1, 0.36, 1] as const,
};

export const STOP_DELAYS = {
  origin: 0.3,
  transit: 0.9,
  destination: 1.5,
} as const;
