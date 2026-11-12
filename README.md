# __NAME__ home repo

__PURPOSE__

Shared agent setup, team wiki and nested repos for this client. Works with Claude Code, Pi.dev and GitHub Copilot; `AGENTS.md` is the single source of truth.

## Setup

Requires Node 18+ (all scripts are dependency-free `.mjs`, so they run the same on Windows, macOS and Linux).

```bash
node setup.mjs      # clone/update every repo listed in repos.json
```

Then open an agent session in this folder. See `AGENTS.md` for layout, rules and the wiki.

## Adding a repo

Use the `__PREFIX__-new-repo` skill, or: add an entry to `repos.json`, add `/<name>/` to `.gitignore`, run `node setup.mjs`.

## Third-party skills

None yet. Record each vendored skill here (see the rule in `AGENTS.md`).

| Skill | Source | Commit | Local changes |
|-------|--------|--------|---------------|
