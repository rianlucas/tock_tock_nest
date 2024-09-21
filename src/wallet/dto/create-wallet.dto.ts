import { z } from 'zod';

export const createWalletSchema = z.object({
  name: z.string().max(255).min(2),
  userId: z.string().uuid(),
});

export type CreateWalletDto = z.infer<typeof createWalletSchema>;
