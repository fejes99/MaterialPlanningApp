import { useAuth } from 'wasp/client/auth';
import { PurchaseOrders } from 'wasp/client/crud';
import PurchaseOrderTable from '../components/PurchaseOrderTable';
import PurchaseOrderAddModal from '../components/modals/PurchaseOrderAddModal';
import { isPlanner } from '../../user/helpers/isPlanner';

const PurchaseOrderPage: React.FC = () => {
  const { data: user } = useAuth();
  const { data: purchaseOrders, isLoading, error } = PurchaseOrders.getAll.useQuery();

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  return (
    <>
      <PurchaseOrderAddModal />
      <PurchaseOrderTable purchaseOrders={purchaseOrders} />
    </>
  );
};

export default PurchaseOrderPage;
