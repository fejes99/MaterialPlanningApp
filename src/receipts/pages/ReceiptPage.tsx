import { Receipts } from 'wasp/client/crud';
import ReceiptTable from '../components/ReceiptTable';
import ReceiptAddModal from '../components/modals/ReceiptAddModal';

const ReceiptPage: React.FC = () => {
  const { data: receipts, isLoading, error } = Receipts.getAll.useQuery();

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  return (
    <div className='h-screen'>
      <ReceiptAddModal />
      <ReceiptTable receipts={receipts} />
    </div>
  );
};

export default ReceiptPage;
