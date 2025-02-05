import { Controller, Get, UseGuards } from '@nestjs/common';
import { WalletSummariesService } from '@src/wallet-summaries/wallet-summaries.service';
import { AuthGuard } from '@src/auth/auth.guard';
import { Request } from '@nestjs/common';

@UseGuards(AuthGuard)
@Controller('wallet-summaries')
export class WalletSummariesController {
  constructor(
    private readonly walletSummariesService: WalletSummariesService,
  ) {}

  @Get('most-valuable-assets')
  getMostValuableAssets(@Request() req) {
    return this.walletSummariesService.getMostValuableAssets(
      req.user.Wallet.id,
    );
  }
}
