import { useState } from 'react';
import { HiOutlinePlus, HiOutlineX } from 'react-icons/hi';
import { Button, Label, Modal, TextInput, Select } from 'flowbite-react';
import { Materials } from 'wasp/client/crud';
import { createProduct } from 'wasp/client/operations';

const ProductAddModal: React.FC = () => {
  const { data: materials } = Materials.getAll.useQuery();

  const [openModal, setOpenModal] = useState(false);
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [materialsInput, setMaterialsInput] = useState([
    { materialId: 0, materialCount: 0, measurementUnit: '' },
  ]);

  const onCloseModal = () => {
    setOpenModal(false);
    resetFields();
  };

  const resetFields = () => {
    setCode('');
    setName('');
    setDescription('');
    setMaterialsInput([{ materialId: 0, materialCount: 0, measurementUnit: '' }]);
  };

  const handleCreateProduct = () => {
    createProduct({
      code,
      name,
      description,
      materials: materialsInput,
    });
    resetFields();
  };

  const handleAddMaterial = () =>
    setMaterialsInput([
      ...materialsInput,
      { materialId: 0, materialCount: 0, measurementUnit: '' },
    ]);

  const handleRemoveMaterial = (index: number) => {
    const updatedMaterials = [...materialsInput];
    updatedMaterials.splice(index, 1);
    setMaterialsInput(updatedMaterials);
  };

  const handleMaterialChange = (index: number, key: string, value: string | number) => {
    const updatedMaterials = [...materialsInput];
    updatedMaterials[index][key] = value;
    setMaterialsInput(updatedMaterials);
  };

  return (
    <>
      <div className='flex justify-end mb-4'>
        <Button color='blue' onClick={() => setOpenModal(true)}>
          <HiOutlinePlus className='mr-2' /> Dodaj proizvod
        </Button>
      </div>

      <Modal show={openModal} onClose={onCloseModal}>
        <Modal.Header>Dodaj proizvod</Modal.Header>
        <Modal.Body>
          <div className='space-y-6'>
            <div>
              <div className='mb-2 block'>
                <Label htmlFor='code' value='Šifra proizvoda' />
              </div>
              <TextInput
                id='code'
                placeholder='PPRO'
                value={code}
                onChange={(event) => setCode(event.target.value)}
                required
              />
            </div>

            <div>
              <div className='mb-2 block'>
                <Label htmlFor='name' value='Naziv proizvoda' />
              </div>
              <TextInput
                id='name'
                placeholder='Proizvod'
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
              />
            </div>

            <div>
              <div className='mb-2 block'>
                <Label htmlFor='description' value='Opis proizvoda' />
              </div>
              <TextInput
                id='description'
                placeholder='Opis'
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                required
              />
            </div>

            <div>
              <div className='mb-2 block'>
                <Label value='Materijali' />
              </div>
              {materials && (
                <div className='space-y-4'>
                  {materialsInput.map((material, index) => (
                    <div key={index} className='flex items-center space-x-4 mb-2 rounded-lg'>
                      <div className='flex-auto w-64'>
                        <Select
                          value={material.materialId}
                          onChange={(event) =>
                            handleMaterialChange(index, 'materialId', parseInt(event.target.value))
                          }
                          required
                        >
                          <option value={0} disabled hidden>
                            Materijal
                          </option>
                          {materials.map((material) => (
                            <option key={material.id} value={material.id}>
                              {material.name}
                            </option>
                          ))}
                        </Select>
                      </div>
                      <div className='flex-auto w-24'>
                        <TextInput
                          type='number'
                          value={material.materialCount}
                          onChange={(event) =>
                            handleMaterialChange(
                              index,
                              'materialCount',
                              parseInt(event.target.value)
                            )
                          }
                          required
                        />
                      </div>
                      <div className='flex-none w-16'>
                        <TextInput
                          placeholder='mg'
                          value={material.measurementUnit}
                          onChange={(event) =>
                            handleMaterialChange(index, 'measurementUnit', event.target.value)
                          }
                          required
                        />
                      </div>
                      <Button
                        pill
                        size={'xs'}
                        color='gray'
                        onClick={() => handleRemoveMaterial(index)}
                      >
                        <HiOutlineX color='red' />
                      </Button>
                    </div>
                  ))}
                  <Button pill size={'xs'} color='gray' onClick={handleAddMaterial}>
                    <HiOutlinePlus color='green' />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className='w-full'>
            <Button color='blue' onClick={handleCreateProduct}>
              Dodaj proizvod
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default ProductAddModal;
