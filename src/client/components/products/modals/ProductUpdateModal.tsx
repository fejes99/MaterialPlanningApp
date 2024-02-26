import { useState } from 'react';
import { Product } from '@wasp/entities';
import { Products } from '@wasp/crud/Products';
import { Button, Label, Modal, TextInput } from 'flowbite-react';

type Props = { product: Product };

const ProductUpdateModal: React.FC<Props> = ({ product }) => {
  const updateProduct = Products.update.useAction();

  const [openModal, setOpenModal] = useState(false);
  const [description, setDescription] = useState(product.description);

  const onCloseModal = () => setOpenModal(false);

  const handleUpdateProduct = () => {
    updateProduct({
      id: product.id,
      description,
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
          Ažuriraj {product.name} ({product.code})
        </Modal.Header>
        <Modal.Body>
          <div className='space-y-6'>
            <div>
              <div className='mb-2 block'>
                <Label htmlFor='name' value='Opis proizvoda' />
              </div>
              <TextInput
                id='name'
                placeholder='0'
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                required
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className='w-full'>
            <Button onClick={handleUpdateProduct}>Ažuriraj proizvod</Button>
          </div>
          <Button color='gray' onClick={() => setOpenModal(false)}>
            Poništi
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default ProductUpdateModal;
