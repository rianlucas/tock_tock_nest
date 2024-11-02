import { Test, TestingModule } from '@nestjs/testing';
import { TransactionController } from '../transaction.controller';
import { TransactionService } from '../transaction.service';
import { PrismaTransactionRepository } from '../repositories/prisma/prisma.transaction.repository';
import { PrismaService } from '@/prisma/prisma.service';
import { PrismaWalletRepository } from '@/src/wallet/repositories/prisma/prisma.wallet.repository';
import { PrismaAssetRepository } from '@/src/asset/repositories/prisma/prisma.asset.repository';

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
        PrismaService,
      ],
    }).compile();

    controller = module.get<TransactionController>(TransactionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
