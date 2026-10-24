import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";

import { AsciiField } from "@/components/ascii-field";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { Toaster } from "@/components/ui/sonner";
import { site } from "@/lib/site";
import "./globals.css";

const sentient = localFont({
  variable: "--font-sans",
  src: [
    { path: "./fonts/Sentient-Variable.woff2", style: "normal", weight: "200 700" },
    { path: "./fonts/Sentient-VariableItalic.woff2", style: "italic", weight: "200 700" },
  ],
});

const jetbrains = localFont({
  variable: "--font-mono",
  src: [
    { path: "./fonts/JetBrainsMono-Regular.woff2", style: "normal", weight: "400" },
    { path: "./fonts/JetBrainsMono-Medium.woff2", style: "normal", weight: "500" },
  ],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Sentinell · SSH attack triage for your Linux server",
    template: "%s · Sentinell",
  },
  description:
    "Sentinell reads sshd logs, groups attacks into incidents, alerts you on Telegram and writes a report that links every claim to a log line. One binary, self-hosted.",
  openGraph: {
    title: "Sentinell · SSH attack triage for your Linux server",
    description: "Self-hosted incident triage for SSH. Set it up from Claude Code, Cursor and other agents over MCP.",
    url: site.url,
    siteName: "Sentinell",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#141210",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`dark ${sentient.variable} ${jetbrains.variable} h-full antialiased`}>
      <body className="relative isolate flex min-h-dvh flex-col overflow-x-clip">
        <AsciiField />
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[560px] overflow-hidden">
          <div className="absolute -top-48 left-1/2 h-[420px] w-[min(900px,120vw)] -translate-x-1/2 rounded-full bg-signal/15 blur-[120px]" />
        </div>
        <SiteHeader />
        <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 sm:px-8">
          {children}
        </main>
        <SiteFooter />
        <Toaster theme="dark" position="bottom-center" />
      </body>
    </html>
  );
}
