import { useState } from 'react';
import createProductionPlan from '@wasp/actions/createProductionPlan.js';
import { Button, Label, Modal, TextInput, Datepicker } from 'flowbite-react';
import { ProductionPlanStatus } from '../../../../shared/productionPlan/types';
import { HiOutlinePlus } from 'react-icons/hi';

const ProductionPlanAddModal = () => {
  const [openModal, setOpenModal] = useState(false);
  const [code, setCode] = useState('');
  const [dateFor, setDateFor] = useState<string>(new Date().toISOString());

  const onCloseModal = () => {
    setOpenModal(false);
    resetFields();
  };

  const resetFields = () => {
    setCode('');
    setDateFor(new Date().toISOString());
  };

  const handleCreateProductionPlan = () => {
    createProductionPlan({
      code,
      createdAt: new Date(),
      createdFor: new Date(dateFor),
      status: ProductionPlanStatus.Active,
    });
    resetFields();
  };

  return (
    <>
      <div className='flex justify-end mb-4'>
        <Button color='blue' onClick={() => setOpenModal(true)}>
          <HiOutlinePlus className='mr-2' /> Dodaj proizvodni plan
        </Button>
      </div>

      <Modal show={openModal} onClose={onCloseModal}>
        <Modal.Header>Dodaj proizvodni plan</Modal.Header>
        <Modal.Body>
          <div className='space-y-6'>
            <div>
              <div className='mb-2 block'>
                <Label htmlFor='code' value='Šifra proizvodnog plana' />
              </div>
              <TextInput
                id='code'
                placeholder='PP0124'
                value={code}
                onChange={(event) => setCode(event.target.value)}
                required
              />
            </div>

            <div>
              <div className='mb-2 block'>
                <Label htmlFor='code' value='Planirani mesec počev od' />
              </div>
              <Datepicker
                id='dateFor'
                value={dateFor}
                onSelectedDateChanged={(date) => setDateFor(new Date(date).toISOString())}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className='w-full'>
            <Button onClick={handleCreateProductionPlan}>Dodaj proizvodni plan</Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default ProductionPlanAddModal;
