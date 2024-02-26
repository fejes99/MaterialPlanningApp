import { Material, Product } from '@wasp/entities';
import { GetAllQuery,  UpdateAction } from '@wasp/crud/Products';

export const getProducts: GetAllQuery<void, Product[]> = async (args, context) => {
  const { Product } = context.entities;

  return Product.findMany({
    include: {
      materials: {
        include: {
          material: true,
        },
      },
    },
  });
};

type UpdateProductInput = { id: number; description: string };

export const updateProduct: UpdateAction<UpdateProductInput, Product> = (args, context) => {
  const { Product } = context.entities;
  const { id, description } = args;

  return Product.update({
    where: { id },
    data: {
      description,
    },
  });
};
