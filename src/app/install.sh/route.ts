import { cacheLife } from "next/cache"

import { site } from "@/lib/site"

const headers = {
  "Content-Type": "text/x-shellscript; charset=utf-8",
  "Cache-Control": "public, max-age=60, s-maxage=60",
  "Content-Disposition": 'inline; filename="install.sh"',
}

export async function GET() {
  try {
    const script = await loadInstallScript()
    return new Response(script, { headers })
  } catch {
    return new Response("install script unavailable\n", {
      status: 502,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-store",
      },
    })
  }
}

async function loadInstallScript() {
  "use cache"
  cacheLife("minutes")

  const response = await fetch(site.installScriptUrl)
  if (!response.ok) throw new Error(`install script ${response.status}`)

  const script = await response.text()
  if (!script.startsWith("#!/usr/bin/env bash")) {
    throw new Error("install script was not a shell script")
  }
  return script
}
