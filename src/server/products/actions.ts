import {  Product } from '@wasp/entities';
import { CreateProduct } from '@wasp/actions/types';

type MaterialInput = {
  materialId: number;
  materialCount: number;
  measurementUnit: string;
};

type CreateProductInput = {
  code: string;
  name: string;
  description: string;
  materials: MaterialInput[];
};

export const createProduct: CreateProduct<CreateProductInput, Product> = async (args, context) => {
  const { Product } = context.entities;
  const { code, name, description, materials } = args;

  return await Product.create({
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
