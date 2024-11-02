import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { PrismaService } from '@/prisma/prisma.service';
import { PrismaTransactionRepository } from './repositories/prisma/prisma.transaction.repository';

@Module({
  controllers: [TransactionController],
  providers: [
    TransactionService,
    {
      provide: 'TransactionRepository',
      useClass: PrismaTransactionRepository,
    },
    PrismaService,
  ],
})
export class TransactionModule {}
