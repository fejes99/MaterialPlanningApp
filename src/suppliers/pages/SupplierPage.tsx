import { Suppliers } from 'wasp/client/crud';
import SupplierTable from '../components/SupplierTable';
import SupplierAddModal from '../components/modals/SupplierAddModal';

const SupplierPage: React.FC = () => {
  const { data: suppliers, isLoading, error } = Suppliers.getAll.useQuery();

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  return (
    <>
      <SupplierAddModal />
      <SupplierTable suppliers={suppliers} />
    </>
  );
};

export default SupplierPage;
