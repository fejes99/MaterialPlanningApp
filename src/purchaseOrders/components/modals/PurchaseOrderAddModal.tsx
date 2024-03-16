import { useState } from 'react';
import { HiOutlinePlus, HiOutlineX } from 'react-icons/hi';
import { Button, Label, Modal, TextInput, Select } from 'flowbite-react';
import { Materials, PurchaseRequests, Suppliers } from 'wasp/client/crud';
import {
  createPurchaseOrder,
  createSupplierConfirmation,
  updatePurchaseRequestProcessingDate,
  updatePurchaseRequestDeliveryDate,
} from 'wasp/client/operations';
import { MaterialUnit } from '../../../materials/types/MaterialUnit';
import { MaterialInput } from '../../../materials/types/MaterialInput';
import { convertUnit } from '../../../materials/helpers/convertUnit';
import { convertFullDate } from '../../../common/helpers/formatDate';

const PurchaseOrderAddModal: React.FC = () => {
  const { data: materials } = Materials.getAll.useQuery();
  const { data: suppliers } = Suppliers.getAll.useQuery();
  const { data: purchaseRequests } = PurchaseRequests.getAll.useQuery();

  const [openModal, setOpenModal] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState<any>(null);
  const [selectedPurchaseRequest, setSelectedPurchaseRequest] = useState<any>(null);
  const [materialsInput, setMaterialsInput] = useState<MaterialInput[]>([]);

  const onCloseModal = () => {
    setOpenModal(false);
    resetFields();
  };

  const resetFields = () => {
    setSelectedPurchaseRequest(null);
    setMaterialsInput([]);
  };

  const handleSupplierChange = (value: any) => {
    const selectedSupplierId = parseInt(value);
    const selectedSupplier = findSelectedSupplier(selectedSupplierId);
    setSelectedSupplier(selectedSupplier);
  };

  const findSelectedSupplier = (selectedSupplierId: number) =>
    suppliers?.find((supplier: any) => supplier.id === selectedSupplierId);

  const handlePurchaseRequestChange = (value: any) => {
    const selectedRequestId = parseInt(value);
    const selectedRequest = findSelectedRequest(selectedRequestId);
    setSelectedPurchaseRequest(selectedRequest);

    if (selectedRequest) {
      const mergedMaterials = mergeMaterials(selectedRequest);
      setMaterialsInput(mergedMaterials);
    }
  };

  const findSelectedRequest = (selectedRequestId: number) =>
    purchaseRequests?.find((request: any) => request.id === selectedRequestId);

  const mergeMaterials = (selectedRequest: any) => {
    const mergedMaterials: {
      [key: number]: { materialId: number; materialCount: number; measurementUnit: string };
    } = {};

    selectedRequest.materials.forEach((purchaseRequestMaterial: any) => {
      const existingMaterial = mergedMaterials[purchaseRequestMaterial.materialId];
      if (existingMaterial) {
        mergedMaterials[purchaseRequestMaterial.materialId].materialCount +=
          purchaseRequestMaterial.materialCount;
      } else {
        mergedMaterials[purchaseRequestMaterial.materialId] = {
          materialId: purchaseRequestMaterial.materialId,
          materialCount: purchaseRequestMaterial.materialCount,
          measurementUnit: purchaseRequestMaterial.measurementUnit,
        };
      }
    });

    return Object.values(mergedMaterials);
  };

  const handleMeasurementUnitChange = (index: number, value: string) => {
    const materialToUpdate = materialsInput[index];
    const oldCount = materialToUpdate['materialCount'];
    const oldUnit = materialToUpdate['measurementUnit'];
    const updatedCount = convertUnit(oldCount, oldUnit, value);

    setMaterialsInput(
      materialsInput.map((mat, idx) =>
        idx === index ? { ...mat, materialCount: updatedCount, measurementUnit: value } : mat
      )
    );
  };

  const handleCreatePurchaseOrder = async () => {
    const purchaseOrder = await createPurchaseOrder({
      supplierId: selectedSupplier.id,
      purchaseRequestId: selectedPurchaseRequest.id,
      materials: materialsInput,
    });

    await updatePurchaseRequestProcessingDate({
      id: purchaseOrder.purchaseRequestId,
    });

    const deliveryDate = new Date(purchaseOrder.createdAt);
    deliveryDate.setDate(deliveryDate.getDate() + 1);

    await createSupplierConfirmation({
      deliveryDate,
      supplierId: selectedSupplier.id,
      purchaseOrderId: purchaseOrder.id,
      materials: materialsInput,
    });

    await updatePurchaseRequestDeliveryDate({
      id: purchaseOrder.purchaseRequestId,
      deliveryDate,
    });

    onCloseModal();
  };

  return (
    <>
      <div className='flex justify-end mb-4'>
        <Button color='blue' onClick={() => setOpenModal(true)}>
          <HiOutlinePlus className='mr-2' /> Dodaj porudžbinu
        </Button>
      </div>

      <Modal show={openModal} onClose={onCloseModal}>
        <Modal.Header>Dodaj porudžbinu</Modal.Header>
        <Modal.Body>
          <div className='space-y-6'>
            <div>
              <div className='mb-2 block'>
                <Label value='Zahtevi za nabavku' />
              </div>
              <Select
                required
                value={selectedPurchaseRequest?.id || ''}
                onChange={(event) => handlePurchaseRequestChange(event.target.value)}
              >
                <option value='' disabled hidden>
                  Izaberite zahtev
                </option>
                {purchaseRequests?.map((request: any) => (
                  <option key={request.id} value={request.id}>
                    {request.id} ({convertFullDate(request.createdAt)})
                  </option>
                ))}
              </Select>
            </div>

            <div>
              <div className='mb-2 block'>
                <Label value='Dobavljači' />
              </div>
              <Select
                required
                value={selectedSupplier?.id || ''}
                onChange={(event) => handleSupplierChange(event.target.value)}
              >
                <option value='' disabled hidden>
                  Izaberite dobavljača
                </option>
                {suppliers?.map((supplier: any) => (
                  <option key={supplier.id} value={supplier.id}>
                    {supplier.id} ({supplier.name})
                  </option>
                ))}
              </Select>
            </div>

            <div>
              <div className='mb-2 block'>
                <Label value='Materijali' />
              </div>
              <div className='space-y-4'>
                {materialsInput.map((material, index) => (
                  <div key={index} className='flex items-center space-x-4 mb-2 rounded-lg'>
                    <div className='flex-auto w-64'>
                      <Select
                        value={material.materialId}
                        onChange={(event) =>
                          setMaterialsInput(
                            materialsInput.map((mat, idx) =>
                              idx === index
                                ? { ...mat, materialId: parseInt(event.target.value) }
                                : mat
                            )
                          )
                        }
                        required
                      >
                        <option value='' disabled hidden>
                          Izaberite materijal
                        </option>
                        {materials?.map((mat: any) => (
                          <option key={mat.id} value={mat.id}>
                            {mat.name}
                          </option>
                        ))}
                      </Select>
                    </div>
                    <div className='flex-auto w-24'>
                      <TextInput
                        type='number'
                        value={material.materialCount}
                        onChange={(event) =>
                          setMaterialsInput(
                            materialsInput.map((mat, idx) =>
                              idx === index
                                ? { ...mat, materialCount: parseInt(event.target.value) }
                                : mat
                            )
                          )
                        }
                        required
                      />
                    </div>
                    <div className='flex-none w-20'>
                      <Select
                        required
                        value={material.measurementUnit}
                        onChange={(event) => handleMeasurementUnitChange(index, event.target.value)}
                      >
                        {Object.values(MaterialUnit).map((unit) => (
                          <option key={unit} value={unit}>
                            {unit}
                          </option>
                        ))}
                      </Select>
                    </div>
                    <Button
                      pill
                      size={'xs'}
                      color='gray'
                      onClick={() =>
                        setMaterialsInput(materialsInput.filter((_, idx) => idx !== index))
                      }
                    >
                      <HiOutlineX color='red' />
                    </Button>
                  </div>
                ))}
                <Button
                  pill
                  size={'xs'}
                  color='gray'
                  onClick={() =>
                    setMaterialsInput([
                      ...materialsInput,
                      { materialId: 0, materialCount: 0, measurementUnit: MaterialUnit.Milligrams },
                    ])
                  }
                >
                  <HiOutlinePlus color='green' />
                </Button>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className='w-full'>
            <Button onClick={handleCreatePurchaseOrder}>Dodaj porudžbinu</Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PurchaseOrderAddModal;
