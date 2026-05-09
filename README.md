# Payout Engine

Payout Engine is an open-source service for orchestrating reliable payouts on Stellar.
It is being built as infrastructure for teams that need to move funds at scale with
clear controls, idempotency, and operational visibility.

## What This Project Does

This project provides a modular payout orchestration layer that separates business
logic from infrastructure providers.

Current scaffold capabilities:

- Define payout domain models and lifecycle states.
- Create payouts with idempotency protection.
- Submit payouts through a pluggable Stellar gateway contract.
- Keep storage and blockchain integrations behind adapter interfaces.
- Bootstrap API and worker processes from a single application entry point.

## Why It Exists

Many payout systems start as tightly coupled scripts that are hard to scale, audit,
and operate safely. This project aims to provide a clean foundation where teams can:

- Build repeatable payout workflows.
- Add risk and compliance checks before execution.
- Swap infrastructure providers without changing core business logic.
- Add monitoring and operational tooling as payout volume grows.

## Architecture At A Glance

```
src/
  core/
    domain/      # Payout entities and shared business types
    services/    # Pure payout orchestration use-cases
  adapters/
    stellar/     # Stellar network integration contracts/implementations
    storage/     # Repository and idempotency persistence
  api/           # HTTP transport boundary
  workers/       # Async processing and retry orchestration
  shared/        # Shared utilities and primitives
  index.ts       # Dependency wiring and bootstrap
```

## Project Direction (Future Scope)

The roadmap is focused on production-grade payout operations.

Planned evolution includes:

- Real Stellar transaction submission and confirmation tracking.
- Robust retry policies and dead-letter handling for failed jobs.
- Policy engine for approvals, velocity limits, and risk checks.
- Compliance extension points (KYC/AML/sanctions provider hooks).
- End-to-end observability with structured logs, metrics, and traces.
- Queue-based workers and REST API endpoints for external integrations.
- Better test harnesses and local sandbox tooling for contributors.

## Getting Started

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
npm run start
```

## Contributing

Contributions are welcome, especially around:

- Stellar adapter implementation.
- Policy/compliance modules.
- Worker reliability and replay tools.
- Tests, docs, and developer experience.

See `CONTRIBUTING.md` for development guidelines.
