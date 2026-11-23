# Examples

Sample wiki pages to copy from. Nothing here is indexed, logged or checked by `__PREFIX__-wiki-lint`, and nothing here is a fact about your client.

## Using a sample

1. Copy the page into the matching `wiki/` folder (`decisions/` or `concepts/`).
2. Replace every `[bracketed placeholder]` with the real value, and change anything that does not match what your client actually chose.
3. Add the sources that back it to `sources:` (the samples leave it empty).
4. Add a line to `wiki/index.md` and an entry to `wiki/log.md`, then run `node tools/check-wiki.mjs`.

## Sets

| Folder | Covers |
|--------|--------|
| `dotnet/` | A .NET web app: stack decisions (.NET, React, SQL Server, Entity Framework Core) and engineering principles (simple solutions, no speculative abstractions, test coverage) |
