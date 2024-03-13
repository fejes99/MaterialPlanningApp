import { type CreateMaterial, type UpdateMaterialCount } from 'wasp/server/operations';
import { type Material } from 'wasp/entities';
import { convertUnit } from '../helpers/convertUnit';
import { MaterialInput } from '../types/MaterialInput';

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

type UpdateMaterialCountInput = {
  material: MaterialInput;
  operation: 'reduce' | 'increase';
};

export const updateMaterialCount: UpdateMaterialCount<UpdateMaterialCountInput, void> = async (
  args,
  context
) => {
  const { Material } = context.entities;
  const {
    material: { materialId, materialCount, measurementUnit },
    operation,
  } = args;

  const currentMaterial: Material = await Material.findUniqueOrThrow({
    where: {
      id: materialId,
    },
  });

  const convertedCount = convertUnit(
    materialCount,
    measurementUnit,
    currentMaterial.measurementUnit
  );

  let updatedCount: number;
  if (operation === 'reduce') {
    updatedCount = currentMaterial.count - convertedCount;
  } else {
    updatedCount = currentMaterial.count + convertedCount;
  }

  await Material.update({
    where: {
      id: materialId,
    },
    data: {
      count: updatedCount,
    },
  });
};
