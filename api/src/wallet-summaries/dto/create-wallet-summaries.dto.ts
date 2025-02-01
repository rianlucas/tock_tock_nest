import { z } from 'zod';

export const createWalletSummariesSchema = z.object({
  walletId: z.string().uuid(),
  assetId: z.string().uuid(),
  quantity: z.number(),
  totalInvested: z.number(),
  assetCount: z.number(),
  currentPrice: z.number(),
});

export type CreateWalletSummariesDto = z.infer<
  typeof createWalletSummariesSchema
>;
