import { ogContentType, ogSize, renderOg } from "@/lib/og"

export const alt = "Sentinell's non-negotiable principles"
export const size = ogSize
export const contentType = ogContentType

export default function Image() {
  return renderOg({ eyebrow: "Non-negotiables", title: "An analyst", accent: "you can audit." })
}
