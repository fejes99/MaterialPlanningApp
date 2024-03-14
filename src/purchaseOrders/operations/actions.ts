import { HttpError } from 'wasp/server';
import { type CreatePurchaseOrder } from 'wasp/server/operations';
import { MaterialInput } from './../../materials/types/MaterialInput';

type CreatePurchaseOrderInput = {
  supplierId: number;
  purchaseRequestId: number;
  materials: MaterialInput[];
};

export const createPurchaseOrder: CreatePurchaseOrder<CreatePurchaseOrderInput, void> = async (
  args,
  context
) => {
  if (!context.user) {
    throw new HttpError(403);
  }

  const { PurchaseOrder } = context.entities;
  const { supplierId, purchaseRequestId, materials } = args;

  await PurchaseOrder.create({
    data: {
      user: {
        connect: {
          id: context.user.id,
        },
      },
      supplier: {
        connect: {
          id: supplierId,
        },
      },
      purchaseRequest: {
        connect: {
          id: purchaseRequestId,
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
};
