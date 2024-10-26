import { CreateAssetDto } from '@/src/asset/dto/create-asset.dto';
import { UpdateAssetDto } from '@/src/asset/dto/update-asset.dto';
import { Asset } from '@prisma/client';
import { AssetRepository } from '../asset.repository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class PrismaAssetRepository implements AssetRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(id: string): Promise<Asset | null> {
    return this.prisma.asset.findUnique({
      where: { id },
      include: {
        wallet: true,
      },
    });
  }

  async findMany(): Promise<Asset[]> {
    return this.prisma.asset.findMany({
      include: {
        wallet: true,
      },
    });
  }

  async create(assetDto: CreateAssetDto): Promise<Asset> {
    return this.prisma.asset.create({
      data: {
        name: assetDto.name,
        ticket: assetDto.ticket,
        price: assetDto.price,
        wallet: {
          connect: [
            {
              id: assetDto.walletId,
            },
          ],
        },
      },
    });
  }

  async update(id: string, assetDto: UpdateAssetDto): Promise<Asset> {
    return this.prisma.asset.update({
      where: { id },
      data: assetDto,
    });
  }

  async remove(id: string): Promise<void> {
    await this.prisma.asset.delete({
      where: { id },
    });
  }
}
