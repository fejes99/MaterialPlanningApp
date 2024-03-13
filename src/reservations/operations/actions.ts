import { type CreateReservation } from 'wasp/server/operations';
import { HttpError } from 'wasp/server';
import { MaterialInput } from '../../materials/types/MaterialInput';

type CreateReservationInput = {
  createdFor: Date;
  productionPlanId: number;
  materials: MaterialInput[];
};

export const createReservation: CreateReservation<CreateReservationInput, void> = async (
  args,
  context
) => {
  if (!context.user) {
    throw new HttpError(403);
  }

  const { Reservation } = context.entities;
  const { createdFor, productionPlanId, materials } = args;

  try {
    await Reservation.create({
      data: {
        user: {
          connect: {
            id: context.user.id,
          },
        },
        createdFor,
        status: 'Aktivan',
        productionPlan: {
          connect: {
            id: productionPlanId,
          },
        },
        materials: {
          create: materials.map(({ materialId, materialCount, measurementUnit }) => ({
            material: {
              connect: {
                id: materialId,
              },
            },
            materialCount,
            measurementUnit,
          })),
        },
      },
    });
  } catch (e: any) {
    throw new Error(e.message);
  }
};
