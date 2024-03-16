import { HttpError } from 'wasp/server';
import {
  type CreatePurchaseRequest,
  type UpdatePurchaseRequestProcessingDate,
  type UpdatePurchaseRequestDeliveryDate,
} from 'wasp/server/operations';
import { MaterialInput } from '../../materials/types/MaterialInput';

type CreatePurchaseRequestInput = {
  materials: MaterialInput[];
};

export const createPurchaseRequest: CreatePurchaseRequest<
  CreatePurchaseRequestInput,
  void
> = async (args, context) => {
  if (!context.user) {
    throw new HttpError(403);
  }

  const { materials } = args;
  const { PurchaseRequest } = context.entities;

  await PurchaseRequest.create({
    data: {
      author: {
        connect: {
          id: context.user.id,
        },
      },
      status: 'Aktivan',
      materials: {
        create: materials.map(({ materialId, materialCount, measurementUnit }) => ({
          material: {
            connect: {
              id: materialId,
            },
          },
          materialCount,
          measurementUnit,
        })),
      },
    },
  });
};

type UpdatePurchaseRequestProcessingDateInput = {
  id: number;
};

export const updatePurchaseRequestProcessingDate: UpdatePurchaseRequestProcessingDate<
  UpdatePurchaseRequestProcessingDateInput,
  void
> = async (args, context) => {
  if (!context.user) {
    throw new HttpError(403);
  }
  const { id } = args;
  const { PurchaseRequest } = context.entities;

  const processingDate = new Date().toISOString();

  await PurchaseRequest.update({
    where: {
      id,
    },
    data: {
      processingDate,
    },
  });
};

type UpdatePurchaseRequestDeliveryDateInput = {
  id: number;
  deliveryDate: Date;
};

export const updatePurchaseRequestDeliveryDate: UpdatePurchaseRequestDeliveryDate<
  UpdatePurchaseRequestDeliveryDateInput,
  void
> = async (args, context) => {
  if (!context.user) {
    throw new HttpError(403);
  }

  const { id, deliveryDate } = args;
  const { PurchaseRequest } = context.entities;

  await PurchaseRequest.update({
    where: {
      id,
    },
    data: {
      processedBy: {
        connect: {
          id: context.user.id,
        },
      },
      deliveryDate,
    },
  });
};
