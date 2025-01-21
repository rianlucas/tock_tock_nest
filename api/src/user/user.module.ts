import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaUserRepository } from './repositories/prisma/prisma.user.repository';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: 'UserRepository',
      useClass: PrismaUserRepository,
    },
    PrismaService,
  ],
})
export class UserModule {}
