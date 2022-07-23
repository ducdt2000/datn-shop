import { NextPage } from 'next';
import { AppProps } from 'next/app';
import AppProviders from '@framework/app/providers';
import { SearchProvider } from '@components/ui/search/search.context';
import { ModalProvider } from '@components/ui/modal/modal.context';
import { CartProvider } from '@store/quick-cart/cart.context';
import { SessionProvider } from 'next-auth/react';
import { DefaultSeo } from 'next-seo';
import PrivateRoute from '@lib/private-route';
import { appWithTranslation } from 'next-i18next';
import '@assets/main.css';
import ManagedModal from '@components/ui/modal/managed-modal';
import ManagedDrawer from '@components/ui/drawer/managed-drawer';
import { ToastContainer } from 'react-toastify';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
  authenticate?: boolean;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function CustomApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  const authProps = Component.authenticate;

  return (
    <AppProviders pageProps={pageProps}>
      <SearchProvider>
        <ModalProvider>
          <CartProvider>
            <SessionProvider>
              <>
                <DefaultSeo />
                {Boolean(authProps) ? (
                  <PrivateRoute>
                    {getLayout(<Component {...pageProps} />)}
                  </PrivateRoute>
                ) : (
                  getLayout(<Component {...pageProps} />)
                )}
                <ManagedModal />
                <ManagedDrawer />
                <ToastContainer autoClose={2000} theme="colored" />
              </>
            </SessionProvider>
          </CartProvider>
        </ModalProvider>
      </SearchProvider>
    </AppProviders>
  );
}
export default appWithTranslation(CustomApp);
