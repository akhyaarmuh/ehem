import { myFetch } from '.';
import { IEmploye, ICreateEmploye, IUpdateEmploye } from '../types/IEmploye';
import { IResponseGetAll } from '../types/IResponse';

/**
 * @tittle Create Employe API
 */
export const createEmploye = async (payload: ICreateEmploye): Promise<IEmploye> => {
  const response = await myFetch('/employe', {
    withToken: true,
    method: 'POST',
    body: JSON.stringify(payload),
  });

  return response.data;
};

/**
 * @tittle Gat All Employe API
 */
export const getAllEmploye = async (
  queries: any = {}
): Promise<IResponseGetAll<IEmploye>> => {
  const response = await myFetch(`/employe?${new URLSearchParams(queries)}`);

  return response;
};

/**
 * @tittle Update Employe API
 */
export const updateEmployeById = async (id: string, payload: IUpdateEmploye) => {
  await myFetch(`/employe/${id}`, {
    withToken: true,
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
};

/**
 * @tittle Delete Employe API
 */
export const deleteEmployeById = async (id: string): Promise<IEmploye> => {
  const response = await myFetch(`/employe/${id}`, {
    withToken: true,
    method: 'DELETE',
  });

  return response.data;
};
