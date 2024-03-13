import {
  type Reservation,
  type ReservationMaterials,
  type Material,
  type User,
  type ProductionPlan,
} from 'wasp/entities';
import { type Reservations } from 'wasp/server/crud';

export const getReservations: Reservations.GetAllQuery<
  void,
  (Reservation & {
    materials: (ReservationMaterials & { material: Material })[];
    user: User | null;
    productionPlan: ProductionPlan;
  })[]
> = async (args, context) => {
  const { Reservation } = context.entities;

  return Reservation.findMany({
    include: {
      user: true,
      productionPlan: true,
      materials: {
        include: {
          material: true,
        },
      },
    },
  });
};
