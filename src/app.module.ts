import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { WalletModule } from './wallet/wallet.module';
import { AssetModule } from './asset/asset.module';

@Module({
  imports: [UserModule, WalletModule, AssetModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
