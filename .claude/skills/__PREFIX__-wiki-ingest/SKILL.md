---
name: __PREFIX__-wiki-ingest
description: Ingest a source (file in raw/, a pasted document, or a staged note) into the __NAME__ team wiki — summarize it, create or update entity/concept/decision pages, refresh index.md and log.md
---

# Wiki ingest

Add one source to the wiki per the LLM Wiki rules in `AGENTS.md`. Do one source at a time.

## Steps

1. **Locate the source.** A path in `raw/`, or pasted/staged content. If it is not yet in `raw/`, propose a filename (`YYYY-MM-DD-short-title.md`) and save it there only after the user confirms it is team-safe (no secrets, patient or personal data). Never edit an existing `raw/` file.
2. **Read `wiki/index.md`** to see which pages already exist.
3. **Draft a source page** in `wiki/sources/` summarizing the source in your own words: what it is, key points, date, and what it changes.
4. **Integrate.** Update existing entity, concept and decision pages the source touches; create new ones only when nothing fits. Note contradictions with existing pages explicitly instead of overwriting. Cite the source in each page's `sources:` frontmatter. Set `updated:` to today.
5. **Write pages fresh, never copy.** If the source came from a personal knowledge vault, rewrite its content. Drop wikilinks, embeds, `obsidian://` links, backlinks, Dataview blocks, vault paths and vault-only frontmatter. Where a wikilink pointed at something worth keeping, replace it with plain text, or a relative markdown link if that page exists in the wiki. Flag anything that looks personal or from another client and ask.
6. **Update `wiki/index.md`** (one line per new or changed page) and append to `wiki/log.md`: `## [YYYY-MM-DD] ingest | <title>` plus the pages touched.
7. **Verify.** Run `node tools/check-wiki.mjs`. It must print OK; fix and re-run otherwise.
8. **Show the user** the list of pages created/changed with a short diff summary, and wait for approval before committing (follow the Git rules in `AGENTS.md`).
