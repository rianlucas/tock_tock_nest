import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { PrismaService } from '@/prisma/prisma.service';
import { PrismaTransactionRepository } from './repositories/prisma/prisma.transaction.repository';
import { PrismaWalletRepository } from '../wallet/repositories/prisma/prisma.wallet.repository';
import { PrismaAssetRepository } from '../asset/repositories/prisma/prisma.asset.repository';

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
    PrismaService,
  ],
})
export class TransactionModule {}
