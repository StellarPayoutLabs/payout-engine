# Contributing

Thanks for contributing to Payout Engine.

## Development Setup

1. Install dependencies: `npm install`
2. Run in watch mode: `npm run dev`
3. Run checks: `npm run check && npm run test && npm run lint`

## Guidelines

- Keep core business logic in `src/core`.
- Integrations must go through interfaces in `src/adapters`.
- Add tests for new service behavior and failure paths.
- Prefer small, reviewable pull requests.
