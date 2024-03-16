import { PrismaClient } from '@prisma/client';
import { createMaterial } from './materials/operations/actions.js';
import { createProduct } from './products/operations/actions.js';
import { createSupplier } from './suppliers/operations/actions.js';

import { materials } from './materials/seedData.js';
import { products } from './products/seedData.js';
import { suppliers } from './suppliers/seedData.js';

export const materialSeed = async (prismaClient: PrismaClient) => {
  for (const { code, name, count, measurementUnit } of materials) {
    await createMaterial(
      {
        code,
        name,
        count,
        measurementUnit,
      },
      { entities: { Material: prismaClient.material } }
    );
  }
};

export const productSeed = async (prismaClient: PrismaClient) => {
  for (const { code, name, description, materials } of products) {
    await createProduct(
      {
        code,
        name,
        description,
        materials,
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

export const supplierSeed = async (prismaClient: PrismaClient) => {
  for (const { name, address } of suppliers) {
    await createSupplier(
      {
        name,
        address,
      },
      { entities: { Supplier: prismaClient.supplier } }
    );
  }
};
