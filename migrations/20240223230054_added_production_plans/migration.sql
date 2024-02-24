-- CreateTable
CREATE TABLE "ProductionPlan" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "code" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdFor" DATETIME NOT NULL,
    "status" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "ProductionPlanProducts" (
    "productionPlanId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "productCount" INTEGER NOT NULL,

    PRIMARY KEY ("productionPlanId", "productId"),
    CONSTRAINT "ProductionPlanProducts_productionPlanId_fkey" FOREIGN KEY ("productionPlanId") REFERENCES "ProductionPlan" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ProductionPlanProducts_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "ProductionPlan_code_key" ON "ProductionPlan"("code");
