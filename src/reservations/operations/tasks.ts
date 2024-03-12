import { type Reservation } from 'wasp/entities';
import { type Reservations } from 'wasp/server/crud';

export const getReservations: Reservations.GetAllQuery<void, Reservation[]> = async (
  args,
  context
) => {
  const { Reservation } = context.entities;

  return Reservation.findMany({
    include: {
      user: true,
      productionPlan: true,
    },
  });
};
