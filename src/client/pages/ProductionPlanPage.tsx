import { ProductionPlans } from '@wasp/crud/ProductionPlans';
import ProductionPlanTable from '../components/productionPlans/ProductionPlanTable';
import ProductionPlanAddModal from '../components/productionPlans/modals/ProductionPlanAddModal';

const ProductionPlanPage: React.FC = () => {
  const { data: productionPlans, isLoading, error } = ProductionPlans.getAll.useQuery();

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  return (
    <>
      <ProductionPlanAddModal />
      <ProductionPlanTable productionPlans={productionPlans} />
    </>
  );
};
export default ProductionPlanPage;
