---
name: __PREFIX__-wiki-query
description: Answer a question about __NAME__ from the team wiki, citing pages, and offer to file valuable answers back as new wiki pages
---

**Usage:** `/__PREFIX__-wiki-query <question>` (Claude Code, Copilot) · `/skill:__PREFIX__-wiki-query <question>` (Pi)

The question is the text after the command.

# Wiki query

1. Read `wiki/index.md` first. Pick the relevant pages from it, then read them. Follow relative links where needed.
2. Answer from the wiki only. Cite the pages (relative paths) and, through them, the sources. If the wiki does not cover it, say so, and name the closest pages. Do not fill gaps from general knowledge without labeling it as such.
3. If sources in the wiki conflict, present both and say which is newer.
4. If the answer is a synthesis worth keeping (a comparison, an explanation, a decision rationale), offer to save it as a page in the right folder. On approval: write it with `sources:` frontmatter, update `index.md`, append `## [YYYY-MM-DD] query | <title>` to `log.md`, and run `node tools/check-wiki.mjs`.
5. If the question reveals a missing source, suggest what to add to `raw/` and ingest.
