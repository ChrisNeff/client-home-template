---
title: Avoid speculative abstractions
type: concept
sources: []
updated: __DATE__
---

# Avoid speculative abstractions

Do not create interfaces, factories, managers, wrappers or frameworks solely for hypothetical future requirements.

## How to apply

- Add an interface when there are two real implementations, or when a test needs a seam at a true boundary (network, clock, file system, third-party service). One implementation and no such boundary means no interface.
- Call the framework directly. Do not wrap a library "in case we swap it". Swapping is rare, and a wrapper hides the library's features.
- No `*Manager`, `*Helper` or `*Factory` classes without a concrete job you can state in one sentence.
- Extract an abstraction on the third real use, not the first guess.

## Why

Speculative layers cost reading time and indirection now, and the future they guess at rarely arrives in the shape expected. Removing a wrong abstraction is harder than adding a right one later.

## Related

- [Prefer simple, straightforward solutions](prefer-simple-solutions.md)
- [Use Entity Framework Core for data access](../decisions/use-entity-framework-core.md)
