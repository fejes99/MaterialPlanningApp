-- DropForeignKey
ALTER TABLE "ProductMaterials" DROP CONSTRAINT "ProductMaterials_productId_fkey";

-- DropForeignKey
ALTER TABLE "ProductionPlanProducts" DROP CONSTRAINT "ProductionPlanProducts_productionPlanId_fkey";

-- DropForeignKey
ALTER TABLE "PurchaseOrderMaterials" DROP CONSTRAINT "PurchaseOrderMaterials_purchaseOrderId_fkey";

-- DropForeignKey
ALTER TABLE "ReceiptMaterials" DROP CONSTRAINT "ReceiptMaterials_receiptId_fkey";

-- AddForeignKey
ALTER TABLE "ProductMaterials" ADD CONSTRAINT "ProductMaterials_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductionPlanProducts" ADD CONSTRAINT "ProductionPlanProducts_productionPlanId_fkey" FOREIGN KEY ("productionPlanId") REFERENCES "ProductionPlan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseOrderMaterials" ADD CONSTRAINT "PurchaseOrderMaterials_purchaseOrderId_fkey" FOREIGN KEY ("purchaseOrderId") REFERENCES "PurchaseOrder"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReceiptMaterials" ADD CONSTRAINT "ReceiptMaterials_receiptId_fkey" FOREIGN KEY ("receiptId") REFERENCES "Receipt"("id") ON DELETE CASCADE ON UPDATE CASCADE;
