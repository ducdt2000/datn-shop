import { useQuery } from 'react-query';
import { API_ENDPOINTS } from '@utils/api/endpoints';
import ProductRepository from '@repositories/product';
import {
  ProductsQueryOptionsType,
  QueryParamsType,
} from '@ts-types/custom.types';
import { createQueryPath } from '@utils/query';

const fetchCustomTemplates = async () => {
  const { data } = await ProductRepository.getProductTemplates(
    API_ENDPOINTS.CUSTOM_PRODUCT_TEMPLATE
  );

  return { templates: data };
};

const fetchCustomTemplate = async (id: number) => {
  const { data } = await ProductRepository.getProductTemplate(
    API_ENDPOINTS.CUSTOM_PRODUCT_TEMPLATE,
    id
  );

  return { template: data };
};

const useTemplateQuery = (id: number) => {
  return useQuery<any, Error>([API_ENDPOINTS.CUSTOM_PRODUCT_TEMPLATE, id], () =>
    fetchCustomTemplate(id)
  );
};

const fetchProducts = async ({ queryKey }: QueryParamsType) => {
  const [_key, params] = queryKey;

  const url = createQueryPath(API_ENDPOINTS.PRODUCTS, params);
  const {
    data: { data, ...rest },
  } = await ProductRepository.all(url);

  return { products: { data }, meta: rest };
};

const useTemplatesQuery = (options: any = {}) => {
  return useQuery<any, Error>(
    [API_ENDPOINTS.CUSTOM_PRODUCT_TEMPLATE],
    fetchCustomTemplates,
    {
      ...options,
      keepPreviousData: true,
    }
  );
};

const useProductsQuery = (
  params: ProductsQueryOptionsType,
  options: any = {}
) =>
  useQuery<any, Error>([API_ENDPOINTS.PRODUCTS, params], fetchProducts, {
    ...options,
    keepPreviousData: true,
  });

const fetchProduct = async (id: string) => {
  const {
    data: { data },
  } = await ProductRepository.find(`${API_ENDPOINTS.PRODUCTS}/${id}`);
  return data;
};

const useProductQuery = (id: string) => {
  return useQuery<any, Error>([API_ENDPOINTS.PRODUCTS, id], () =>
    fetchProduct(id)
  );
};

export {
  fetchCustomTemplates,
  useProductsQuery,
  fetchProducts,
  useProductQuery,
  fetchProduct,
  useTemplatesQuery,
  useTemplateQuery,
  fetchCustomTemplate,
};
