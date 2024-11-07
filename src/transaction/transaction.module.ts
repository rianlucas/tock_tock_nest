import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { PrismaService } from '@/prisma/prisma.service';
import { PrismaTransactionRepository } from './repositories/prisma/prisma.transaction.repository';
import { PrismaWalletRepository } from '../wallet/repositories/prisma/prisma.wallet.repository';
import { PrismaAssetRepository } from '../asset/repositories/prisma/prisma.asset.repository';
import { WalletSummariesService } from '../wallet-summaries/wallet-summaries.service';
import { PrismaWalletSummariesRepository } from '../wallet-summaries/repositories/prisma/prisma.wallet-summaries.repository';

@Module({
  controllers: [TransactionController],
  providers: [
    TransactionService,
    {
      provide: 'TransactionRepository',
      useClass: PrismaTransactionRepository,
    },
    {
      provide: 'WalletRepository',
      useClass: PrismaWalletRepository,
    },
    {
      provide: 'AssetRepository',
      useClass: PrismaAssetRepository,
    },
    {
      provide: 'WalletSummariesRepository',
      useClass: PrismaWalletSummariesRepository,
    },
    {
      provide: 'WalletSummariesService',
      useClass: WalletSummariesService,
    },
    PrismaService,
  ],
})
export class TransactionModule {}
