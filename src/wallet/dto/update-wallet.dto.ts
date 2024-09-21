import { z } from 'zod';
import { createWalletSchema } from './create-wallet.dto';

export const updateWalletSchema = createWalletSchema.setKey(
  'balance',
  z.number(),
);

export type UpdateWalletDto = z.infer<typeof updateWalletSchema>;
