import { GetAllQuery, UpdateAction } from '@wasp/crud/Materials';
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

export const updateMaterial: UpdateAction<UpdateMaterialInput, Material> = async (
  args,
  context
) => {
  const { id, count, measurementUnit } = args;
  const { Material } = context.entities;

  return Material.update({
    where: { id },
    data: {
      count,
      measurementUnit,
    },
  });
};
