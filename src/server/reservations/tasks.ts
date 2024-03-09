import { Reservation } from '@wasp/entities';
import { GetAllQuery } from '@wasp/crud/Reservations';

export const getReservations: GetAllQuery<void, Reservation[]> = async (args, context) => {
  const { Reservation } = context.entities;

  return Reservation.findMany({
    include: {
      user: true,
      productionPlan: true,
    },
  });
};
