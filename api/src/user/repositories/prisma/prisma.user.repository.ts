import { Prisma, User } from '@prisma/client';
import { UserRepository } from '../user.repository';
import { PrismaService } from '../../../../prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private prisma: PrismaService) {}

  async findOne(id: string): Promise<User | null> {
    return this.prisma.user.findFirst({
      where: { id },
    });
  }

  async findMany(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async create(user: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({
      data: user,
    });
  }

  async update(id: string, user: Prisma.UserUpdateInput): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data: user,
    });
  }

  async remove(id: string): Promise<void> {
    await this.prisma.user.delete({
      where: { id },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findFirst({
      where: { email },
      include: { Wallet: true },
    });
  }
}
