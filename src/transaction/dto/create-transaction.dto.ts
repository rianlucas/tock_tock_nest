import { z } from 'zod';

export const createTransactionSchema = z.object({
  amount: z.number(),
  type: z.enum(['buy', 'sell']),
  assetId: z.string().uuid(),
  walletId: z.string().uuid(),
});

export type CreateTransactionDto = z.infer<typeof createTransactionSchema>;
