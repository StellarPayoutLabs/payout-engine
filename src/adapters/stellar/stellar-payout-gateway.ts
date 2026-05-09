import type { Payout } from "../../core/domain/payout.js";

export interface StellarPayoutGateway {
  submitPayout(payout: Payout): Promise<void>;
}

export class NoopStellarPayoutGateway implements StellarPayoutGateway {
  async submitPayout(payout: Payout): Promise<void> {
    // Placeholder adapter for early scaffolding.
    console.log(
      `[stellar:no-op] submit payout=${payout.id} destination=${payout.destination} amount=${payout.amount} ${payout.assetCode}`
    );
  }
}
