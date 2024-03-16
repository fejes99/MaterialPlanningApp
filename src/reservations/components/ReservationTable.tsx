import { Table } from 'flowbite-react';
import {
  type Reservation,
  type ReservationMaterials,
  type Material,
  type User,
  type ProductionPlan,
} from 'wasp/entities';
import { Reservations } from 'wasp/client/crud';
import { convertFullDate, convertShortDate } from '../../common/helpers/formatDate';
import DeleteModal from '../../common/components/ui/modals/DeleteModal';
import Dropdown from '../../common/components/ui/Dropdown/Dropdown';

interface Props {
  reservations: (Reservation & {
    materials: (ReservationMaterials & { material: Material })[];
    user: User | null;
    productionPlan: ProductionPlan;
  })[];
}
const ReservationTable: React.FC<Props> = ({ reservations }) => {
  const deleteReservation = Reservations.delete.useAction();

  const handleDelete = (id: number) => deleteReservation({ id });

  return (
    <div className='overflow-x-auto h-full'>
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>Planirani mesec</Table.HeadCell>
          <Table.HeadCell>Napravljeno dana</Table.HeadCell>
          <Table.HeadCell>Status</Table.HeadCell>
          <Table.HeadCell>Napravio</Table.HeadCell>
          <Table.HeadCell>Plan proizvodnje</Table.HeadCell>
          <Table.HeadCell>Materiali</Table.HeadCell>
          <Table.HeadCell>Akcije</Table.HeadCell>
        </Table.Head>
        <Table.Body className='divide-y'>
          {reservations &&
            reservations.map((reservation) => {
              const materials: string[] = reservation.materials.map(
                (reservationMaterial) =>
                  `${reservationMaterial.material.name} (${reservationMaterial.materialCount} ${reservationMaterial.measurementUnit})`
              );

              return (
                <Table.Row
                  key={reservation.id}
                  className='bg-white dark:border-gray-700 dark:bg-gray-800'
                >
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
                    {reservation.user?.name + ' ' + reservation.user?.surrname}
                  </Table.Cell>
                  <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
                    {reservation.productionPlan.code}
                  </Table.Cell>
                  <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
                    <Dropdown label='Materijali' values={materials} />
                  </Table.Cell>

                  <Table.Cell className='flex justify-around'>
                    <DeleteModal
                      label={'rezervaciju: ' + convertShortDate(reservation.createdFor)}
                      onDelete={() => handleDelete(reservation.id)}
                    />
                  </Table.Cell>
                </Table.Row>
              );
            })}
        </Table.Body>
      </Table>
    </div>
  );
};
export default ReservationTable;
