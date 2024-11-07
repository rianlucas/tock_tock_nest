import { z } from 'zod';

export const createTransactionSchema = z.object({
  amount: z.number(),
  type: z.enum(['buy', 'sell']),
  quantity: z.number(),
  assetId: z.string().uuid(),
  walletId: z.string().uuid(),
});

export type CreateTransactionDto = z.infer<typeof createTransactionSchema>;
