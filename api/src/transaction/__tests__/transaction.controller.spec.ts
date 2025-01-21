import { Test, TestingModule } from '@nestjs/testing';
import { TransactionController } from '../transaction.controller';
import { TransactionService } from '../transaction.service';
import { PrismaTransactionRepository } from '../repositories/prisma/prisma.transaction.repository';
import { PrismaService } from '@/prisma/prisma.service';
import { PrismaWalletRepository } from '@/src/wallet/repositories/prisma/prisma.wallet.repository';
import { PrismaAssetRepository } from '@/src/asset/repositories/prisma/prisma.asset.repository';
import { PrismaWalletSummariesRepository } from '@/src/wallet-summaries/repositories/prisma/prisma.wallet-summaries.repository';
import { WalletSummariesService } from '@/src/wallet-summaries/wallet-summaries.service';
import { AuthGuard } from '@/src/auth/auth.guard';

describe('TransactionController', () => {
  let controller: TransactionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionController],
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
    })
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: () => true }) // Mock the AuthGuard
      .compile();

    controller = module.get<TransactionController>(TransactionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
