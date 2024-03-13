import { useState } from 'react';
import { HiOutlinePlus, HiOutlineX } from 'react-icons/hi';
import { Button, Label, Modal, TextInput, Select } from 'flowbite-react';
import { Materials } from 'wasp/client/crud';
import {
  useQuery,
  getActiveProductionPlans,
  createReservation,
  updateMaterialCount,
} from 'wasp/client/operations';
import { convertShortDate } from '../../../common/helpers/formatDate';
import { MaterialUnit } from '../../../materials/types/MaterialUnit';
import { convertUnit } from '../../../materials/helpers/convertUnit';

const ReservationAddModal: React.FC = () => {
  const { data: productionPlans } = useQuery(getActiveProductionPlans);
  const { data: materials } = Materials.getAll.useQuery();

  const [openModal, setOpenModal] = useState(false);
  const [selectedProductionPlan, setSelectedProductionPlan] = useState<any>(null);
  const [materialsInput, setMaterialsInput] = useState<
    Array<{ materialId: number; materialCount: number; measurementUnit: string }>
  >([]);

  const onCloseModal = () => {
    setOpenModal(false);
    resetFields();
  };

  const resetFields = () => {
    setSelectedProductionPlan(null);
    setMaterialsInput([]);
  };

  const handleProductionPlanChange = (value: any) => {
    const selectedPlanId = parseInt(value);
    const selectedPlan = findSelectedPlan(selectedPlanId);
    setSelectedProductionPlan(selectedPlan);

    if (selectedPlan) {
      const mergedMaterials = mergeMaterials(selectedPlan);
      updateMaterialsInput(mergedMaterials);
    }
  };

  const findSelectedPlan = (selectedPlanId: number) =>
    productionPlans?.find((plan: any) => plan.id === selectedPlanId);

  const mergeMaterials = (selectedPlan: any) => {
    const mergedMaterials: {
      [key: number]: { materialId: number; materialCount: number; measurementUnit: string };
    } = {};
    selectedPlan.products.forEach((productionPlanProduct: any) => {
      productionPlanProduct.product.materials.forEach((productMaterial: any) => {
        const existingMaterial = mergedMaterials[productMaterial.materialId];
        if (existingMaterial) {
          mergedMaterials[productMaterial.materialId].materialCount +=
            productMaterial.materialCount;
        } else {
          mergedMaterials[productMaterial.materialId] = {
            materialId: productMaterial.materialId,
            materialCount: productMaterial.materialCount,
            measurementUnit: productMaterial.measurementUnit,
          };
        }
      });
    });
    return Object.values(mergedMaterials);
  };

  const updateMaterialsInput = (mergedMaterials: any[]) => {
    const updatedMaterials = mergedMaterials.map((mergedMaterial: any) => {
      const materialInStorage = findMaterialInStorage(mergedMaterial.materialId);
      const maxCount = calculateMaxCount(mergedMaterial, materialInStorage);
      return { ...mergedMaterial, materialCount: maxCount };
    });

    setMaterialsInput(updatedMaterials);
  };

  const findMaterialInStorage = (materialId: number) =>
    materials?.find((material: any) => material.id === materialId);

  const calculateMaxCount = (mergedMaterial: any, materialInStorage: any) => {
    const defaultCount = 0;
    let materialCountInStorage = materialInStorage?.count || defaultCount;

    materialCountInStorage = convertUnit(
      materialCountInStorage,
      materialInStorage.measurementUnit,
      mergedMaterial.measurementUnit
    );

    return Math.min(materialCountInStorage, mergedMaterial.materialCount);
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

  const handleCreateReservation = async () => {
    try {
      await Promise.all(
        materialsInput.map(async (material) => {
          await updateMaterialCount({ material, operation: 'reduce' });
        })
      );

      await createReservation({
        createdFor: selectedProductionPlan.createdFor,
        productionPlanId: selectedProductionPlan.id,
        materials: materialsInput,
      });

      onCloseModal();
    } catch (error) {
      console.error('Error creating reservation:', error);
    }
  };

  return (
    <>
      <div className='flex justify-end mb-4'>
        <Button color='blue' onClick={() => setOpenModal(true)}>
          <HiOutlinePlus className='mr-2' /> Dodaj rezervaciju
        </Button>
      </div>

      <Modal show={openModal} onClose={onCloseModal}>
        <Modal.Header>Dodaj rezervaciju</Modal.Header>
        <Modal.Body>
          <div className='space-y-6'>
            <div>
              <div className='mb-2 block'>
                <Label value='Proizvodni planovi' />
              </div>
              <Select
                required
                value={selectedProductionPlan?.id || ''}
                onChange={(event) => handleProductionPlanChange(event.target.value)}
              >
                <option value='' disabled hidden>
                  Izaberite proizvodni plan
                </option>
                {productionPlans?.map((plan: any) => (
                  <option key={plan.id} value={plan.id}>
                    {plan.code}
                  </option>
                ))}
              </Select>
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
            <Button onClick={handleCreateReservation}>Dodaj rezervaciju</Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ReservationAddModal;
