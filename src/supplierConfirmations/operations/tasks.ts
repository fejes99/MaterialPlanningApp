import {
  type Supplier,
  type SupplierConfirmation,
  type Material,
  type PurchaseOrder,
  type SupplierConfirmationMaterials,
} from 'wasp/entities';
import { type SupplierConfirmations } from 'wasp/server/crud';

export const getSupplierConfirmations: SupplierConfirmations.GetAllQuery<
  void,
  (SupplierConfirmation & {
    supplier: Supplier;
    purchaseOrder: PurchaseOrder;
    materials: (SupplierConfirmationMaterials & { material: Material })[];
  })[]
> = (args, context) => {
  const { SupplierConfirmation } = context.entities;

  return SupplierConfirmation.findMany({
    include: {
      supplier: true,
      purchaseOrder: true,
      materials: {
        include: {
          material: true,
        },
      },
    },
    orderBy: {
      id: 'desc',
    },
  });
};
