import { CreateReservation } from '@wasp/actions/types';
import HttpError from '@wasp/core/HttpError.js';

type CreateReservationInput = {
  createdAt: Date;
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
  const { createdAt, createdFor, status, productionPlanId } = args;

  try {
    await Reservation.create({
      data: {
        user: {
          connect: {
            id: context.user.id,
          },
        },
        createdAt,
        createdFor,
        status,
        productionPlan: {
          connect: {
            id: productionPlanId,
          },
        },
      },
    });
  } catch (e) {
    throw new Error(e.message);
  }
};
