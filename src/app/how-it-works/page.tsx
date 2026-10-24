import type { Metadata } from "next"

import { SectionLabel } from "@/components/site-chrome"

export const metadata: Metadata = {
  title: "How it works",
  description: "Collect, correlate, alert, investigate, respond — Sentinell's L1 triage pipeline for a Linux host.",
  openGraph: { title: "How it works · Sentinell", description: "Collect, correlate, alert, investigate, respond — Sentinell's L1 triage pipeline for a Linux host.", siteName: "Sentinell", type: "website" },
}

const flow = [
  { n: "01", title: "Collect", body: "A Rust collector tails journald for SSH auth events. No agents, no Docker, one user in systemd-journal." },
  { n: "02", title: "Correlate", body: "Bursts, low-and-slow guessing, success after failures — linked into one incident per source." },
  { n: "03", title: "Alert", body: "One deduplicated Telegram alert per new or escalated incident. Works even when the AI is down." },
  { n: "04", title: "Investigate", body: "A bounded, read-only AI investigator writes the L1 report. Every finding cites real event IDs." },
  { n: "05", title: "Respond", body: "Temporary nftables block with expiry and rollback — only after a human approves it." },
]

export default function HowItWorks() {
  return (
    <section className="reveal">
      <SectionLabel>How it works</SectionLabel>
      <h1 className="max-w-3xl font-display text-[clamp(2.5rem,5vw,4rem)] leading-[1.02] tracking-tight">
        From one bad SSH line to a <em className="text-signal">signed-off</em> response.
      </h1>
      <ol className="mt-14 grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-5">
        {flow.map((s, i) => (
          <li
            key={s.n}
            style={{ animationDelay: `${150 + i * 80}ms` }}
            className="reveal flex flex-col gap-4 bg-background p-6"
          >
            <span className="font-mono text-xs text-signal">{s.n}</span>
            <h2 className="font-display text-2xl">{s.title}</h2>
            <p className="text-xs leading-relaxed text-muted-foreground">{s.body}</p>
          </li>
        ))}
      </ol>
      <p className="mt-8 font-mono text-[11px] text-muted-foreground">
        journald → collector → API + SQLite → detection → telegram · investigator → dashboard → approved response
      </p>
    </section>
  )
}
