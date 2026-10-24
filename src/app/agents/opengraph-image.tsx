import { ogContentType, ogSize, renderOg } from "@/lib/og"

export const alt = "Connect Sentinell to Claude, Cursor and more"
export const size = ogSize
export const contentType = ogContentType

export default function Image() {
  return renderOg({ eyebrow: "Agents", title: "Install it from", accent: "your editor." })
}
