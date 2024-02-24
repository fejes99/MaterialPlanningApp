import React from 'react';
import { Materials } from '@wasp/crud/Materials';
import { Button } from 'flowbite-react';
import MaterialTable from '../components/materials/MaterialTable';
import MaterialAddModal from '../components/ui/Modals/MaterialAddModal';

const MaterialPage: React.FC = () => {
  const { data: materials, isLoading, error } = Materials.getAll.useQuery();
  console.log('🚀 ~ materials:', materials);

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
