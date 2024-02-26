import { ProductionPlan } from '@wasp/entities';
import { GetAllQuery } from '@wasp/crud/ProductionPlans';
import { ProductionPlanStatus } from '../../shared/productionPlan/types';

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


