import Link from "next/link"
import { ArrowDownToLineIcon } from "lucide-react"

import { AgentDock } from "@/components/agent-dock"
import { IncidentFeed } from "@/components/incident-feed"
import { site } from "@/lib/site"

export default function Home() {
  return (
    <section className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:gap-14">
      <div className="min-w-0">
        <p className="reveal type-label mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-3 py-1.5 text-muted-foreground">
          <span className="size-1.5 rounded-full bg-signal" />
          Open source · Self-hosted
        </p>
        <h1 className="reveal type-display [animation-delay:60ms]">
          Every SSH attack on your server, <em className="text-signal">explained.</em>
        </h1>
        <p className="reveal type-body mt-6 max-w-[34rem] [animation-delay:120ms]">
          Sentinell reads sshd logs, groups related attempts into one incident, messages you on Telegram, and
          writes a short report where every claim links to the log line it came from.
        </p>

        <div className="reveal mt-8 flex flex-col gap-3 sm:flex-row sm:items-center [animation-delay:180ms]">
          <a
            href={site.releasesUrl}
            className="pressable type-ui flex h-11 items-center justify-center gap-2 rounded-md bg-signal px-5 font-medium text-background hover:bg-signal/90"
          >
            <ArrowDownToLineIcon className="size-4" />
            Download for Linux
          </a>
          <Link
            href="/download"
            className="pressable type-ui flex h-11 items-center justify-center rounded-md border border-border px-5 text-muted-foreground hover:border-foreground/20 hover:text-foreground"
          >
            Install with curl
          </Link>
        </div>

        <div className="reveal mt-10 border-t border-dashed border-border pt-6 [animation-delay:240ms]">
          <p className="type-label mb-3 text-muted-foreground">Or set it up from your agent</p>
          <AgentDock />
        </div>
      </div>

      <div className="reveal min-w-0 [animation-delay:200ms]">
        <IncidentFeed />
      </div>
    </section>
  )
}
