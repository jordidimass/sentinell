import { ogContentType, ogSize, renderOg } from "@/lib/og"

export const alt = "Sentinell: every SSH attack on your server, explained"
export const size = ogSize
export const contentType = ogContentType

export default function Image() {
  return renderOg({ eyebrow: "self-hosted / open source", title: "Every SSH attack on your server, explained." })
}
