import { type CreateMaterial } from 'wasp/server/operations';

type CreateMaterialInput = {
  code: string;
  name: string;
  count?: number;
  measurementUnit: string;
};

export const createMaterial: CreateMaterial<CreateMaterialInput, void> = async (args, context) => {
  const { code, count, name, measurementUnit } = args;
  const { Material } = context.entities;

  await Material.create({
    data: {
      code,
      name,
      count: count ? count : 0,
      measurementUnit,
    },
  });
};
