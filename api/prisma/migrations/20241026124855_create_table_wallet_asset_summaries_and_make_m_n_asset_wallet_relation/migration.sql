-- DropForeignKey
ALTER TABLE "Asset" DROP CONSTRAINT "Asset_walletId_fkey";

-- CreateTable
CREATE TABLE "WalletAssetSummaries" (
    "id" TEXT NOT NULL,
    "walletId" TEXT NOT NULL,
    "assetId" TEXT NOT NULL,
    "averagePrice" DOUBLE PRECISION NOT NULL,
    "assetCount" DOUBLE PRECISION NOT NULL,
    "totalInvestiment" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WalletAssetSummaries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AssetToWallet" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_AssetToWallet_AB_unique" ON "_AssetToWallet"("A", "B");

-- CreateIndex
CREATE INDEX "_AssetToWallet_B_index" ON "_AssetToWallet"("B");

-- AddForeignKey
ALTER TABLE "WalletAssetSummaries" ADD CONSTRAINT "WalletAssetSummaries_walletId_fkey" FOREIGN KEY ("walletId") REFERENCES "Wallet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WalletAssetSummaries" ADD CONSTRAINT "WalletAssetSummaries_assetId_fkey" FOREIGN KEY ("assetId") REFERENCES "Asset"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AssetToWallet" ADD CONSTRAINT "_AssetToWallet_A_fkey" FOREIGN KEY ("A") REFERENCES "Asset"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AssetToWallet" ADD CONSTRAINT "_AssetToWallet_B_fkey" FOREIGN KEY ("B") REFERENCES "Wallet"("id") ON DELETE CASCADE ON UPDATE CASCADE;
