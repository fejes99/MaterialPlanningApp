import { Table } from 'flowbite-react';
import {
  type Supplier,
  type SupplierConfirmation,
  type Material,
  type PurchaseOrder,
  type SupplierConfirmationMaterials,
} from 'wasp/entities';
import { convertFullDate } from '../../common/helpers/formatDate';
import Dropdown from '../../common/components/ui/Dropdown/Dropdown';

interface Props {
  confirmations: (SupplierConfirmation & {
    supplier: Supplier;
    purchaseOrder: PurchaseOrder;
    materials: (SupplierConfirmationMaterials & { material: Material })[];
  })[];
}

const SupplierConfirmationTable: React.FC<Props> = ({ confirmations }) => {
  return (
    <div className='overflow-x-auto'>
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>Šifra</Table.HeadCell>
          <Table.HeadCell>Napravljeno dana</Table.HeadCell>
          <Table.HeadCell>Datum isporuke</Table.HeadCell>
          <Table.HeadCell>Porudžbina</Table.HeadCell>
          <Table.HeadCell>Dobavljač</Table.HeadCell>
          <Table.HeadCell>Materiali</Table.HeadCell>
        </Table.Head>
        <Table.Body className='divide-y'>
          {confirmations &&
            confirmations.map((confirmation) => {
              const materials: string[] = confirmation.materials.map(
                (confirmationMaterial) => confirmationMaterial.material.name
              );

              return (
                <Table.Row
                  key={confirmation.id}
                  className='bg-white dark:border-gray-700 dark:bg-gray-800'
                >
                  <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
                    {confirmation.id}
                  </Table.Cell>
                  <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
                    {convertFullDate(confirmation.createdAt)}
                  </Table.Cell>
                  <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
                    {convertFullDate(confirmation.deliveryDate)}
                  </Table.Cell>
                  <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
                    {confirmation.purchaseOrder.id}
                  </Table.Cell>
                  <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
                    {confirmation.supplier.name}
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

export default SupplierConfirmationTable;
