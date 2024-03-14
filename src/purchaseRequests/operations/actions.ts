import { type CreatePurchaseRequest } from 'wasp/server/operations';
import { MaterialInput } from '../../materials/types/MaterialInput';
import { HttpError } from 'wasp/server';

type CreatePurchaseRequestInput = {
  materials: MaterialInput[];
};

export const createPurchaseRequest: CreatePurchaseRequest<
  CreatePurchaseRequestInput,
  void
> = async (args, context) => {
  if (!context.user) {
    throw new HttpError(403);
  }

  const { materials } = args;
  const { PurchaseRequest } = context.entities;

  await PurchaseRequest.create({
    data: {
      author: {
        connect: {
          id: context.user.id,
        },
      },
      status: 'Aktivan',
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
};
