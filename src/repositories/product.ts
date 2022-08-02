import { CreateProduct, UpdateProduct } from '@ts-types/generated';
import Base from './base';

export type CreateCustomProduct = {
  productTypeId: number;
  properties: CustomProductProperty[];
  message: string;
};

export type CustomProductProperty = {
  name: string;
  value: CustomProductValue;
};

export type CustomProductValue = {
  value: string;
  description?: string;
  imageLink?: string;
};

class ProductRepository extends Base<CreateProduct, UpdateProduct> {
  getProductTemplates = async (url: string) => {
    return this.http(url, 'get');
  };

  getProductTemplate = async (url: string, id: number) => {
    return this.http(`${url}/${id}`, 'get');
  };

  createCustomProduct = async (url: string, variables: CreateCustomProduct) => {
    return this.http(url, 'post', variables);
  };
}

export default new ProductRepository();
