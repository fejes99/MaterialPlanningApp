import { useState } from 'react';
import { HiOutlinePlus } from 'react-icons/hi';
import { Button, Label, Modal, TextInput, Select } from 'flowbite-react';
import { createReceipt, updateMaterialCount } from 'wasp/client/operations';
import { SupplierConfirmations, Materials } from 'wasp/client/crud';
import { MaterialInput } from '../../../materials/types/MaterialInput';
import { convertFullDate } from '../../../common/helpers/formatDate';

const ReceiptAddModal: React.FC = () => {
  const { data: confirmations } = SupplierConfirmations.getAll.useQuery();
  const { data: materials } = Materials.getAll.useQuery();

  const [openModal, setOpenModal] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState<any>(null);
  const [selectedConfirmation, setSelectedConfirmation] = useState<any>(null);
  const [materialsInput, setMaterialsInput] = useState<MaterialInput[]>([]);

  const onCloseModal = () => {
    setOpenModal(false);
    resetFields();
  };

  const resetFields = () => {
    setSelectedSupplier(null);
    setSelectedConfirmation(null);
    setMaterialsInput([]);
  };

  const handleConfirmationChange = (value: any) => {
    const selectedConfirmationId = parseInt(value);
    const selectedConfirmation = findSelectedConfirmation(selectedConfirmationId);
    setSelectedConfirmation(selectedConfirmation);
    setSelectedSupplier(selectedConfirmation?.supplier);

    if (selectedConfirmation) {
      const mergedMaterials = mergeMaterials(selectedConfirmation);
      setMaterialsInput(mergedMaterials);
    }
  };

  const findSelectedConfirmation = (selectedConfirmationId: number) =>
    confirmations?.find((confirmation: any) => confirmation.id === selectedConfirmationId);

  const mergeMaterials = (selectedConfirmation: any) => {
    const mergedMaterials: {
      [key: number]: { materialId: number; materialCount: number; measurementUnit: string };
    } = {};

    selectedConfirmation.materials.forEach((confirmationMaterial: any) => {
      const existingMaterial = mergedMaterials[confirmationMaterial.materialId];
      if (existingMaterial) {
        mergedMaterials[confirmationMaterial.materialId].materialCount +=
          confirmationMaterial.materialCount;
      } else {
        mergedMaterials[confirmationMaterial.materialId] = {
          materialId: confirmationMaterial.materialId,
          materialCount: confirmationMaterial.materialCount,
          measurementUnit: confirmationMaterial.measurementUnit,
        };
      }
    });

    return Object.values(mergedMaterials);
  };

  const handleCreateReceipt = async () => {
    try {
      await Promise.all(
        materialsInput.map(async (material) => {
          await updateMaterialCount({ material, operation: 'increase' });
        })
      );

      createReceipt({
        purchaseOrderId: selectedConfirmation.purchaseOrderId,
        materials: materialsInput,
      });

      onCloseModal();
    } catch (error) {
      console.error('Error creating receipt:', error);
    }
  };

  return (
    <>
      <div className='flex justify-end mb-4'>
        <Button color='blue' onClick={() => setOpenModal(true)}>
          <HiOutlinePlus className='mr-2' /> Dodaj prijemnicu
        </Button>
      </div>

      <Modal show={openModal} onClose={onCloseModal}>
        <Modal.Header>Dodaj prijemnicu</Modal.Header>
        <Modal.Body>
          <div className='space-y-6'>
            <div>
              <div className='mb-2 block'>
                <Label value='Potvrde dobavljača' />
              </div>
              <Select
                required
                value={selectedConfirmation?.id || ''}
                onChange={(event) => handleConfirmationChange(event.target.value)}
              >
                <option value='' disabled hidden>
                  Izaberite potvrdu
                </option>
                {confirmations?.map((confirmation: any) => (
                  <option key={confirmation.id} value={confirmation.id}>
                    ({confirmation.id}) {confirmation.supplier.name} (
                    {convertFullDate(confirmation.createdAt)})
                  </option>
                ))}
              </Select>
            </div>

            <div>
              <div className='mb-2 block'>
                <Label htmlFor='code' value='Dobavljač' />
              </div>
              <TextInput
                id='selectedSupplier'
                placeholder='Dobavljač'
                value={selectedSupplier?.name}
                disabled
              />
            </div>

            <div>
              <div className='mb-2 block'>
                <Label value='Materijali' />
              </div>
              <div className='space-y-4'>
                {materialsInput.map((material, index) => (
                  <div key={index} className='flex items-center space-x-4 mb-2 rounded-lg'>
                    <div className='flex-auto w-64'>
                      <TextInput
                        value={materials?.find((m) => m.id === material.materialId)?.name || ''}
                        disabled
                      />
                    </div>
                    <div className='flex-auto w-24'>
                      <TextInput type='number' value={material.materialCount} disabled />
                    </div>
                    <div className='flex-none w-20'>
                      <TextInput required value={material.measurementUnit} disabled />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className='w-full'>
            <Button onClick={handleCreateReceipt}>Dodaj prijemnicu</Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ReceiptAddModal;
