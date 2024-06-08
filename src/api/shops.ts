import { myFetch } from '.';
import { IShop, ICreateShop, IActivateShop } from '../types/IShop';
import { IResponseGetAll } from '../types/IResponse';

/**
 * @tittle Create Shop API
 */
export const createShop = async (payload: ICreateShop): Promise<IShop> => {
  const response = await myFetch('/shops', {
    withToken: true,
    method: 'POST',
    body: JSON.stringify(payload),
  });

  return response.data;
};

/**
 * @tittle Gat All Shop API
 */
export const getAllShop = async (queries: any = {}): Promise<IResponseGetAll<IShop>> => {
  const response = await myFetch(`/shops?${new URLSearchParams(queries)}`);

  return response;
};

/**
 * @tittle Update Shop API
 */
export const updateShopById = async (id: string, payload: IUpdateShop) => {
  await myFetch(`/shops/${id}`, {
    withToken: true,
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
};

/**
 * @tittle Activate Shop API
 */
export const activateShopById = async (id: string, payload: IActivateShop) => {
  await myFetch(`/shops/${id}/activate-shop`, {
    withToken: true,
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
};

/**
 * @tittle Delete Shop API
 */
export const deleteShopById = async (id: string): Promise<IShop> => {
  const response = await myFetch(`/shops/${id}`, {
    withToken: true,
    method: 'DELETE',
  });

  return response.data;
};
