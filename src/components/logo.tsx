import { cn } from "@/lib/utils"

// Sentinel mark from the product dashboard: a filled shield with a horizontal slit.
// Keep paths in sync with app/icon.svg and lib/og.tsx.
export const shieldPath = "M12 2 3.5 5.5v6c0 5 3.6 9.3 8.5 10.5 4.9-1.2 8.5-5.5 8.5-10.5v-6L12 2Z"

export function Logo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("size-5", className)} aria-hidden>
      <path d={shieldPath} className="fill-foreground" />
      <path d="M8 12.5h8" className="stroke-background" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}
