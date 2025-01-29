import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
} from '@nestjs/common';
import { AssetService } from './asset.service';
import { CreateAssetDto, createAssetSchema } from './dto/create-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';
import { ZodValidationPipe } from '../global/pipes/zod-validation.pipe';

@Controller('asset')
export class AssetController {
  constructor(private readonly assetService: AssetService) {}

  @UsePipes(new ZodValidationPipe(createAssetSchema))
  @Post()
  async create(@Body() createAssetDto: CreateAssetDto) {
    return this.assetService.create(createAssetDto);
  }

  @Get()
  async findAll() {
    return this.assetService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.assetService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAssetDto: UpdateAssetDto,
  ) {
    return this.assetService.update(id, updateAssetDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.assetService.remove(id);
  }
}
