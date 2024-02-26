import { ProductionPlan } from '@wasp/entities';
import { CreateProductionPlan } from '@wasp/actions/types';
import { ProductionPlanStatus } from '../../shared/productionPlan/types';

type CreateProductionPlanInput = {
  code: string;
  createdAt: Date;
  createdFor: Date;
  status: ProductionPlanStatus;
};

export const createProductionPlan: CreateProductionPlan<
  CreateProductionPlanInput,
  ProductionPlan
> = async (args, context) => {
  const { ProductionPlan } = context.entities;
  const { code, createdAt, createdFor, status } = args;

  return await ProductionPlan.create({
    data: {
      code,
      createdAt,
      createdFor,
      status,
    },
  });
};
