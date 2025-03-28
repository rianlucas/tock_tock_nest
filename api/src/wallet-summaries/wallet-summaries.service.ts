import { CreateTransactionDto } from './../transaction/dto/create-transaction.dto';
import { Inject, Injectable } from '@nestjs/common';
import { WalletSummariesRepository } from './repositories/wallet-summaries.repository';
import { Prisma, WalletAssetSummaries } from '@prisma/client';
import { WalletAssetSummariesWithAsset } from './@types/wallet-summaries-asset.relation';

@Injectable()
export class WalletSummariesService {
  constructor(
    @Inject('WalletSummariesRepository')
    private readonly walletSummariesRepository: WalletSummariesRepository,
  ) {}

  async calculateAverageAssetPrice(
    walletSummaries: WalletAssetSummaries,
    transaction: CreateTransactionDto,
  ): Promise<WalletAssetSummaries> {
    if (transaction.type === 'sell') {
      walletSummaries.totalInvested -=
        transaction.amount * transaction.quantity;
      walletSummaries.assetCount -= transaction.quantity;
    }
    if (transaction.type === 'buy') {
      walletSummaries.totalInvested +=
        transaction.amount * transaction.quantity;
      walletSummaries.assetCount += transaction.quantity;
    }

    walletSummaries.averagePrice =
      walletSummaries.totalInvested / walletSummaries.assetCount;

    return walletSummaries;
  }

  async updateGrossBalance(
    walletSummaries: WalletAssetSummariesWithAsset,
  ): Promise<number> {
    return (walletSummaries.grossBalance =
      walletSummaries.asset.price * walletSummaries.assetCount);
  }

  async update(
    transaction: CreateTransactionDto,
    tx: Prisma.TransactionClient,
  ) {
    const walletSummaries =
      await this.walletSummariesRepository.findByTransaction(transaction, tx);

    const updatedWalletSummaries = await this.calculateAverageAssetPrice(
      walletSummaries,
      transaction,
    );

    updatedWalletSummaries.grossBalance =
      await this.updateGrossBalance(walletSummaries);

    updatedWalletSummaries.rentability =
      ((updatedWalletSummaries.grossBalance -
        updatedWalletSummaries.totalInvested) /
        updatedWalletSummaries.totalInvested) *
      100;

    return this.walletSummariesRepository.update(updatedWalletSummaries, tx);
  }

  async getMostValuableAssets(walletId: string) {
    return this.walletSummariesRepository.getMostValuableAssets(walletId);
  }
}
