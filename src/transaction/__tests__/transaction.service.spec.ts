import { Test, TestingModule } from '@nestjs/testing';
import { TransactionService } from '../transaction.service';
import { PrismaTransactionRepository } from '../repositories/prisma/prisma.transaction.repository';
import { PrismaService } from '@/prisma/prisma.service';
import { PrismaAssetRepository } from '@/src/asset/repositories/prisma/prisma.asset.repository';
import { PrismaWalletRepository } from '@/src/wallet/repositories/prisma/prisma.wallet.repository';
import { PrismaWalletSummariesRepository } from '@/src/wallet-summaries/repositories/prisma/prisma.wallet-summaries.repository';
import { WalletSummariesService } from '@/src/wallet-summaries/wallet-summaries.service';

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
        {
          provide: 'WalletSummariesService',
          useClass: WalletSummariesService,
        },
        {
          provide: 'WalletSummariesRepository',
          useClass: PrismaWalletSummariesRepository,
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
