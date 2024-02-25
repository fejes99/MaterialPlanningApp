import React from 'react';
import { Material, ProductMaterials } from '@wasp/entities';
import { Checkbox, Table } from 'flowbite-react';
import Dropdown from '../ui/Dropdown/Dropdown';
import MaterialUpdateModal from './modals/MaterialUpdateModal';
import MaterialDeleteModal from './modals/MaterialDeleteModal';

type Props = {
  materials: Material[];
};

const MaterialTable: React.FC<Props> = ({ materials }) => {
  console.log('🚀 ~ materials:', materials);
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
          {materials.map((material: Material) => {
            const products: string[] = material.productMaterials.map(
              (productMaterial: ProductMaterials) => productMaterial.product.name
            );

            return (
              <Table.Row
                key={material.id}
                className='bg-white dark:border-gray-700 dark:bg-gray-800'
              >
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
                <Table.Cell className='flex justify-around'>
                  <MaterialUpdateModal material={material} />
                  <MaterialDeleteModal material={material} />
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
