/*
  Warnings:

  - You are about to drop the column `symbol` on the `Asset` table. All the data in the column will be lost.
  - Added the required column `ticket` to the `Asset` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Asset" DROP COLUMN "symbol",
ADD COLUMN     "ticket" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Wallet" ALTER COLUMN "balance" SET DEFAULT 0;
