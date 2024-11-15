import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { WalletModule } from './wallet/wallet.module';
import { AssetModule } from './asset/asset.module';
import { TransactionModule } from './transaction/transaction.module';
import { WalletSummariesService } from './wallet-summaries/wallet-summaries.service';
import { PrismaWalletSummariesRepository } from './wallet-summaries/repositories/prisma/prisma.wallet-summaries.repository';
import { PrismaService } from '@/prisma/prisma.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    UserModule,
    WalletModule,
    AssetModule,
    TransactionModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    WalletSummariesService,
    {
      provide: 'WalletSummariesRepository',
      useClass: PrismaWalletSummariesRepository,
    },
    PrismaService,
  ],
})
export class AppModule {}
