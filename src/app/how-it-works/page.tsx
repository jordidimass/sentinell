import type { Metadata } from "next"

import { SectionLabel } from "@/components/site-chrome"

const description = "What Sentinell does between a failed SSH login and an incident report."

export const metadata: Metadata = {
  title: "How it works",
  description,
  openGraph: { title: "How it works · Sentinell", description, siteName: "Sentinell", type: "website" },
}

const flow = [
  { n: "01", title: "Read", body: "The collector tails journald for sshd events. It runs as an unprivileged user. No Docker." },
  { n: "02", title: "Group", body: "Repeated failures from one IP become one incident: fast bursts, slow guessing, or a login that finally worked." },
  { n: "03", title: "Notify", body: "One Telegram message per incident, not one per log line. Alerts still go out if the AI is offline." },
  { n: "04", title: "Investigate", body: "A model with read-only access writes the report. Claims without a matching event ID are dropped." },
  { n: "05", title: "Block", body: "Block the IP with nftables for a set time. Runs only after you approve it, and can be rolled back." },
]

export default function HowItWorks() {
  return (
    <section>
      <div className="reveal">
        <SectionLabel>How it works</SectionLabel>
        <h1 className="type-title max-w-2xl">From failed login to incident report.</h1>
      </div>
      <ol className="mt-10 grid overflow-hidden rounded-lg border border-border bg-background sm:grid-cols-2 sm:gap-px sm:bg-border lg:grid-cols-5">
        {flow.map((s, i) => (
          <li
            key={s.n}
            style={{ animationDelay: `${100 + i * 50}ms` }}
            className="reveal flex gap-4 border-b border-border bg-background p-5 last:border-b-0 sm:flex-col sm:border-b-0 lg:p-6"
          >
            <span className="type-ui pt-1 text-signal tabular-nums">{s.n}</span>
            <div>
              <h2 className="type-heading">{s.title}</h2>
              <p className="type-small mt-2">{s.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
