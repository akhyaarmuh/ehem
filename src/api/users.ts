import { myFetch } from '.';
import { IUpdateUser, IUpdateUserPassword } from '../types/IUser';

export const updateUserById = async (id: string, payload: IUpdateUser) => {
  await myFetch(`/users/${id}`, {
    withToken: true,
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
};

export const updateUserPasswordById = async (
  id: string,
  payload: IUpdateUserPassword
) => {
  await myFetch(`/users/${id}/password`, {
    withToken: true,
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
};
