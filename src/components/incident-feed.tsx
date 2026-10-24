"use client"

import { useEffect, useState } from "react"

import { cn } from "@/lib/utils"

const lines = [
  { t: "15:51:02", type: "ssh_invalid_user", msg: "Invalid user admin from 203.0.113.47 port 51822", id: "e3a1" },
  { t: "15:51:04", type: "ssh_invalid_user", msg: "Invalid user oracle from 203.0.113.47 port 51830", id: "9fc0" },
  { t: "15:51:05", type: "ssh_preauth_disconnect", msg: "Connection closed by authenticating user root 203.0.113.47 port 51841 [preauth]", id: "71bd" },
  { t: "15:51:07", type: "ssh_invalid_user", msg: "Invalid user ubuntu from 203.0.113.47 port 51857", id: "c42e" },
  { t: "15:51:09", type: "ssh_failed_password", msg: "Failed password for demo from 203.0.113.47 port 51866 ssh2", id: "0d5a" },
  { t: "15:51:15", type: "ssh_success", msg: "Accepted password for demo from 203.0.113.47 port 51873 ssh2", id: "b818" },
]

const findings = [
  { label: "observed", text: "5 failed attempts from one source in 13 s", cites: ["e3a1", "9fc0", "71bd", "c42e", "0d5a"] },
  { label: "suspected", text: "Credential guessing succeeded against `demo`", cites: ["0d5a", "b818"] },
  { label: "unknown", text: "Post-login activity — auth logs alone can't tell", cites: [] },
] as const

const labelColor = {
  observed: "text-phosphor border-phosphor/40",
  suspected: "text-amber border-amber/40",
  unknown: "text-muted-foreground border-border",
}

export function IncidentFeed() {
  const [step, setStep] = useState(0)
  const total = lines.length + 1 + findings.length

  useEffect(() => {
    const id = setInterval(() => setStep((s) => (s >= total + 6 ? 0 : s + 1)), 650)
    return () => clearInterval(id)
  }, [total])

  const shownLines = Math.min(step, lines.length)
  const incidentOpen = step > lines.length
  const shownFindings = Math.max(0, step - lines.length - 1)

  return (
    <div className="relative overflow-hidden rounded-lg border border-border bg-card/80 font-mono text-[11px] shadow-[0_30px_100px_-40px_oklch(0.62_0.22_29/0.4)] backdrop-blur">
      <div className="flex items-center justify-between border-b border-border px-4 py-2.5 text-muted-foreground">
        <span className="flex items-center gap-2">
          <span className="size-1.5 animate-pulse rounded-full bg-phosphor" />
          journald · ubuntu-01 · sshd
        </span>
        <span className="uppercase tracking-widest">live</span>
      </div>

      <div className="h-[168px] min-w-0 space-y-1 overflow-hidden px-4 py-3">
        {lines.slice(0, shownLines).map((l) => (
          <div key={l.id} className="flex min-w-0 animate-in gap-3 fade-in slide-in-from-bottom-1 duration-300">
            <span className="text-muted-foreground/60">{l.t}</span>
            <span
              className={cn(
                "hidden w-[118px] shrink-0 truncate sm:block",
                l.type === "ssh_success" ? "text-signal" : "text-muted-foreground"
              )}
            >
              {l.type}
            </span>
            <span className="truncate text-foreground/80">{l.msg}</span>
          </div>
        ))}
      </div>

      <div
        className={cn(
          "border-t border-signal/40 bg-signal/[0.06] px-4 py-4 transition-opacity duration-500",
          incidentOpen ? "opacity-100" : "opacity-0"
        )}
      >
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="rounded-sm bg-signal px-1.5 py-0.5 font-semibold text-background">INC-0042</span>
          <span className="text-foreground">success_after_failures · 203.0.113.47</span>
          <span className="ml-auto text-muted-foreground">telegram · sent once</span>
        </div>
        <ul className="mt-3 space-y-1.5">
          {findings.slice(0, shownFindings).map((f) => (
            <li key={f.label} className="flex animate-in items-start gap-2 fade-in duration-300">
              <span className={cn("shrink-0 rounded-sm border px-1.5 uppercase", labelColor[f.label])}>
                {f.label}
              </span>
              <span className="text-foreground/90">
                {f.text}
                {f.cites.length > 0 && (
                  <span className="text-muted-foreground"> [{f.cites.join(", ")}]</span>
                )}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
