import { Table } from 'flowbite-react';
import { type Material, type Product, type ProductMaterials } from 'wasp/entities';
import { Products } from 'wasp/client/crud';
import Dropdown from '../../common/components/ui/Dropdown/Dropdown';
import DeleteModal from '../../common/components/ui/modals/DeleteModal';
import ProductUpdateModal from './modals/ProductUpdateModal';

interface Props {
  products: (Product & { materials: (ProductMaterials & { material: Material })[] })[];
}

const ProductTable: React.FC<Props> = ({ products }) => {
  const deleteProduct = Products.delete.useAction();

  const handleDelete = (id: number) => deleteProduct({ id });

  return (
    <div className='overflow-x-auto'>
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>Šifra</Table.HeadCell>
          <Table.HeadCell>Naziv</Table.HeadCell>
          <Table.HeadCell>Opis</Table.HeadCell>
          <Table.HeadCell>Materijali</Table.HeadCell>
          <Table.HeadCell>Akcije</Table.HeadCell>
        </Table.Head>

        <Table.Body className='divide-y'>
          {products &&
            products.map((product) => {
              const materials: string[] = product.materials.map(
                (productMaterial) =>
                  `${productMaterial.material.name} (${productMaterial.materialCount} ${productMaterial.measurementUnit})`
              );

              return (
                <Table.Row
                  key={product.id}
                  className='bg-white dark:border-gray-700 dark:bg-gray-800'
                >
                  <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
                    {product.code}
                  </Table.Cell>
                  <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
                    {product.name}
                  </Table.Cell>
                  <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
                    {product.description}
                  </Table.Cell>
                  <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
                    <Dropdown label='Materijali' values={materials} />
                  </Table.Cell>
                  <Table.Cell className='flex justify-around'>
                    <ProductUpdateModal product={product} />
                    <DeleteModal
                      label={'proizvod: ' + product.name}
                      code={product.code}
                      onDelete={() => handleDelete(product.id)}
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
export default ProductTable;
