---
name: __PREFIX__-new-repo
description: Register a repo in the __NAME__ home repo - add it to repos.json and .gitignore, clone it, and note it in the wiki
disable-model-invocation: true
---

**Usage:** `/__PREFIX__-new-repo <name>` (Claude Code, Copilot) · `/skill:__PREFIX__-new-repo <name>` (Pi)

The repo name, if given, is the text after the command; ask for anything missing.

# New repo

Ask for: name, remote URL, default branch, one-line purpose, and whether the repo is optional (not needed on every machine). Confirm before changing files.

1. Add an entry to `repos.json` (`name`, `remote`, `branch`, `purpose`, and `"optional": true` if applicable).
2. Run `node setup.mjs` to clone it. Nested repos are ignored automatically by the allowlist `.gitignore`; confirm with `git check-ignore <name>`.
3. Read the new repo's `AGENTS.md`/`README.md`. If it has none, tell the user (do not create one unasked).
4. Offer to ingest the repo's purpose and structure as an entity page via `__PREFIX__-wiki-ingest`.
5. Show the diff and wait for approval before committing.
