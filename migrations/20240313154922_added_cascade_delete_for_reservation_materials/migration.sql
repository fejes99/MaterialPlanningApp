-- DropForeignKey
ALTER TABLE "ReservationMaterials" DROP CONSTRAINT "ReservationMaterials_reservationId_fkey";

-- AddForeignKey
ALTER TABLE "ReservationMaterials" ADD CONSTRAINT "ReservationMaterials_reservationId_fkey" FOREIGN KEY ("reservationId") REFERENCES "Reservation"("id") ON DELETE CASCADE ON UPDATE CASCADE;
