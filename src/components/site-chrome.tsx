"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ArrowRightIcon } from "lucide-react"

import { Logo } from "@/components/logo"
import { routes, site } from "@/lib/site"
import { cn } from "@/lib/utils"

const navRoutes = routes.slice(1, -1)

export function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/70 backdrop-blur-xl backdrop-saturate-150">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-8">
        <Link href="/" onClick={() => setOpen(false)} className="flex items-center gap-2" aria-label="Sentinell home">
          <Logo />
          <span className="text-[17px] font-medium tracking-[-0.02em]">Sentinell</span>
        </Link>

        <nav className="type-ui hidden items-center gap-1 md:flex">
          {navRoutes.map((r) => (
            <Link
              key={r.href}
              href={r.href}
              className={cn(
                "rounded-md px-3 py-1.5 transition-colors duration-150 hover:bg-muted hover:text-foreground",
                pathname === r.href ? "text-foreground" : "text-muted-foreground"
              )}
            >
              {r.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={site.repoUrl}
            className="pressable type-ui hidden h-8 items-center rounded-md border border-border px-3 text-muted-foreground hover:border-foreground/20 hover:text-foreground sm:flex"
          >
            GitHub
          </a>
          <a
            href={site.releasesUrl}
            className="pressable type-ui hidden h-8 items-center rounded-md bg-foreground px-3 font-medium text-background hover:bg-foreground/85 sm:flex"
          >
            Download
          </a>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="pressable relative grid size-9 place-items-center rounded-md border border-border md:hidden"
          >
            <span
              className={cn(
                "absolute h-px w-4 bg-foreground transition-transform duration-200 ease-[var(--ease-out)]",
                open ? "rotate-45" : "-translate-y-[3px]"
              )}
            />
            <span
              className={cn(
                "absolute h-px w-4 bg-foreground transition-transform duration-200 ease-[var(--ease-out)]",
                open ? "-rotate-45" : "translate-y-[3px]"
              )}
            />
          </button>
        </div>
      </div>

      <nav
        id="mobile-nav"
        inert={!open}
        className={cn(
          "absolute inset-x-0 top-full h-[calc(100dvh-3.5rem)] border-t border-border bg-background px-4 pt-2 transition-[opacity,transform] duration-200 ease-[var(--ease-out)] md:hidden",
          open ? "opacity-100" : "pointer-events-none -translate-y-1 opacity-0"
        )}
      >
        <ul className="divide-y divide-border">
          {routes.map((r) => (
            <li key={r.href}>
              <Link
                href={r.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center justify-between py-4 text-xl tracking-[-0.02em]",
                  pathname === r.href ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {r.label}
                {pathname === r.href && <span className="size-1.5 rounded-full bg-signal" />}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-6 grid grid-cols-2 gap-2">
          <a
            href={site.repoUrl}
            className="pressable type-ui flex h-11 items-center justify-center rounded-md border border-border"
          >
            GitHub
          </a>
          <a
            href={site.releasesUrl}
            className="pressable type-ui flex h-11 items-center justify-center rounded-md bg-foreground font-medium text-background"
          >
            Download
          </a>
        </div>
      </nav>
    </header>
  )
}

export function SiteFooter() {
  const pathname = usePathname()
  const index = Math.max(0, routes.findIndex((r) => r.href === pathname))
  const next = routes[(index + 1) % routes.length]

  return (
    <footer className="border-t border-border">
      <div className="type-ui mx-auto flex h-14 w-full max-w-6xl items-center justify-between gap-4 px-4 text-muted-foreground sm:px-8">
        <div className="flex items-center gap-3">
          <span className="text-foreground tabular-nums">{String(index + 1).padStart(2, "0")}</span>
          <div className="flex">
            {routes.map((r, i) => (
              <Link key={r.href} href={r.href} aria-label={r.label} className="group px-0.5 py-3">
                <span
                  className={cn(
                    "block h-0.5 w-5 transition-colors duration-150",
                    i === index ? "bg-signal" : "bg-border group-hover:bg-muted-foreground"
                  )}
                />
              </Link>
            ))}
          </div>
          <span className="tabular-nums">{String(routes.length).padStart(2, "0")}</span>
        </div>
        <Link href={next.href} className="group flex items-center gap-2 transition-colors hover:text-foreground">
          {next.label}
          <ArrowRightIcon className="size-3.5 transition-transform duration-200 ease-[var(--ease-out)] group-hover:translate-x-0.5" />
        </Link>
      </div>
    </footer>
  )
}

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="type-label mb-5 flex items-center gap-2 text-muted-foreground">
      <span className="size-1.5 rounded-full bg-signal" />
      {children}
    </p>
  )
}
