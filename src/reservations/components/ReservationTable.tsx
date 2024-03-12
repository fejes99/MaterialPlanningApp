import { Checkbox, Table } from 'flowbite-react';
import { type Reservation } from 'wasp/entities';
import { convertFullDate, convertShortDate } from '../../common/helpers/formatDate';
import DeleteModal from '../../common/components/ui/modals/DeleteModal';

interface Props {
  reservations: Reservation[];
}
const ReservationTable: React.FC<Props> = ({ reservations }) => {
  console.log(reservations);

  return (
    <div className='overflow-x-auto'>
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell className='p-4'>
            <Checkbox />
          </Table.HeadCell>
          <Table.HeadCell>Planirani mesec</Table.HeadCell>
          <Table.HeadCell>Napravljeno dana</Table.HeadCell>
          <Table.HeadCell>Status</Table.HeadCell>
          <Table.HeadCell>Napravio</Table.HeadCell>
          <Table.HeadCell>Plan proizvodnje</Table.HeadCell>
          <Table.HeadCell>Akcije</Table.HeadCell>
        </Table.Head>
        <Table.Body className='divide-y'>
          {reservations &&
            reservations.map((reservation: any) => (
              <Table.Row
                key={reservation.id}
                className='bg-white dark:border-gray-700 dark:bg-gray-800'
              >
                <Table.Cell className='p-4'>
                  <Checkbox />
                </Table.Cell>
                <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
                  {convertShortDate(reservation.createdFor)}
                </Table.Cell>
                <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
                  {convertFullDate(reservation.createdAt)}
                </Table.Cell>
                <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
                  {reservation.status}
                </Table.Cell>
                <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
                  {reservation.user.name + ' ' + reservation.user.surrname}
                </Table.Cell>
                <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
                  {reservation.productionPlan.code}
                </Table.Cell>
                <Table.Cell className='flex justify-around'>
                  <DeleteModal
                    label={'rezervaciju: ' + convertShortDate(reservation.createdFor)}
                    onDelete={() => Promise.resolve()}
                  />
                </Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table>
    </div>
  );
};
export default ReservationTable;
