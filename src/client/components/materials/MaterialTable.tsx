import React from 'react';
import { Material } from '@wasp/entities';
import { Checkbox, Table } from 'flowbite-react';
import Dropdown from '../ui/Dropdown/Dropdown';

type Props = {
  materials: Material[];
};

const MaterialTable: React.FC<Props> = ({ materials }) => {
  if (!materials?.length) return <div>No materials</div>;

  return (
    <div className='overflow-x-auto'>
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell className='p-4'>
            <Checkbox />
          </Table.HeadCell>
          <Table.HeadCell>Kod</Table.HeadCell>
          <Table.HeadCell>Naziv</Table.HeadCell>
          <Table.HeadCell>Količina</Table.HeadCell>
          <Table.HeadCell>Merna jedinica</Table.HeadCell>
          <Table.HeadCell>Proizvodi</Table.HeadCell>
          <Table.HeadCell>Akcije</Table.HeadCell>
        </Table.Head>
        <Table.Body className='divide-y'>
          {materials.map((material) => {
            const products: string[] = material.products.map((product) => product.product.name);

            return (
              <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                <Table.Cell className='p-4'>
                  <Checkbox />
                </Table.Cell>
                <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
                  {material.code}
                </Table.Cell>
                <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
                  {material.name}
                </Table.Cell>
                <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
                  {material.count}
                </Table.Cell>
                <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
                  {material.measurementUnit}
                </Table.Cell>
                <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
                  <Dropdown label='Proizvodi' values={products} />
                </Table.Cell>
                <Table.Cell>
                  <a
                    href='#'
                    className='font-medium text-cyan-600 hover:underline dark:text-cyan-500'
                  >
                    Edit
                  </a>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </div>
  );
};

export default MaterialTable;
