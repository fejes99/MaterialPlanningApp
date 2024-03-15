import { type CreateSupplierConfirmation } from 'wasp/server/operations';
import { MaterialInput } from '../../materials/types/MaterialInput';

type CreateSupplierConfirmationInput = {
  deliveryDate: Date;
  supplierId: number;
  purchaseOrderId: number;
  materials: MaterialInput[];
};

export const createSupplierConfirmation: CreateSupplierConfirmation<
  CreateSupplierConfirmationInput,
  void
> = async (args, context) => {
  const { deliveryDate, supplierId, purchaseOrderId, materials } = args;
  const { SupplierConfirmation } = context.entities;

  await SupplierConfirmation.create({
    data: {
      deliveryDate,
      supplier: {
        connect: {
          id: supplierId,
        },
      },
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
