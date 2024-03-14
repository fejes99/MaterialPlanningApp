-- CreateTable
CREATE TABLE "SupplierConfirmationMaterials" (
    "supplierConfirmationId" INTEGER NOT NULL,
    "materialId" INTEGER NOT NULL,
    "materialCount" DOUBLE PRECISION NOT NULL,
    "measurementUnit" TEXT NOT NULL,

    CONSTRAINT "SupplierConfirmationMaterials_pkey" PRIMARY KEY ("supplierConfirmationId","materialId")
);

-- AddForeignKey
ALTER TABLE "SupplierConfirmationMaterials" ADD CONSTRAINT "SupplierConfirmationMaterials_supplierConfirmationId_fkey" FOREIGN KEY ("supplierConfirmationId") REFERENCES "SupplierConfirmation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SupplierConfirmationMaterials" ADD CONSTRAINT "SupplierConfirmationMaterials_materialId_fkey" FOREIGN KEY ("materialId") REFERENCES "Material"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
