import { Test, TestingModule } from '@nestjs/testing';
import { AssetController } from '@src/asset/asset.controller';
import { AssetService } from '@src/asset/asset.service';
import { PrismaAssetRepository } from '../repositories/prisma/prisma.asset.repository';

describe('AssetController', () => {
  let controller: AssetController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssetController],
      providers: [
        AssetService,
        {
          provide: 'AssetRepository',
          useValue: PrismaAssetRepository,
        },
      ],
    }).compile();

    controller = module.get<AssetController>(AssetController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
