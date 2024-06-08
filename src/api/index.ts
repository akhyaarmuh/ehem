import { jwtDecode } from 'jwt-decode';

import { store } from '../redux/store';
import { getAccessToken } from './auth';
import { setAccessToken, signOut } from '../redux/user/userSlice';

export const baseUrlAPI = 'http://localhost:5000/api/v1';

// Interceptors
const requestInterceptor = async (url: string, options: any) => {
  const { withToken, headers = {}, ..._options } = options;

  if (withToken) {
    const currentDate = new Date();
    const accessToken = store.getState().user.accessToken;
    const expiredToken = store.getState().user.exp;

    if (expiredToken * 1000 < currentDate.getTime()) {
      const newAccessToken: string | undefined = await getAccessToken();

      if (!newAccessToken) store.dispatch(signOut());
      else {
        headers['Authorization'] = `Bearer ${newAccessToken}`;
        const decoded = jwtDecode(newAccessToken);
        store.dispatch(
          setAccessToken({ exp: decoded.exp!, accessToken: newAccessToken })
        );
      }
    } else headers['Authorization'] = `Bearer ${accessToken}`;
  }

  options = {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    ..._options,
  };
  return [`${baseUrlAPI}${url}`, options];
};

const responseInterceptor = async (response: any) => {
  const contentType = response.headers.get('content-type');

  if (!response.ok) {
    let error;

    if (contentType && contentType.includes('application/json')) {
      error = await response.json();
    }

    throw error
      ? {
          statusCode: error.error?.statusCode,
          message: error.message,
          data: error.data,
          detail: error.error,
        }
      : {
          message: 'Something went wrong on src/fetchers/index.ts -> responseInterceptor',
        };
  }

  if (contentType && contentType.includes('application/json'))
    return await response.json();

  //

  // const data = await response.text();
  // const dataJSON = data.length ? await JSON.parse(data) : {};

  // return dataJSON;
  // return response.json();
};

export const myFetch = async (url: string, options?: any) => {
  // Apply request interceptor
  [url, options] = await requestInterceptor(url, options || {});

  // Call fetch and apply response interceptor
  const response = await fetch(url, options);
  return responseInterceptor(response);
};
