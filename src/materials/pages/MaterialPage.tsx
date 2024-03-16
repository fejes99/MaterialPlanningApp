import { Materials } from 'wasp/client/crud';
import MaterialTable from '../components/MaterialTable';
import MaterialAddModal from '../components/modals/MaterialAddModal';

const MaterialPage: React.FC = () => {
  const { data: materials, isLoading, error } = Materials.getAll.useQuery();

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  return (
    <div className='h-screen'>
      <MaterialAddModal />
      <MaterialTable materials={materials} />
    </div>
  );
};

export default MaterialPage;
