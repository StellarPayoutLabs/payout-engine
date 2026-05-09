import { NoopStellarPayoutGateway } from "./adapters/stellar/stellar-payout-gateway.js";
import { InMemoryPayoutRepository } from "./adapters/storage/payout-repository.js";
import { createApiServer } from "./api/server.js";
import { PayoutService } from "./core/services/payout-service.js";
import { PayoutWorker } from "./workers/payout-worker.js";

async function bootstrap(): Promise<void> {
  const repository = new InMemoryPayoutRepository();
  const stellarGateway = new NoopStellarPayoutGateway();
  const payoutService = new PayoutService(repository, stellarGateway);

  const api = createApiServer(payoutService);
  const worker = new PayoutWorker(payoutService);

  await Promise.all([api.start(), worker.start()]);
  console.log("Payout engine scaffold is running.");
}

bootstrap().catch((error: unknown) => {
  console.error("Failed to bootstrap payout engine:", error);
  process.exitCode = 1;
});
