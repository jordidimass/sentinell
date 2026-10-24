"use client"

import { useState } from "react"
import { BotIcon, CheckIcon, CopyIcon } from "lucide-react"
import { toast } from "sonner"

import { agentPrompt, agents, type Agent } from "@/lib/agents"
import { cn } from "@/lib/utils"

function AgentIcon({ agent, className }: { agent: Agent; className?: string }) {
  if (!agent.iconPath) return <BotIcon className={className} aria-hidden />
  return (
    <svg role="img" viewBox="0 0 24 24" aria-hidden className={cn("fill-current", className)}>
      <path d={agent.iconPath} />
    </svg>
  )
}

export function AgentButtons() {
  const [copied, setCopied] = useState<string | null>(null)

  async function copy(agent: Agent) {
    try {
      await navigator.clipboard.writeText(agentPrompt(agent))
      setCopied(agent.id)
      toast.success(`Prompt copied for ${agent.name}`, { description: "Paste it into the agent's chat." })
      setTimeout(() => setCopied((id) => (id === agent.id ? null : id)), 1800)
    } catch {
      toast.error("Clipboard blocked", { description: "Allow clipboard access and try again." })
    }
  }

  return (
    <div className="flex flex-wrap justify-center gap-2 max-sm:flex-nowrap max-sm:gap-1.5">
      {agents.map((agent) => {
        const done = copied === agent.id
        return (
          <button
            key={agent.id}
            type="button"
            onClick={() => copy(agent)}
            aria-label={`Copy setup prompt for ${agent.name}`}
            className="pressable group type-ui flex h-10 items-center gap-2.5 rounded-md border border-border bg-background/70 pr-3 pl-3.5 max-sm:h-9 max-sm:gap-1.5 max-sm:px-2.5 max-sm:text-xs max-sm:whitespace-nowrap text-foreground backdrop-blur focus-visible:outline-2 focus-visible:outline-signal [@media(hover:hover)]:hover:border-foreground/25"
          >
            <AgentIcon agent={agent} className="size-4" />
            {agent.name}
            <span className="ml-1 text-muted-foreground max-sm:hidden transition-colors duration-150 group-hover:text-foreground">
              {done ? <CheckIcon className="size-3.5 text-phosphor" /> : <CopyIcon className="size-3.5" />}
            </span>
          </button>
        )
      })}
    </div>
  )
}
