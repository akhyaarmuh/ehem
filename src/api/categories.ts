import { myFetch } from '.';
import { ICategory, ICreateCategory, IUpdateCategory } from '../types/ICategory';
import { IResponseGetAll } from '../types/IResponse';

/**
 * @tittle Create Category API
 */
export const createCategory = async (payload: ICreateCategory): Promise<ICategory> => {
  const response = await myFetch('/categories', {
    withToken: true,
    method: 'POST',
    body: JSON.stringify(payload),
  });

  return response.data;
};

/**
 * @tittle Gat All Category API
 */
export const getAllCategory = async (
  queries: any = {}
): Promise<IResponseGetAll<ICategory>> => {
  const response = await myFetch(`/categories?${new URLSearchParams(queries)}`);

  return response;
};

/**
 * @tittle Update Category API
 */
export const updateCategoryById = async (id: string, payload: IUpdateCategory) => {
  await myFetch(`/categories/${id}`, {
    withToken: true,
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
};

/**
 * @tittle Delete Category API
 */
export const deleteCategoryById = async (id: string): Promise<ICategory> => {
  const response = await myFetch(`/categories/${id}`, {
    withToken: true,
    method: 'DELETE',
  });

  return response.data;
};
