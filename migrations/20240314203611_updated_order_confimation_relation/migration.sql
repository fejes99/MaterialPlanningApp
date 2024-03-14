/*
  Warnings:

  - You are about to drop the column `supplierConfirmationId` on the `PurchaseOrder` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[purchaseOrderId]` on the table `SupplierConfirmation` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `purchaseOrderId` to the `SupplierConfirmation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "PurchaseOrder" DROP CONSTRAINT "PurchaseOrder_supplierConfirmationId_fkey";

-- DropIndex
DROP INDEX "PurchaseOrder_supplierConfirmationId_key";

-- AlterTable
ALTER TABLE "PurchaseOrder" DROP COLUMN "supplierConfirmationId";

-- AlterTable
ALTER TABLE "SupplierConfirmation" ADD COLUMN     "purchaseOrderId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "SupplierConfirmation_purchaseOrderId_key" ON "SupplierConfirmation"("purchaseOrderId");

-- AddForeignKey
ALTER TABLE "SupplierConfirmation" ADD CONSTRAINT "SupplierConfirmation_purchaseOrderId_fkey" FOREIGN KEY ("purchaseOrderId") REFERENCES "PurchaseOrder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
