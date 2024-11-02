import { Test, TestingModule } from '@nestjs/testing';
import { TransactionService } from '../transaction.service';
import { PrismaTransactionRepository } from '../repositories/prisma/prisma.transaction.repository';
import { PrismaService } from '@/prisma/prisma.service';

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
        PrismaService,
      ],
    }).compile();

    service = module.get<TransactionService>(TransactionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
