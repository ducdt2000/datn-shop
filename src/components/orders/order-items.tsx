import { AntdTable } from '@components/ui/table';
import usePrice from '@lib/use-price';
import { useTranslation } from 'next-i18next';
import { Image } from '@components/ui/image';
import { productPlaceholder } from '@lib/placeholders';
import { useMemo } from 'react';

const OrderItemList = (_: any, record: any) => {
  return (
    <>
      <div className="flex items-center">
        <div className="w-16 h-16 flex flex-shrink-0 rounded overflow-hidden relative">
          <Image
            src={record?.defaultImageLink ?? productPlaceholder}
            alt={record?.name}
            className="w-full h-full object-cover"
            layout="fill"
          />
        </div>

        <div className="flex flex-col ms-4 overflow-hidden">
          <div className="flex mb-1">
            <span className="text-sm text-body truncate inline-block overflow-hidden">
              {record?.name} x&nbsp;
            </span>
            <span className="text-sm text-heading font-semibold truncate inline-block overflow-hidden">
              {record.unit}
            </span>
          </div>
          <span className="text-sm text-accent font-semibold mb-1 truncate inline-block overflow-hidden">
            {record?.priceString}
          </span>
        </div>
      </div>
    </>
  );
};

export const OrderItems = ({ items }: { items: any }) => {
  const { t } = useTranslation('common');
  items.forEach((item: any) => {
    const { price } = usePrice({
      amount: item.price,
    });

    const { price: total } = usePrice({
      amount: item.price * item.amount,
    });

    item.priceString = price;
    item.totalString = total;
  });

  const orderTableColumns = useMemo(
    () => [
      {
        title: <span className="ps-20">{t('text-item')}</span>,
        dataIndex: 'items',
        key: '',
        align: 'left',
        width: 250,
        ellipsis: true,
        render: (id: any, record: any) => OrderItemList(id, record),
      },
      {
        title: t('text-quantity'),
        dataIndex: 'amount',
        key: 'amount',
        align: 'center',
        width: 100,
        render: (amount: any) => {
          return <p className="text-base">{amount}</p>;
        },
      },
      {
        title: t('text-price'),
        dataIndex: 'totalString',
        key: 'totalString',
        align: 'right',
        width: 100,
        render: (value: any) => {
          return <div>{value}</div>;
        },
      },
    ],
    [t]
  );

  return (
    <>
      <AntdTable
        columns={orderTableColumns}
        dataSource={items}
        rowKey="id"
        scroll={{ x: 350, y: 500 }}
        pagination={false}
      ></AntdTable>
    </>
  );
};
