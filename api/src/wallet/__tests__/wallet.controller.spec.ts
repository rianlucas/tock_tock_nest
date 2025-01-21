import { Test, TestingModule } from '@nestjs/testing';
import { WalletController } from '../wallet.controller';
import { WalletService } from '../wallet.service';
import { PrismaWalletRepository } from '../repositories/prisma/prisma.wallet.repository';

describe('WalletController', () => {
  let controller: WalletController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WalletController],
      providers: [
        WalletService,
        {
          provide: 'WalletRepository',
          useValue: PrismaWalletRepository,
        },
      ],
    }).compile();

    controller = module.get<WalletController>(WalletController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
