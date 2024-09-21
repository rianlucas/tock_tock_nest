import { Inject, Injectable } from '@nestjs/common';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { WalletRepository } from './repositories/wallet.repository';
import { CreateWalletDto } from './dto/create-wallet.dto';

@Injectable()
export class WalletService {
  constructor(
    @Inject('WalletRepository')
    private readonly walletRepository: WalletRepository,
  ) {}

  async create(createWalletDto: CreateWalletDto) {
    return this.walletRepository.create(createWalletDto);
  }

  async findAll() {
    return this.walletRepository.findMany();
  }

  async findOne(id: string) {
    return this.walletRepository.findOne(id);
  }

  async update(id: string, updateWalletDto: UpdateWalletDto) {
    return this.walletRepository.update(id, updateWalletDto);
  }

  async remove(id: string) {
    return this.walletRepository.remove(id);
  }
}
