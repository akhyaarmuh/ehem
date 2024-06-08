import { myFetch } from '.';
import {
  IProduct,
  ICreateProduct,
  IUpdateProduct,
  IUpdateProductCode,
  IUpdateProductPrice,
  IUpdateProductStock,
} from '../types/IProduct';
import { IResponseGetAll } from '../types/IResponse';

/**
 * @tittle Create Product API
 */
export const createProduct = async (payload: ICreateProduct): Promise<IProduct> => {
  const response = await myFetch('/products', {
    withToken: true,
    method: 'POST',
    body: JSON.stringify(payload),
  });

  return response.data;
};

/**
 * @tittle Gat All Product API
 */
export const getAllProduct = async (
  queries: any = {}
): Promise<IResponseGetAll<IProduct>> => {
  const response = await myFetch(`/products?${new URLSearchParams(queries)}`);

  return response;
};

/**
 * @tittle Update Product API
 */
export const updateProductById = async (id: string, payload: IUpdateProduct) => {
  await myFetch(`/products/${id}`, {
    withToken: true,
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
};

/**
 * @tittle Update Product Code API
 */
export const updateProductCodeById = async (
  unitDetailId: string,
  payload: IUpdateProductCode
) => {
  await myFetch(`/products/${unitDetailId}/code`, {
    withToken: true,
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
};

/**
 * @tittle Update Product Price API
 */
export const updateProductPriceById = async (
  unitDetailId: string,
  payload: IUpdateProductPrice
) => {
  await myFetch(`/products/${unitDetailId}/price`, {
    withToken: true,
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
};

/**
 * @tittle Update Product Stock API
 */
export const updateProductStockById = async (
  productId: string,
  payload: IUpdateProductStock
) => {
  await myFetch(`/products/${productId}/stock`, {
    withToken: true,
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
};

/**
 * @tittle Delete Product API
 */
export const deleteProductById = async (id: string): Promise<IProduct> => {
  const response = await myFetch(`/products/${id}`, {
    withToken: true,
    method: 'DELETE',
  });

  return response.data;
};
