import { AssetRepository } from './../asset/repositories/asset.repository';
import { WalletRepository } from './../wallet/repositories/wallet.repository';
import { Inject, Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { TransactionRepository } from './repositories/transaction.repository';
import { WalletSummariesService } from '../wallet-summaries/wallet-summaries.service';
import { PrismaService } from '@/prisma/prisma.service';
import { WalletSummariesRepository } from '../wallet-summaries/repositories/wallet-summaries.repository';
import { UnprocessableEntityError } from '../global/errors/unprocessable-entity.error';
import { Prisma, WalletAssetSummaries } from '@prisma/client';

@Injectable()
export class TransactionService {
  constructor(
    @Inject('TransactionRepository')
    private readonly transactionRepository: TransactionRepository,
    @Inject('WalletRepository')
    private readonly walletRepository: WalletRepository,
    @Inject('AssetRepository')
    private readonly assetRepository: AssetRepository,
    @Inject('WalletSummariesRepository')
    private readonly walletSummariesRepository: WalletSummariesRepository,
    @Inject('WalletSummariesService')
    private readonly walletSummariesService: WalletSummariesService,
    private readonly prisma: PrismaService,
  ) {}

  async checkIfWalletAndAssetExist(
    walletId: string,
    assetId: string,
  ): Promise<void> {
    await this.walletRepository.findOne(walletId);
    await this.assetRepository.findOne(assetId);
  }

  async checkIfUserCanSell(
    transaction: CreateTransactionDto,
    walletAssetSummaries: WalletAssetSummaries,
  ): Promise<void> {
    if (
      walletAssetSummaries.assetCount < transaction.quantity &&
      transaction.type === 'sell'
    ) {
      throw new UnprocessableEntityError({
        message:
          'Insufficient asset quantity, you can not sell more assets than you have',
        action: 'Check if the asset quantity is correct',
      });
    }
  }

  async createWalletSummariesIfDoesNotExist(
    transaction: CreateTransactionDto,
    tx: Prisma.TransactionClient,
  ): Promise<WalletAssetSummaries> {
    const walletAssetSummaries =
      await this.walletSummariesRepository.findByAssetAndWalletId(
        {
          walletId: transaction.walletId,
          assetId: transaction.assetId,
        },
        tx,
      );
    if (!walletAssetSummaries) {
      return await this.walletSummariesRepository.create(
        {
          walletId: transaction.walletId,
          assetId: transaction.assetId,
        },
        tx,
      );
    }

    return walletAssetSummaries;
  }

  async create(createTransactionDto: CreateTransactionDto) {
    await this.checkIfWalletAndAssetExist(
      createTransactionDto.walletId,
      createTransactionDto.assetId,
    );
    const transaction = await this.prisma.$transaction(async (tx) => {
      const walletAssetSummaries =
        await this.createWalletSummariesIfDoesNotExist(
          createTransactionDto,
          tx,
        );

      if (createTransactionDto.type === 'sell') {
        await this.checkIfUserCanSell(
          createTransactionDto,
          walletAssetSummaries,
        );
      }

      const transaction = await this.transactionRepository.create(
        createTransactionDto,
        tx,
      );

      await this.walletSummariesService.update(createTransactionDto, tx);

      return transaction;
    });

    return transaction;
  }

  async findAll() {
    return this.transactionRepository.findMany();
  }

  async findOne(id: string) {
    return this.transactionRepository.findOne(id);
  }

  async update(id: string, updateTransactionDto: UpdateTransactionDto) {
    await this.checkIfWalletAndAssetExist(
      updateTransactionDto.walletId,
      updateTransactionDto.assetId,
    );

    return this.transactionRepository.update(id, updateTransactionDto);
  }

  async remove(id: string) {
    return this.transactionRepository.remove(id);
  }
}
