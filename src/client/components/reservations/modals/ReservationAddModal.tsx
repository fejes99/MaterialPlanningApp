import { useState } from 'react';
import { useQuery } from '@wasp/queries';
import getActiveProductionPlans from '@wasp/queries/getActiveProductionPlans';
import createReservation from '@wasp/actions/createReservation.js';
import { Button, Label, Modal, TextInput, Select } from 'flowbite-react';
import { HiOutlinePlus, HiOutlineX } from 'react-icons/hi';

const ReservationAddModal: React.FC = () => {
  const { data: productionPlans } = useQuery(getActiveProductionPlans);

  const [openModal, setOpenModal] = useState(false);
  const [productionPlan, setProductionPlan] = useState();

  return <div>ReservationAddModal</div>;
};
export default ReservationAddModal;
