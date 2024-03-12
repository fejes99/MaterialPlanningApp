import React from 'react';
import { Materials } from 'wasp/client/crud';
import MaterialTable from '../components/MaterialTable';
import MaterialAddModal from '../components/modals/MaterialAddModal';

const MaterialPage: React.FC = () => {
  const { data: materials, isLoading, error } = Materials.getAll.useQuery();

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  return (
    <>
      <MaterialAddModal />
      <MaterialTable materials={materials} />
    </>
  );
};

export default MaterialPage;
