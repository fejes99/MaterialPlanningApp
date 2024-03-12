import { Checkbox, Table } from 'flowbite-react';
import { type Product, type ProductMaterials } from 'wasp/entities';
import { Products } from 'wasp/client/crud';
import Dropdown from '../../common/components/ui/Dropdown/Dropdown';
import DeleteModal from '../../common/components/ui/modals/DeleteModal';
import ProductUpdateModal from './modals/ProductUpdateModal';

interface Props {
  products: Product[];
}

const ProductTable: React.FC<Props> = ({ products }) => {
  const deleteProduct = Products.delete.useAction();

  const handleDelete = (id: number) => deleteProduct({ id });

  return (
    <div className='overflow-x-auto'>
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell className='p-4'>
            <Checkbox />
          </Table.HeadCell>
          <Table.HeadCell>Šifra</Table.HeadCell>
          <Table.HeadCell>Naziv</Table.HeadCell>
          <Table.HeadCell>Opis</Table.HeadCell>
          <Table.HeadCell>Materijali</Table.HeadCell>
          <Table.HeadCell>Akcije</Table.HeadCell>
        </Table.Head>

        <Table.Body className='divide-y'>
          {products &&
            products.map((product: any) => {
              const materials: string[] = product.materials.map((productMaterial: any) => (
                <>
                  {productMaterial.material.name}
                  <b>
                    ({productMaterial.materialCount} {productMaterial.measurementUnit})
                  </b>
                </>
              ));

              return (
                <Table.Row
                  key={product.id}
                  className='bg-white dark:border-gray-700 dark:bg-gray-800'
                >
                  <Table.Cell className='p-4'>
                    <Checkbox />
                  </Table.Cell>
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
