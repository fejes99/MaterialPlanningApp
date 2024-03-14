import { Table } from 'flowbite-react';
import { type Supplier } from 'wasp/entities';

interface Props {
  suppliers: Supplier[];
}

const SupplierTable: React.FC<Props> = ({ suppliers }) => {
  return (
    <div className='overflow-x-auto'>
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>Naziv</Table.HeadCell>
          <Table.HeadCell>Adresa</Table.HeadCell>
        </Table.Head>
        <Table.Body className='divide-y'>
          {suppliers &&
            suppliers.map((supplier) => {
              return (
                <Table.Row>
                  <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
                    {supplier.name}
                  </Table.Cell>
                  <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
                    {supplier.address}
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
