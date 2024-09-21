import { Module } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { WalletController } from './wallet.controller';
import { PrismaWalletRepository } from './repositories/prisma/prisma.wallet.repository';
import { PrismaService } from '@/prisma/prisma.service';

@Module({
  controllers: [WalletController],
  providers: [
    WalletService,
    {
      provide: 'WalletRepository',
      useClass: PrismaWalletRepository,
    },
    PrismaService,
  ],
})
export class WalletModule {}
