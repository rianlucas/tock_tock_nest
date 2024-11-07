import { z } from 'zod';

export const updateWalletSummariesSchema = z.object({
  totalInvestiment: z.number(),
  assetCount: z.number(),
  averagePrice: z.number(),
  assetId: z.string().uuid(),
  walletId: z.string().uuid(),
});

export type UpdateWalletSummariesDto = z.infer<
  typeof updateWalletSummariesSchema
>;
