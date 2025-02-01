import { CreateTransactionDto } from './../transaction/dto/create-transaction.dto';
import { Inject, Injectable } from '@nestjs/common';
import { WalletSummariesRepository } from './repositories/wallet-summaries.repository';
import { Prisma, WalletAssetSummaries } from '@prisma/client';

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

    //TODO: calculate reability

    return this.walletSummariesRepository.update(updatedWalletSummaries, tx);
  }

  //TODO: create a method to update grossBalance according to asset value in real time (when the user logs in)
}
