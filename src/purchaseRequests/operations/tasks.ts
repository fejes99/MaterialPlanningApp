import {
  type PurchaseRequest,
  type Material,
  type User,
  type PurchaseRequestMaterials,
} from 'wasp/entities';
import { type PurchaseRequests } from 'wasp/server/crud';

export const getPurchaseRequests: PurchaseRequests.GetAllQuery<
  void,
  (PurchaseRequest & {
    author: User;
    processedBy: User | null;
    materials: (PurchaseRequestMaterials & { material: Material })[];
  })[]
> = async (args, context) => {
  const { PurchaseRequest } = context.entities;

  return PurchaseRequest.findMany({
    include: {
      author: true,
      processedBy: true,
      materials: {
        include: {
          material: true,
        },
      },
    },
    orderBy: {
      id: 'desc',
    },
  });
};
