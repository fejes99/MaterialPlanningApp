import { CreateProductionPlan } from '@wasp/actions/types';
import HttpError from '@wasp/core/HttpError.js';
import { ProductionPlanStatus } from '../../shared/productionPlan/types';
import { convertShortDate } from '../../shared/utils.js';

type ProductInput = {
  productId: number;
  productCount: number;
};

type CreateProductionPlanInput = {
  code: string;
  createdAt: Date;
  createdFor: Date;
  status: ProductionPlanStatus;
  products: ProductInput[];
};

export const createProductionPlan: CreateProductionPlan<CreateProductionPlanInput, void> = async (
  args,
  context
) => {
  const { ProductionPlan } = context.entities;
  const { code, createdAt, createdFor, status, products } = args;

  try {
    await ProductionPlan.create({
      data: {
        code,
        createdAt,
        createdFor,
        status,
        products: {
          create: products.map(({ productId, productCount }) => ({
            product: {
              connect: {
                id: productId,
              },
            },
            productCount,
          })),
        },
      },
    });
  } catch (e) {
    throw new HttpError(409, `Proizvodni plan za ${convertShortDate(createdFor)} postoji!`, {
      foo: 'bar',
    });
  }
};
