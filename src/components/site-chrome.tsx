import Link from "next/link"
import { siGithub } from "simple-icons"

import { Logo } from "@/components/logo"
import { site } from "@/lib/site"

export function SiteHeader() {
  return (
    <header className="mx-auto flex h-16 w-full shrink-0 max-md:h-14 max-w-6xl items-center justify-between px-4 sm:px-8">
      <Link href="/" className="flex items-center gap-2" aria-label="Sentinell home">
        <Logo />
        <span className="font-mono text-[15px] font-medium tracking-[-0.03em]">sentinell</span>
      </Link>
      <a
        href={site.repoUrl}
        className="type-ui flex items-center gap-2 text-muted-foreground transition-colors duration-150 hover:text-foreground"
      >
        <svg viewBox="0 0 24 24" aria-hidden className="size-4 fill-current">
          <path d={siGithub.path} />
        </svg>
        GitHub
      </a>
    </header>
  )
}

export function SiteFooter() {
  return (
    <footer className="type-ui mx-auto flex h-14 w-full shrink-0 max-md:h-12 max-md:text-xs max-w-6xl items-center justify-between px-4 text-muted-foreground sm:px-8">
      <span>{site.version}</span>
    </footer>
  )
}
