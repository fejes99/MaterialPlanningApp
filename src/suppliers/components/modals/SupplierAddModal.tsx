import { useState } from 'react';
import { createSupplier } from 'wasp/client/operations';
import { Button, Label, Modal, TextInput, Select } from 'flowbite-react';
import { HiOutlinePlus } from 'react-icons/hi';

const SupplierAddModal: React.FC = () => {
  const [openModal, setOpenModal] = useState(false);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');

  const onCloseModal = () => {
    setOpenModal(false);
    resetFields();
  };

  const resetFields = () => {
    setName('');
    setAddress('');
  };

  const handleCreateSupplier = () => {
    createSupplier({
      name,
      address,
    });
    resetFields();
  };

  return (
    <>
      <div className='flex justify-end mb-4'>
        <Button color='blue' onClick={() => setOpenModal(true)}>
          <HiOutlinePlus className='mr-2' /> Dodaj dobavljača
        </Button>
      </div>

      <Modal show={openModal} onClose={onCloseModal}>
        <Modal.Header>Dodaj dobavljača</Modal.Header>
        <Modal.Body>
          <div className='space-y-6'>
            <div>
              <div className='mb-2 block'>
                <Label htmlFor='name' value='Naziv dobavljača' />
              </div>
              <TextInput
                id='name'
                placeholder='Dobavljač'
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
              />
            </div>

            <div>
              <div className='mb-2 block'>
                <Label htmlFor='address' value='Adresa dobavljača' />
              </div>
              <TextInput
                id='address'
                placeholder='Adresa'
                value={address}
                onChange={(event) => setAddress(event.target.value)}
                required
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className='w-full'>
            <Button onClick={handleCreateSupplier}>Dodaj dobavljača</Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SupplierAddModal;
