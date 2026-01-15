"use client";

export function HeroGsap({ children }: { children: React.ReactNode }) {
  // Intentionally lightweight: we keep transitions CSS-based
  // and reserve complex motion for Three.js.
  return <div>{children}</div>;
}
