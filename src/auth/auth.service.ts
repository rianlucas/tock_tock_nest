import { Inject, Injectable } from '@nestjs/common';
import { PrismaUserRepository } from '../user/repositories/prisma/prisma.user.repository';
import { UnauthorizedError } from '../global/errors/unauthorized.error';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: PrismaUserRepository,
    private jwtService: JwtService,
  ) {}

  async signIn(
    email: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const user = await this.userRepository.findByEmail(email);
    if (user?.password !== password) {
      throw new UnauthorizedError({
        message: 'Invalid credentials',
        action: 'Check if the email and password are correct',
      });
    }

    const payload = { sub: user.id, username: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
