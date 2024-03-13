/*
  Warnings:

  - You are about to drop the column `measuremeasurementUnit` on the `ReservationMaterials` table. All the data in the column will be lost.
  - Added the required column `measurementUnit` to the `ReservationMaterials` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ReservationMaterials" DROP COLUMN "measuremeasurementUnit",
ADD COLUMN     "measurementUnit" TEXT NOT NULL;
