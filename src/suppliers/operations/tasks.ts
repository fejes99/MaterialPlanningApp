import { type Supplier, type PurchaseOrder, type SupplierConfirmation } from 'wasp/entities';
import { type Suppliers } from 'wasp/server/crud';

export const getSuppliers: Suppliers.GetAllQuery<
  void,
  (Supplier & {
    purchaseOrders: PurchaseOrder[];
    supplierConfirmations: SupplierConfirmation[];
  })[]
> = async (args, context) => {
  const { Supplier } = context.entities;

  return Supplier.findMany({
    include: {
      purchaseOrders: true,
      supplierConfirmations: true,
    },
  });
};
