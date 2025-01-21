import { Wallet } from '@prisma/client';
import { CreateWalletDto } from '../dto/create-wallet.dto';
import { UpdateWalletDto } from '../dto/update-wallet.dto';

export interface WalletRepository {
  findOne(id: string): Promise<Wallet | null>;
  findMany(): Promise<Wallet[]>;
  create(wallet: CreateWalletDto): Promise<Wallet>;
  update(id: string, wallet: UpdateWalletDto): Promise<Wallet>;
  remove(id: string): Promise<void>;
}
