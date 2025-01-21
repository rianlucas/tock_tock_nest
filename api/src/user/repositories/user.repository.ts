import { Prisma, User } from '@prisma/client';

export interface UserRepository {
  findOne(id: string): Promise<User | null>;
  findMany(): Promise<User[]>;
  create(user: Prisma.UserCreateInput): Promise<User>;
  update(id: string, user: Prisma.UserUpdateInput): Promise<User>;
  remove(id: string): Promise<void>;
  findByEmail(email: string): Promise<User | null>;
}
