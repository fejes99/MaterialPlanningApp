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

// type CreateMaterialInput = {
//   code: string;
//   name: string;
//   measurementUnit: string;
// };

// export const createMaterial: CreateAction<CreateMaterialInput, Material> = async (
//   args,
//   context
// ) => {
//   const { code, name, measurementUnit } = args;
//   const { Material } = context.entities;

//   return await Material.create({
//     data: {
//       code,
//       name,
//       count: 0,
//       measurementUnit,
//     },
//   });
// };

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
