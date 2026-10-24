import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { ImageResponse } from "next/og"

export const ogSize = { width: 1200, height: 630 }
export const ogContentType = "image/png"

const colors = {
  bg: "#141210",
  fg: "#ece7dc",
  muted: "#9a958c",
  signal: "#f0503a",
  border: "rgba(255,255,255,0.08)",
}

const shield = "M12 2 3 6v6c0 5 3.8 9.3 9 10 5.2-.7 9-5 9-10V6l-9-4Z"

function font(file: string) {
  return readFile(join(process.cwd(), "assets/fonts", file))
}

export function LogoMark({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <path d={shield} fill="none" stroke={colors.fg} strokeWidth="1.6" strokeLinejoin="round" />
      <circle cx="12" cy="11" r="2.4" fill={colors.signal} />
    </svg>
  )
}

export async function renderOg({ eyebrow, title, accent }: { eyebrow: string; title: string; accent: string }) {
  const [serif, serifItalic, mono] = await Promise.all([
    font("InstrumentSerif-Regular.ttf"),
    font("InstrumentSerif-Italic.ttf"),
    font("IBMPlexMono-Regular.ttf"),
  ])

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: colors.bg,
          backgroundImage: `radial-gradient(circle at 92% 0%, rgba(240,80,58,0.35), transparent 45%), linear-gradient(to right, ${colors.border} 1px, transparent 1px), linear-gradient(to bottom, ${colors.border} 1px, transparent 1px)`,
          backgroundSize: "100% 100%, 56px 56px, 56px 56px",
          color: colors.fg,
          fontFamily: "Plex Mono",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <LogoMark size={44} />
            <span style={{ fontSize: 24, letterSpacing: 8 }}>SENTINELL</span>
          </div>
          <span style={{ fontSize: 20, color: colors.muted }}>sentinell.xyz</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: 22, letterSpacing: 6, color: colors.signal }}>{`// ${eyebrow.toUpperCase()}`}</span>
          <div style={{ display: "flex", flexDirection: "column", marginTop: 20, fontFamily: "Instrument Serif", fontSize: 112, lineHeight: 0.95 }}>
            <span>{title}</span>
            <span style={{ fontStyle: "italic", color: colors.signal }}>{accent}</span>
          </div>
        </div>

        <div style={{ display: "flex", gap: 28, fontSize: 20, color: colors.muted }}>
          <span>self-hosted</span>
          <span>·</span>
          <span>evidence-cited AI triage</span>
          <span>·</span>
          <span>MCP for your agents</span>
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Instrument Serif", data: serif, style: "normal", weight: 400 },
        { name: "Instrument Serif", data: serifItalic, style: "italic", weight: 400 },
        { name: "Plex Mono", data: mono, style: "normal", weight: 400 },
      ],
    }
  )
}
