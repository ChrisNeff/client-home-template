---
name: __PREFIX__-repo-sync
description: Clone missing and fast-forward existing nested repos from repos.json, then report each repo's branch, ahead/behind and dirty state
disable-model-invocation: true
---

**Usage:** `/__PREFIX__-repo-sync` (Claude Code, Copilot) · `/skill:__PREFIX__-repo-sync` (Pi)

# Repo sync

1. Run `node setup.mjs` (clones missing repos, fast-forwards existing ones; never merges or discards local work).
2. For every repo in `repos.json`, report: branch, ahead/behind versus upstream, and uncommitted changes (`git -C <repo> status --short`).
3. Flag, do not fix: diverged branches, dirty trees that block a pull, repos that are not git-ignored, and repos on disk that are not in `repos.json`.
4. Never push, commit or reset on the user's behalf.
