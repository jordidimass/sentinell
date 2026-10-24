import { ogContentType, ogSize, renderOg } from "@/lib/og"

export const alt = "How Sentinell turns SSH auth events into incidents"
export const size = ogSize
export const contentType = ogContentType

export default function Image() {
  return renderOg({ eyebrow: "How it works", title: "From one bad SSH line", accent: "to a signed-off response." })
}
