import { Table } from 'flowbite-react';
import { Link } from 'wasp/client/router';
import {
  type PurchaseRequest,
  type Material,
  type User,
  PurchaseRequestMaterials,
} from 'wasp/entities';
import { useAuth } from 'wasp/client/auth';
import { PurchaseRequests } from 'wasp/client/crud';
import { convertFullDate, convertShortDate } from '../../common/helpers/formatDate';
import DeleteModal from '../../common/components/ui/modals/DeleteModal';
import Dropdown from '../../common/components/ui/Dropdown/Dropdown';
import { isBuyer } from '../../user/helpers/isBuyer';
import { HiOutlineDocumentPlus } from 'react-icons/hi2';

interface Props {
  purchaseRequests: (PurchaseRequest & {
    author: User;
    processedBy: User | null;
    materials: (PurchaseRequestMaterials & { material: Material })[];
  })[];
}

const PurchaseRequestTable: React.FC<Props> = ({ purchaseRequests }) => {
  const { data: user } = useAuth();

  const deletePurchaseRequest = PurchaseRequests.delete.useAction();

  const handleDelete = (id: number) => deletePurchaseRequest({ id });

  return (
    <div className='overflow-x-auto'>
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>Napravljeno</Table.HeadCell>
          <Table.HeadCell>Status</Table.HeadCell>
          <Table.HeadCell>Napravio</Table.HeadCell>
          <Table.HeadCell>Obradio</Table.HeadCell>
          <Table.HeadCell>Obrađeno</Table.HeadCell>
          <Table.HeadCell>Isporučeno</Table.HeadCell>
          <Table.HeadCell>Primljeno</Table.HeadCell>
          <Table.HeadCell>Materijali</Table.HeadCell>
          <Table.HeadCell>Akcije</Table.HeadCell>
        </Table.Head>
        <Table.Body className='divide-y'>
          {purchaseRequests &&
            purchaseRequests.map((purchaseRequest) => {
              const materials: string[] = purchaseRequest.materials.map(
                (purchaseRequestMaterial) =>
                  `${purchaseRequestMaterial.material.name} (${purchaseRequestMaterial.materialCount} ${purchaseRequestMaterial.measurementUnit})`
              );

              return (
                <Table.Row
                  key={purchaseRequest.id}
                  className='bg-white dark:border-gray-700 dark:bg-gray-800'
                >
                  <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
                    {convertFullDate(purchaseRequest.createdAt)}
                  </Table.Cell>
                  <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
                    {purchaseRequest.status}
                  </Table.Cell>
                  <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
                    {purchaseRequest.author.name + ' ' + purchaseRequest.author.surrname}
                  </Table.Cell>
                  <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
                    {purchaseRequest.processedBy
                      ? purchaseRequest.processedBy.name +
                        ' ' +
                        purchaseRequest.processedBy.surrname
                      : '/'}
                  </Table.Cell>
                  <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
                    {purchaseRequest.processingDate
                      ? convertFullDate(purchaseRequest.processingDate)
                      : '/'}
                  </Table.Cell>
                  <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
                    {purchaseRequest.deliveryDate
                      ? convertFullDate(purchaseRequest.deliveryDate)
                      : '/'}
                  </Table.Cell>
                  <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
                    {purchaseRequest.receiptDate
                      ? convertFullDate(purchaseRequest.receiptDate)
                      : '/'}
                  </Table.Cell>
                  <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
                    <Dropdown label='Materijali' values={materials} />
                  </Table.Cell>

                  <Table.Cell className='flex justify-around'>
                    {isBuyer(user) && (
                      <Link to='/purchase-orders'>
                        <HiOutlineDocumentPlus
                          className='cursor-pointer'
                          size={24}
                          color='forestgreen'
                        />
                      </Link>
                    )}
                    <DeleteModal
                      label={'rezervaciju: ' + convertFullDate(purchaseRequest.createdAt)}
                      onDelete={() => handleDelete(purchaseRequest.id)}
                    />
                  </Table.Cell>
                </Table.Row>
              );
            })}
        </Table.Body>
      </Table>
    </div>
  );
};

export default PurchaseRequestTable;
