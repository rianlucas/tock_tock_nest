import { CreateTransactionDto } from './../transaction/dto/create-transaction.dto';
import { Inject, Injectable } from '@nestjs/common';
import { WalletSummariesRepository } from './repositories/wallet-summaries.repository';
import { WalletAssetSummaries } from '@prisma/client';

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
      walletSummaries.totalInvestiment -=
        transaction.amount * transaction.quantity;
      walletSummaries.assetCount -= transaction.quantity;
    }
    if (transaction.type === 'buy') {
      walletSummaries.totalInvestiment +=
        transaction.amount * transaction.quantity;
      walletSummaries.assetCount += transaction.quantity;
    }

    walletSummaries.averagePrice =
      walletSummaries.totalInvestiment / walletSummaries.assetCount;

    return walletSummaries;
  }

  async update(transaction: CreateTransactionDto) {
    const walletSummaries =
      await this.walletSummariesRepository.findByTransaction(transaction);

    const updatedWalletSummaries = await this.calculateAverageAssetPrice(
      walletSummaries,
      transaction,
    );

    return this.walletSummariesRepository.update(
      updatedWalletSummaries.id,
      updatedWalletSummaries,
    );
  }
}
