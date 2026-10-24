import { ogContentType, ogSize, renderOg } from "@/lib/og"

export const alt = "Connect Sentinell to Claude, Cursor and more"
export const size = ogSize
export const contentType = ogContentType

export default function Image() {
  return renderOg({ eyebrow: "Agent-native", title: "Paste one prompt.", accent: "Your agent does the rest." })
}
