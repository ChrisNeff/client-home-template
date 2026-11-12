---
name: __PREFIX__-capture
description: Save an external source (a URL or pasted text) into raw/ as a dated, frontmattered file for the __NAME__ team wiki, after a team-safe check. Captures only; it does not build wiki pages
disable-model-invocation: true
---

**Usage:** `/__PREFIX__-capture <url or text>` (Claude Code, Copilot) · `/skill:__PREFIX__-capture <url or text>` (Pi)

The input is the text after the command: a URL to fetch, or text to save. Ask for it if missing.

# Capture

1. **Get the content.** Fetch the URL (or use the pasted text). If it cannot be fetched, say so and ask for the text.
2. **Team-safe check.** Stop and ask the user before saving if the content contains secrets, credentials, tokens, patient or personal data, or anything the whole team should not see.
3. **Keep what matters.** Save the full text if it is short. For a long document, save the relevant excerpts and link to the origin; do not store whole large documents.
4. **Write one file** to `raw/YYYY-MM-DD-short-title.md` (today's date, a short kebab-case title) with this frontmatter:
   ```yaml
   ---
   title: <title>
   type: raw
   origin: <URL, or "pasted">
   captured: YYYY-MM-DD
   ---
   ```
   Never overwrite or edit an existing `raw/` file; pick a new name instead.
5. **No vault artifacts.** If the text came from a personal knowledge vault, drop wikilinks, embeds, `obsidian://` links, backlinks and vault paths before saving.
6. **Verify and report.** Run `node tools/check-wiki.mjs`, then show the saved path and a short summary. Offer to run `/__PREFIX__-wiki-ingest` on it next; do not ingest automatically, and do not commit.
