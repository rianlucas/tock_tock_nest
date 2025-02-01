import { z } from 'zod';

export const updateWalletSummariesSchema = z.object({
  id: z.string().uuid(),
  totalInvested: z.number(),
  grossBalance: z.number(),
  assetCount: z.number(),
  averagePrice: z.number(),
  rentability: z.number(),
  assetId: z.string().uuid(),
  walletId: z.string().uuid(),
});

export type UpdateWalletSummariesDto = z.infer<
  typeof updateWalletSummariesSchema
>;
