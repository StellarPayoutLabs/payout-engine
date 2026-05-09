import type { Payout, PayoutStatus } from "../../core/domain/payout.js";

export interface PayoutRepository {
  getById(id: string): Promise<Payout | null>;
  getByIdempotencyKey(idempotencyKey: string): Promise<Payout | null>;
  save(payout: Payout): Promise<Payout>;
  updateStatus(id: string, status: PayoutStatus): Promise<Payout>;
}

export class InMemoryPayoutRepository implements PayoutRepository {
  private readonly byId = new Map<string, Payout>();
  private readonly byIdempotencyKey = new Map<string, string>();

  async getById(id: string): Promise<Payout | null> {
    return this.byId.get(id) ?? null;
  }

  async getByIdempotencyKey(idempotencyKey: string): Promise<Payout | null> {
    const payoutId = this.byIdempotencyKey.get(idempotencyKey);
    if (!payoutId) {
      return null;
    }
    return this.byId.get(payoutId) ?? null;
  }

  async save(payout: Payout): Promise<Payout> {
    this.byId.set(payout.id, payout);
    this.byIdempotencyKey.set(payout.idempotencyKey, payout.id);
    return payout;
  }

  async updateStatus(id: string, status: PayoutStatus): Promise<Payout> {
    const payout = this.byId.get(id);
    if (!payout) {
      throw new Error(`Payout not found: ${id}`);
    }

    const updated: Payout = {
      ...payout,
      status,
      updatedAt: new Date()
    };
    this.byId.set(id, updated);
    return updated;
  }
}
