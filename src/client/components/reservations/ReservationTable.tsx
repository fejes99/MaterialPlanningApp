import { Reservation } from '@wasp/entites';

interface Props {
  reservations: Reservation[];
}
const ReservationTable: React.FC<Props> = ({ reservations }) => {
  console.log(reservations);
  return <div>ReservationTable</div>;
};
export default ReservationTable;
