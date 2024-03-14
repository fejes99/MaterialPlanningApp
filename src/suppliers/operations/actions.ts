import { type CreateSupplier } from 'wasp/server/operations';

type CreateSupplierInput = {
  name: string;
  address: string;
};

export const createSupplier: CreateSupplier<CreateSupplierInput, void> = async (args, context) => {
  const { name, address } = args;
  const { Supplier } = context.entities;

  await Supplier.create({
    data: {
      name,
      address,
    },
  });
};
