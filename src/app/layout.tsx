import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans, Instrument_Serif } from "next/font/google";

import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { Toaster } from "@/components/ui/sonner";
import { site } from "@/lib/site";
import "./globals.css";

const sans = IBM_Plex_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const mono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const display = Instrument_Serif({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Sentinell — the self-hosted L1 SOC analyst",
    template: "%s · Sentinell",
  },
  description:
    "Sentinell watches SSH auth on your Linux server, correlates attacks into incidents, alerts on Telegram, and writes evidence-cited AI investigations. Self-hosted, single binary.",
  openGraph: {
    title: "Sentinell — your L1 analyst never sleeps",
    description: "Self-hosted SOC triage for Linux servers. Connect it to Claude, Cursor and more via MCP.",
    url: site.url,
    siteName: "Sentinell",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`dark ${sans.variable} ${mono.variable} ${display.variable} h-full antialiased`}
    >
      <body className="relative isolate flex min-h-dvh flex-col overflow-x-clip">
        <div aria-hidden className="grid-bg pointer-events-none absolute inset-x-0 top-0 -z-10 h-[900px]" />
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 right-[-10%] -z-10 size-[640px] rounded-full bg-signal/20 blur-[140px]"
        />
        <SiteHeader />
        <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-4 py-10 sm:px-6">
          {children}
        </main>
        <SiteFooter />
        <Toaster theme="dark" position="bottom-center" />
      </body>
    </html>
  );
}
