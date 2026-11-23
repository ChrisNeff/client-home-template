---
title: Use SQL Server for the database
type: decision
sources: []
updated: __DATE__
---

# Use SQL Server for the database

**Decided:** [YYYY-MM-DD] by [name or role]

## Decision

Store application data in SQL Server (Azure SQL Database in the cloud, SQL Server in a local container for development).

## Why

- Relational data with transactions and reporting needs.
- First-class support from .NET and Entity Framework Core.
- [Client reason, e.g. existing licenses, DBA skills, Azure standards.]

## Consequences

- Schema changes go through migrations in source control, never by hand in a shared environment.
- Local development and CI use the same engine, not a stand-in.

## Alternatives considered

| Option | Why not chosen |
|--------|----------------|
| PostgreSQL | Strong and license-free. Not chosen because [reason, e.g. the client's DBAs and tooling are SQL Server]. |
| Cosmos DB / document store | Fits flexible schemas and global scale, but the data here is relational and reporting-heavy [adjust]. |
| SQLite | Fine for tests and small tools, not for a multi-user service. |
