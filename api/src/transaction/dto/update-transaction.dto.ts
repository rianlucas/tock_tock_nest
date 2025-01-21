import { createTransactionSchema } from './create-transaction.dto';
import { z } from 'zod';

export type UpdateTransactionDto = z.infer<typeof createTransactionSchema>;
