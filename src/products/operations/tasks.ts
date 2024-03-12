import { type Product } from 'wasp/entities';
import { type Products } from 'wasp/server/crud';

export const getProducts: Products.GetAllQuery<void, Product[]> = async (args, context) => {
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

export const updateProduct: Products.UpdateAction<UpdateProductInput, Product> = (
  args,
  context
) => {
  const { Product } = context.entities;
  const { id, description } = args;

  return Product.update({
    where: { id },
    data: {
      description,
    },
  });
};
