import { useState } from 'react';
import { type ProductionPlan } from 'wasp/entities';
import { HiOutlinePlus, HiOutlineX } from 'react-icons/hi';
import { Button, Label, Modal, TextInput, Select } from 'flowbite-react';
import { useQuery, getActiveProductionPlans, createReservation } from 'wasp/client/operations';
import { convertShortDate } from '../../../common/helpers/formatDate';

const ReservationAddModal: React.FC = () => {
  const { data: productionPlans } = useQuery(getActiveProductionPlans);

  const [openModal, setOpenModal] = useState(false);
  const [selectedProductionPlan, setSelectedProductionPlan] = useState<ProductionPlan | null>(null);

  const onCloseModal = () => {
    setOpenModal(false);
    resetFields();
  };

  const resetFields = () => {
    setSelectedProductionPlan(null);
  };

  const handleProductionPlanChange = (event) => {
    const { value } = event.target;
    const selectedPlan = productionPlans.find((plan) => plan.id === parseInt(value));
    setSelectedProductionPlan(selectedPlan);
  };

  const handleCreateReservation = () => {
    // Do something with selectedProductionPlan and selectedMonth
  };

  return (
    <>
      <div className='flex justify-end mb-4'>
        <Button color='blue' onClick={() => setOpenModal(true)}>
          <HiOutlinePlus className='mr-2' /> Dodaj rezervaciju
        </Button>
      </div>

      <Modal show={openModal} onClose={onCloseModal}>
        <Modal.Header>Dodaj proizvodni plan</Modal.Header>
        <Modal.Body>
          <div className='space-y-6'>
            <div>
              <div className='mb-2 block'>
                <Label value='Proizvodni planov' />
              </div>
              {productionPlans && (
                <div className='space-y-4'>
                  <Select
                    required
                    value={selectedProductionPlan?.id || ''}
                    onChange={handleProductionPlanChange}
                  >
                    <option value='' disabled hidden />
                    {productionPlans.map((productionPlan) => (
                      <option key={productionPlan.id} value={productionPlan.id}>
                        {productionPlan.code}
                      </option>
                    ))}
                  </Select>
                </div>
              )}
            </div>

            <div>
              <div className='mb-2 block'>
                <Label htmlFor='code' value='Planirani mesec' />
              </div>
              <TextInput
                id='createdFor'
                value={
                  selectedProductionPlan ? convertShortDate(selectedProductionPlan.createdFor) : ''
                }
                disabled
                required
              />
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ReservationAddModal;
