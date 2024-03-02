import { ProductionPlan, ProductionPlanProducts } from '@wasp/entities';
import { ProductionPlans } from '@wasp/crud/ProductionPlans';
import { Checkbox, Table } from 'flowbite-react';
import DeleteModal from '../ui/modals/DeleteModal';
import { convertFullDate, convertShortDate } from '../../../shared/utils';
import Dropdown from '../ui/Dropdown/Dropdown';

type Props = {
  productionPlans: ProductionPlan[];
};

const ProductionPlanTable: React.FC<Props> = ({ productionPlans }) => {
  const deleteProductionPlan = ProductionPlans.delete.useAction();

  const handleDelete = (id: string) => deleteProductionPlan({ id });

  return (
    <div className='overflow-x-auto'>
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell className='p-4'>
            <Checkbox />
          </Table.HeadCell>
          <Table.HeadCell>Šifra</Table.HeadCell>
          <Table.HeadCell>Planirani mesec</Table.HeadCell>
          <Table.HeadCell>Napravljeno dana</Table.HeadCell>
          <Table.HeadCell>Status</Table.HeadCell>
          <Table.HeadCell>Proizvodi</Table.HeadCell>
          <Table.HeadCell>Akcije</Table.HeadCell>
        </Table.Head>

        <Table.Body className='divide-y'>
          {productionPlans &&
            productionPlans.map((productionPlan: ProductionPlan) => {
              const products: string[] = productionPlan.products.map(
                (productionPlanProduct: ProductionPlanProducts) => (
                  <>
                    {productionPlanProduct.product.name}
                    <b>({productionPlanProduct.productCount} kom)</b>
                  </>
                )
              );

              return (
                <Table.Row
                  key={productionPlan.id}
                  className='bg-white dark:border-gray-700 dark:bg-gray-800'
                >
                  <Table.Cell className='p-4'>
                    <Checkbox />
                  </Table.Cell>
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
