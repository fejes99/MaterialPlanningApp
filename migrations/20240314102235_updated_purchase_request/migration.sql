/*
  Warnings:

  - You are about to drop the column `code` on the `PurchaseRequest` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "PurchaseRequest" DROP CONSTRAINT "PurchaseRequest_processedById_fkey";

-- DropIndex
DROP INDEX "PurchaseRequest_code_key";

-- AlterTable
ALTER TABLE "PurchaseRequest" DROP COLUMN "code",
ALTER COLUMN "processedById" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "PurchaseRequest" ADD CONSTRAINT "PurchaseRequest_processedById_fkey" FOREIGN KEY ("processedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
