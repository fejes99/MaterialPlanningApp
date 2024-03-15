import { SupplierConfirmations } from 'wasp/client/crud';
import SupplierConfirmationTable from '../components/SupplierConfirmationTable';

const SupplierConfirmationPage: React.FC = () => {
  const { data: confirmations, isLoading, error } = SupplierConfirmations.getAll.useQuery();

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;
  return (
    <>
      <SupplierConfirmationTable confirmations={confirmations} />
    </>
  );
};

export default SupplierConfirmationPage;
