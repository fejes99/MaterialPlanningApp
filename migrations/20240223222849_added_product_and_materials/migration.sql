/*
  Warnings:

  - Added the required column `measurementUnit` to the `ProductMaterials` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ProductMaterials" (
    "productId" INTEGER NOT NULL,
    "materialId" INTEGER NOT NULL,
    "materialCount" INTEGER NOT NULL,
    "measurementUnit" TEXT NOT NULL,

    PRIMARY KEY ("productId", "materialId"),
    CONSTRAINT "ProductMaterials_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ProductMaterials_materialId_fkey" FOREIGN KEY ("materialId") REFERENCES "Material" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ProductMaterials" ("materialCount", "materialId", "productId") SELECT "materialCount", "materialId", "productId" FROM "ProductMaterials";
DROP TABLE "ProductMaterials";
ALTER TABLE "new_ProductMaterials" RENAME TO "ProductMaterials";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
