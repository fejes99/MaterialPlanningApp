import { Products } from 'wasp/client/crud';
import ProductTable from '../components/ProductTable';
import ProductAddModal from '../components/modals/ProductAddModal';

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
