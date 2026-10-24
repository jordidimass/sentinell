import type { Metadata } from "next"

import { AgentGrid } from "@/components/agent-dock"
import { SectionLabel } from "@/components/site-chrome"

const description = "Copy a setup prompt for Claude Code, Cursor, Windsurf, Copilot, Gemini CLI or Zed."

export const metadata: Metadata = {
  title: "Agents",
  description,
  openGraph: { title: "Agents · Sentinell", description, siteName: "Sentinell", type: "website" },
}

export default function Agents() {
  return (
    <section className="grid gap-10 lg:grid-cols-[1fr_1.5fr] lg:items-center lg:gap-14">
      <div className="reveal">
        <SectionLabel>Agents</SectionLabel>
        <h1 className="type-title">Install it from your editor.</h1>
        <p className="type-body mt-5 max-w-md">
          Pick your agent to copy a setup prompt. Paste it in the chat and the agent installs Sentinell, configures
          it, and connects over MCP. Then ask it things like &ldquo;what happened on the server last night?&rdquo;
        </p>
      </div>
      <div className="reveal [animation-delay:120ms]">
        <AgentGrid />
      </div>
    </section>
  )
}
