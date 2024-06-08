import { myFetch, baseUrlAPI } from '.';

type signupPayload = {
  full_name: string;
  email: string;
  password: string;
};
/**
 * @tittle SIGN UP API
 * @returns new user {
    full_name: string,
    email: string,
    message?: string
   }
 */
export const signUp = async (payload: signupPayload) => {
  const user = await myFetch('/auth/sign-up', {
    method: 'POST',
    body: JSON.stringify(payload),
  });

  return user;
};

/**
 * @tittle SIGN IN API
 * @returns Refresh Token.
 */
export const signIn = async (payload: {
  email: string;
  password: string;
  shop_id?: string;
}): Promise<string> => {
  const { data } = await myFetch('/auth/sign-in', {
    method: 'POST',
    body: JSON.stringify(payload),
  });

  return data;
};

/**
 * @tittle RESET PASSWORD API
 */
export const resetPassword = async (payload: { email: string }) => {
  await myFetch('/auth/reset-password', {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
};

export const signOut = async () => {
  await myFetch('/auth/sign-out', {
    withToken: true,
    method: 'DELETE',
  });
};

/**
 * @tittle GET ACCESS TOKEN API
 * @returns Access Token | null.
 */
export const getAccessToken = async (): Promise<string | undefined> => {
  const response = await fetch(baseUrlAPI + '/auth/refresh-token', {
    credentials: 'include',
  });

  const contentType = response.headers.get('content-type');

  if (!response.ok) {
    return undefined;
    // let error;

    // if (contentType && contentType.includes('application/json')) {
    //   error = await response.json();
    // }

    // throw error
    //   ? {
    //       statusCode: error.error?.statusCode,
    //       message: error.message,
    //       data: error.data,
    //       detail: error.error,
    //     }
    //   : {
    //       message: 'Something went wrong on src/fetchers/auth.ts -> getAccessToken',
    //     };
  }

  if (contentType && contentType.includes('application/json')) {
    const { data }: { data: string } = await response.json();
    return data;
  }
};
