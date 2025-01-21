import { Inject, Injectable } from '@nestjs/common';
import { CreateAssetDto } from './dto/create-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';
import { AssetRepository } from '@src/asset/repositories/asset.repository';

@Injectable()
export class AssetService {
  constructor(
    @Inject('AssetRepository')
    private readonly assetRepository: AssetRepository,
  ) {}

  async create(createAssetDto: CreateAssetDto) {
    return this.assetRepository.create(createAssetDto);
  }

  async findAll() {
    return this.assetRepository.findMany();
  }

  async findOne(id: string) {
    return this.assetRepository.findOne(id);
  }

  async update(id: string, updateAssetDto: UpdateAssetDto) {
    return this.assetRepository.update(id, updateAssetDto);
  }

  async remove(id: string) {
    return this.assetRepository.remove(id);
  }
}
