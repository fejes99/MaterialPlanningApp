import { Table } from 'flowbite-react';
import { type ProductionPlan, type ProductionPlanProducts, type Product } from 'wasp/entities';
import { ProductionPlans } from 'wasp/client/crud';
import { convertFullDate, convertShortDate } from '../../common/helpers/formatDate';
import DeleteModal from '../../common/components/ui/modals/DeleteModal';
import Dropdown from '../../common/components/ui/Dropdown/Dropdown';

type Props = {
  productionPlans: (ProductionPlan & {
    products: (ProductionPlanProducts & { product: Product })[];
  })[];
};

const ProductionPlanTable: React.FC<Props> = ({ productionPlans }) => {
  const deleteProductionPlan = ProductionPlans.delete.useAction();

  const handleDelete = (id: number) => deleteProductionPlan({ id });

  return (
    <div className='overflow-x-auto h-full'>
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>Šifra</Table.HeadCell>
          <Table.HeadCell>Planirani mesec</Table.HeadCell>
          <Table.HeadCell>Napravljeno dana</Table.HeadCell>
          <Table.HeadCell>Status</Table.HeadCell>
          <Table.HeadCell>Proizvodi</Table.HeadCell>
          <Table.HeadCell>Akcije</Table.HeadCell>
        </Table.Head>

        <Table.Body className='divide-y'>
          {productionPlans &&
            productionPlans.map((productionPlan) => {
              const products: string[] = productionPlan.products.map(
                (productionPlanProduct) =>
                  `${productionPlanProduct.product.name} (${productionPlanProduct.productCount} kom)`
              );

              return (
                <Table.Row
                  key={productionPlan.id}
                  className='bg-white dark:border-gray-700 dark:bg-gray-800'
                >
                  <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
                    {productionPlan.code}
                  </Table.Cell>
                  <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
                    {convertShortDate(productionPlan.createdFor)}
                  </Table.Cell>
                  <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
                    {convertFullDate(productionPlan.createdAt)}
                  </Table.Cell>
                  <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
                    {productionPlan.status}
                  </Table.Cell>
                  <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
                    <Dropdown label='Proizvodi' values={products} />
                  </Table.Cell>
                  <Table.Cell className='flex'>
                    <DeleteModal
                      label={'proizvodni plan za: ' + convertShortDate(productionPlan.createdFor)}
                      code={productionPlan.code}
                      onDelete={() => handleDelete(productionPlan.id)}
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
export default ProductionPlanTable;
