import { ArrowDownToLineIcon, ArrowRightIcon } from "lucide-react"

import { AgentDock, AgentGrid } from "@/components/agent-dock"
import { CopyCommand } from "@/components/copy-command"
import { IncidentFeed } from "@/components/incident-feed"
import { buttonVariants } from "@/components/ui/button"
import { binaries, site } from "@/lib/site"
import { cn } from "@/lib/utils"

const flow = [
  { n: "01", title: "Collect", body: "A Rust collector tails journald for SSH auth events. No agents, no Docker, one user in systemd-journal." },
  { n: "02", title: "Correlate", body: "Bursts, low-and-slow guessing, success after failures — linked into one incident per source." },
  { n: "03", title: "Alert", body: "One deduplicated Telegram alert per new or escalated incident. Works even when the AI is down." },
  { n: "04", title: "Investigate", body: "A bounded, read-only AI investigator writes the L1 report. Every finding cites real event IDs." },
  { n: "05", title: "Respond", body: "Temporary nftables block with expiry and rollback — only after a human approves it." },
]

const principles = [
  ["No invented events", "Findings citing unknown event IDs are rejected before you ever see them."],
  ["Honest uncertainty", "Observed, suspected, unknown. Success after failures is suspicious — not compromised."],
  ["Attacker input is data", "Usernames and raw log lines never reach the model as instructions."],
  ["Humans hold the trigger", "The allowlist wins even over an approval. Nothing locks you out silently."],
]

export default function Home() {
  return (
    <div className="relative isolate overflow-x-clip">
      <div aria-hidden className="grid-bg pointer-events-none absolute inset-x-0 top-0 -z-10 h-[900px]" />
      <div aria-hidden className="pointer-events-none absolute -top-40 right-[-10%] -z-10 size-[640px] rounded-full bg-signal/20 blur-[140px]" />

      <header className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5 sm:px-6">
        <a href="#" className="flex items-center gap-2.5">
          <Mark />
          <span className="font-mono text-sm font-semibold tracking-[0.2em] uppercase">Sentinell</span>
        </a>
        <nav className="hidden items-center gap-8 text-xs text-muted-foreground md:flex">
          <a href="#how" className="hover:text-foreground">How it works</a>
          <a href="#agents" className="hover:text-foreground">Agents</a>
          <a href="#principles" className="hover:text-foreground">Principles</a>
          <a href={site.repoUrl} className="hover:text-foreground">GitHub</a>
        </nav>
        <a href="#download" className={cn(buttonVariants({ variant: "outline", size: "sm" }), "font-mono text-xs")}>
          {site.version}
        </a>
      </header>

      {/* Hero */}
      <section className="mx-auto grid max-w-6xl gap-14 px-4 pt-14 pb-24 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:pt-24">
        <div className="reveal min-w-0">
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 font-mono text-[11px] text-muted-foreground">
            <span className="size-1.5 rounded-full bg-signal" />
            Self-hosted · open source · single binary
          </p>
          <h1 className="font-display text-[clamp(3rem,7vw,5.75rem)] leading-[0.92] tracking-tight">
            Your L1 analyst
            <br />
            <em className="text-signal">never sleeps.</em>
          </h1>
          <p className="mt-7 max-w-md text-sm leading-relaxed text-muted-foreground">
            Sentinell watches SSH auth on your Linux server, correlates attacks into incidents, pings you on
            Telegram, and writes an evidence-cited investigation — on your hardware, with your keys.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={site.releasesUrl}
              className={cn(
                buttonVariants({ size: "lg" }),
                "h-12 gap-2.5 rounded-md bg-signal px-5 text-sm text-background hover:bg-signal/85"
              )}
            >
              <ArrowDownToLineIcon className="size-4" />
              Download binaries
            </a>
            <a href="#download" className="font-mono text-xs text-muted-foreground hover:text-foreground">
              Linux x86_64 · arm64 →
            </a>
          </div>

          <div className="mt-12">
            <p className="mb-3 font-mono text-[11px] tracking-widest text-muted-foreground uppercase">
              Or let your agent install it — click to copy
            </p>
            <AgentDock />
          </div>
        </div>

        <div className="reveal min-w-0 [animation-delay:200ms]">
          <IncidentFeed />
        </div>
      </section>

      {/* Flow */}
      <section id="how" className="border-y border-border">
        <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
          <SectionLabel>How it works</SectionLabel>
          <h2 className="max-w-2xl font-display text-4xl leading-tight sm:text-5xl">
            From one bad SSH line to a <em>signed-off</em> response.
          </h2>
          <ol className="mt-14 grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-5">
            {flow.map((s) => (
              <li key={s.n} className="flex flex-col gap-4 bg-background p-6">
                <span className="font-mono text-xs text-signal">{s.n}</span>
                <h3 className="font-display text-2xl">{s.title}</h3>
                <p className="text-xs leading-relaxed text-muted-foreground">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Agents */}
      <section id="agents" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <SectionLabel>Agent-native</SectionLabel>
            <h2 className="font-display text-4xl leading-tight sm:text-5xl">
              Paste one prompt. <em className="text-signal">Your agent</em> does the rest.
            </h2>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Each prompt installs Sentinell, configures it without echoing secrets, and registers the read-only
              MCP server — so you can ask your agent &ldquo;what hit my box last night?&rdquo; and get cited answers.
            </p>
          </div>
          <AgentGrid />
        </div>
      </section>

      {/* Principles */}
      <section id="principles" className="border-y border-border bg-card/40">
        <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
          <SectionLabel>Non-negotiables</SectionLabel>
          <div className="mt-6 grid gap-12 md:grid-cols-2">
            {principles.map(([title, body], i) => (
              <div key={title} className="flex gap-6">
                <span className="font-display text-5xl text-muted-foreground/40 italic">{i + 1}</span>
                <div>
                  <h3 className="font-display text-3xl">{title}</h3>
                  <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Download */}
      <section id="download" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-end">
          <div>
            <SectionLabel>Download</SectionLabel>
            <h2 className="font-display text-5xl leading-none sm:text-6xl">
              Own your <em className="text-signal">SOC.</em>
            </h2>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted-foreground">
              One static binary. Runs natively on Ubuntu with systemd. Your logs never leave the host unless you
              point the investigator at a model.
            </p>
            <div className="mt-8 max-w-md">
              <CopyCommand command={site.installCmd} />
            </div>
          </div>

          <ul className="divide-y divide-border rounded-lg border border-border">
            {binaries.map((b) => (
              <li key={b.file}>
                <a
                  href={`${site.releasesUrl}/download/${b.file}`}
                  className="group flex items-center gap-4 px-5 py-4 transition-colors hover:bg-card"
                >
                  <div className="min-w-0">
                    <p className="text-sm">
                      {b.os} <span className="text-muted-foreground">{b.arch}</span>
                    </p>
                    <p className="truncate font-mono text-[11px] text-muted-foreground">
                      {b.file} · {b.size}
                      {"note" in b && ` · ${b.note}`}
                    </p>
                  </div>
                  <ArrowRightIcon className="ml-auto size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-signal" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 font-mono text-[11px] text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <span>Sentinell — built at Grok Bot Guatemala Hackathon, Oct 2026.</span>
          <span>sentinell.xyz</span>
        </div>
      </footer>
    </div>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-5 font-mono text-[11px] tracking-[0.25em] text-signal uppercase">
      {"// "}
      {children}
    </p>
  )
}

function Mark() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" aria-hidden>
      <path d="M12 2 3 6v6c0 5 3.8 9.3 9 10 5.2-.7 9-5 9-10V6l-9-4Z" className="fill-none stroke-foreground" strokeWidth="1.6" />
      <circle cx="12" cy="11" r="2.4" className="fill-signal" />
    </svg>
  )
}
