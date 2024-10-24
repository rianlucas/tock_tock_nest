import { Test, TestingModule } from '@nestjs/testing';
import { AssetService } from '@src/asset/asset.service';
import { PrismaAssetRepository } from '@src/asset/repositories/prisma/prisma.asset.repository';
import { PrismaService } from '@/prisma/prisma.service';

describe('AssetService', () => {
  let service: AssetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AssetService,
        {
          provide: 'AssetRepository',
          useClass: PrismaAssetRepository,
        },
        PrismaService,
      ],
    }).compile();

    service = module.get<AssetService>(AssetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
