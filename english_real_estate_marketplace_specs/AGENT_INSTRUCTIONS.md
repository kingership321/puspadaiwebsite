# AI Coding Agent Instructions

## Operating rules

1. Read the project documentation before changing architecture.
2. Inspect existing code before creating replacements.
3. Make the smallest coherent change that solves the requirement.
4. Keep types strict.
5. Avoid `any` unless there is a documented reason.
6. Do not silently disable linting or type checking.
7. Never hard-code secrets.
8. Never use real private data in seed files.
9. Keep public URLs stable.
10. Preserve accessibility.
11. Test important business logic.

## When implementing a feature

Use this sequence:

1. Understand requirement
2. Identify affected domain
3. Inspect existing implementation
4. Update data model if required
5. Update server/domain logic
6. Update UI
7. Add loading/error/empty states
8. Add tests
9. Run typecheck/lint/tests
10. Review responsive behavior

## UI rule

Do not create giant monolithic React components.

Extract repeated patterns.

## Database rule

Never mutate production-like data through arbitrary scripts when a migration or controlled command is appropriate.

## Search rule

Do not implement filtering only on the client.

Search must be server-backed.

## Security rule

Every mutation must have server-side authorization.

## Completion rule

A task is complete only when it is implemented and verified, not when files have been created.
