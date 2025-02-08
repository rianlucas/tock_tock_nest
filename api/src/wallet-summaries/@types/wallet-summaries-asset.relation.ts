import { Prisma } from '@prisma/client';

export type WalletAssetSummariesWithAsset =
  Prisma.WalletAssetSummariesGetPayload<{
    include: { asset: true };
  }>;
