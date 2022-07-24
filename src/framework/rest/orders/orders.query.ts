import {
  QueryParamsType,
  Order,
  OrdersQueryOptionsType,
  OrderLog,
} from '@framework/types';
import { ParamsType } from '@framework/utils/core-api';
import { mapPaginatorData } from '@framework/utils/data-mappers';
import { API_ENDPOINTS } from '@framework/utils/endpoints';
import {
  QueryKey,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
  useMutation,
  useQuery,
} from 'react-query';
import { OrderService } from './order.service';
type PaginatedOrder = {
  data: Order[];
  paginatorInfo: any;
};
const fetchOrders = async ({
  queryKey,
  pageParam,
}: QueryParamsType): Promise<PaginatedOrder> => {
  const params = queryKey[1];
  let fetchedData: any = {};
  if (pageParam) {
    const response = await OrderService.fetchUrl(pageParam);
    fetchedData = response.data;
  } else {
    const response = await OrderService.find(params as ParamsType);
    fetchedData = response.data;
  }
  const { data, ...rest } = fetchedData;
  return { data, paginatorInfo: mapPaginatorData({ ...rest }) };
};

const useOrdersQuery = (
  params?: OrdersQueryOptionsType,
  options?: UseInfiniteQueryOptions<
    PaginatedOrder,
    Error,
    PaginatedOrder,
    PaginatedOrder,
    QueryKey
  >
) => {
  return useInfiniteQuery<PaginatedOrder, Error>(
    [API_ENDPOINTS.ORDERS, params],
    fetchOrders,
    {
      ...options,
      getNextPageParam: ({ paginatorInfo }) => paginatorInfo.nextPageUrl,
    }
  );
};

export { useOrdersQuery, fetchOrders };

export const fetchOrder = async (orderId: string) => {
  const { data } = await OrderService.findOne(orderId);
  return {
    order: data,
  };
};
export const useOrderQuery = ({ id }: { id: string }) => {
  return useQuery<{ order: { data: Order } }, Error>(['order', id], () =>
    fetchOrder(id)
  );
};

export const fetchOrderStatuses = async () => {
  const {
    data: { data, ...rest },
  } = await OrderService.fetchUrl(API_ENDPOINTS.ORDER_STATUS);
  return {
    order_statuses: { data, paginatorInfo: mapPaginatorData({ ...rest }) },
  };
};
export const useOrderStatusesQuery = () => {
  return useQuery<any, Error>(API_ENDPOINTS.ORDER_STATUS, fetchOrderStatuses);
};

export const fetchOrderLogs = async (orderId: string) => {
  const {
    data: { data, ...rest },
  } = await OrderService.getLogs(orderId);
};

export const useOrderLogsQuery = ({ orderId }: { orderId: string }) => {
  return useQuery<any, Error>(['order', orderId], () =>
    fetchOrderLogs(orderId)
  );
};

export type OrderCreateInputType = {
  // [key: string]: unknown;
  // userId: string;
  paymentMethodId?: number;
  deliveryMethodId?: number;
  deliveryTime?: string;
  bill: number;
  status: number;
  address: string;
  city: string;
  district: string;
  message?: string;
  phone: string;
  items: any[];
};

export const useCreateOrderMutation = () => {
  return useMutation((input: OrderCreateInputType) =>
    OrderService.create(input)
  );
};
