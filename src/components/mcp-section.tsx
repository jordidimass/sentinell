"use client"

import { useEffect, useRef, useState } from "react"

import { cn } from "@/lib/utils"

const tools = [
  "list_incidents",
  "get_incident",
  "get_investigation",
  "get_incident_events",
  "get_auth_history",
  "list_alerts",
  "get_host_metadata",
  "health",
]

const commands = [
  { cmd: "sentinell mcp", note: "Local server for agents on the same host." },
  { cmd: "sentinell mcp token create --name grok", note: "Remote access for cloud agents. Printed once, stored hashed." },
  { cmd: "sentinell mcp token list", note: "See which agents have access." },
  { cmd: "sentinell mcp token revoke <id>", note: "Cut one off without touching the rest." },
  { cmd: "sentinell status", note: "Pipeline health, no secrets." },
]

type Line =
  | { kind: "user"; text: string }
  | { kind: "tool"; name: string; args: string; result: string }
  | { kind: "answer"; text: string; cites: string[] }

const transcript: Line[] = [
  { kind: "user", text: "What hit ubuntu-01 in the last day?" },
  { kind: "tool", name: "list_incidents", args: '{ "since": "24h" }', result: "5 incidents" },
  { kind: "tool", name: "get_investigation", args: '{ "id": "inc-001" }', result: "2 observed · 1 suspected · 1 unknown" },
  {
    kind: "answer",
    text: "203.0.113.7 tried 7 usernames in 100 seconds, then logged in as demo 30 seconds after the last failure. That is suspicious, not confirmed: auth logs don't show what happened after login. A temporary block is waiting for your approval in the dashboard.",
    cites: ["bc7a7e9b", "487fd82d", "2c8eb6a3"],
  },
]

function Transcript() {
  const ref = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          observer.disconnect()
        }
      },
      { rootMargin: "0px 0px -25% 0px" }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      data-shown={shown}
      className="overflow-hidden rounded-xl border border-border bg-card shadow-[0_40px_120px_-50px_oklch(0.66_0.22_31/0.45)]"
    >
      <div className="flex h-8 items-center gap-1.5 border-b border-border px-3">
        <span className="size-2 rounded-full bg-foreground/15" />
        <span className="size-2 rounded-full bg-foreground/15" />
        <span className="size-2 rounded-full bg-foreground/15" />
        <span className="type-ui ml-3 text-[11px] text-muted-foreground">agent · sentinell mcp</span>
      </div>
      <ol className="space-y-4 p-5 font-mono text-[13px] leading-relaxed sm:p-6">
        {transcript.map((line, i) => (
          <li
            key={i}
            style={{ transitionDelay: shown ? `${i * 380}ms` : "0ms" }}
            className={cn(
              "transition-[opacity,transform] duration-500 ease-[var(--ease-out)] motion-reduce:translate-y-0",
              shown ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
            )}
          >
            {line.kind === "user" && (
              <p className="text-foreground">
                <span className="text-signal">›</span> {line.text}
              </p>
            )}
            {line.kind === "tool" && (
              <p className="flex flex-wrap items-baseline gap-x-2 text-muted-foreground">
                <span className="text-phosphor">●</span>
                <span className="text-foreground">{line.name}</span>
                <span>{line.args}</span>
                <span className="text-muted-foreground/70">→ {line.result}</span>
              </p>
            )}
            {line.kind === "answer" && (
              <div className="border-l border-border pl-4 text-foreground/90">
                <p>{line.text}</p>
                <p className="mt-3 flex flex-wrap gap-1.5">
                  {line.cites.map((id) => (
                    <span key={id} className="rounded border border-border px-1.5 py-0.5 font-mono text-[11px] text-muted-foreground">
                      {id}
                    </span>
                  ))}
                </p>
              </div>
            )}
          </li>
        ))}
      </ol>
    </div>
  )
}

export function McpSection() {
  return (
    <section id="mcp" className="pb-28">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.55fr)] lg:items-center lg:gap-16">
        <div className="fade-up">
          <p className="type-label flex items-center gap-2 text-muted-foreground">
            <span className="text-signal">05</span>
            MCP
          </p>
          <h2 className="type-title mt-4 text-[clamp(1.75rem,1.3rem+1.6vw,2.5rem)]">Ask your agent what happened.</h2>
          <p className="type-body mt-4 max-w-sm">
            Sentinell ships a read-only MCP server. Claude, Cursor or Grok Bot can list incidents, read the
            investigation and pull the evidence, and every answer comes back with the event IDs behind it.
          </p>
          <ul className="mt-6 flex max-w-sm flex-wrap gap-1.5">
            {tools.map((tool) => (
              <li key={tool} className="type-ui rounded-md border border-border px-2 py-1 text-[11px] text-muted-foreground">
                {tool}
              </li>
            ))}
          </ul>
        </div>
        <div className="fade-up min-w-0">
          <Transcript />
        </div>
      </div>

      <div className="mt-16 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.55fr)] lg:gap-16">
        <div className="fade-up">
          <h3 className="type-heading text-base">Managed from the agent</h3>
          <p className="type-small mt-3 max-w-sm">
            Your agent runs the <span className="text-foreground">sentinell</span> CLI on the host to start the server
            and hand out access. Nothing about it needs the dashboard except the password.
          </p>
          <p className="type-small mt-4 max-w-sm">
            <span className="text-foreground">Guardrails.</span> MCP stays locked until the dashboard password exists.
            No tool can block an IP, approve an action or read an API key. Those stay with you.
          </p>
        </div>
        <ul className="fade-up min-w-0 divide-y divide-border overflow-hidden rounded-xl border border-border bg-background/60">
          {commands.map((c) => (
            <li key={c.cmd} className="flex flex-col gap-1 px-5 py-3.5 sm:flex-row sm:items-baseline sm:gap-6">
              <code className="type-ui shrink-0 text-foreground sm:w-[21.5rem] sm:whitespace-nowrap">
                <span className="text-signal">$</span> {c.cmd}
              </code>
              <span className="type-small text-[13px]">{c.note}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
