import { Table } from 'flowbite-react';
import { type Product, type Material, type ProductMaterials } from 'wasp/entities';
import { Materials } from 'wasp/client/crud';
import MaterialUpdateModal from './modals/MaterialUpdateModal';
import Dropdown from '../../common/components/ui/Dropdown/Dropdown';
import DeleteModal from '../../common/components/ui/modals/DeleteModal';

type Props = {
  materials: (Material & { products: (ProductMaterials & { product: Product })[] })[];
};

const MaterialTable: React.FC<Props> = ({ materials }) => {
  const deleteMaterial = Materials.delete.useAction();

  const handleDelete = (id: number) => deleteMaterial({ id });

  return (
    <div className='overflow-x-auto h-full'>
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>Šifra</Table.HeadCell>
          <Table.HeadCell>Naziv</Table.HeadCell>
          <Table.HeadCell>Količina</Table.HeadCell>
          <Table.HeadCell>Merna jedinica</Table.HeadCell>
          <Table.HeadCell>Proizvodi</Table.HeadCell>
          <Table.HeadCell>Akcije</Table.HeadCell>
        </Table.Head>
        <Table.Body className='divide-y'>
          {materials &&
            materials.map((material) => {
              const products: string[] = material.products.map(
                (productMaterial) => productMaterial.product.name
              );

              return (
                <Table.Row
                  key={material.id}
                  className='bg-white dark:border-gray-700 dark:bg-gray-800'
                >
                  <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
                    {material.code}
                  </Table.Cell>
                  <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
                    {material.name}
                  </Table.Cell>
                  <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
                    {material.count.toFixed(2)}
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
