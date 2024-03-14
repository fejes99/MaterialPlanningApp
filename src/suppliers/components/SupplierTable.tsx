import { Table } from 'flowbite-react';
import { type Supplier, type PurchaseOrder, type SupplierConfirmation } from 'wasp/entities';
import { convertFullDate } from '../../common/helpers/formatDate';
import Dropdown from '../../common/components/ui/Dropdown/Dropdown';

interface Props {
  suppliers: (Supplier & {
    purchaseOrders: PurchaseOrder[];
    supplierConfirmations: SupplierConfirmation[];
  })[];
}

const SupplierTable: React.FC<Props> = ({ suppliers }) => {
  return (
    <div className='overflow-x-auto'>
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>Naziv</Table.HeadCell>
          <Table.HeadCell>Adresa</Table.HeadCell>
          <Table.HeadCell>Porudžbenice</Table.HeadCell>
          <Table.HeadCell>Potvrde</Table.HeadCell>
        </Table.Head>
        <Table.Body className='divide-y'>
          {suppliers &&
            suppliers.map((supplier) => {
              const purchaseOrders: string[] = supplier.purchaseOrders.map(
                (purchaseOrder) =>
                  `(${purchaseOrder.id}) ${convertFullDate(purchaseOrder.createdAt)}`
              );
              const supplierConfirmations: string[] = supplier.supplierConfirmations.map(
                (confirmation) => `(${confirmation.id}) ${convertFullDate(confirmation.createdAt)}`
              );

              return (
                <Table.Row>
                  <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
                    {supplier.name}
                  </Table.Cell>
                  <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
                    {supplier.address}
                  </Table.Cell>
                  <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
                    <Dropdown label='Porudžbenice' values={purchaseOrders} />
                  </Table.Cell>
                  <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
                    <Dropdown label='Potvrde' values={supplierConfirmations} />
                  </Table.Cell>
                </Table.Row>
              );
            })}
        </Table.Body>
      </Table>
    </div>
  );
};

export default SupplierTable;
