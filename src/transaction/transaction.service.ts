import { AssetRepository } from './../asset/repositories/asset.repository';
import { WalletRepository } from './../wallet/repositories/wallet.repository';
import { Inject, Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { TransactionRepository } from './repositories/transaction.repository';
import { WalletSummariesService } from '../wallet-summaries/wallet-summaries.service';

@Injectable()
export class TransactionService {
  constructor(
    @Inject('TransactionRepository')
    private readonly transactionRepository: TransactionRepository,
    @Inject('WalletRepository')
    private readonly walletRepository: WalletRepository,
    @Inject('AssetRepository')
    private readonly assetRepository: AssetRepository,
    @Inject('WalletSummariesService')
    private readonly walletSummariesService: WalletSummariesService,
  ) {}

  async checkIfWalletAndAssetExist(
    walletId: string,
    assetId: string,
  ): Promise<void> {
    await this.walletRepository.findOne(walletId);
    await this.assetRepository.findOne(assetId);
  }

  async create(createTransactionDto: CreateTransactionDto) {
    await this.checkIfWalletAndAssetExist(
      createTransactionDto.walletId,
      createTransactionDto.assetId,
    );

    const transaction =
      await this.transactionRepository.create(createTransactionDto);

    await this.walletSummariesService.update(createTransactionDto);

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
