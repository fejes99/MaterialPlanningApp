import { PrismaClient } from '@prisma/client';
import { createMaterial } from './materials/actions.js';
import { createProduct } from './products/actions.js';

import { materials } from './materials/seedData.js';
import { products } from './products/seedData.js';

export const materialSeed = async (prismaClient: PrismaClient) => {
  for (const material of materials) {
    await createMaterial(
      {
        code: material.code,
        name: material.name,
        measurementUnit: material.measurementUnit,
      },
      { entities: { Material: prismaClient.material } }
    );
  }
};

export const productSeed = async (prismaClient: PrismaClient) => {
  for (const product of products) {
    await createProduct(
      {
        code: product.code,
        name: product.name,
        description: product.description,
        materials: product.materials,
      },
      {
        entities: {
          Product: prismaClient.product,
          ProductMaterials: prismaClient.productMaterials,
          Material: prismaClient.material,
        },
      }
    );
  }
};
