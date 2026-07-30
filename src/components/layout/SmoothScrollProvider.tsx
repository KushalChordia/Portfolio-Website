"use client";

import type { ReactNode } from "react";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";

/**
 * Boots Lenis for the whole document. Rendered once in the root layout so the
 * rest of the tree — including every server component — stays untouched.
 */
export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  useSmoothScroll();
  return <>{children}</>;
}
