import { type Material } from 'wasp/entities';
import { type Materials } from 'wasp/server/crud';

export const getMaterials: Materials.GetAllQuery<void, Material[]> = async (args, context) => {
  const { Material } = context.entities;

  return await Material.findMany({
    include: {
      products: {
        include: {
          product: true,
        },
      },
    },
  });
};

type UpdateMaterialInput = {
  id: number;
  count: number;
  measurementUnit: string;
};

export const updateMaterial: Materials.UpdateAction<UpdateMaterialInput, void> = async (
  args,
  context
) => {
  const { id, count, measurementUnit } = args;
  const { Material } = context.entities;

  await Material.update({
    where: { id },
    data: {
      count,
      measurementUnit,
    },
  });
};
