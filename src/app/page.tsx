import { ArrowDownIcon, ArrowDownToLineIcon } from "lucide-react"

import { AgentButtons } from "@/components/agent-dock"
import { CopyCommand } from "@/components/copy-command"
import { McpSection } from "@/components/mcp-section"
import { PlatformShowcase } from "@/components/platform-showcase"
import { site } from "@/lib/site"

export default function Home() {
  return (
    <>
      <section className="relative mx-auto flex min-h-[calc(100dvh-7.5rem)] w-full max-w-3xl flex-col items-center justify-center py-12 text-center max-md:min-h-[calc(100dvh-6.5rem)] max-md:py-[2dvh]">
        <p className="reveal type-ui text-muted-foreground">
          <span className="text-signal">●</span> self-hosted <span className="text-border">/</span> open source
        </p>
        <h1 className="reveal type-display mt-6 max-md:mt-[2.5dvh] max-md:text-[min(10.5vw,6.4dvh)] [animation-delay:60ms]">
          Every SSH attack on your server, explained.
        </h1>
        <p className="reveal type-body mt-6 max-w-[34rem] max-md:mt-[2.5dvh] max-md:text-[13px] max-md:leading-[1.6] [animation-delay:120ms]">
          Sentinell reads sshd logs, groups attempts into incidents, alerts you on Telegram, and writes a report that
          cites the exact log lines.
        </p>

        <div className="reveal mt-10 flex w-full max-w-md flex-col gap-2 max-md:mt-[4dvh] [animation-delay:180ms]">
          <a
            href={site.downloadUrl}
            className="pressable type-ui flex h-11 shrink-0 items-center justify-center gap-2 rounded-md bg-signal px-5 font-medium text-background hover:bg-signal/90"
          >
            <ArrowDownToLineIcon className="size-4" />
            Download source
          </a>
          <CopyCommand command={site.installCmd} />
        </div>

        <div className="reveal mt-12 flex flex-col items-center gap-4 max-md:mt-[4.5dvh] max-md:gap-3 [animation-delay:240ms]">
          <p className="type-label text-muted-foreground">
            Or paste a setup prompt <span className="max-sm:hidden">into your agent</span>
          </p>
          <AgentButtons />
        </div>

        <a
          href="#platform"
          className="type-label absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 text-muted-foreground transition-colors duration-150 hover:text-foreground max-md:hidden"
        >
          See the dashboard
          <ArrowDownIcon className="scroll-cue size-3.5" />
        </a>
      </section>

      <PlatformShowcase />

      <McpSection />

      <section className="mx-auto flex w-full max-w-md flex-col items-center gap-4 pb-24 text-center">
        <h2 className="type-title">Run it on your server.</h2>
        <p className="type-body">One command. Bring your own model key, or none at all.</p>
        <div className="mt-2 w-full">
          <CopyCommand command={site.installCmd} />
        </div>
      </section>
    </>
  )
}
