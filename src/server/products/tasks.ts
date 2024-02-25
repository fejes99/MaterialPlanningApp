import { GetAllQuery, CreateAction, UpdateAction } from '@wasp/crud/Products';
import { Material, Product } from '@wasp/entities';

export const getProducts: GetAllQuery<void, Product[]> = async (args, context) => {
  const { Product } = context.entities;

  return Product.findMany({
    include: {
      productMaterials: {
        include: {
          material: true,
        },
      },
    },
  });
};

type CreateProductInput = {
  code: string;
  name: string;
  description: string;
  materials: Material[];
};

export const createProduct: CreateAction<CreateProductInput, Product> = async (args, context) => {
  const { code, name, descprition, materials } = args;
  const { Product } = context.entities;

  return await Product.create({
    data: {
      code,
      name,
      descprition,
      productMaterials: {
        create: materials.map((material: Material) => ({
          materialCount: 100,
          materialUnit: 'g',
          material: {
            connect: {
              id: material.id,
            },
          },
        })),
      },
    },
  });
};

type UpdateProductInput = { id: number; descprition: string };

export const updateProduct: UpdateAction<UpdateProductInput, Product> = (args, context) => {
  const { id, descprition } = args;
  const { Product } = context.entities;

  return Product.update({
    where: { id },
    data: {
      descprition,
    },
  });
};
