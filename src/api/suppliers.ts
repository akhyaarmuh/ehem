import { myFetch } from '.';
import { ISupplier, ICreateSupplier, IUpdateSupplier } from '../types/ISupplier';
import { IResponseGetAll } from '../types/IResponse';

/**
 * @tittle Create Supplier API
 */
export const createSupplier = async (payload: ICreateSupplier): Promise<ISupplier> => {
  const response = await myFetch('/suppliers', {
    withToken: true,
    method: 'POST',
    body: JSON.stringify(payload),
  });

  return response.data;
};

/**
 * @tittle Gat All Supplier API
 */
export const getAllSupplier = async (
  queries: any = {}
): Promise<IResponseGetAll<ISupplier>> => {
  const response = await myFetch(`/suppliers?${new URLSearchParams(queries)}`);

  return response;
};

/**
 * @tittle Update Supplier API
 */
export const updateSupplierById = async (id: string, payload: IUpdateSupplier) => {
  await myFetch(`/suppliers/${id}`, {
    withToken: true,
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
};

/**
 * @tittle Delete Supplier API
 */
export const deleteSupplierById = async (id: string): Promise<ISupplier> => {
  const response = await myFetch(`/suppliers/${id}`, {
    withToken: true,
    method: 'DELETE',
  });

  return response.data;
};
