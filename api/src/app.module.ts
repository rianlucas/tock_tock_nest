import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { WalletModule } from './wallet/wallet.module';
import { AssetModule } from './asset/asset.module';
import { TransactionModule } from './transaction/transaction.module';
import { PrismaService } from '@/prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { WalletSummariesModule } from './wallet-summaries/wallet-summaries.module';

@Module({
  imports: [
    UserModule,
    WalletModule,
    AssetModule,
    TransactionModule,
    AuthModule,
    WalletSummariesModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
