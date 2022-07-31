import Router from 'next/router';
import { useTranslation } from 'next-i18next';
interface Props {
  basePath: string;
  productType: any;
  brand: any;
  onClose?: () => void;
}

const CategoryBadges = ({ onClose, productType, brand, basePath }: Props) => {
  const { t } = useTranslation('common');

  const handleClick = (path: string) => {
    Router.push(path);
    if (onClose) {
      onClose();
    }
  };
  return (
    <>
      <div className="w-full mt-4 md:mt-6 pt-4 md:pt-6 flex flex-row items-start border-t border-border-200 border-opacity-60">
        <span className="text-sm font-semibold text-heading me-6 py-1">
          {t('Product Type')}
        </span>
        <div className="flex flex-row flex-wrap">
          <button
            onClick={() => handleClick(`?productTypeId=${productType?.id}`)}
            key={productType?.id}
            className="lowercase text-sm text-heading tracking-wider whitespace-nowrap py-1 px-2.5 bg-transparent border border-border-200 rounded me-2 mb-2 transition-colors hover:border-accent hover:text-accent focus:outline-none focus:bg-opacity-100"
          >
            {productType?.name}
          </button>
        </div>
      </div>
      <div className="w-full mt-4 md:mt-6 pt-4 md:pt-6 flex flex-row items-start border-t border-border-200 border-opacity-60">
        <span className="text-sm font-semibold text-heading capitalize me-6 py-1">
          {t('Brand')}
        </span>
        <div className="flex flex-row flex-wrap">
          <button
            onClick={() => handleClick(`?brandId=${brand?.id}`)}
            key={brand?.id}
            className="lowercase text-sm text-heading tracking-wider whitespace-nowrap py-1 px-2.5 bg-transparent border border-border-200 rounded me-2 mb-2 transition-colors hover:border-accent hover:text-accent focus:outline-none focus:bg-opacity-100"
          >
            {brand?.name}
          </button>
        </div>
      </div>
    </>
  );
};

export default CategoryBadges;
