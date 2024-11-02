/*
  Warnings:

  - You are about to drop the column `AssetId` on the `Transaction` table. All the data in the column will be lost.
  - Added the required column `assetId` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_AssetId_fkey";

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "AssetId",
ADD COLUMN     "assetId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_assetId_fkey" FOREIGN KEY ("assetId") REFERENCES "Asset"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
