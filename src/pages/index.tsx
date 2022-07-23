import useLayout from '@framework/utils/use-layout';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useWindowSize } from 'react-use';
import { scroller } from 'react-scroll';
import Seo from '@components/seo/seo';
import { getLayout } from '@components/layouts/layout';
import { GetServerSideProps } from 'next';
import { getAuthCredentials } from '@utils/auth-utils';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
// export { getStaticProps } from '@framework/ssr/pages';

const Classic = dynamic(() => import('@components/layouts/classic'));
const MAP_LAYOUT_TO_GROUP: Record<string, any> = {
  classic: Classic,
  minimal: Classic,
  default: Classic,
};

const CartCounterButton = dynamic(
  () => import('@components/cart/cart-counter-button'),
  { ssr: false }
);

export default function Home() {
  const { query } = useRouter();
  const { width } = useWindowSize();
  const { layout, page } = useLayout();

  useEffect(() => {
    if (query.search || query.productTypeId || query.brandId) {
      scroller.scrollTo('grid', {
        smooth: true,
        offset: -110,
      });
    }
  }, [query.search, query.productTypeId, query.brandId]);
  let Component = MAP_LAYOUT_TO_GROUP['default'];
  return (
    <>
      <Seo url={page?.slug!} images={[]} />
      <Component />
      {width > 1023 && <CartCounterButton />}
    </>
  );
}

Home.getLayout = getLayout;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { locale } = ctx;
  const { token, role } = getAuthCredentials(ctx);
  if (locale) {
    return {
      props: {
        ...(await serverSideTranslations(locale, [
          'banner',
          'common',
          'table',
          'widgets',
        ])),
        role,
      },
    };
  }
  return {
    props: {
      role,
    },
  };
};
