---
name: __PREFIX__-delete-comments
description: Audit the code comments in a codebase or folder, delete the tautological and stale ones, turn excuses into issues and decisions into ADRs, then add a ratcheting no-comments lint rule
disable-model-invocation: true
---

**Usage:** `/__PREFIX__-delete-comments <path or area>` (Claude Code, Copilot) · `/skill:__PREFIX__-delete-comments <path or area>` (Pi)

# Delete comments

The scope is the text after the command (a nested repo, a folder, or a section of code). With no text, ask the user which scope to audit before reading anything. Work inside one nested repo at a time and follow that repo's own `AGENTS.md`.

## 1. Categorize

Read every code comment in scope and put each in exactly one category:

- **Tautology:** repeats what is already visible from the code
- **Excuse:** lets a hacky implementation get away with it, which then gets copied through the code
- **Stale:** refers to code or implementation details that no longer apply
- **Decision record:** documents an important, non-obvious decision about the code

Show the user the counts per category and a sample of each before changing anything.

## 2. Act on each comment

| Category | Action |
|----------|--------|
| Tautology, Stale | Delete the comment |
| Excuse | Delete the comment and file an issue to fix the hacky implementation (one issue per implementation, linking the file and line) |
| Decision record | Move it into an ADR with an "Alternatives considered" section, then delete the comment (or leave a one-line pointer to the ADR) |

Put ADRs where the nested repo already keeps decisions. If it has none, ask the user where they go. Do not create issues or ADRs without the user's go-ahead on the batch.

## 3. Prevent regrowth

- Add a lint rule that bans comments in the scope, using the repo's existing linter. Check what is already installed before adding a tool.
- Use a **ratchet**: assume not every comment is gone in this PR. Allow the comments that remain, record the current count as the ceiling, and fail the lint when it rises. Lower the ceiling as comments are removed.
- Keep legitimate machine-read comments (license headers, `eslint-disable`, `TODO` with an issue link, type-checker directives) out of the ban, and say which ones you allowed.

## 4. Report

- Estimate how many lines of code the scope would shed if every comment were deleted (count comment lines and blank lines left behind).
- List what was deleted, which issues and ADRs were created, and the ratchet ceiling.
- Make no commit unless the user asks. Follow the Conventional Commits rule in `AGENTS.md` when they do.
