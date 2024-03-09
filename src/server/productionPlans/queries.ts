import { ProductionPlan } from '@wasp/entities';
import { GetActiveProductionPlans } from '@wasp/queries/types';

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
          product: true,
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
