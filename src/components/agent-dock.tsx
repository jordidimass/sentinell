"use client"

import { useState } from "react"
import { CheckIcon, CopyIcon } from "lucide-react"
import { toast } from "sonner"

import { agentPrompt, agents, type Agent } from "@/lib/agents"
import { cn } from "@/lib/utils"

function BrandIcon({ agent, className }: { agent: Agent; className?: string }) {
  return (
    <svg role="img" viewBox="0 0 24 24" aria-hidden className={cn("fill-current", className)}>
      <path d={agent.icon.path} />
    </svg>
  )
}

function useCopy() {
  const [copied, setCopied] = useState<string | null>(null)

  async function copy(agent: Agent) {
    try {
      await navigator.clipboard.writeText(agentPrompt(agent))
      setCopied(agent.id)
      toast.success(`Prompt copied for ${agent.name}`, {
        description: "Paste it into the agent's chat.",
      })
      setTimeout(() => setCopied((id) => (id === agent.id ? null : id)), 1800)
    } catch {
      toast.error("Clipboard blocked", { description: "Allow clipboard access and try again." })
    }
  }

  return { copied, copy }
}

export function AgentDock({ className }: { className?: string }) {
  const { copied, copy } = useCopy()

  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      {agents.map((agent) => (
        <button
          key={agent.id}
          type="button"
          onClick={() => copy(agent)}
          aria-label={`Copy setup prompt for ${agent.name}`}
          className="pressable group relative grid size-11 place-items-center rounded-md border border-border bg-background/60 text-muted-foreground focus-visible:outline-2 focus-visible:outline-signal [@media(hover:hover)]:hover:border-foreground/25 [@media(hover:hover)]:hover:text-foreground"
        >
          {copied === agent.id ? (
            <CheckIcon className="size-4 text-phosphor" />
          ) : (
            <BrandIcon agent={agent} className="size-[18px]" />
          )}
          <span className="type-ui pointer-events-none absolute -top-9 left-1/2 hidden -translate-x-1/2 translate-y-1 whitespace-nowrap rounded-md border border-border bg-popover px-2 py-1 text-[11px] text-foreground opacity-0 transition-[opacity,transform] duration-150 ease-[var(--ease-out)] group-hover:translate-y-0 group-hover:opacity-100 [@media(hover:hover)]:block">
            {agent.name}
          </span>
        </button>
      ))}
    </div>
  )
}

export function AgentGrid() {
  const { copied, copy } = useCopy()

  return (
    <div className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-border bg-border lg:grid-cols-3">
      {agents.map((agent) => {
        const done = copied === agent.id
        return (
          <button
            key={agent.id}
            type="button"
            onClick={() => copy(agent)}
            className="group flex flex-col gap-5 bg-background p-5 text-left transition-colors duration-150 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-signal active:bg-card lg:p-6 [@media(hover:hover)]:hover:bg-card"
          >
            <div className="flex items-center justify-between">
              <BrandIcon
                agent={agent}
                className="size-6 text-muted-foreground transition-colors duration-150 group-hover:text-foreground"
              />
              <span
                className={cn(
                  "type-label flex items-center gap-1.5 text-[11px] transition-colors duration-150",
                  done ? "text-phosphor" : "text-muted-foreground group-hover:text-signal"
                )}
              >
                {done ? <CheckIcon className="size-3" /> : <CopyIcon className="size-3" />}
                {done ? "Copied" : "Copy"}
              </span>
            </div>
            <div>
              <p className="type-heading">{agent.name}</p>
              <p className="type-ui mt-1.5 truncate text-xs text-muted-foreground">
                {agent.hint}
              </p>
            </div>
          </button>
        )
      })}
    </div>
  )
}
