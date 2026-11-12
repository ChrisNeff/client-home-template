---
name: __PREFIX__-new-repo
description: Register a repo in the __NAME__ home repo — add it to repos.json and .gitignore, clone it, and note it in the wiki
---

# New repo

Ask for: name, remote URL, default branch, one-line purpose. Confirm before changing files.

1. Add an entry to `repos.json` (`name`, `remote`, `branch`, `purpose`).
2. Add `/<name>/` to `.gitignore`.
3. Run `node setup.mjs` to clone it.
4. Read the new repo's `AGENTS.md`/`README.md`. If it has none, tell the user (do not create one unasked).
5. Offer to ingest the repo's purpose and structure as an entity page via `__PREFIX__-wiki-ingest`.
6. Show the diff and wait for approval before committing.
