<p align="center">
  <a href="https://sentinell.xyz"><img src="https://sentinell.xyz/opengraph-image" alt="Sentinell: every SSH attack on your server, explained" width="720"></a>
</p>

# Sentinell

**Every SSH attack on your server, explained.**

Sentinell is a self-hosted L1 security analyst for a single Linux server. It reads SSH authentication events from journald, groups related attempts into one incident, alerts you on Telegram, and runs a bounded AI investigation that cites the exact log lines behind every claim.

**Source code:** [github.com/Roukurai/blackHatSentinel](https://github.com/Roukurai/blackHatSentinel)
**Website:** [sentinell.xyz](https://sentinell.xyz)
**Install:** [sentinell.xyz/install.sh](https://sentinell.xyz/install.sh) serves [`ops/install.sh`](https://github.com/Roukurai/blackHatSentinel/blob/main/ops/install.sh) from the product repo.

> This repository only hosts the sentinell.xyz website. The product, its code, releases and issues live in [Roukurai/blackHatSentinel](https://github.com/Roukurai/blackHatSentinel).

## How it works

```
SSH journal ─▶ Rust collector ─▶ TS API + SQLite ─▶ detection / incident ─▶ Telegram alert
                                                         └─▶ AI investigator ─▶ dashboard ─▶ approved response
```

1. **Read.** A Rust collector tails journald for sshd events as an unprivileged user. No Docker.
2. **Group.** Repeated failures from one source become one incident: fast bursts, slow guessing, or a login that finally worked.
3. **Notify.** One Telegram message per new or escalated incident, not one per log line. Alerts still go out if the AI is offline.
4. **Investigate.** A model with read-only evidence tools writes the report. Findings that cite unknown event IDs are rejected.
5. **Block.** A temporary nftables block with expiry and rollback, applied only after a human approves it.

## Rules it follows

- **Cites its sources.** Every finding points at real event IDs.
- **Says when it isn't sure.** Findings are labeled `observed`, `suspected` or `unknown`. A login after failures is suspicious, not proof of compromise.
- **Doesn't trust log contents.** Usernames and raw log lines are attacker-controlled and are treated as data, never as instructions.
- **Asks before acting.** Blocking an IP needs approval, and allowlisted addresses can't be blocked even then.

## Set it up with your agent

[sentinell.xyz](https://sentinell.xyz) has one-click setup prompts for **Claude**, **Cursor** and **Grok Bot**. Paste the prompt into your agent and it installs Sentinell, configures it without echoing secrets, and connects to it over MCP so you can ask about incidents directly.

## Get involved

- Star or watch [Roukurai/blackHatSentinel](https://github.com/Roukurai/blackHatSentinel)
- Report bugs and request features in its [issues](https://github.com/Roukurai/blackHatSentinel/issues)
- Install with `curl -fsSL https://sentinell.xyz/install.sh | bash`, or [download the source](https://github.com/Roukurai/blackHatSentinel/archive/refs/heads/main.tar.gz)

## Credits

Built at the Grok Bot Guatemala Hackathon (Alaris Security, Universidad del Istmo).

Website typefaces: [Sentient](https://www.fontshare.com/fonts/sentient) (ITF Free Font License) and [JetBrains Mono](https://www.fontshare.com/fonts/jet-brains-mono) (OFL). Brand icons from [simple-icons](https://simpleicons.org) (CC0) and [LobeHub Icons](https://github.com/lobehub/lobe-icons) (MIT).
