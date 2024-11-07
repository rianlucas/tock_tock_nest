import { CreateTransactionDto } from '@/src/transaction/dto/create-transaction.dto';
import { WalletAssetSummaries } from '@prisma/client';
import { WalletSummariesRepository } from '../wallet-summaries.repository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { NotFoundError } from '@/src/global/errors/not-found.error';
import { UpdateWalletSummariesDto } from '../../dto/update-walllet-summaries.dto';

@Injectable()
export class PrismaWalletSummariesRepository
  implements WalletSummariesRepository
{
  constructor(private readonly prisma: PrismaService) {}

  async findWalletSummariesByTransaction(
    transaction: CreateTransactionDto,
  ): Promise<WalletAssetSummaries> {
    const wallletAssetSummaries =
      await this.prisma.walletAssetSummaries.findFirst({
        where: { walletId: transaction.walletId, assetId: transaction.assetId },
      });

    if (!wallletAssetSummaries) {
      throw new NotFoundError({
        message: 'WalletAssetSummaries not found',
        action: 'Try again with a valid walletId and assetId',
      });
    }

    return wallletAssetSummaries;
  }

  async update(
    id: string,
    walletAssetSummaries: UpdateWalletSummariesDto,
  ): Promise<WalletAssetSummaries> {
    return this.prisma.walletAssetSummaries.update({
      where: { id: '5cba04d0-ce0d-45d2-9986-de4ff80df558' },
      data: {
        id: '5cba04d0-ce0d-45d2-9986-de4ff80df558',
        averagePrice: isNaN(walletAssetSummaries.averagePrice)
          ? 0
          : walletAssetSummaries.averagePrice,
        assetCount: walletAssetSummaries.assetCount ?? 0,
        totalInvestiment: walletAssetSummaries.totalInvestiment ?? 0,
        createdAt: new Date('2024-11-06T01:47:39.085Z'),
        updatedAt: new Date(),

        wallet: {
          connect: { id: walletAssetSummaries.walletId },
        },
        asset: {
          connect: { id: walletAssetSummaries.assetId },
        },
      },
    });
  }
}
