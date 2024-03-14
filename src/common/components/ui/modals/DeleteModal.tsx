import { useState } from 'react';
import { Button, Modal } from 'flowbite-react';
import { HiOutlineTrash } from 'react-icons/hi2';

type Props = {
  label: string;
  code?: string;
  onDelete: () => Promise<any>;
};

const DeleteModal: React.FC<Props> = ({ label, code, onDelete }) => {
  const [openModal, setOpenModal] = useState(false);

  const handleDeleteMaterial = () => {
    onDelete();
    setOpenModal(false);
  };

  return (
    <>
      <HiOutlineTrash
        size={24}
        color='firebrick'
        onClick={() => setOpenModal(true)}
        className=' cursor-pointer'
      />

      <Modal show={openModal} onClose={() => setOpenModal(false)} popup>
        <Modal.Header>
          Obriši {label} {code && ` (${code})`}
        </Modal.Header>
        <Modal.Body>
          <div className='text-center'>
            <HiOutlineTrash className='mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200' />
            <h3 className='mb-5 text-lg font-normal text-gray-500 dark:text-gray-400'>
              Da li ste sigurni da želite da obrišete stavku?
            </h3>
            <div className='flex justify-center gap-4'>
              <Button color='failure' onClick={handleDeleteMaterial}>
                Da, siguran sam
              </Button>
              <Button color='gray' onClick={() => setOpenModal(false)}>
                Ne, poništi
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default DeleteModal;
