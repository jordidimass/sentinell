import type { Metadata } from "next"
import { ArrowDownToLineIcon } from "lucide-react"

import { CopyCommand } from "@/components/copy-command"
import { SectionLabel } from "@/components/site-chrome"
import { binaries, site } from "@/lib/site"

const description = "Static binaries for Linux x86_64 and arm64, built for Ubuntu with systemd."

export const metadata: Metadata = {
  title: "Download",
  description,
  openGraph: { title: "Download · Sentinell", description, siteName: "Sentinell", type: "website" },
}

export default function Download() {
  return (
    <section className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
      <div className="reveal min-w-0">
        <SectionLabel>Download · {site.version}</SectionLabel>
        <h1 className="type-title">One binary. Your server.</h1>
        <p className="type-body mt-5 max-w-md">
          Built for Ubuntu with systemd. Logs stay on the machine unless you connect the investigator to a model.
        </p>
        <div className="mt-8 max-w-md">
          <CopyCommand command={site.installCmd} />
        </div>
      </div>

      <ul className="reveal min-w-0 divide-y divide-border overflow-hidden rounded-lg border border-border bg-background/60 [animation-delay:120ms]">
        {binaries.map((b) => (
          <li key={b.file}>
            <a
              href={`${site.releasesUrl}/download/${b.file}`}
              className="group flex items-center gap-4 px-5 py-4 transition-colors duration-150 hover:bg-card"
            >
              <div className="min-w-0">
                <p className="type-heading text-base">
                  {b.os} <span className="text-muted-foreground">{b.arch}</span>
                </p>
                <p className="type-ui mt-1 truncate text-xs text-muted-foreground">
                  {b.file} · {b.size}
                  {"note" in b && ` · ${b.note}`}
                </p>
              </div>
              <ArrowDownToLineIcon className="ml-auto size-4 shrink-0 text-muted-foreground transition-colors duration-150 group-hover:text-signal" />
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
