import { Test, TestingModule } from '@nestjs/testing';
import { WalletSummariesService } from './wallet-summaries.service';
import { PrismaWalletSummariesRepository } from './repositories/prisma/prisma.wallet-summaries.repository';
import { PrismaService } from '@/prisma/prisma.service';

describe('WalletSummariesService', () => {
  let service: WalletSummariesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WalletSummariesService,
        {
          provide: 'WalletSummariesRepository',
          useClass: PrismaWalletSummariesRepository,
        },
        PrismaService,
      ],
    }).compile();

    service = module.get<WalletSummariesService>(WalletSummariesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
