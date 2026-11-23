---
title: Use React for the front end
type: decision
sources: []
updated: __DATE__
---

# Use React for the front end

**Decided:** [YYYY-MM-DD] by [name or role]

## Decision

Build the web UI as a single-page app in React with TypeScript, calling the .NET API over HTTP.

## Why

- Large hiring pool and component ecosystem.
- A clean API boundary lets the UI and the back end ship and be tested separately.
- [Client reason, e.g. other client apps already use React.]

## Consequences

- Two build pipelines (UI and API) and a typed API contract between them (for example generated from OpenAPI).
- Authentication and CORS must be designed once, up front.

## Alternatives considered

| Option | Why not chosen |
|--------|----------------|
| Blazor | Keeps one language end to end, but a smaller ecosystem and hiring pool, and [reason, e.g. the UI needs rich third-party components]. |
| Angular | Batteries included, but heavier and [reason, e.g. team has more React experience]. |
| Server-rendered Razor Pages / MVC | Simplest to run, but [reason, e.g. the UI is highly interactive]. A fair choice for mostly form-based apps. |
