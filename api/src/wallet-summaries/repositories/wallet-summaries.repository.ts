import { Prisma, WalletAssetSummaries } from '@prisma/client';
import { CreateTransactionDto } from './../../transaction/dto/create-transaction.dto';
import { UpdateWalletSummariesDto } from '../dto/update-walllet-summaries.dto';
import { WalletAssetSummariesWithAsset } from '../@types/wallet-summaries-asset.relation';

export interface WalletSummariesRepository {
  findByTransaction(
    transaction: CreateTransactionDto,
    tx: Prisma.TransactionClient,
  ): Promise<WalletAssetSummariesWithAsset>;

  findByAssetAndWalletId(
    payload: {
      walletId: string;
      assetId: string;
    },
    tx: Prisma.TransactionClient,
  ): Promise<WalletAssetSummaries | null>;

  update(
    walletAssetSummaries: UpdateWalletSummariesDto,
    tx: Prisma.TransactionClient,
  ): Promise<WalletAssetSummaries>;

  create(
    payload: { walletId: string; assetId: string },
    tx: Prisma.TransactionClient,
  ): Promise<WalletAssetSummaries>;

  getMostValuableAssets(walletId: string): Promise<WalletAssetSummaries[]>;
}
