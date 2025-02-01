import { Prisma, Transaction } from '@prisma/client';
import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { UpdateTransactionDto } from '../dto/update-transaction.dto';

export interface TransactionRepository {
  findOne(id: string): Promise<Transaction | null>;
  findMany(): Promise<Transaction[]>;
  create(
    wallet: CreateTransactionDto,
    tx?: Prisma.TransactionClient,
  ): Promise<Transaction>;
  update(id: string, wallet: UpdateTransactionDto): Promise<Transaction>;
  remove(id: string): Promise<void>;
}
