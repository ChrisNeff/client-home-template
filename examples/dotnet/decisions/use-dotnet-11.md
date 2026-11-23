---
title: Use .NET 11 for the back end
type: decision
sources: []
updated: __DATE__
---

# Use .NET 11 for the back end

**Decided:** [YYYY-MM-DD] by [name or role]

## Decision

Build the API and background services on .NET 11 with ASP.NET Core and C#.

## Why

- One runtime, language and tooling story across the API, jobs and tests.
- [Client reason, e.g. existing .NET skills on the team, Azure hosting fit.]
- Moving to the latest release keeps upgrades small instead of saving them up.

## Consequences

- Pin the SDK in `global.json` so every machine and the pipeline build the same way.
- Check the support window when a release ships and plan the next upgrade before it ends.

## Alternatives considered

| Option | Why not chosen |
|--------|----------------|
| .NET 10 (LTS) | Longer support window and fewer upgrades. Not chosen because [reason, e.g. a feature we need ships in 11]. Revisit if upgrade effort becomes a burden. Confirm current support dates before relying on this row. |
| Node.js / TypeScript back end | One language with the React front end, but the team and existing services are .NET [adjust]. |
| Java / Spring Boot | Mature ecosystem, but no existing skills or services in the client's estate [adjust]. |
