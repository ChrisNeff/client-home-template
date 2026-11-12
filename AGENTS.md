# __NAME__ - Home Repo

__PURPOSE__

This is the **home repo** for __NAME__: the one place that holds the shared agent setup (this file, skills, memory, tooling) and the team wiki. The client's code repos are cloned *inside* this folder and listed in `repos.json`; each keeps its own git history and its own `AGENTS.md`. Start agent sessions here.

`AGENTS.md` is the single source of truth for every tool. `CLAUDE.md` and `.github/copilot-instructions.md` only point here; `.pi/settings.json` points Pi at `.claude/skills/`. Never duplicate instructions into those files.

## Layout

| Path | Purpose |
|------|---------|
| `repos.json` | Manifest of nested repos (`name`, `remote`, `branch`, `purpose`, optional `"optional": true`). `node setup.mjs` clones/updates them; optional repos are skipped unless already cloned or requested with `--include-optional` or `--only <name>` |
| `<repo>/` | A nested clone, ignored by this repo's allowlist `.gitignore`. Read its own `AGENTS.md` before working in it |
| `raw/` | Immutable, team-safe source material the wiki is built from. Agents read, never edit |
| `wiki/` | The team wiki, owned and maintained by the agent (see below) |
| `tools/` | Shared scripts (`check-wiki.mjs`) |
| `.claude/skills/` | Shared skills. The only skills folder, for every tool |
| `.claude/memory/` | Team-shareable memory. Index in `MEMORY.md` |

**At session start, read `.claude/memory/MEMORY.md`** (the memory index) and open a detail file only when its line looks relevant. This is an instruction, not an `@` import, because not every tool expands imports.

## Working across nested repos

- **Run sessions from this folder.** Context files load from the working directory and its parents only, so a nested repo's own `AGENTS.md` is NOT loaded automatically from here: read it before working in that repo. (A session started inside a nested repo does load this file from its parent.)
- **Ignored does not mean invisible.** Tools that respect `.gitignore` (ripgrep, fd) skip nested repos when searching from this folder. To search one, name its path (`rg term <repo>`) or add `--no-ignore`.
- **New top-level folder that should be tracked:** add a `!/<folder>/` line to `.gitignore`, otherwise it is ignored like a nested repo.
- **Commits and pull requests** go to each nested repo separately; this repo never contains their files.

## Rules

- **Writing style:** American English spelling (color, organize, behavior). No em-dashes; use a hyphen with spaces (" - "). En-dashes for number ranges are fine.
- **Skill names** are `__PREFIX__-<name>`. Folder name and `name:` field must match. No tool-specific skill copies.
- **Writing a skill that works in every tool:** frontmatter is `name` (= folder name) and `description` only, plus `disable-model-invocation: true` for skills with side effects so they run only when invoked. Refer to input as "the text after the command", not `$ARGUMENTS`. Describe actions generically ("fetch the URL", "ask the user"), not by naming one tool's functions. Say in the description if an MCP server is required. Invoke with `/__PREFIX__-<name>` in Claude Code and Copilot, `/skill:__PREFIX__-<name>` in Pi.
- **Thin skills:** when a workflow is long, keep the skill as a pointer to one backing file that is the single source of truth. Edit the source and the skill follows.
- **Third-party skills:** copy them into `.claude/skills/<upstream-name>/` (no prefix, no submodule, no user-level install) and record the source and commit in a table in the README. Read every file, scripts included, before the first copy and again when an update touches scripts. Install counts and stars are not a quality or security signal.
- **Nested repos:** work in them as normal. Each repo gets its own commits and pull requests. Never commit a nested repo's contents here.
- **Secrets and client data:** never commit credentials, tokens, `.env*`, TLS material, test-run output or patient/personal data, here or in `raw/` or `wiki/`. Mind each nested repo's own ignore rules.
- **Git:** show the staged diff and commit message before committing; confirm before pushing; never force-push main; no AI co-author lines in commits.
- **Git identity:** before the first commit in this repo, check that `git config user.email` is the identity you intend for this client. If it is not, set it locally in this repo (`git config --local user.email ...`) and never change the global git config. Do the same in each nested repo.
- **Conventional Commits:** every commit message is `type(scope)!: description`. Types: `feat`, `fix`, `docs`, `refactor`, `test`, `build`, `ci`, `perf`, `style`, `chore`. The scope is optional (`docs(wiki): add payments entity`), `!` marks a breaking change, the description is lowercase, imperative and at most about 72 characters, and any body explains why. Wiki-only changes use `docs(wiki):`; skill or tooling changes use `feat`, `fix` or `chore`. Nested repos follow their own `AGENTS.md` if it says otherwise.
- **Default branch** is `main`, never `master`.
- **Minimum changes:** solve what was asked. Read a file fully before editing it.
- **Planning:** make a plan and get the user's agreement before any change that touches 3 or more files or involves a structural decision. Define success criteria first.
- **Ask first:** new top-level folders, changing conventions in this file, changing `.claude/settings.json` permissions, adding repos to the manifest, adding a `!/<folder>/` allowlist line to `.gitignore`.
- **`raw/` is not `_raw/`:** this repo's `raw/` is durable, committed and team-safe. A personal gitignored `_raw/` staging inbox (if the owner has one) is unrelated; never copy from it here without the owner's review.

## Verification before done

- `updated:` frontmatter is set to today on every edited wiki page.
- Every relative link resolves, and `index.md` lists every page.
- `node tools/check-wiki.mjs` passes.
- New files are in the right folder; skill folder names match their `name:` fields.
- Nothing secret or client-sensitive was added.

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

**Operations (skills):** `__PREFIX__-capture` (save a URL or text into `raw/`), `__PREFIX__-wiki-ingest` (add a source), `__PREFIX__-wiki-query` (answer from the wiki, file good answers back), `__PREFIX__-wiki-lint` (find contradictions, orphans, stale pages, vault leakage). Other skills: `__PREFIX__-repo-sync`, `__PREFIX__-new-repo`.

**Wiki content from a private vault:** the owner may stage vault notes as raw sources. The ingest skill rewrites them as wiki pages (it never copies them), so no vault structure carries over, and the owner approves each page.
