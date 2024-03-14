import { type Supplier } from 'wasp/entities';
import { type Suppliers } from 'wasp/server/crud';

export const getSuppliers: Suppliers.GetAllQuery<void, Supplier[]> = async (args, context) => {
  const { Supplier } = context.entities;

  return Supplier.findMany({});
};
