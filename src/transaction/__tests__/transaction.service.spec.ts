import { Test, TestingModule } from '@nestjs/testing';
import { TransactionService } from '../transaction.service';
import { PrismaTransactionRepository } from '../repositories/prisma/prisma.transaction.repository';
import { PrismaService } from '@/prisma/prisma.service';
import { PrismaAssetRepository } from '@/src/asset/repositories/prisma/prisma.asset.repository';
import { PrismaWalletRepository } from '@/src/wallet/repositories/prisma/prisma.wallet.repository';

describe('TransactionService', () => {
  let service: TransactionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionService,
        {
          provide: 'TransactionRepository',
          useValue: { PrismaTransactionRepository },
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
    }).compile();

    service = module.get<TransactionService>(TransactionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
