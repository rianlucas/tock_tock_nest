import { Module } from '@nestjs/common';
import { WalletSummariesController } from '@src/wallet-summaries/wallet-summaries.controller';
import { WalletSummariesService } from '@src/wallet-summaries/wallet-summaries.service';
import { PrismaWalletSummariesRepository } from '@src/wallet-summaries/repositories/prisma/prisma.wallet-summaries.repository';
import { PrismaService } from '@/prisma/prisma.service';

@Module({
  controllers: [WalletSummariesController],
  providers: [
    WalletSummariesService,
    {
      provide: 'WalletSummariesRepository',
      useClass: PrismaWalletSummariesRepository,
    },
    PrismaService,
  ],
})
export class WalletSummariesModule {}
