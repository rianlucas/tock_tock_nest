/*
  Warnings:

  - You are about to drop the column `balance` on the `Wallet` table. All the data in the column will be lost.
  - You are about to drop the column `totalInvestiment` on the `WalletAssetSummaries` table. All the data in the column will be lost.
  - Added the required column `grossBalance` to the `WalletAssetSummaries` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalInvested` to the `WalletAssetSummaries` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Wallet" DROP COLUMN "balance",
ADD COLUMN     "grossBalance" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "totalInvested" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "WalletAssetSummaries" DROP COLUMN "totalInvestiment",
ADD COLUMN     "grossBalance" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "totalInvested" DOUBLE PRECISION NOT NULL;
