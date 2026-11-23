---
title: Prefer simple, straightforward solutions
type: concept
sources: []
updated: __DATE__
---

# Prefer simple, straightforward solutions

When two designs both work, pick the one a new team member can read and change with the least explanation.

## How to apply

- Solve today's requirement. Do not build for requirements nobody has stated.
- Use the framework's built-in feature before writing your own.
- Prefer plain code and a few clear functions over patterns, until the duplication or complexity is real and current.
- If a reviewer needs a diagram to follow a change, look for a simpler change.

## Why

Complexity is paid for on every later change, by every reader. Simple code is cheaper to test, debug and replace.

## Related

- [Avoid speculative abstractions](avoid-speculative-abstractions.md)
