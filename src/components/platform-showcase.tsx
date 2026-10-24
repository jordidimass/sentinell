"use client"

import { useEffect, useRef, useState } from "react"
import Image, { type StaticImageData } from "next/image"

import incidents from "@/assets/screens/incidents.png"
import investigation from "@/assets/screens/investigation.png"
import response from "@/assets/screens/response.png"
import setup from "@/assets/screens/setup.png"
import { cn } from "@/lib/utils"

type Step = {
  label: string
  title: string
  body: string
  image: StaticImageData
  alt: string
}

const steps: Step[] = [
  {
    label: "Incidents",
    title: "Every attempt, grouped.",
    body: "Failures from one address become one incident with a severity, the patterns it matched and how many usernames it tried. One Telegram message, not a wall of log lines.",
    image: incidents,
    alt: "Sentinell incident list with five correlated SSH incidents",
  },
  {
    label: "Investigation",
    title: "A report that shows its work.",
    body: "Each finding is marked observed, suspected or unknown and links the event IDs it relies on. Claims that cite events that don't exist are thrown out before you see them.",
    image: investigation,
    alt: "Sentinell investigation with observed, suspected and unknown findings citing event IDs",
  },
  {
    label: "Response",
    title: "You decide what gets blocked.",
    body: "Sentinell proposes a temporary nftables block with an expiry. Nothing runs until you approve it, and allowlisted addresses are refused even then.",
    image: response,
    alt: "Sentinell response panel with a temporary IP block awaiting approval",
  },
  {
    label: "Setup",
    title: "Set up from the dashboard.",
    body: "Each step checks itself off when the host reports it working: password, model key, Telegram, collector and the optional block runner.",
    image: setup,
    alt: "Sentinell setup checklist with three of five steps done",
  },
]

function Frame({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-border bg-card shadow-[0_40px_120px_-50px_oklch(0.66_0.22_31/0.45)]",
        className
      )}
    >
      <div className="flex h-8 items-center gap-1.5 border-b border-border px-3">
        <span className="size-2 rounded-full bg-foreground/15" />
        <span className="size-2 rounded-full bg-foreground/15" />
        <span className="size-2 rounded-full bg-foreground/15" />
        <span className="type-ui ml-3 text-[11px] text-muted-foreground">ubuntu-01:8080</span>
      </div>
      {children}
    </div>
  )
}

export function PlatformShowcase() {
  const [active, setActive] = useState(0)
  const refs = useRef<(HTMLLIElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.index))
        }
      },
      { rootMargin: "-45% 0px -45% 0px" }
    )
    for (const el of refs.current) if (el) observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="platform" className="scroll-mt-8 pb-24">
      <div className="tilt-in mx-auto max-w-5xl">
        <Frame>
          <Image src={incidents} alt={steps[0].alt} placeholder="blur" sizes="(min-width: 1024px) 1024px, 100vw" priority />
        </Frame>
      </div>

      <div className="mt-24 grid gap-10 lg:mt-32 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.55fr)] lg:gap-16">
        <ol className="flex flex-col">
          {steps.map((step, i) => (
            <li
              key={step.label}
              ref={(el) => {
                refs.current[i] = el
              }}
              data-index={i}
              className="flex flex-col justify-center py-10 lg:min-h-[72vh] lg:py-0"
            >
              <div
                className={cn(
                  "transition-opacity duration-300 ease-out",
                  active === i ? "lg:opacity-100" : "lg:opacity-35"
                )}
              >
                <p className="type-label flex items-center gap-2 text-muted-foreground">
                  <span className="tabular-nums text-signal">0{i + 1}</span>
                  {step.label}
                </p>
                <h2 className="type-title mt-4 text-[clamp(1.75rem,1.3rem+1.6vw,2.5rem)]">{step.title}</h2>
                <p className="type-body mt-4 max-w-sm">{step.body}</p>
              </div>
              <div className="fade-up mt-8 lg:hidden">
                <Frame>
                  <Image src={step.image} alt={step.alt} placeholder="blur" sizes="100vw" />
                </Frame>
              </div>
            </li>
          ))}
        </ol>

        <div className="hidden lg:block">
          <div className="sticky top-[calc(50vh-17rem)]">
            <Frame>
              <div className="relative aspect-[1440/900]">
                {steps.map((step, i) => (
                  <Image
                    key={step.label}
                    src={step.image}
                    alt={step.alt}
                    placeholder="blur"
                    sizes="(min-width: 1024px) 640px, 100vw"
                    aria-hidden={active !== i}
                    className={cn(
                      "absolute inset-0 h-full w-full object-cover object-top transition-[opacity,transform,filter] duration-500 ease-[var(--ease-out)]",
                      active === i ? "scale-100 opacity-100 blur-0" : "scale-[0.985] opacity-0 blur-[4px]"
                    )}
                  />
                ))}
              </div>
            </Frame>
            <div className="mt-5 flex gap-1.5">
              {steps.map((step, i) => (
                <span
                  key={step.label}
                  className={cn(
                    "h-0.5 flex-1 rounded-full transition-colors duration-300",
                    i <= active ? "bg-signal" : "bg-border"
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
