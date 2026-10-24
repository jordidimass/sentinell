import { ogContentType, ogSize, renderOg } from "@/lib/og"

export const alt = "Download Sentinell binaries"
export const size = ogSize
export const contentType = ogContentType

export default function Image() {
  return renderOg({ eyebrow: "Download", title: "One binary.", accent: "Your server." })
}
