import { Test, TestingModule } from '@nestjs/testing';
import { WalletSummariesController } from './wallet-summaries.controller';

describe('WalletSummariesController', () => {
  let controller: WalletSummariesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WalletSummariesController],
    }).compile();

    controller = module.get<WalletSummariesController>(WalletSummariesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
