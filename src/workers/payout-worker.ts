import type { PayoutService } from "../core/services/payout-service.js";

export class PayoutWorker {
  constructor(private readonly payoutService: PayoutService) {}

  async start(): Promise<void> {
    // Intentionally minimal for scaffold stage.
    void this.payoutService;
    console.log("Payout worker scaffold initialized.");
  }
}
