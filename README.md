<!-- TEMPLATE-ONLY-START -->
> **This is a template.** Create your own repo from it ("Use this template" on GitHub, or clone it and remove the remote), then in your copy run:
>
> ```bash
> node init.mjs <prefix> "<Display Name>" "<one-line purpose>"
> ```
>
> The prefix names your skills (`<prefix>-wiki-ingest` and so on); use a client name, an SoW code, anything. `init.mjs` fills in the placeholders, renames the skills, writes `home.config.json`, then deletes itself and this note. Next: list your repos in `repos.json`, run `node setup.mjs`, review `AGENTS.md`, and add a remote. Requires Node 18+.
>
> Works with Claude Code (`claude`), Pi (`pi`) and GitHub Copilot CLI (`copilot`); `AGENTS.md` is the single source of truth.
<!-- TEMPLATE-ONLY-END -->

# __NAME__ home repo

__PURPOSE__

Shared agent setup, team wiki and nested repos for this client. Works with Claude Code, Pi.dev and GitHub Copilot; `AGENTS.md` is the single source of truth.

## Setup

Requires Node 18+ (all scripts are dependency-free `.mjs`, so they run the same on Windows, macOS and Linux).

```bash
node setup.mjs      # clone/update every repo in repos.json (optional ones are skipped; add --include-optional)
```

Then open an agent session in this folder. See `AGENTS.md` for layout, rules and the wiki.

## Adding a repo

Use the `__PREFIX__-new-repo` skill, or: add an entry to `repos.json` and run `node setup.mjs`. Nested repos are ignored automatically (see `.gitignore`).

## Plugins

Declared in `.claude/settings.json` and used by Claude Code and Copilot. Pi doesn't load them.

| Plugin | Marketplace | Default | Turn it on when |
|--------|-------------|---------|-----------------|
| `dotnet-skills` | [Aaronontheweb/dotnet-skills](https://github.com/Aaronontheweb/dotnet-skills) | off | the client's repos are .NET (set it to `true` in `enabledPlugins`) |

## Third-party skills

None yet. Record each vendored skill here (see the rule in `AGENTS.md`).

| Skill | Source | Commit | Local changes |
|-------|--------|--------|---------------|

## Running it from a terminal

Open a session from this folder with any of the three CLIs. Each reads `AGENTS.md` (Claude Code through the one-line `CLAUDE.md`) and the skills in `.claude/skills/`.

| CLI | Command | Invoke a skill | First run |
|-----|---------|----------------|-----------|
| Claude Code | `claude` | `/<prefix>-<name>` | Accept the workspace trust dialog once, or `.claude/settings.json` permissions are ignored |
| Pi | `pi` | `/skill:<prefix>-<name>` | Accept project trust when asked, so `.pi/settings.json` loads the skills |
| GitHub Copilot CLI | `copilot` | `/<prefix>-<name>` | Pick a model your account has with `/model` or `--model` |

Notes:
- Skills with side effects (`wiki-ingest`, `repo-sync`, `new-repo`) are hidden from the model and run only when you invoke them by name.
- Memory loads by instruction ("read `.claude/memory/MEMORY.md`"), not by `@` import, so it works in all three. Claude Code and Copilot read it at the start of a session; with Pi, ask for it if it does not.
- Git Bash on Windows rewrites a leading `/` in non-interactive commands (`claude -p "/skill"`). Set `MSYS_NO_PATHCONV=1` there. Typing a slash command interactively is not affected.
- Permissions in `.claude/settings.json` apply to Claude Code only. Pi and Copilot use their own approval prompts.
