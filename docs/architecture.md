# Architecture Notes

## Layers

- `core`: Pure business logic (no framework or provider assumptions).
- `adapters`: Implementations for external systems (Stellar, storage, queues).
- `api`: Incoming transport boundary (HTTP handlers/controllers).
- `workers`: Async orchestration and retries.

## Design Intent

- Keep payout orchestration deterministic and testable in `core`.
- Use interfaces to swap infrastructure without changing business logic.
- Enforce idempotency at repository boundaries.
- Keep transaction submission behind a gateway contract.
