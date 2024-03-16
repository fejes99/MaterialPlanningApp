-- CreateTable
CREATE TABLE "Receipt" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "purchaseOrderId" INTEGER NOT NULL,

    CONSTRAINT "Receipt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReceiptMaterials" (
    "receiptId" INTEGER NOT NULL,
    "materialId" INTEGER NOT NULL,
    "materialCount" DOUBLE PRECISION NOT NULL,
    "measurementUnit" TEXT NOT NULL,

    CONSTRAINT "ReceiptMaterials_pkey" PRIMARY KEY ("receiptId","materialId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Receipt_purchaseOrderId_key" ON "Receipt"("purchaseOrderId");

-- AddForeignKey
ALTER TABLE "Receipt" ADD CONSTRAINT "Receipt_purchaseOrderId_fkey" FOREIGN KEY ("purchaseOrderId") REFERENCES "PurchaseOrder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReceiptMaterials" ADD CONSTRAINT "ReceiptMaterials_receiptId_fkey" FOREIGN KEY ("receiptId") REFERENCES "Receipt"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReceiptMaterials" ADD CONSTRAINT "ReceiptMaterials_materialId_fkey" FOREIGN KEY ("materialId") REFERENCES "Material"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
