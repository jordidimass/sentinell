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
        description: "Paste it into your agent and it will install and connect Sentinell.",
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
          className="group relative grid size-11 place-items-center rounded-md border border-border bg-card text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-signal/60 hover:text-foreground focus-visible:outline-2 focus-visible:outline-signal"
        >
          {copied === agent.id ? (
            <CheckIcon className="size-4 text-phosphor" />
          ) : (
            <BrandIcon agent={agent} className="size-[18px]" />
          )}
          <span className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-foreground px-2 py-0.5 text-[10px] text-background opacity-0 transition-opacity group-hover:opacity-100">
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
    <div className="grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
      {agents.map((agent) => {
        const done = copied === agent.id
        return (
          <button
            key={agent.id}
            type="button"
            onClick={() => copy(agent)}
            className="group flex flex-col gap-6 bg-background p-6 text-left transition-colors hover:bg-card focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-signal"
          >
            <div className="flex items-center justify-between">
              <BrandIcon
                agent={agent}
                className="size-7 text-muted-foreground transition-colors group-hover:text-foreground"
              />
              <span
                className={cn(
                  "flex items-center gap-1.5 text-[11px] uppercase tracking-widest transition-colors",
                  done ? "text-phosphor" : "text-muted-foreground group-hover:text-signal"
                )}
              >
                {done ? <CheckIcon className="size-3" /> : <CopyIcon className="size-3" />}
                {done ? "Copied" : "Copy prompt"}
              </span>
            </div>
            <div>
              <p className="font-display text-2xl">{agent.name}</p>
              <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                {agent.connect.split("\n")[0]}
              </p>
            </div>
          </button>
        )
      })}
    </div>
  )
}
