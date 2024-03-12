import { useState } from 'react';
import { Button, Label, Modal, TextInput, Select } from 'flowbite-react';
import { HiOutlinePlus } from 'react-icons/hi';
import { createMaterial } from 'wasp/client/operations';
import { MaterialUnit } from '../../types/MaterialUnit';

const MaterialAddModal: React.FC = () => {
  const [openModal, setOpenModal] = useState(false);
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [measurementUnit, setMeasurementUnit] = useState('');

  const onCloseModal = () => {
    setOpenModal(false);
    resetFields();
  };

  const resetFields = () => {
    setCode('');
    setName('');
    setMeasurementUnit('');
  };

  const handleCreateMaterial = () => {
    createMaterial({
      code,
      name,
      measurementUnit,
    });
    resetFields();
  };

  return (
    <>
      <div className='flex justify-end mb-4'>
        <Button color='blue' onClick={() => setOpenModal(true)}>
          <HiOutlinePlus className='mr-2' /> Dodaj materijal
        </Button>
      </div>

      <Modal show={openModal} onClose={onCloseModal}>
        <Modal.Header>Dodaj materijal</Modal.Header>
        <Modal.Body>
          <div className='space-y-6'>
            <div>
              <div className='mb-2 block'>
                <Label htmlFor='code' value='Šifra materijala' />
              </div>
              <TextInput
                id='code'
                placeholder='MMAT'
                value={code}
                onChange={(event) => setCode(event.target.value)}
                required
              />
            </div>

            <div>
              <div className='mb-2 block'>
                <Label htmlFor='name' value='Naziv materijala' />
              </div>
              <TextInput
                id='name'
                placeholder='Materijal'
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
              />
            </div>

            <div>
              <div className='mb-2 block'>
                <Label htmlFor='measurementUnit' value='Merna jedinica materijala' />
              </div>
              <Select
                required
                value={measurementUnit}
                onChange={(event) => setMeasurementUnit(event.target.value)}
              >
                <option value={0} disabled hidden />
                {Object.values(MaterialUnit).map((unit) => (
                  <option key={unit} value={unit}>
                    {unit}
                  </option>
                ))}
              </Select>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className='w-full'>
            <Button onClick={handleCreateMaterial}>Dodaj materijal</Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default MaterialAddModal;
