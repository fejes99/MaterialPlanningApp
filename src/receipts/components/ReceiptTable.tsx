import { Table } from 'flowbite-react';
import {
  type Material,
  type PurchaseOrder,
  type Supplier,
  type ReceiptMaterials,
  type Receipt,
} from 'wasp/entities';
import { convertFullDate } from '../../common/helpers/formatDate';
import Dropdown from '../../common/components/ui/Dropdown/Dropdown';

interface Props {
  receipts: (Receipt & {
    purchaseOrder: PurchaseOrder & {
      supplier: Supplier;
    };
    materials: (ReceiptMaterials & { material: Material })[];
  })[];
}

const ReceiptTable: React.FC<Props> = ({ receipts }) => {
  return (
    <div className='overflow-x-auto h-full'>
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>Šifra</Table.HeadCell>
          <Table.HeadCell>Napravljeno</Table.HeadCell>
          <Table.HeadCell>Porudžbina</Table.HeadCell>
          <Table.HeadCell>Dobavljač</Table.HeadCell>
          <Table.HeadCell>Materijali</Table.HeadCell>
        </Table.Head>
        <Table.Body className='divide-y'>
          {receipts &&
            receipts.map((receipt) => {
              const { supplier } = receipt.purchaseOrder;
              const materials: string[] = receipt.materials.map(
                (receiptMaterial) =>
                  `${receiptMaterial.material.name} (${receiptMaterial.materialCount} ${receiptMaterial.measurementUnit})`
              );

              return (
                <Table.Row
                  key={receipt.id}
                  className='bg-white dark:border-gray-700 dark:bg-gray-800 '
                >
                  <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
                    {receipt.id}
                  </Table.Cell>
                  <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
                    {convertFullDate(receipt.createdAt)}
                  </Table.Cell>
                  <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
                    {receipt.purchaseOrderId}
                  </Table.Cell>
                  <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
                    {supplier.name}
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

export default ReceiptTable;
