import { myFetch } from '.';
import { ICustomer, ICreateCustomer, IUpdateCustomer } from '../types/ICustomer';
import { IResponseGetAll } from '../types/IResponse';

/**
 * @tittle Create Customer API
 */
export const createCustomer = async (payload: ICreateCustomer): Promise<ICustomer> => {
  const response = await myFetch('/customers', {
    withToken: true,
    method: 'POST',
    body: JSON.stringify(payload),
  });

  return response.data;
};

/**
 * @tittle Gat All Customer API
 */
export const getAllCustomer = async (
  queries: any = {}
): Promise<IResponseGetAll<ICustomer>> => {
  const response = await myFetch(`/customers?${new URLSearchParams(queries)}`);

  return response;
};

/**
 * @tittle Update Customer API
 */
export const updateCustomerById = async (id: string, payload: IUpdateCustomer) => {
  await myFetch(`/customers/${id}`, {
    withToken: true,
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
};

/**
 * @tittle Delete Customer API
 */
export const deleteCustomerById = async (id: string): Promise<ICustomer> => {
  const response = await myFetch(`/customers/${id}`, {
    withToken: true,
    method: 'DELETE',
  });

  return response.data;
};
