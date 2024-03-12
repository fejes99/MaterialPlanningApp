import { type ProductionPlan } from 'wasp/entities';
import { type ProductionPlans } from 'wasp/server/crud';

export const getProductionPlans: ProductionPlans.GetAllQuery<void, ProductionPlan[]> = async (
  args,
  context
) => {
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
