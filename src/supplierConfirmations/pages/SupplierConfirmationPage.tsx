import { SupplierConfirmations } from 'wasp/client/crud';
import SupplierConfirmationTable from '../components/SupplierConfirmationTable';

const SupplierConfirmationPage: React.FC = () => {
  const { data: confirmations, isLoading, error } = SupplierConfirmations.getAll.useQuery();

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  return (
    <div className='h-screen'>
      <SupplierConfirmationTable confirmations={confirmations} />
    </div>
  );
};

export default SupplierConfirmationPage;
