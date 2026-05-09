import type { PayoutService } from "../core/services/payout-service.js";

export function createApiServer(payoutService: PayoutService): { start: () => Promise<void> } {
  return {
    async start() {
      // Intentionally minimal for scaffold stage.
      void payoutService;
      console.log("API server scaffold initialized.");
    }
  };
}
