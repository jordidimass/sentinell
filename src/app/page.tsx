import Link from "next/link"
import { ArrowDownToLineIcon } from "lucide-react"

import { AgentDock } from "@/components/agent-dock"
import { IncidentFeed } from "@/components/incident-feed"
import { buttonVariants } from "@/components/ui/button"
import { site } from "@/lib/site"
import { cn } from "@/lib/utils"

export default function Home() {
  return (
    <section className="grid gap-14 lg:grid-cols-[1.05fr_1fr] lg:items-center">
      <div className="reveal min-w-0">
        <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 font-mono text-[11px] text-muted-foreground">
          <span className="size-1.5 rounded-full bg-signal" />
          Self-hosted · open source · single binary
        </p>
        <h1 className="font-display text-[clamp(3rem,7vw,5.75rem)] leading-[0.92] tracking-tight">
          Your L1 analyst
          <br />
          <em className="text-signal">never sleeps.</em>
        </h1>
        <p className="mt-7 max-w-md text-sm leading-relaxed text-muted-foreground">
          Sentinell watches SSH auth on your Linux server, correlates attacks into incidents, pings you on
          Telegram, and writes an evidence-cited investigation — on your hardware, with your keys.
        </p>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
          <a
            href={site.releasesUrl}
            className={cn(
              buttonVariants({ size: "lg" }),
              "h-12 gap-2.5 rounded-md bg-signal px-5 text-sm text-background hover:bg-signal/85"
            )}
          >
            <ArrowDownToLineIcon className="size-4" />
            Download binaries
          </a>
          <Link href="/download" className="font-mono text-xs text-muted-foreground hover:text-foreground">
            Linux x86_64 · arm64 →
          </Link>
        </div>

        <div className="mt-12">
          <p className="mb-3 font-mono text-[11px] tracking-widest text-muted-foreground uppercase">
            Or let your agent install it — click to copy
          </p>
          <AgentDock />
        </div>
      </div>

      <div className="reveal min-w-0 [animation-delay:200ms]">
        <IncidentFeed />
      </div>
    </section>
  )
}
