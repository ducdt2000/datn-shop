import { CreateCustomProduct } from '@repositories/product';
import { useRouter } from 'next/router';
import { useMutation, useQueryClient } from 'react-query';
import ProductRepository from '@repositories/product';
import { API_ENDPOINTS } from '@utils/api/endpoints';
import { ROUTES } from '@lib/routes';

export interface ICustomProductCreateVariables {
  variables: {
    input: CreateCustomProduct;
  };
}

export const useCreateCustomProductMutation = () => {
  const queryClient = useQueryClient();

  const router = useRouter();

  return useMutation(
    ({ variables: { input } }: ICustomProductCreateVariables) => {
      return ProductRepository.createCustomProduct(
        API_ENDPOINTS.CUSTOM_PRODUCT,
        input
      );
    },
    {
      onSuccess: () => {
        router.push(ROUTES.HOME);
      },
      onSettled: () => {
        queryClient.invalidateQueries(API_ENDPOINTS.PRODUCTS);
      },
    }
  );
};
