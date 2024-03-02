import { useState } from 'react';
import createProductionPlan from '@wasp/actions/createProductionPlan.js';
import { Button, Label, Modal, TextInput, Select } from 'flowbite-react';
import { ProductionPlanStatus } from '../../../../shared/productionPlan/types.ts';
import { Products } from '@wasp/crud/Products';
import { HiOutlinePlus, HiOutlineX } from 'react-icons/hi';

const ProductionPlanAddModal = () => {
  const { data: products } = Products.getAll.useQuery();

  const [openModal, setOpenModal] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(formatMonth(new Date()));
  const [productsInput, setProductsInput] = useState([{ productId: 0, productCount: 0 }]);

  const onCloseModal = () => {
    setOpenModal(false);
    resetFields();
  };

  const resetFields = () => {
    setSelectedMonth(formatMonth(new Date()));
    setProductsInput([{ productId: 0, productCount: 0 }]);
  };

  const handleCreateProductionPlan = () => {
    const code = `PP${selectedMonth.substring(5, 7)}${selectedMonth.substring(2, 4)}`;
    try {
      const createdAt = new Date();
      const currentYear = createdAt.getFullYear();
      const currentMonth = createdAt.getMonth();
      const currentDate = createdAt.getDate();
      const currentHours = createdAt.getHours();
      const currentMinutes = createdAt.getMinutes();
      const currentSeconds = createdAt.getSeconds();
      const createdAtLocalTimezone = new Date(
        currentYear,
        currentMonth,
        currentDate,
        currentHours,
        currentMinutes,
        currentSeconds
      );

      createProductionPlan({
        code,
        createdAt: createdAtLocalTimezone,
        createdFor: new Date(selectedMonth),
        status: ProductionPlanStatus.Active,
        products: productsInput,
      });
      resetFields();
    } catch (error) {
      console.log('🚀 ~ handleCreateProductionPlan ~ error:', error);
    }
  };

  const handleMonthChange = (event) => setSelectedMonth(event.target.value);

  function formatMonth(date: Date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    return `${year}-${month}`;
  }

  const handleAddProduct = () =>
    setProductsInput([...productsInput, { productId: 0, productCount: 0 }]);

  const handleRemoveProduct = (index: number) => {
    const updatedProducts = [...productsInput];
    updatedProducts.splice(index, 1);
    setProductsInput(updatedProducts);
  };

  const handleProductChange = (index: number, key: string, value: number) => {
    const updatedProducts = [...productsInput];
    updatedProducts[index][key] = value;
    setProductsInput(updatedProducts);
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
                value={`PP${selectedMonth.substring(5, 7)}${selectedMonth.substring(2, 4)}`}
                disabled
                required
              />
            </div>

            <div className='flex items-center mb-2'>
              <div className='mr-4'>
                <Label htmlFor='code' value='Planirani mesec počev od' />
              </div>
              <div className='relative'>
                <input
                  type='month'
                  id='dateFor'
                  value={selectedMonth}
                  onChange={handleMonthChange}
                  className='w-full px-4 py-2 border rounded-md'
                />
              </div>
            </div>

            <div>
              <div className='mb-2 block'>
                <Label value='Proizvodi' />
              </div>
              {products && (
                <div className='space-y-4'>
                  {productsInput.map((product, index) => (
                    <div key={index} className='flex items-center space-x-4 mb-2 rounded-lg'>
                      <div className='flex-auto w-64'>
                        <Select
                          value={product.productId}
                          onChange={(event) =>
                            handleProductChange(index, 'productId', parseInt(event.target.value))
                          }
                          required
                        >
                          <option value={0} disabled hidden>
                            Proizvod
                          </option>
                          {products.map((product) => (
                            <option key={product.id} value={product.id}>
                              {product.name}
                            </option>
                          ))}
                        </Select>
                      </div>

                      <div className='flex-1'>
                        <TextInput
                          type='number'
                          value={product.productCount}
                          onChange={(event) =>
                            handleProductChange(index, 'productCount', parseInt(event.target.value))
                          }
                          required
                        />
                      </div>

                      <Button
                        pill
                        size={'xs'}
                        color='gray'
                        onClick={() => handleRemoveProduct(index)}
                      >
                        <HiOutlineX color='red' />
                      </Button>
                    </div>
                  ))}
                  <Button pill size={'xs'} color='gray' onClick={handleAddProduct}>
                    <HiOutlinePlus color='green' />
                  </Button>
                </div>
              )}
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
