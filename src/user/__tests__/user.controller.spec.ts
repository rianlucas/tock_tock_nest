import { Test, TestingModule } from '@nestjs/testing';
import { PrismaUserRepository } from '@src/user/repositories/prisma/prisma.user.repository';
import { UserController } from '@src/user/user.controller';
import { UserService } from '@src/user/user.service';
import { PrismaService } from '@/prisma/prisma.service';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        {
          provide: 'UserRepository',
          useClass: PrismaUserRepository,
        },
        PrismaService,
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
