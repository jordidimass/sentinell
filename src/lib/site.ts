export const site = {
  name: "Sentinell",
  url: "https://sentinell.xyz",
  // Placeholder until release artifacts are published.
  repoUrl: "https://github.com/jordidimass/sentinell",
  releasesUrl: "https://github.com/jordidimass/sentinell/releases/latest",
  installCmd: "curl -fsSL https://sentinell.xyz/install.sh | sh",
  version: "v0.1.0",
}

export const binaries = [
  { os: "Linux", arch: "x86_64", file: "sentinell-linux-amd64.tar.gz", size: "6.8 MB" },
  { os: "Linux", arch: "arm64", file: "sentinell-linux-arm64.tar.gz", size: "6.4 MB" },
  { os: "macOS", arch: "arm64", file: "sentinell-darwin-arm64.tar.gz", size: "7.1 MB", note: "replay + dashboard only" },
] as const
