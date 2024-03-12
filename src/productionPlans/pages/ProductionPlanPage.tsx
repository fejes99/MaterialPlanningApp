import { ProductionPlans } from 'wasp/client/crud';
import ProductionPlanTable from '../components/ProductionPlanTable';
import ProductionPlanAddModal from '../components/modals/ProductionPlanAddModal';

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
