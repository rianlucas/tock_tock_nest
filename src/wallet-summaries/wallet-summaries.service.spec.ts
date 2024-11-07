import { Test, TestingModule } from '@nestjs/testing';
import { WalletSummariesService } from './wallet-summaries.service';

describe('WalletSummariesService', () => {
  let service: WalletSummariesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WalletSummariesService],
    }).compile();

    service = module.get<WalletSummariesService>(WalletSummariesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
