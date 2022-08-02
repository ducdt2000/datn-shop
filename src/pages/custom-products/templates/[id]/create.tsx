import { useTranslation } from 'next-i18next';
import { getLayout } from '@components/layouts/layout';
import { GetServerSideProps } from 'next';
import { getAuthCredentials } from '@utils/auth-utils';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import router from 'next/router';
import { useTemplateQuery } from '@data/products/product.query';

export default function CreateCustomProduct() {
  const { t } = useTranslation();

  const id = router.query.id as string;

  const { data: dataTemplates } = useTemplateQuery(+id);

  const template = dataTemplates?.template;

  return (
    <div className="py-8 px-4 lg:py-10 lg:px-8 xl:py-14 xl:px-16 2xl:px-20 bg-gray-100">
      <div className="py-5 sm:py-8 flex border-b border-dashed border-border-base">
        <h1 className="text-lg font-semibold text-heading">
          {t('Tạo sản phẩm tùy chọn')} - {template.productType}
        </h1>
      </div>
    </div>
  );
}

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

CreateCustomProduct.authenticate = true;
CreateCustomProduct.getLayout = getLayout;
