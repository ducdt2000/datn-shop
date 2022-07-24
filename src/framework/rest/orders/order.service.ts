import { CoreApi } from '@framework/utils/core-api';
import { API_ENDPOINTS } from '@framework/utils/endpoints';

export type VerifyCheckoutInputType = {
  amount: number;
  products: any[];
  billing_address: any;
  shipping_address: any;
};

class Order extends CoreApi {
  constructor(_base_path: string) {
    super(_base_path);
  }

  getLogs(orderId: string) {
    return this.http.get(`${API_ENDPOINTS.ORDERS}/${orderId}`);
  }

  verifyCheckout(input: VerifyCheckoutInputType) {
    return this.http
      .post(API_ENDPOINTS.VERIFY_CHECKOUT, input)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return {
          total_tax: 0,
          shipping_charge: 0,
          unavailable_products: [],
        };
      });
  }
}
export const OrderService = new Order(API_ENDPOINTS.ORDERS);
