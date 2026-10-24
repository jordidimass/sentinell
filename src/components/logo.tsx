import { cn } from "@/lib/utils"

// Shield with a signal dot. Keep paths in sync with app/icon.svg and lib/og.tsx.
export const shieldPath = "M12 2 3 6v6c0 5 3.8 9.3 9 10 5.2-.7 9-5 9-10V6l-9-4Z"

export function Logo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("size-5", className)} aria-hidden>
      <path d={shieldPath} className="fill-none stroke-foreground" strokeWidth="1.6" strokeLinejoin="round" />
      <circle cx="12" cy="11" r="2.4" className="fill-signal" />
    </svg>
  )
}
