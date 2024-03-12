import { useState } from 'react';
import { Button, Label, Modal, TextInput, Select } from 'flowbite-react';
import { type Material } from 'wasp/entities';
import { Materials } from 'wasp/client/crud';
import { MaterialUnit } from '../../types/MaterialUnit';
import { convertUnit } from '../../helpers/convertUnit';

type Props = {
  material: Material;
};

const MaterialUpdateModal: React.FC<Props> = ({ material }) => {
  const updateMaterial = Materials.update.useAction();

  const [openModal, setOpenModal] = useState(false);
  const [count, setCount] = useState(material.count);
  const [measurementUnit, setMeasurementUnit] = useState(material.measurementUnit);

  const onCloseModal = () => setOpenModal(false);

  const handleMeasurementUnitChange = (event) => {
    const { value } = event.target;
    const updatedCount = convertUnit(count, measurementUnit, value);
    setCount(updatedCount);
    setMeasurementUnit(value);
  };

  const handleUpdateMaterial = () => {
    updateMaterial({
      id: material.id,
      count,
      measurementUnit,
    });
    onCloseModal();
  };

  return (
    <>
      <div
        color='blue'
        className='font-medium text-cyan-600 hover:underline dark:text-cyan-500 cursor-pointer'
        onClick={() => setOpenModal(true)}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-6 h-6'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125'
          />
        </svg>
      </div>

      <Modal show={openModal} onClose={onCloseModal}>
        <Modal.Header>
          Ažuriraj {material.name} ({material.code})
        </Modal.Header>
        <Modal.Body>
          <div className='space-y-6'>
            <div>
              <div className='mb-2 block'>
                <Label htmlFor='name' value='Količina materijala' />
              </div>
              <TextInput
                id='name'
                type='number'
                placeholder='0'
                value={count}
                onChange={(event) => setCount(parseInt(event.target.value))}
                required
              />
            </div>

            <div>
              <div className='mb-2 block'>
                <Label htmlFor='measurementUnit' value='Merna jedinica materijala' />
              </div>
              <Select required value={measurementUnit} onChange={handleMeasurementUnitChange}>
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
            <Button onClick={handleUpdateMaterial}>Ažuriraj materijal</Button>
          </div>
          <Button color='gray' onClick={() => setOpenModal(false)}>
            Poništi
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default MaterialUpdateModal;
