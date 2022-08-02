import { useCreateCustomProductMutation } from '@data/products/user-create-custom-product.mutation';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

type IProps = {
  properties: any[];
};

export default function CustomProductForm({ properties }: IProps) {
  const { t } = useTranslation();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({});

  const {
    mutate: createCustomProduct,
    isLoading: creating,
    isError: error,
  } = useCreateCustomProductMutation();

  //here
}
