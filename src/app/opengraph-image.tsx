import { ogContentType, ogSize, renderOg } from "@/lib/og"

export const alt = "Sentinell — your L1 analyst never sleeps"
export const size = ogSize
export const contentType = ogContentType

export default function Image() {
  return renderOg({ eyebrow: "Self-hosted SOC", title: "Your L1 analyst", accent: "never sleeps." })
}
