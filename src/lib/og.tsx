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

const shield = "M12 2 3.5 5.5v6c0 5 3.6 9.3 8.5 10.5 4.9-1.2 8.5-5.5 8.5-10.5v-6L12 2Z"

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

export async function renderOg({ eyebrow, title, accent }: { eyebrow: string; title: string; accent?: string }) {
  const [serif, serifMedium, serifItalic, mono] = await Promise.all([
    font("Sentient-Regular.ttf"),
    font("Sentient-Medium.ttf"),
    font("Sentient-Italic.ttf"),
    font("JetBrainsMono-Regular.ttf"),
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
          fontFamily: "JetBrains Mono",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <LogoMark size={48} />
            <span style={{ fontSize: 32, letterSpacing: -1 }}>sentinell</span>
          </div>
          <span style={{ fontSize: 20, color: colors.muted }}>sentinell.xyz</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 22, letterSpacing: 1.5, color: colors.muted }}>
            <div style={{ width: 10, height: 10, borderRadius: 10, background: colors.signal }} />
            {eyebrow.toUpperCase()}
          </div>
          <div style={{ display: "flex", flexDirection: "column", marginTop: 24, fontFamily: "Sentient", fontWeight: 400, fontSize: 92, lineHeight: 1, letterSpacing: -3.5, maxWidth: 1000 }}>
            <span>{title}</span>
            {accent && <span style={{ fontWeight: 400, fontStyle: "italic", color: colors.signal }}>{accent}</span>}
          </div>
        </div>

        <div style={{ display: "flex", gap: 28, fontSize: 20, color: colors.muted }}>
          <span>sshd → incident → telegram → report</span>
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Sentient", data: serif, style: "normal", weight: 400 },
        { name: "Sentient", data: serifMedium, style: "normal", weight: 500 },
        { name: "Sentient", data: serifItalic, style: "italic", weight: 400 },
        { name: "JetBrains Mono", data: mono, style: "normal", weight: 400 },
      ],
    }
  )
}
