import type { Metadata } from "next"

import { AgentGrid } from "@/components/agent-dock"
import { SectionLabel } from "@/components/site-chrome"

export const metadata: Metadata = {
  title: "Agents",
  description: "Copy one prompt into Claude Code, Cursor, Windsurf, Copilot, Gemini CLI or Zed to install and connect Sentinell.",
  openGraph: { title: "Agents · Sentinell", description: "Copy one prompt into Claude Code, Cursor, Windsurf, Copilot, Gemini CLI or Zed to install and connect Sentinell.", siteName: "Sentinell", type: "website" },
}

export default function Agents() {
  return (
    <section className="grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:items-center">
      <div className="reveal">
        <SectionLabel>Agent-native</SectionLabel>
        <h1 className="font-display text-[clamp(2.5rem,5vw,4rem)] leading-[1.02] tracking-tight">
          Paste one prompt. <em className="text-signal">Your agent</em> does the rest.
        </h1>
        <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted-foreground">
          Each prompt installs Sentinell, configures it without echoing secrets, and registers the read-only MCP
          server — so you can ask your agent &ldquo;what hit my box last night?&rdquo; and get cited answers.
        </p>
      </div>
      <div className="reveal [animation-delay:150ms]">
        <AgentGrid />
      </div>
    </section>
  )
}
