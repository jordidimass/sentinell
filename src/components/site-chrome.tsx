import Link from "next/link"

import { Logo } from "@/components/logo"
import { site } from "@/lib/site"

export function SiteHeader() {
  return (
    <header className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-8">
      <Link href="/" className="flex items-center gap-2" aria-label="Sentinell home">
        <Logo />
        <span className="font-mono text-[15px] font-medium tracking-[-0.03em]">sentinell</span>
      </Link>
      <a
        href={site.repoUrl}
        className="type-ui text-muted-foreground transition-colors duration-150 hover:text-foreground"
      >
        GitHub
      </a>
    </header>
  )
}

export function SiteFooter() {
  return (
    <footer className="type-ui mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-4 text-muted-foreground sm:px-8">
      <span>{site.version}</span>
      <span>Built at Grok Bot Guatemala Hackathon</span>
    </footer>
  )
}
