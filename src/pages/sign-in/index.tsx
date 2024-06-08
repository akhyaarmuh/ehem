import { Link } from 'react-router-dom';

import Form from './form';

const SignIn = () => {
  return (
    <>
      <div className="mx-auto w-full place-self-center rounded-lg bg-base-200 p-6 shadow tablet:max-w-xl tablet:p-8">
        <h2 className="inline-flex items-center text-right">Nama Aplikasi</h2>
        <h4>Selamat datang kembali</h4>
        <p className="text-sm font-light">
          Kelola toko anda dengan mudah. Belum memiliki akun?{' '}
          <Link to="/sign-up" className="font-medium text-primary hover:underline">
            Daftar di sini
          </Link>
          .
        </p>

        <Form />

        <div className="my-6 text-right">
          <Link
            to="/forgot-password"
            className="font-medium text-primary hover:underline"
          >
            Lupa kata sandi?
          </Link>
        </div>
      </div>

      {/* grid child image*/}
      <div className="mr-auto hidden place-self-center relative w-full h-full justify-center items-center laptop:flex">
        {/* <Image src="/register.svg" fill alt="register" /> */}
        <img src="/register.svg" alt="register-image" />
      </div>
    </>
  );
};

export default SignIn;
