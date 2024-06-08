import { myFetch } from '.';
import { IUnit, ICreateUnit, IUpdateUnit } from '../types/IUnit';
import { IResponseGetAll } from '../types/IResponse';

/**
 * @tittle Create Unit API
 */
export const createUnit = async (payload: ICreateUnit): Promise<IUnit> => {
  const response = await myFetch('/units', {
    withToken: true,
    method: 'POST',
    body: JSON.stringify(payload),
  });

  return response.data;
};

/**
 * @tittle Gat All Unit API
 */
export const getAllUnit = async (queries: any = {}): Promise<IResponseGetAll<IUnit>> => {
  const response = await myFetch(`/units?${new URLSearchParams(queries)}`);

  return response;
};

/**
 * @tittle Update Unit API
 */
export const updateUnitById = async (id: string, payload: IUpdateUnit) => {
  await myFetch(`/units/${id}`, {
    withToken: true,
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
};

/**
 * @tittle Delete Unit API
 */
export const deleteUnitById = async (id: string): Promise<IUnit> => {
  const response = await myFetch(`/units/${id}`, {
    withToken: true,
    method: 'DELETE',
  });

  return response.data;
};
