import { useAuth } from 'wasp/client/auth';
import { PurchaseRequests } from 'wasp/client/crud';
import PurchaseRequestAddModal from '../components/modals/PurchaseRequestAddModal';
import PurchaseRequestTable from '../components/PurchaseRequestTable';
import { isPlanner } from '../../user/helpers/isPlanner';

const PurchaseRequestPage: React.FC = () => {
  const { data: user } = useAuth();
  const { data: purchaseRequests, isLoading, error } = PurchaseRequests.getAll.useQuery();

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  return (
    <div className='h-screen'>
      {isPlanner(user) && <PurchaseRequestAddModal />}
      <PurchaseRequestTable purchaseRequests={purchaseRequests} />
    </div>
  );
};

export default PurchaseRequestPage;
