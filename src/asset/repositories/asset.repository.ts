import { Asset } from '@prisma/client';
import { CreateAssetDto } from '@src/asset/dto/create-asset.dto';
import { UpdateAssetDto } from '@src/asset/dto/update-asset.dto';

export interface AssetRepository {
  findOne(id: string): Promise<Asset | null>;
  findMany(): Promise<Asset[]>;
  create(wallet: CreateAssetDto): Promise<Asset>;
  update(id: string, wallet: UpdateAssetDto): Promise<Asset>;
  remove(id: string): Promise<void>;
}
