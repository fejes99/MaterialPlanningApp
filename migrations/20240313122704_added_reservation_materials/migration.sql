-- CreateTable
CREATE TABLE "ReservationMaterials" (
    "reservationId" INTEGER NOT NULL,
    "materialId" INTEGER NOT NULL,
    "materialCount" DOUBLE PRECISION NOT NULL,
    "measuremeasurementUnit" TEXT NOT NULL,

    CONSTRAINT "ReservationMaterials_pkey" PRIMARY KEY ("reservationId","materialId")
);

-- AddForeignKey
ALTER TABLE "ReservationMaterials" ADD CONSTRAINT "ReservationMaterials_reservationId_fkey" FOREIGN KEY ("reservationId") REFERENCES "Reservation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReservationMaterials" ADD CONSTRAINT "ReservationMaterials_materialId_fkey" FOREIGN KEY ("materialId") REFERENCES "Material"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
