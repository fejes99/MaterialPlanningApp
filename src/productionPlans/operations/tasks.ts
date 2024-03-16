import { type ProductionPlan, type ProductionPlanProducts, type Product } from 'wasp/entities';
import { type ProductionPlans } from 'wasp/server/crud';

export const getProductionPlans: ProductionPlans.GetAllQuery<
  void,
  (ProductionPlan & { products: (ProductionPlanProducts & { product: Product })[] })[]
> = async (args, context) => {
  const { ProductionPlan } = context.entities;

  return ProductionPlan.findMany({
    include: {
      products: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdFor: 'asc',
    },
  });
};
