import Popup from '@components/products/details/popup';
import { useProductQuery } from '@data/products/product.query';
// import { useProductQuery } from '@framework/products/products.query';

const ProductPopup = ({ id }: { id: string }) => {
  const { data, isLoading: loading } = useProductQuery(id);

  return <Popup product={data!} loading={loading} />;
};

export default ProductPopup;
