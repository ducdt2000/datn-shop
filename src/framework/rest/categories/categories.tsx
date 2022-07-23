import { useRouter } from 'next/router';
import ErrorMessage from '@components/ui/error-message';
import { useCategoriesQuery } from '@framework/categories/categories.query';
import dynamic from 'next/dynamic';
import useHomepage from '@framework/utils/use-homepage';
import { useProductTypesQuery } from '@data/product-types/product-type.query';
import { useBrandsQuery } from '@data/brands/brand.query';
import { Category } from '@framework/types';
const StickySidebarListCategories = dynamic(
  () => import('@components/categories/sticky-sidebar-list-categories')
);

const ProductFilterBar = dynamic(
  () => import('@components/product/product-filter-bar')
);

const MAP_CATEGORY_TO_GROUP: Record<string, any> = {
  classic: StickySidebarListCategories,
  modern: StickySidebarListCategories,
  standard: StickySidebarListCategories,
  default: StickySidebarListCategories,
};

const Categories: React.FC<{ layout: string; className?: string }> = ({
  layout,
  className,
}) => {
  const { query } = useRouter();
  const { homePage } = useHomepage();
  // const {
  //   data,
  //   isLoading: loading,
  //   error,
  // } = useCategoriesQuery({
  //   type: (query.pages?.[0] as string) ?? homePage?.slug,
  // });

  const {
    data: dataProductType,
    isLoading: loadingProductType,
    error: errorProductType,
  } = useProductTypesQuery();
  const {
    data: dataBrands,
    isLoading: loadingBrand,
    error: errorBrand,
  } = useBrandsQuery({});

  const categories: Category[] = [];
  const typeCate: Category = {
    icon: 'Table',
    name: 'Product Type',
    searchType: 'category',
    children: dataProductType?.productTypes?.data?.map((type: any) => ({
      name: type?.name,
      id: type?.id,
    })),
  };

  const brandCate: Category = {
    icon: 'IconBrand',
    name: 'Brand',
    searchType: 'brand',
    children: dataBrands?.brands?.data?.map((type: any) => ({
      name: type?.name,
      id: type?.id,
    })),
  };

  categories.push(typeCate, brandCate);

  if (errorBrand && errorProductType)
    return <ErrorMessage message={errorProductType.message} />;
  // const Component = layout
  //   ? MAP_CATEGORY_TO_GROUP[layout]
  //   : MAP_CATEGORY_TO_GROUP['default'];
  return (
    <ProductFilterBar
      notFound={!Boolean(categories.length)}
      productTypes={dataProductType?.productTypes?.data}
      brands={dataBrands?.brands?.data}
      className={className}
      loading={loadingBrand && loadingProductType}
    />
    // <Component
    //   notFound={!Boolean(categories.length)}
    //   categories={categories}
    //   loading={loadingBrand}
    //   className={className}
    // />
  );
};

export default Categories;
