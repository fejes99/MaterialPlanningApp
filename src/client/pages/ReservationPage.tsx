import { Reservations } from '@wasp/crud/Reservations';
import ReservationAddModal from '../components/reservations/modals/ReservationAddModal';
import ReservationTable from '../components/reservations/ReservationTable';

const ReservationPage: React.FC = () => {
  const { data: reservations, isLoading, error } = Reservations.getAll.useQuery();

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  return (
    <>
      <ReservationAddModal />
      <ReservationTable reservations={reservations} />
    </>
  );
};
export default ReservationPage;
