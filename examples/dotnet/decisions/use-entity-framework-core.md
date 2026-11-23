---
title: Use Entity Framework Core for data access
type: decision
sources: []
updated: __DATE__
---

# Use Entity Framework Core for data access

**Decided:** [YYYY-MM-DD] by [name or role]

## Decision

Use Entity Framework Core for reads and writes and for schema migrations. Drop to hand-written SQL only for a measured performance problem, and note the reason next to the query.

## Why

- Migrations, change tracking and LINQ queries cover most needs with little code.
- Strongly typed queries catch schema drift at compile time.

## Consequences

- Watch generated SQL for the hot paths (N+1 queries, over-fetching).
- Keep `DbContext` use inside the data layer. See [Avoid speculative abstractions](../concepts/avoid-speculative-abstractions.md) for why there is no repository layer on top.

## Alternatives considered

| Option | Why not chosen |
|--------|----------------|
| Dapper | Fast and close to SQL, but no migrations or change tracking, so more code for ordinary CRUD. A good add-on for hot queries. |
| Raw ADO.NET | Maximum control, maximum boilerplate. |
| EF Core plus a repository layer | Adds a wrapper over something that is already a unit of work and repository. See the linked concept. |
