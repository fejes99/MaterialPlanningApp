import { useState } from 'react';
import { HiOutlinePlus, HiOutlineX } from 'react-icons/hi';
import { Button, Label, Modal, TextInput, Select } from 'flowbite-react';
import { useQuery, getActiveProductionPlans, createReservation } from 'wasp/client/operations';

const ReservationAddModal: React.FC = () => {
  const { data: productionPlans } = useQuery(getActiveProductionPlans);

  const [openModal, setOpenModal] = useState(false);
  const [productionPlan, setProductionPlan] = useState();

  return <div>ReservationAddModal</div>;
};
export default ReservationAddModal;
