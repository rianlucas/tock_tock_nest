import { Transaction } from '@prisma/client';
import { CreateTransactionDto } from '../../dto/create-transaction.dto';
import { UpdateTransactionDto } from '../../dto/update-transaction.dto';
import { TransactionRepository } from '../transaction.repository';
import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { NotFoundError } from '@/src/global/errors/not-found.error';

@Injectable()
export class PrismaTransactionRepository implements TransactionRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(id: string): Promise<Transaction | null> {
    const transaction = this.prisma.transaction.findFirst({ where: { id } });

    if (!transaction) {
      throw new NotFoundError({
        message: 'Transaction not found',
        action: 'Check if the transactionId is correct',
      });
    }

    return transaction;
  }

  async findMany(): Promise<Transaction[]> {
    return this.prisma.transaction.findMany();
  }

  async create(wallet: CreateTransactionDto): Promise<Transaction> {
    return this.prisma.transaction.create({
      data: {
        amount: wallet.amount,
        type: wallet.type,
        quantity: wallet.quantity,
        asset: { connect: { id: wallet.assetId } },
        wallet: { connect: { id: wallet.walletId } },
      },
    });
  }

  async update(id: string, wallet: UpdateTransactionDto): Promise<Transaction> {
    return this.prisma.transaction.update({
      where: { id },
      data: {
        amount: wallet.amount,
        type: wallet.type,
        asset: { connect: { id: wallet.assetId } },
        wallet: { connect: { id: wallet.walletId } },
      },
    });
  }

  async remove(id: string): Promise<void> {
    this.prisma.transaction.delete({ where: { id } });
  }
}
