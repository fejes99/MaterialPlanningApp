import { GetAllQuery } from '@wasp/crud/Materials';
import { Material } from '@wasp/entities';

export const getMaterials: GetAllQuery<void, Material[]> = async (args, context) => {
  const { Material } = context.entities;

  return Material.findMany({
    include: {
      products: {
        include: {
          product: true,
        },
      },
    },
  });
};
