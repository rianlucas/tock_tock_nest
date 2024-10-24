import { z } from 'zod';
import { createAssetSchema } from './create-asset.dto';

export type UpdateAssetDto = z.infer<typeof createAssetSchema>;
