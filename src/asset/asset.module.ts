import { Module } from '@nestjs/common';
import { AssetService } from './asset.service';
import { AssetController } from './asset.controller';
import { PrismaAssetRepository } from './repositories/prisma/prisma.asset.repository';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  controllers: [AssetController],
  providers: [
    AssetService,
    {
      provide: 'AssetRepository',
      useClass: PrismaAssetRepository,
    },
    PrismaService,
  ],
})
export class AssetModule {}
