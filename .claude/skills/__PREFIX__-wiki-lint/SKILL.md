---
name: __PREFIX__-wiki-lint
description: Health-check the __NAME__ team wiki - vault leakage, broken links, orphans, missing index entries, stale or contradictory pages (report first, fix only on approval)
---

**Usage:** `/__PREFIX__-wiki-lint` (Claude Code, Copilot) · `/skill:__PREFIX__-wiki-lint` (Pi)

# Wiki lint

Report first; make no changes until the user approves.

1. **Vault leakage (blocking).** Run `node tools/check-wiki.mjs`. Any hit is a failure to fix first.
2. **Broken links.** Every relative markdown link in `wiki/` resolves to an existing file.
3. **Index drift.** Every page appears in `wiki/index.md`, and every index line points at a real page.
4. **Orphans.** Pages no other page or the index links to.
5. **Frontmatter.** Each page has `title`, `type`, `sources`, `updated`. Each `sources:` path exists in `raw/` or `wiki/sources/`.
6. **Contradictions and staleness.** Pages stating conflicting facts, claims whose only source is old, and topics with a decision page but no recent source.
7. **Gaps.** Concepts mentioned in several pages with no page of their own.
8. **Report** grouped by severity with page paths. On approval apply the fixes, append `## [YYYY-MM-DD] lint | <summary>` to `wiki/log.md`, and re-run `tools/check-wiki.mjs`.
