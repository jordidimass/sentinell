"use client"

import { useState } from "react"
import { CheckIcon, CopyIcon } from "lucide-react"
import { toast } from "sonner"

export function CopyCommand({ command }: { command: string }) {
  const [copied, setCopied] = useState(false)

  async function copy() {
    try {
      await navigator.clipboard.writeText(command)
      setCopied(true)
      toast.success("Install command copied")
      setTimeout(() => setCopied(false), 1600)
    } catch {
      toast.error("Clipboard blocked")
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="group flex w-full items-center gap-3 overflow-hidden rounded-md border border-border bg-card px-4 py-3 text-left font-mono text-xs transition-colors hover:border-signal/50"
    >
      <span className="text-signal">$</span>
      <span className="truncate text-foreground/90">{command}</span>
      <span className="ml-auto shrink-0 text-muted-foreground group-hover:text-foreground">
        {copied ? <CheckIcon className="size-4 text-phosphor" /> : <CopyIcon className="size-4" />}
      </span>
    </button>
  )
}
