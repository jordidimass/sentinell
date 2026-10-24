import type { Metadata } from "next"

import { SectionLabel } from "@/components/site-chrome"

export const metadata: Metadata = {
  title: "Principles",
  description: "No invented events, honest uncertainty, attacker input as data, humans hold the trigger.",
  openGraph: { title: "Principles · Sentinell", description: "No invented events, honest uncertainty, attacker input as data, humans hold the trigger.", siteName: "Sentinell", type: "website" },
}

const principles = [
  ["No invented events", "Findings citing unknown event IDs are rejected before you ever see them."],
  ["Honest uncertainty", "Observed, suspected, unknown. Success after failures is suspicious — not compromised."],
  ["Attacker input is data", "Usernames and raw log lines never reach the model as instructions."],
  ["Humans hold the trigger", "The allowlist wins even over an approval. Nothing locks you out silently."],
]

export default function Principles() {
  return (
    <section>
      <div className="reveal">
        <SectionLabel>Non-negotiables</SectionLabel>
        <h1 className="max-w-3xl font-display text-[clamp(2.5rem,5vw,4rem)] leading-[1.02] tracking-tight">
          An analyst you can <em className="text-signal">audit.</em>
        </h1>
      </div>
      <div className="mt-14 grid gap-x-12 gap-y-10 md:grid-cols-2">
        {principles.map(([title, body], i) => (
          <div key={title} style={{ animationDelay: `${150 + i * 80}ms` }} className="reveal flex gap-6">
            <span className="font-display text-5xl text-muted-foreground/40 italic">{i + 1}</span>
            <div>
              <h2 className="font-display text-3xl">{title}</h2>
              <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">{body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
