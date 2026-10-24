import type { Metadata } from "next"

import { SectionLabel } from "@/components/site-chrome"

const description = "The rules Sentinell follows when it reports on and responds to an attack."

export const metadata: Metadata = {
  title: "Principles",
  description,
  openGraph: { title: "Principles · Sentinell", description, siteName: "Sentinell", type: "website" },
}

const principles = [
  ["Cites its sources", "Every finding points at specific event IDs. If an ID doesn't exist, the finding is thrown out."],
  ["Says when it isn't sure", "Findings are marked observed, suspected or unknown. A login after failures is flagged as suspicious, not as a breach."],
  ["Doesn't trust log contents", "Usernames and log messages come from the attacker. The model gets them as data, never as instructions."],
  ["Asks before acting", "Blocking an IP needs your approval, and allowlisted addresses can't be blocked even then."],
]

export default function Principles() {
  return (
    <section>
      <div className="reveal">
        <SectionLabel>Principles</SectionLabel>
        <h1 className="type-title max-w-2xl">Rules it follows.</h1>
      </div>
      <div className="mt-10 grid overflow-hidden rounded-lg border border-border bg-background md:grid-cols-2 md:gap-px md:bg-border">
        {principles.map(([title, body], i) => (
          <div
            key={title}
            style={{ animationDelay: `${100 + i * 50}ms` }}
            className="reveal flex gap-5 border-b border-border bg-background p-5 last:border-b-0 md:border-b-0 lg:p-7"
          >
            <span className="type-ui pt-1 text-muted-foreground tabular-nums">0{i + 1}</span>
            <div>
              <h2 className="type-heading">{title}</h2>
              <p className="type-small mt-2 max-w-sm">{body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
