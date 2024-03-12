import { type CreateMaterial } from 'wasp/server/operations';

type CreateMaterialInput = {
  code: string;
  name: string;
  measurementUnit: string;
};

export const createMaterial: CreateMaterial<CreateMaterialInput, void> = async (args, context) => {
  const { code, name, measurementUnit } = args;
  const { Material } = context.entities;

  await Material.create({
    data: {
      code,
      name,
      count: 0,
      measurementUnit,
    },
  });
};
