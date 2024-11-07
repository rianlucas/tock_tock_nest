import { WalletAssetSummaries } from '@prisma/client';
import { CreateTransactionDto } from './../../transaction/dto/create-transaction.dto';
import { UpdateWalletSummariesDto } from '../dto/update-walllet-summaries.dto';
export interface WalletSummariesRepository {
  findByTransaction(
    transaction: CreateTransactionDto,
  ): Promise<WalletAssetSummaries>;

  findByAssetAndWalletId(
    walletId: string,
    assetId: string,
  ): Promise<WalletAssetSummaries>;

  update(
    id: string,
    walletAssetSummaries: UpdateWalletSummariesDto,
  ): Promise<WalletAssetSummaries>;
}
