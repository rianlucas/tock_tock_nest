import { z } from 'zod';
import { createWalletSchema } from './create-wallet.dto';

export const updateWalletSchema = createWalletSchema
  .setKey('totalInvested', z.number())
  .setKey('grossBalance', z.number());

export type UpdateWalletDto = z.infer<typeof updateWalletSchema>;
