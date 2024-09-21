import { Wallet } from '@prisma/client';
import { WalletRepository } from '../wallet.repository';
import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateWalletDto } from '../../dto/create-wallet.dto';
import { UpdateWalletDto } from '../../dto/update-wallet.dto';

@Injectable()
export class PrismaWalletRepository implements WalletRepository {
  constructor(private prisma: PrismaService) {}

  async findOne(id: string): Promise<Wallet | null> {
    return this.prisma.wallet.findFirstOrThrow({
      where: { id },
      include: {
        user: true,
      },
    });
  }
  async findMany(): Promise<Wallet[]> {
    return this.prisma.wallet.findMany({
      include: {
        user: true,
      },
    });
  }
  async create(wallet: CreateWalletDto): Promise<Wallet> {
    return this.prisma.wallet.create({
      data: {
        name: wallet.name,
        balance: 0,
        user: {
          connect: {
            id: wallet.userId,
          },
        },
      },
      include: {
        user: true,
      },
    });
  }
  async update(id: string, wallet: UpdateWalletDto): Promise<Wallet> {
    return this.prisma.wallet.update({
      where: { id },
      data: {
        name: wallet.name,
        balance: wallet.balance,
        user: {
          connect: {
            id: wallet.userId,
          },
        },
      },
      include: {
        user: true,
      },
    });
  }
  async remove(id: string): Promise<void> {
    await this.prisma.wallet.delete({
      where: { id },
    });
  }
}
