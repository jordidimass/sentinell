import { ogContentType, ogSize, renderOg } from "@/lib/og"

export const alt = "Sentinell — your L1 analyst never sleeps"
export const size = ogSize
export const contentType = ogContentType

export default function Image() {
  return renderOg({ eyebrow: "Self-hosted · Open source", title: "Every SSH attack on your server, explained." })
}
