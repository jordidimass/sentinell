"use client"

import { useEffect, useRef } from "react"

// Density ramp, darkest to brightest.
const RAMP = " .·:-=+*λ#@"
const CELL_W = 11
const CELL_H = 18
const RADIUS = 160
const FPS = 30

export function AsciiField() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas?.getContext("2d")
    if (!canvas || !ctx) return

    const styles = getComputedStyle(document.documentElement)
    const font = styles.getPropertyValue("--font-mono").trim() || "monospace"
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    let cols = 0
    let rows = 0
    let dpr = 1
    let raf = 0
    let last = 0
    let time = 0

    // Cursor target and an eased follower, so the glow trails the pointer instead of snapping.
    const target = { x: -9999, y: -9999 }
    const pos = { x: -9999, y: -9999 }
    let presence = 0
    let active = false

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      const w = window.innerWidth
      const h = window.innerHeight
      canvas!.width = w * dpr
      canvas!.height = h * dpr
      canvas!.style.width = `${w}px`
      canvas!.style.height = `${h}px`
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx!.font = `11px ${font}`
      ctx!.textBaseline = "top"
      cols = Math.ceil(w / CELL_W)
      rows = Math.ceil(h / CELL_H)
    }

    function draw() {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height)
      const r2 = RADIUS * RADIUS * 2

      for (let j = 0; j < rows; j++) {
        const y = j * CELL_H
        for (let i = 0; i < cols; i++) {
          const x = i * CELL_W

          // Slow interference pattern as the base texture.
          const n =
            Math.sin(i * 0.11 + time * 0.35) * Math.cos(j * 0.17 - time * 0.25) +
            Math.sin((i + j) * 0.045 + time * 0.2) * 0.6
          const base = (n + 1.6) / 3.2

          const dx = x - pos.x
          const dy = y - pos.y
          const glow = Math.exp(-(dx * dx + dy * dy) / r2) * presence

          const v = Math.min(0.85, base * 0.55 + glow * 0.8)
          const ch = RAMP[Math.floor(v * (RAMP.length - 1))]
          if (ch === " ") continue

          if (glow > 0.45) {
            ctx!.fillStyle = `oklch(0.66 0.22 31 / ${0.2 + glow * 0.45})`
          } else {
            ctx!.fillStyle = `oklch(0.93 0.012 85 / ${0.05 + base * 0.07 + glow * 0.35})`
          }
          ctx!.fillText(ch, x, y)
        }
      }
    }

    function frame(now: number) {
      raf = requestAnimationFrame(frame)
      if (now - last < 1000 / FPS) return
      const dt = Math.min(0.1, (now - last) / 1000)
      last = now

      if (!reduceMotion) time += dt
      const k = 1 - Math.exp(-dt * 10)
      pos.x += (target.x - pos.x) * k
      pos.y += (target.y - pos.y) * k
      presence += ((active ? 1 : 0) - presence) * (1 - Math.exp(-dt * 6))

      draw()
    }

    function onMove(e: PointerEvent) {
      target.x = e.clientX
      target.y = e.clientY
      if (!active || pos.x < -1000) {
        pos.x = e.clientX
        pos.y = e.clientY
      }
      active = true
    }

    function onLeave() {
      active = false
    }

    // Touch has no hover: let the glow fade once the finger lifts.
    function onUp(e: PointerEvent) {
      if (e.pointerType !== "mouse") active = false
    }

    function onVisibility() {
      cancelAnimationFrame(raf)
      if (!document.hidden) {
        last = performance.now()
        raf = requestAnimationFrame(frame)
      }
    }

    resize()
    raf = requestAnimationFrame(frame)
    window.addEventListener("resize", resize)
    window.addEventListener("pointermove", onMove, { passive: true })
    window.addEventListener("pointerdown", onMove, { passive: true })
    window.addEventListener("pointerup", onUp, { passive: true })
    document.documentElement.addEventListener("pointerleave", onLeave)
    document.addEventListener("visibilitychange", onVisibility)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", resize)
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("pointerdown", onMove)
      window.removeEventListener("pointerup", onUp)
      document.documentElement.removeEventListener("pointerleave", onLeave)
      document.removeEventListener("visibilitychange", onVisibility)
    }
  }, [])

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="ascii-mask pointer-events-none fixed inset-0 -z-10 animate-in fade-in duration-1000"
    />
  )
}
