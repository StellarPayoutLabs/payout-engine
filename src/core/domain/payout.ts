export type PayoutStatus = "pending" | "approved" | "submitted" | "failed";

export interface CreatePayoutInput {
  idempotencyKey: string;
  destination: string;
  assetCode: string;
  amount: string;
}

export interface Payout {
  id: string;
  idempotencyKey: string;
  destination: string;
  assetCode: string;
  amount: string;
  status: PayoutStatus;
  createdAt: Date;
  updatedAt: Date;
}
