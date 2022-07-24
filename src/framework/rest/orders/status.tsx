import ErrorMessage from '@components/ui/error-message';
import Spinner from '@components/ui/loaders/spinner/spinner';
import ProgressBox from '@components/ui/progress-box/progress-box';
import {
  useOrderLogsQuery,
  useOrderQuery,
  useOrderStatusesQuery,
} from '@framework/orders/orders.query';

interface Props {
  status: number;
  orderId: string;
}

const OrderStatus = ({ status, orderId }: Props) => {
  const { data, isLoading: loading, error } = useOrderQuery({ id: orderId });

  console.log('orderstatusbar', data);

  if (loading) return <Spinner showText={false} />;
  if (error) return <ErrorMessage message={error.message} />;
  return <ProgressBox data={data?.order?.data?.orderLogs} status={status} />;
};

export default OrderStatus;
