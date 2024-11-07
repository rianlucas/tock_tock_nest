import { WalletAssetSummaries } from '@prisma/client';
import { CreateTransactionDto } from './../../transaction/dto/create-transaction.dto';
import { UpdateWalletSummariesDto } from '../dto/update-walllet-summaries.dto';
export interface WalletSummariesRepository {
  findWalletSummariesByTransaction(
    transaction: CreateTransactionDto,
  ): Promise<WalletAssetSummaries>;

  update(
    id: string,
    walletAssetSummaries: UpdateWalletSummariesDto,
  ): Promise<WalletAssetSummaries>;
}
