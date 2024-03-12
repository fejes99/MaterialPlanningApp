import { type CreateReservation } from 'wasp/server/operations';
import { HttpError } from 'wasp/server';

type CreateReservationInput = {
  createdFor: Date;
  status: string;
  productionPlanId: number;
};

export const createReservation: CreateReservation<CreateReservationInput, void> = async (
  args,
  context
) => {
  if (!context.user) {
    throw new HttpError(403);
  }

  const { Reservation } = context.entities;
  const { createdFor, status, productionPlanId } = args;

  try {
    await Reservation.create({
      data: {
        user: {
          connect: {
            id: context.user.id,
          },
        },
        createdFor,
        status,
        productionPlan: {
          connect: {
            id: productionPlanId,
          },
        },
      },
    });
  } catch (e: any) {
    throw new Error(e.message);
  }
};
