import { type ProductionPlan } from 'wasp/entities';
import { type GetActiveProductionPlans } from 'wasp/server/operations';

export const getActiveProductionPlans: GetActiveProductionPlans<void, ProductionPlan[]> = async (
  args,
  context
) => {
  const { ProductionPlan } = context.entities;

  const currentDate = new Date();

  return ProductionPlan.findMany({
    include: {
      products: {
        include: {
          product: {
            include: {
              materials: true,
            },
          },
        },
      },
    },
    where: {
      createdFor: {
        gt: currentDate,
      },
    },
  });
};
