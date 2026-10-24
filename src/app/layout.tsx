import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans, Instrument_Serif } from "next/font/google";

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
  title: "Sentinell — the self-hosted L1 SOC analyst",
  description:
    "Sentinell watches SSH auth on your Linux server, correlates attacks into incidents, alerts on Telegram, and writes evidence-cited AI investigations. Self-hosted, single binary.",
  openGraph: {
    title: "Sentinell — your L1 analyst never sleeps",
    description: "Self-hosted SOC triage for Linux servers. Connect it to Claude, Cursor and more via MCP.",
    url: site.url,
    siteName: "Sentinell",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`dark ${sans.variable} ${mono.variable} ${display.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        {children}
        <Toaster theme="dark" position="bottom-center" />
      </body>
    </html>
  );
}
