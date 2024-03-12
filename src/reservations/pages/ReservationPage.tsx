import { Reservations } from 'wasp/client/crud';
import ReservationAddModal from '../components/modals/ReservationAddModal';
import ReservationTable from '../components/ReservationTable';

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
