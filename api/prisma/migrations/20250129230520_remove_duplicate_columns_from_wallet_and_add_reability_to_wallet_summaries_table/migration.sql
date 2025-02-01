/*
  Warnings:

  - You are about to drop the column `grossBalance` on the `Wallet` table. All the data in the column will be lost.
  - You are about to drop the column `totalInvested` on the `Wallet` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Wallet" DROP COLUMN "grossBalance",
DROP COLUMN "totalInvested";

-- AlterTable
ALTER TABLE "WalletAssetSummaries" ADD COLUMN     "rentability" DOUBLE PRECISION NOT NULL DEFAULT 0.0;

-- AlterTable
ALTER TABLE "_AssetToWallet" ADD CONSTRAINT "_AssetToWallet_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_AssetToWallet_AB_unique";
