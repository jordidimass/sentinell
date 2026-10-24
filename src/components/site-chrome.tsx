"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ArrowRightIcon } from "lucide-react"

import { Logo } from "@/components/logo"
import { buttonVariants } from "@/components/ui/button"
import { routes, site } from "@/lib/site"
import { cn } from "@/lib/utils"

export function SiteHeader() {
  const pathname = usePathname()

  return (
    <header className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-5 sm:px-6">
      <Link href="/" className="flex items-center gap-2.5">
        <Logo />
        <span className="font-mono text-sm font-semibold tracking-[0.2em] uppercase">Sentinell</span>
      </Link>
      <nav className="hidden items-center gap-7 text-xs md:flex">
        {routes.slice(1, -1).map((r) => (
          <Link
            key={r.href}
            href={r.href}
            className={cn(
              "transition-colors hover:text-foreground",
              pathname === r.href ? "text-foreground" : "text-muted-foreground"
            )}
          >
            {r.label}
          </Link>
        ))}
        <a href={site.repoUrl} className="text-muted-foreground transition-colors hover:text-foreground">
          GitHub
        </a>
      </nav>
      <Link
        href="/download"
        className={cn(
          buttonVariants({ variant: "outline", size: "sm" }),
          "font-mono text-xs",
          pathname === "/download" && "border-signal/60 text-signal"
        )}
      >
        {site.version}
      </Link>
    </header>
  )
}

export function SiteFooter() {
  const pathname = usePathname()
  const index = Math.max(0, routes.findIndex((r) => r.href === pathname))
  const next = routes[(index + 1) % routes.length]

  return (
    <footer className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-5 font-mono text-[11px] text-muted-foreground sm:px-6">
      <div className="flex items-center gap-3">
        <span className="text-foreground">{String(index + 1).padStart(2, "0")}</span>
        <div className="flex gap-1">
          {routes.map((r, i) => (
            <Link
              key={r.href}
              href={r.href}
              aria-label={r.label}
              className={cn(
                "h-0.5 w-5 transition-colors",
                i === index ? "bg-signal" : "bg-border hover:bg-muted-foreground"
              )}
            />
          ))}
        </div>
        <span>{String(routes.length).padStart(2, "0")}</span>
      </div>
      <Link href={next.href} className="group flex items-center gap-2 transition-colors hover:text-foreground">
        <span className="hidden sm:inline">Next —</span> {next.label}
        <ArrowRightIcon className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:text-signal" />
      </Link>
    </footer>
  )
}

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-5 font-mono text-[11px] tracking-[0.25em] text-signal uppercase">
      {"// "}
      {children}
    </p>
  )
}
