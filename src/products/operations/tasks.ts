import { type Product, type Material, type ProductMaterials } from 'wasp/entities';
import { type Products } from 'wasp/server/crud';

export const getProducts: Products.GetAllQuery<
  void,
  (Product & { materials: (ProductMaterials & { material: Material })[] })[]
> = async (args, context) => {
  const { Product } = context.entities;

  return Product.findMany({
    include: {
      materials: {
        include: {
          material: true,
        },
      },
    },
    orderBy: {
      code: 'asc',
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
