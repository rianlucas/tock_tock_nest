import { Prisma, Transaction } from '@prisma/client';
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

  async create(
    wallet: CreateTransactionDto,
    tx: Prisma.TransactionClient,
  ): Promise<Transaction> {
    const prismaClient = tx ?? this.prisma;

    return prismaClient.transaction.create({
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

  async totalInvestedAndGrossBalanceChart(walletId: number) {
    return await this.prisma.$queryRaw`
      SELECT DATE_TRUNC('month', "createdAt") AS mes_ano, SUM("valor") AS total
      FROM "Transaction"
      WHERE "walletId" = ${walletId}
      GROUP BY mes_ano
      ORDER BY mes_ano;
    `;
  }

  //TODO: preciso criar uma tabela para armezenar o valor total investido e o valor total de ganho/loss mês a mês.
  // pois esses dados do mês passado não devem ser calculados com os preços dos ativos atuais.
  // ex: não faz sentido eu calcular o saldo bruto de janeiro de 2022 a partir do preço atual dos ativos
  // a rentabilidade seria muito maior, e não iria refletir aquele momento de forma correta.
}
