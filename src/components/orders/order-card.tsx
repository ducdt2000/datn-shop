import usePrice from '@lib/use-price';
import dayjs from 'dayjs';
import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import { ORDER_STATUS, ORDER_STATUS_NAME } from '@ts-types/generated';

type OrderCardProps = {
  order: any;
  isActive: boolean;
  onClick?: (e: any) => void;
};

const OrderCard: React.FC<OrderCardProps> = ({ onClick, order, isActive }) => {
  const { t } = useTranslation('common');
  const { id, status, created_at, deliveryTime, bill } = order;

  const { price: amount } = usePrice({
    amount: bill,
  });
  const { price: total } = usePrice({
    amount: bill,
  });

  return (
    <div
      onClick={onClick}
      role="button"
      className={cn(
        'bg-gray-100 rounded overflow-hidden w-full flex flex-shrink-0 flex-col mb-4 border-2 border-transparent cursor-pointer last:mb-0',
        isActive === true && '!border-accent'
      )}
    >
      <div className="flex justify-between items-center border-b border-border-200 py-3 px-5 md:px-3 lg:px-5 ">
        <span className="flex font-mono text-sm lg:text-base text-heading me-4 flex-shrink-0">
          {t('text-order')}
          <span>#{id.slice(30)}</span>
        </span>
        <span
          className="text-sm text-blue-500 bg-blue-100 px-3 py-2 rounded whitespace-nowrap truncate max-w-full"
          //@ts-ignore
          title={ORDER_STATUS_NAME[status]}
        >
          {
            //@ts-ignore
            ORDER_STATUS_NAME[status]
          }
        </span>
      </div>

      <div className="flex flex-col p-5 md:p-3 lg:px-4 lg:py-5">
        <p className="text-sm text-heading w-full flex justify-between items-center mb-4 last:mb-0">
          <span className="w-24 overflow-hidden flex-shrink-0">
            {t('text-order-date')}
          </span>
          <span className="me-auto">:</span>
          <span className="ms-1">
            {dayjs(created_at).format('MMMM D, YYYY')}
          </span>
        </p>
        <p className="text-sm text-heading w-full flex justify-between items-center mb-4 last:mb-0">
          <span className="w-24 overflow-hidden flex-shrink-0">
            {t('text-deliver-time')}
          </span>
          <span className="me-auto">:</span>
          <span className="ms-1 truncate">{deliveryTime}</span>
        </p>
        <p className="text-sm font-bold text-heading w-full flex justify-between items-center mb-4 last:mb-0">
          <span className="w-24 overflow-hidden flex-shrink-0">
            {t('text-amount')}
          </span>
          <span className="me-auto">:</span>
          <span className="ms-1">{amount}</span>
        </p>
        <p className="text-sm font-bold text-heading w-full flex justify-between items-center mb-4 last:mb-0">
          <span className="w-24 overflow-hidden flex-shrink-0">
            {t('text-total-price')}
          </span>
          <span className="me-auto">:</span>
          <span className="ms-1">{total}</span>
        </p>
      </div>
    </div>
  );
};

export default OrderCard;
