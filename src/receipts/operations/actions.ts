import { type Receipt } from 'wasp/entities';
import { type CreateReceipt } from 'wasp/server/operations';

import { MaterialInput } from '../../materials/types/MaterialInput';

type CreateReceiptInput = {
  purchaseOrderId: number;
  materials: MaterialInput[];
};

export const createReceipt: CreateReceipt<CreateReceiptInput, void> = async (args, context) => {
  const { Receipt } = context.entities;
  const { purchaseOrderId, materials } = args;

  await Receipt.create({
    data: {
      purchaseOrder: {
        connect: {
          id: purchaseOrderId,
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
