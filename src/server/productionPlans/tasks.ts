import { ProductionPlan } from '@wasp/entities';
import { GetAllQuery } from '@wasp/crud/ProductionPlans';

export const getProductionPlans: GetAllQuery<void, ProductionPlan[]> = async (args, context) => {
  const { ProductionPlan } = context.entities;

  return ProductionPlan.findMany({
    include: {
      products: {
        include: {
          product: true,
        },
      },
    },
  });
};
