import { Products } from '@wasp/crud/Products';
import ProductTable from '../components/products/ProductTable';
import ProductAddModal from '../components/products/modals/ProductAddModal';

const ProductPage: React.FC = () => {
  const { data: products, isLoading, error } = Products.getAll.useQuery();

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  return (
    <>
      <ProductAddModal />
      <ProductTable products={products} />
    </>
  );
};
export default ProductPage;
