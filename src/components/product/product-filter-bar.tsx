import { SearchIcon } from '@components/icons/search-icon';
import Button from '@components/ui/button';
import Input from '@components/ui/input';
import Label from '@components/ui/label';
import CategoriesLoader from '@components/ui/loaders/categories-loader';
import NotFound from '@components/ui/not-found';
import Scrollbar from '@components/ui/scrollbar';
import Select from '@components/ui/select/select';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useState } from 'react';

const ProductFilterBar: React.FC<any> = ({
  notFound,
  productTypes,
  brands,
  className,
  loading,
}) => {
  const { t } = useTranslation();
  const router = useRouter();

  const queries = router.query;

  const [brandId, setBrandId] = useState(queries.brandId);
  const [productTypeId, setProductType] = useState(queries.productTypeId);
  const [search, setSearch] = useState(queries.search);

  const onBrandIdFilter = (value: any) => {
    setBrandId(value?.value);
  };

  const onProductTypeIdFilter = (value: any) => {
    setProductType(value?.value);
  };

  const onSearch = () => {
    router.push(
      {
        query: {
          brandId,
          productTypeId,
          search,
        },
      },
      undefined,
      {
        scroll: false,
      }
    );
  };

  if (loading) {
    return (
      <div className="hidden xl:block">
        <div className="w-72 mt-8 px-2">
          <CategoriesLoader />
        </div>
      </div>
    );
  }

  return (
    <aside
      className={`lg:sticky lg:top-22 h-full xl:w-72 hidden xl:block bg-light ${className}`}
    >
      <div className="max-h-full overflow-hidden">
        <Scrollbar
          className="w-full max-h-screen"
          style={{ height: 'calc(100vh - 5.35rem)' }}
        >
          {!notFound ? (
            <div className="px-5">
              <div className="mt-5">
                <Label>{t('form:input-label-search')}</Label>
                <Input
                  placeholder={t('common:text-search-placeholder')}
                  name="search"
                  onChange={(value: any) => {
                    setSearch(value.target.value);
                  }}
                ></Input>
              </div>
              <div className="mt-5">
                <Label>{t('form:input-label-brand')}</Label>
                <Select
                  onChange={onBrandIdFilter}
                  options={brands?.map((brand: any) => ({
                    value: brand.id,
                    name: brand.name,
                  }))}
                  isClearable={true}
                  getOptionLabel={(option: any) => option.name}
                  isLoading={loading}
                />
              </div>
              <div className="mt-5">
                <Label>{t('form:input-label-productType')}</Label>
                <Select
                  onChange={onProductTypeIdFilter}
                  options={productTypes?.map((productType: any) => ({
                    value: productType.id,
                    name: productType.name,
                  }))}
                  isClearable={true}
                  getOptionLabel={(option: any) => option.name}
                  isLoading={loading}
                />
              </div>
              <div className="mt-5">
                <Button onClick={onSearch} className="w-full">
                  <SearchIcon className="w-4 h-4 me-2.5" />
                  {t('common:text-search')}
                </Button>
              </div>
            </div>
          ) : (
            <div className="min-h-full w-full pt-6 pb-8 px-9 lg:p-8">
              <NotFound text="text-no-category" className="h-96" />
            </div>
          )}
        </Scrollbar>
      </div>
    </aside>
  );
};

export default ProductFilterBar;
