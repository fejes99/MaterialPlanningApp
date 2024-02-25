type Props = {};
import { Products } from '@wasp/crud/Products';

const ProductPage: React.FC = () => {
  const { data: products, isLoading, error } = Products.getAll.useQuery();
  console.log("🚀 ~ products:", products)

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  return <div>ProductPage</div>;
};
export default ProductPage;
