import { CreateTransactionDto } from '@/src/transaction/dto/create-transaction.dto';
import { Prisma, WalletAssetSummaries } from '@prisma/client';
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

  async create(
    payload: { walletId: string; assetId: string },
    tx: Prisma.TransactionClient,
  ) {
    const prismaClient = tx ?? this.prisma;
    return prismaClient.walletAssetSummaries.create({
      data: {
        averagePrice: 0,
        assetCount: 0,
        totalInvested: 0,
        grossBalance: 0,
        rentability: 0,
        walletId: payload.walletId,
        assetId: payload.assetId,
      },
    });
  }

  async findByTransaction(
    transaction: CreateTransactionDto,
    tx: Prisma.TransactionClient,
  ): Promise<WalletAssetSummaries> {
    const prismaClient = tx ?? this.prisma;
    const walletAssetSummaries =
      await prismaClient.walletAssetSummaries.findFirst({
        where: { walletId: transaction.walletId, assetId: transaction.assetId },
      });

    if (!walletAssetSummaries) {
      throw new NotFoundError({
        message: 'WalletAssetSummaries not found',
        action: 'Try again with a valid walletId and assetId',
      });
    }

    return walletAssetSummaries;
  }

  async findByAssetAndWalletId(
    payload: {
      walletId: string;
      assetId: string;
    },
    tx: Prisma.TransactionClient,
  ): Promise<WalletAssetSummaries | null> {
    const prismaClient = tx ?? this.prisma;
    return prismaClient.walletAssetSummaries.findFirst({
      where: { walletId: payload.walletId, assetId: payload.assetId },
    });
  }

  async update(
    walletAssetSummaries: UpdateWalletSummariesDto,
    tx: Prisma.TransactionClient,
  ): Promise<WalletAssetSummaries> {
    const prismaClient = tx ?? this.prisma;
    return prismaClient.walletAssetSummaries.update({
      where: { id: walletAssetSummaries.id },
      data: {
        averagePrice: isNaN(walletAssetSummaries.averagePrice)
          ? 0
          : walletAssetSummaries.averagePrice,
        assetCount: walletAssetSummaries.assetCount ?? 0,
        totalInvested: walletAssetSummaries.totalInvested ?? 0,
        grossBalance: walletAssetSummaries.grossBalance ?? 0,
        rentability: walletAssetSummaries.rentability ?? 0,

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
