# __NAME__ — Home Repo

__PURPOSE__

This is the **home repo** for __NAME__: the one place that holds the shared agent setup (this file, skills, memory, tooling) and the team wiki. The client's code repos are cloned *inside* this folder and listed in `repos.json`; each keeps its own git history and its own `AGENTS.md`. Start agent sessions here.

`AGENTS.md` is the single source of truth for every tool. `CLAUDE.md` and `.github/copilot-instructions.md` only point here; `.pi/settings.json` points Pi at `.claude/skills/`. Never duplicate instructions into those files.

## Layout

| Path | Purpose |
|------|---------|
| `repos.json` | Manifest of nested repos (name, remote, branch, purpose). `setup.mjs` clones/updates them |
| `<repo>/` | A nested clone. Gitignored here. Read its own `AGENTS.md` before working in it |
| `raw/` | Immutable, team-safe source material the wiki is built from. Agents read, never edit |
| `wiki/` | The team wiki, owned and maintained by the agent (see below) |
| `tools/` | Shared scripts (`check-wiki.mjs`) |
| `.claude/skills/` | Shared skills. The only skills folder, for every tool |
| `.claude/memory/` | Team-shareable memory. Index in `MEMORY.md` |

@./.claude/memory/MEMORY.md

## Rules

- **Skill names** are `__PREFIX__-<name>`. Folder name and `name:` field must match. No tool-specific skill copies.
- **Nested repos:** work in them as normal. Each repo gets its own commits and pull requests. Never commit a nested repo's contents here.
- **Secrets and client data:** never commit credentials, tokens, `.env*`, TLS material, test-run output or patient/personal data, here or in `raw/` or `wiki/`. Mind each nested repo's own ignore rules.
- **Git:** show the staged diff and commit message before committing; confirm before pushing; never force-push main; no AI co-author lines in commits.
- **Minimum changes:** solve what was asked. Read a file fully before editing it.
- **Ask first:** new top-level folders, changing conventions in this file, adding repos to the manifest.

## The wiki (LLM Wiki pattern)

Three layers: **raw sources** (`raw/`, immutable) → **wiki** (`wiki/`, agent-owned) → **schema** (this section). The agent integrates each new source into existing pages, so knowledge compounds instead of being re-derived per question.

```
wiki/
  index.md      catalog: one line per page, grouped by folder. Read this FIRST for any question
  log.md        append-only record: ingest / query / lint entries, newest last
  entities/     concrete things: systems, repos, environments, roles, vendors
  concepts/     ideas and patterns: standards, conventions, how things work
  decisions/    what was decided, why, when, by whom
  sources/      one summary page per raw source
```

**Page format:** frontmatter with `title`, `type` (entity|concept|decision|source), `sources` (list of `raw/` paths or source pages), `updated` (YYYY-MM-DD). One topic per page. Plain markdown links with relative paths only, e.g. `[Payments API](../entities/payments-api.md)`.

**Hard rules**
1. **No vault artifacts, ever.** No `[[wikilinks]]`, `![[embeds]]`, `obsidian://` links, backlink or "linked from" sections, Dataview blocks, or paths into any personal knowledge vault. `node tools/check-wiki.mjs` must pass (add your own vault folder names to `vaultPatterns` in `home.config.json` so it catches them too) before every commit touching `raw/` or `wiki/`.
2. **Every claim traces to a source.** Cite in `sources:`. If sources conflict, say so on the page; do not silently pick one.
3. **Update, don't duplicate.** Search `index.md` first; extend an existing page before creating one.
4. **Keep `index.md` and `log.md` current** in the same change as any page edit.
5. **Raw is immutable.** Never edit `raw/`. Corrections go in the wiki with a note.

**Operations (skills):** `__PREFIX__-wiki-ingest` (add a source), `__PREFIX__-wiki-query` (answer from the wiki, file good answers back), `__PREFIX__-wiki-lint` (find contradictions, orphans, stale pages, vault leakage). Other skills: `__PREFIX__-repo-sync`, `__PREFIX__-new-repo`.

**Wiki content from a private vault:** the owner may stage vault notes as raw sources. The ingest skill rewrites them as wiki pages (it never copies them), so no vault structure carries over, and the owner approves each page.
