import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  OrderCreateInputType,
  useCreateOrderMutation,
  useOrderStatusesQuery,
} from '@framework/orders/orders.query';
import { ROUTES } from '@lib/routes';

import ValidationError from '@components/ui/validation-error';
import Button from '@components/ui/button';
import isEmpty from 'lodash/isEmpty';
import { formatOrderedProduct } from '@lib/format-ordered-product';
import { useCart } from '@store/quick-cart/cart.context';
import { useAtom } from 'jotai';
import { checkoutAtom, discountAtom } from '@store/checkout';
import {
  calculatePaidTotal,
  calculateTotal,
} from '@store/quick-cart/cart.utils';

export const PlaceOrderAction: React.FC = (props) => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { mutate: createOrder, isLoading: loading } = useCreateOrderMutation();

  const { data: orderStatusData } = useOrderStatusesQuery();

  const { items, resetCart } = useCart();
  const [
    {
      billing_address,
      shipping_address,
      delivery_time,
      coupon,
      verified_response,
      customer_contact,
      payment_gateway,
      token,
    },
  ] = useAtom(checkoutAtom);
  const [discount] = useAtom(discountAtom);

  useEffect(() => {
    setErrorMessage(null);
  }, [payment_gateway]);

  const available_items = items?.filter(
    (item) => !verified_response?.unavailable_products?.includes(item.id)
  );

  const subtotal = calculateTotal(available_items);
  const total = calculatePaidTotal(
    {
      totalAmount: subtotal,
      tax: verified_response?.total_tax!,
      shipping_charge: verified_response?.shipping_charge!,
    },
    Number(discount)
  );
  const handlePlaceOrder = () => {
    if (!customer_contact) {
      setErrorMessage('Contact Number Is Required');
      return;
    }
    if (!payment_gateway) {
      setErrorMessage('Gateway Is Required');
      return;
    }
    if (payment_gateway === 'STRIPE' && !token) {
      setErrorMessage('Please Pay First');
      return;
    }

    // shipping_address

    const buffer = shipping_address?.split(', ');

    let input: OrderCreateInputType = {
      paymentMethodId: payment_gateway === 'CASH_ON_DELIVERY' ? 1 : undefined,
      deliveryMethodId: 1,
      deliveryTime: delivery_time?.title,
      bill: subtotal,
      status: 1,
      address: buffer[0],
      district: buffer[1],
      city: buffer[2],
      phone: customer_contact,
      items: available_items,
    };
    if (payment_gateway === 'STRIPE') {
      //@ts-ignore
      input.token = token;
    }
    createOrder(input, {
      onSuccess: ({ data }: any) => {
        if (data?.id) {
          resetCart();
          router.push(`${ROUTES.ORDERS}/${data.id}`);
        }

        // if (order?.tracking_number) {
        //   router.push(`${ROUTES.ORDERS}/${order?.tracking_number}`);
        // }
      },
      onError: (error: any) => {
        setErrorMessage(error?.response?.data?.message);
      },
    });
  };
  const isAllRequiredFieldSelected = [
    customer_contact,
    payment_gateway,
    billing_address,
    shipping_address,
    delivery_time,
    available_items,
  ].every((item) => !isEmpty(item));
  return (
    <>
      <Button
        loading={loading}
        className="w-full mt-5"
        onClick={handlePlaceOrder}
        disabled={!isAllRequiredFieldSelected}
        {...props}
      />
      {errorMessage && (
        <div className="mt-3">
          <ValidationError message={errorMessage} />
        </div>
      )}
    </>
  );
};
