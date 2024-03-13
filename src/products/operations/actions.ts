import { type CreateProduct } from 'wasp/server/operations';
import { MaterialInput } from '../../materials/types/MaterialInput';

type CreateProductInput = {
  code: string;
  name: string;
  description: string;
  materials: MaterialInput[];
};

export const createProduct: CreateProduct<CreateProductInput, void> = async (args, context) => {
  const { Product } = context.entities;
  const { code, name, description, materials } = args;

  await Product.create({
    data: {
      code,
      name,
      description,
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
