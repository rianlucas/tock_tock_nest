import { z } from 'zod';

export const createAssetSchema = z.object({
  name: z.string(),
  ticket: z.string().max(8),
  price: z.number(),
});

export type CreateAssetDto = z.infer<typeof createAssetSchema>;
