import React from 'react';
import { Material, ProductMaterials } from '@wasp/entities';
import { Materials } from '@wasp/crud/Materials';
import { Checkbox, Table } from 'flowbite-react';
import Dropdown from '../ui/Dropdown/Dropdown';
import MaterialUpdateModal from './modals/MaterialUpdateModal';
import DeleteModal from '../ui/modals/DeleteModal';

type Props = {
  materials: Material[];
};

const MaterialTable: React.FC<Props> = ({ materials }) => {
  const deleteMaterial = Materials.delete.useAction();

  const handleDelete = (id: number) => deleteMaterial({ id });

  return (
    <div className='overflow-x-auto'>
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell className='p-4'>
            <Checkbox />
          </Table.HeadCell>
          <Table.HeadCell>Šifra</Table.HeadCell>
          <Table.HeadCell>Naziv</Table.HeadCell>
          <Table.HeadCell>Količina</Table.HeadCell>
          <Table.HeadCell>Merna jedinica</Table.HeadCell>
          <Table.HeadCell>Proizvodi</Table.HeadCell>
          <Table.HeadCell>Akcije</Table.HeadCell>
        </Table.Head>
        <Table.Body className='divide-y'>
          {materials &&
            materials.map((material: Material) => {
              const products: string[] = material.products.map(
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
                    <DeleteModal
                      label={'materijal: ' + material.name}
                      code={material.code}
                      onDelete={() => handleDelete(material.id)}
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

export default MaterialTable;
