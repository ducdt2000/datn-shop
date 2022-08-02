import { useTemplatesQuery } from '@data/products/product.query';
import { Menu, Transition } from '@headlessui/react';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { Fragment } from 'react';
import cn from 'classnames';

export default function CustomProductMenu() {
  const router = useRouter();
  const { t } = useTranslation('common');

  const { data: templatesData } = useTemplatesQuery();
  function handleClick(path: string) {
    router.push(path);
  }

  return (
    <Menu>
      <Menu.Button className="flex items-center focus:outline-none">
        {t('create-your-product')}
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          as="ul"
          className="absolute w-32 py-4 origin-top-end bg-white rounded shadow-700 focus:outline-none"
        >
          {templatesData?.templates?.map((type: any) => {
            return (
              <Menu.Item key={`${type.id}`}>
                <li>
                  <button
                    onClick={() =>
                      handleClick(
                        `${router.basePath}/custom-products/templates/${type.id}/create`
                      )
                    }
                    className="px-5"
                  >
                    {t(type.productType)}
                  </button>
                </li>
              </Menu.Item>
            );
          })}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
