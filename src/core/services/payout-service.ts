import { randomUUID } from "node:crypto";
import type { CreatePayoutInput, Payout } from "../domain/payout.js";
import type { PayoutRepository } from "../../adapters/storage/payout-repository.js";
import type { StellarPayoutGateway } from "../../adapters/stellar/stellar-payout-gateway.js";

export class PayoutService {
  constructor(
    private readonly repository: PayoutRepository,
    private readonly stellarGateway: StellarPayoutGateway
  ) {}

  async create(input: CreatePayoutInput): Promise<Payout> {
    const existing = await this.repository.getByIdempotencyKey(input.idempotencyKey);
    if (existing) {
      return existing;
    }

    const now = new Date();
    const payout: Payout = {
      id: randomUUID(),
      idempotencyKey: input.idempotencyKey,
      destination: input.destination,
      assetCode: input.assetCode,
      amount: input.amount,
      status: "pending",
      createdAt: now,
      updatedAt: now
    };

    return this.repository.save(payout);
  }

  async submit(payoutId: string): Promise<Payout> {
    const payout = await this.repository.getById(payoutId);
    if (!payout) {
      throw new Error(`Payout not found: ${payoutId}`);
    }

    await this.stellarGateway.submitPayout(payout);
    return this.repository.updateStatus(payoutId, "submitted");
  }
}
