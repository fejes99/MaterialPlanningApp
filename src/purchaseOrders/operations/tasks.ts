import {
  type PurchaseOrder,
  type User,
  type Supplier,
  type SupplierConfirmation,
  type PurchaseRequest,
  type Receipt,
  type PurchaseOrderMaterials,
  type Material,
} from 'wasp/entities';
import { type PurchaseOrders } from 'wasp/server/crud';

export const getPurchaseOrders: PurchaseOrders.GetAllQuery<
  void,
  (PurchaseOrder & {
    user: User;
    supplier: Supplier;
    supplierConfirmation: SupplierConfirmation | null;
    purchaseRequest: PurchaseRequest;
    receipt: Receipt | null;
    materials: (PurchaseOrderMaterials & { material: Material })[];
  })[]
> = async (args, context) => {
  const { PurchaseOrder } = context.entities;

  return PurchaseOrder.findMany({
    include: {
      user: true,
      supplier: true,
      supplierConfirmation: true,
      purchaseRequest: true,
      receipt: true,
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
