---
title: Test coverage of 80% or more
type: concept
sources: []
updated: __DATE__
---

# Test coverage of 80% or more

New and changed code needs automated test coverage of at least 80%, enforced in the pull request pipeline.

## How to apply

- Measure line coverage in CI and fail the build below 80% on the changed code.
- Exclude generated code, migrations and the composition root from the measure.
- Coverage is a floor, not a goal. Assert behavior, not just that lines ran. A high number with weak assertions does not count.
- Test business rules and boundaries first. Do not chase the number with tests of trivial getters.

## Why

A floor catches untested changes early and keeps refactoring safe. The 80% figure is a common starting point [adjust to the client's standard].

## Alternatives considered

| Option | Why not chosen |
|--------|----------------|
| No threshold, review only | Relies on reviewers noticing missing tests, which is uneven. |
| 100% coverage | Drives low-value tests and slows delivery. |
| Mutation testing as the gate | Measures test quality better, but is slower and harder to adopt first. A good later addition. |
