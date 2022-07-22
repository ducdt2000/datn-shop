import { useState } from 'react';
import Cookies from 'js-cookie';
import { useLoginMutation } from '@framework/auth/auth.query';
import { useTranslation } from 'next-i18next';
import { useModalAction } from '@components/ui/modal/modal.context';
import LoginForm from '@components/auth/login-form';
import { useAtom } from 'jotai';
import { authorizationAtom } from '@store/authorization-atom';
import { AUTH_TOKEN } from '@lib/constants';

type FormValues = {
  account: string;
  password: string;
};

const Login = () => {
  const { t } = useTranslation('common');

  const [errorMessage, setErrorMessage] = useState('');
  const [_, authorize] = useAtom(authorizationAtom);
  const { closeModal } = useModalAction();
  const { mutate: login, isLoading: loading } = useLoginMutation();

  function onSubmit({ account, password }: FormValues) {
    login(
      {
        account,
        password,
      },
      {
        onSuccess: ({ data }) => {
          if (data?.token) {
            Cookies.set(AUTH_TOKEN, data.token);
            authorize(true);
            closeModal();
            return;
          } else {
            if (data.detail) {
              setErrorMessage('form:error-account-block');
            }
            setErrorMessage('form:error-credential-wrong');
          }
        },
        onError: (error: any) => {},
      }
    );
  }
  return (
    <LoginForm
      onSubmit={onSubmit}
      errorMessage={errorMessage}
      loading={loading}
    />
  );
};

export default Login;
