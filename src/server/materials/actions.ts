import { Material } from '@wasp/entities';
import { CreateMaterial } from '@wasp/actions/types';

type CreateMaterialInput = {
  code: string;
  name: string;
  measurementUnit: string;
};

export const createMaterial: CreateMaterial<CreateMaterialInput, Material> = async (
  args,
  context
) => {
  const { code, name, measurementUnit } = args;
  const { Material } = context.entities;

  return await Material.create({
    data: {
      code,
      name,
      count: 0,
      measurementUnit,
    },
  });
};
