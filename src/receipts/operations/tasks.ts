import {
  type Receipt,
  type PurchaseOrder,
  type Supplier,
  type ReceiptMaterials,
  type Material,
} from 'wasp/entities';
import { type Receipts } from 'wasp/server/crud';

export const getReceipts: Receipts.GetAllQuery<
  void,
  (Receipt & {
    purchaseOrder: PurchaseOrder & {
      supplier: Supplier;
    };
    materials: (ReceiptMaterials & { material: Material })[];
  })[]
> = async (args, context) => {
  const { Receipt } = context.entities;

  return await Receipt.findMany({
    include: {
      purchaseOrder: {
        include: {
          supplier: true,
        },
      },
      materials: {
        include: {
          material: true,
        },
      },
    },
  });
};
