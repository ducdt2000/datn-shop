import { Product } from '@ts-types/generated';

export function generateCartItem(item: Product) {
  return {
    ...item,
    properties: item.properties.map((pro) => ({
      name: pro.name,
      value: pro.values[0],
      values: pro.values,
    })),
  };
}
