import { ProductionPlans } from 'wasp/client/crud';
import ProductionPlanTable from '../components/ProductionPlanTable';
import ProductionPlanAddModal from '../components/modals/ProductionPlanAddModal';

const ProductionPlanPage: React.FC = () => {
  const { data: productionPlans, isLoading, error } = ProductionPlans.getAll.useQuery();

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  return (
    <div className='h-screen'>
      <ProductionPlanAddModal />
      <ProductionPlanTable productionPlans={productionPlans} />
    </div>
  );
};
export default ProductionPlanPage;
