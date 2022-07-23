import { createQueryPath } from '@utils/query';
import Request from './request';
type NumberOrString = number | string;
export type ParamsType = {
  type?: string;
  text?: string;
  category?: string;
  status?: string;
  is_active?: string;
  shop_id?: string;
  limit?: number;
  offset?: number;
  search?: string;
  brandId?: string;
  productTypeId?: string;
  brandType?: string;
  dateFrom?: Date;
  dateTo?: Date;
  orderBy?: string;
  orderType?: string;
};
export class CoreApi {
  http = Request;
  constructor(public _base_path: string) {}
  find(params: ParamsType) {
    const {
      type,
      text: name,
      category,
      status,
      is_active,
      shop_id,
      limit = 10,
      offset,
      search,
      brandId,
      productTypeId,
      brandType,
      dateFrom,
      dateTo,
      orderBy,
      orderType,
    } = params;

    const exParams = {
      offset,
      search,
      brandId,
      productTypeId,
      brandType,
      dateFrom,
      dateTo,
      orderBy,
      orderType,
    };

    const path = createQueryPath(this._base_path, { ...exParams, limit });

    return this.http.get(path);
  }
  findAll() {
    return this.http.get(this._base_path);
  }
  fetchUrl(url: string) {
    return this.http.get(url);
  }
  postUrl(url: string, data: any) {
    return this.http.post(url, data);
  }
  findOne(id: NumberOrString) {
    return this.http.get(`${this._base_path}/${id}`);
  }
  create(data: any, options?: any) {
    return this.http
      .post(this._base_path, data, options)
      .then((res) => res.data);
  }
  update(id: NumberOrString, data: any) {
    return this.http
      .put(`${this._base_path}/${id}`, data)
      .then((res) => res.data);
  }
  delete(id: NumberOrString) {
    return this.http.delete(`${this._base_path}/${id}`);
  }
}
