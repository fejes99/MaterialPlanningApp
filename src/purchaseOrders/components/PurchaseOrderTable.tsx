import { Table } from 'flowbite-react';
import {
  type PurchaseOrder,
  type User,
  type Supplier,
  type SupplierConfirmation,
  type PurchaseRequest,
  type Receipt,
  type PurchaseOrderMaterials,
  type Material,
} from 'wasp/entities';
import { convertFullDate } from '../../common/helpers/formatDate';
import Dropdown from '../../common/components/ui/Dropdown/Dropdown';

interface Props {
  purchaseOrders: (PurchaseOrder & {
    user: User;
    supplier: Supplier;
    supplierConfirmation: SupplierConfirmation | null;
    purchaseRequest: PurchaseRequest;
    receipt: Receipt | null;
    materials: (PurchaseOrderMaterials & { material: Material })[];
  })[];
}

const PurchaseOrderTable: React.FC<Props> = ({ purchaseOrders }) => {
  return (
    <div className='overflow-x-auto h-full'>
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>Šifra</Table.HeadCell>
          <Table.HeadCell>Napravljeno</Table.HeadCell>
          <Table.HeadCell>Napravio</Table.HeadCell>
          <Table.HeadCell>Dobavljač</Table.HeadCell>
          <Table.HeadCell>Šifra zahteva</Table.HeadCell>
          <Table.HeadCell>Potvrda</Table.HeadCell>
          <Table.HeadCell>Materijali</Table.HeadCell>
        </Table.Head>
        <Table.Body className='divide-y'>
          {purchaseOrders &&
            purchaseOrders.map((purchaseOrder) => {
              const materials: string[] = purchaseOrder.materials.map(
                (purchaseOrderMaterial) => purchaseOrderMaterial.material.name
              );

              return (
                <Table.Row
                  key={purchaseOrder.id}
                  className='bg-white dark:border-gray-700 dark:bg-gray-800'
                >
                  <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
                    {purchaseOrder.id}
                  </Table.Cell>
                  <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
                    {convertFullDate(purchaseOrder.createdAt)}
                  </Table.Cell>
                  <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
                    {purchaseOrder.user.name + ' ' + purchaseOrder.user.surrname}
                  </Table.Cell>
                  <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
                    {purchaseOrder.supplier.name}
                  </Table.Cell>
                  <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
                    {purchaseOrder.purchaseRequest.id}
                  </Table.Cell>
                  <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
                    {purchaseOrder.supplierConfirmation
                      ? convertFullDate(purchaseOrder.supplierConfirmation.createdAt)
                      : '/'}
                  </Table.Cell>
                  <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
                    <Dropdown label='Materijali' values={materials} />
                  </Table.Cell>
                </Table.Row>
              );
            })}
        </Table.Body>
      </Table>
    </div>
  );
};

export default PurchaseOrderTable;
