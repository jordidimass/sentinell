import { ArrowDownToLineIcon } from "lucide-react"

import { AgentButtons } from "@/components/agent-dock"
import { CopyCommand } from "@/components/copy-command"
import { site } from "@/lib/site"

export default function Home() {
  return (
    <section className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
      <p className="reveal type-ui text-muted-foreground">
        <span className="text-signal">●</span> self-hosted <span className="text-border">/</span> open source
      </p>
      <h1 className="reveal type-display mt-6 [animation-delay:60ms]">Every SSH attack on your server, explained.</h1>
      <p className="reveal type-body mt-6 max-w-[34rem] [animation-delay:120ms]">
        Sentinell reads sshd logs, groups attempts into incidents, alerts you on Telegram, and writes a report that
        cites the exact log lines.
      </p>

      <div className="reveal mt-10 flex w-full max-w-md flex-col gap-2 [animation-delay:180ms]">
        <a
          href={site.releasesUrl}
          className="pressable type-ui flex h-11 items-center justify-center gap-2 rounded-md bg-signal px-5 font-medium text-background hover:bg-signal/90"
        >
          <ArrowDownToLineIcon className="size-4" />
          Download for Linux
        </a>
        <CopyCommand command={site.installCmd} />
      </div>

      <div className="reveal mt-12 flex flex-col items-center gap-4 [animation-delay:240ms]">
        <p className="type-label text-muted-foreground">Or paste a setup prompt into your agent</p>
        <AgentButtons />
      </div>
    </section>
  )
}
