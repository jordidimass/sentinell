import type { Metadata } from "next"
import { ArrowRightIcon } from "lucide-react"

import { CopyCommand } from "@/components/copy-command"
import { SectionLabel } from "@/components/site-chrome"
import { binaries, site } from "@/lib/site"

export const metadata: Metadata = {
  title: "Download",
  description: "One static binary for Linux x86_64 and arm64. Runs natively on Ubuntu with systemd.",
  openGraph: { title: "Download · Sentinell", description: "One static binary for Linux x86_64 and arm64. Runs natively on Ubuntu with systemd.", siteName: "Sentinell", type: "website" },
}

export default function Download() {
  return (
    <section className="grid gap-12 lg:grid-cols-2 lg:items-center">
      <div className="reveal">
        <SectionLabel>Download</SectionLabel>
        <h1 className="font-display text-[clamp(3rem,6vw,4.75rem)] leading-none tracking-tight">
          Own your <em className="text-signal">SOC.</em>
        </h1>
        <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted-foreground">
          One static binary. Runs natively on Ubuntu with systemd. Your logs never leave the host unless you point
          the investigator at a model.
        </p>
        <div className="mt-8 max-w-md">
          <CopyCommand command={site.installCmd} />
        </div>
      </div>

      <ul className="reveal divide-y divide-border rounded-lg border border-border bg-background/60 [animation-delay:150ms]">
        {binaries.map((b) => (
          <li key={b.file}>
            <a
              href={`${site.releasesUrl}/download/${b.file}`}
              className="group flex items-center gap-4 px-5 py-4 transition-colors hover:bg-card"
            >
              <div className="min-w-0">
                <p className="text-sm">
                  {b.os} <span className="text-muted-foreground">{b.arch}</span>
                </p>
                <p className="truncate font-mono text-[11px] text-muted-foreground">
                  {b.file} · {b.size}
                  {"note" in b && ` · ${b.note}`}
                </p>
              </div>
              <ArrowRightIcon className="ml-auto size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-signal" />
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
