import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { ImageResponse } from "next/og"
import { siClaude, siCursor } from "simple-icons"

import { agents } from "@/lib/agents"

export const ogSize = { width: 1200, height: 630 }
export const ogContentType = "image/png"

const colors = {
  bg: "#141210",
  fg: "#ece7dc",
  muted: "#9a958c",
  signal: "#f0503a",
  border: "rgba(255,255,255,0.1)",
}

const shield = "M12 2 3.5 5.5v6c0 5 3.6 9.3 8.5 10.5 4.9-1.2 8.5-5.5 8.5-10.5v-6L12 2Z"
const grok = agents.find((a) => a.id === "grok")!.iconPath

function font(file: string) {
  return readFile(join(process.cwd(), "assets/fonts", file))
}

export function LogoMark({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <path d={shield} fill={colors.fg} />
      <path d="M8 12.5h8" stroke={colors.bg} strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function Icon({ path, size = 18 }: { path: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <path d={path} fill={colors.fg} />
    </svg>
  )
}

// Static frame of the site's ASCII field, with the cursor glow parked left of the headline.
const RAMP = " .·:-=+*λ#@"
const CELL_W = 11
const CELL_H = 18
const GLOW = { x: 1010, y: 500, r: 150 }

function asciiRows() {
  const cols = Math.ceil(ogSize.width / CELL_W)
  const rows = Math.ceil(ogSize.height / CELL_H)
  const out: { text: string; hot: boolean }[][] = []
  for (let j = 0; j < rows; j++) {
    const segs: { text: string; hot: boolean }[] = []
    for (let i = 0; i < cols; i++) {
      const n = Math.sin(i * 0.11 + 1.2) * Math.cos(j * 0.17 - 0.8) + Math.sin((i + j) * 0.045 + 0.6) * 0.6
      const base = (n + 1.6) / 3.2
      const dx = i * CELL_W - GLOW.x
      const dy = j * CELL_H - GLOW.y
      const glow = Math.exp(-(dx * dx + dy * dy) / (GLOW.r * GLOW.r * 2))
      const v = Math.min(0.85, base * 0.55 + glow * 0.8)
      const ch = RAMP[Math.floor(v * (RAMP.length - 1))]
      const hot = glow > 0.45
      const last = segs[segs.length - 1]
      if (last && last.hot === hot) last.text += ch
      else segs.push({ text: ch, hot })
    }
    out.push(segs)
  }
  return out
}

export async function renderOg({ eyebrow, title }: { eyebrow: string; title: string }) {
  const [light, mono, monoMedium] = await Promise.all([
    font("Sentient-Light.ttf"),
    font("JetBrainsMono-Regular.ttf"),
    font("JetBrainsMono-Medium.ttf"),
  ])

  const chips = [
    { name: "Claude", path: siClaude.path },
    { name: "Cursor", path: siCursor.path },
    { name: "Grok Bot", path: grok },
  ]

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: colors.bg,
          color: colors.fg,
          fontFamily: "JetBrains Mono",
        }}
      >
        {/* ASCII field */}
        <div style={{ position: "absolute", top: 0, left: 0, width: ogSize.width, height: ogSize.height, display: "flex", flexDirection: "column", fontSize: 11 }}>
          {asciiRows().map((segs, j) => (
            <div key={j} style={{ display: "flex", height: CELL_H, whiteSpace: "pre" }}>
              {segs.map((s, k) => (
                <span key={k} style={{ color: s.hot ? "rgba(240,80,58,0.55)" : "rgba(236,231,220,0.11)", letterSpacing: 4.4 }}>
                  {s.text}
                </span>
              ))}
            </div>
          ))}
        </div>
        {/* Quiet the field behind the copy, warm glow at the top */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: ogSize.width,
            height: ogSize.height,
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(20,18,16,0.95) 0%, rgba(20,18,16,0.85) 30%, rgba(20,18,16,0) 55%), radial-gradient(circle at 50% -20%, rgba(240,80,58,0.22) 0%, rgba(240,80,58,0) 45%)`,
          }}
        />

        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: ogSize.width,
            height: ogSize.height,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "44px 64px",
          }}
        >
          <div style={{ display: "flex", width: "100%", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <LogoMark size={30} />
              <span style={{ fontWeight: 500, fontSize: 24, letterSpacing: -0.8 }}>sentinell</span>
            </div>
            <span style={{ fontSize: 20, color: colors.muted }}>sentinell.xyz</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 20, color: colors.muted }}>
              <span style={{ color: colors.signal }}>●</span>
              {eyebrow}
            </div>
            <div
              style={{
                display: "flex",
                marginTop: 22,
                maxWidth: 940,
                textAlign: "center",
                justifyContent: "center",
                fontFamily: "Sentient",
                fontWeight: 300,
                fontSize: 86,
                lineHeight: 1,
                letterSpacing: -3.8,
              }}
            >
              {title}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 40 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  height: 46,
                  padding: "0 22px",
                  borderRadius: 8,
                  background: colors.signal,
                  color: colors.bg,
                  fontWeight: 500,
                  fontSize: 18,
                }}
              >
                Download for Linux
              </div>
              {chips.map((c) => (
                <div
                  key={c.name}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    height: 46,
                    padding: "0 18px",
                    borderRadius: 8,
                    border: `1px solid ${colors.border}`,
                    background: "rgba(20,18,16,0.8)",
                    fontSize: 18,
                  }}
                >
                  <Icon path={c.path} />
                  {c.name}
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", height: 24 }} />
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Sentient", data: light, style: "normal", weight: 300 },
        { name: "JetBrains Mono", data: mono, style: "normal", weight: 400 },
        { name: "JetBrains Mono", data: monoMedium, style: "normal", weight: 500 },
      ],
    }
  )
}
