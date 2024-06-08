import { Link } from 'react-router-dom';

import Form from './form';

const SignUp = () => {
  return (
    <>
      <div className="mx-auto w-full place-self-center rounded-lg bg-base-200 p-6 shadow tablet:max-w-xl tablet:p-8">
        <h2 className="inline-flex items-center text-right">Nama Aplikasi</h2>
        <h4>Buat akun anda</h4>
        <p className="text-sm font-light">
          Kelola toko anda dengan mudah. Sudah memiliki akun?{' '}
          <Link to="/sign-in" className="font-medium text-primary hover:underline">
            Masuk di sini
          </Link>
          .
        </p>

        <Form />
      </div>

      {/* grid child image*/}
      <div className="mr-auto hidden place-self-center relative w-full h-full justify-center items-center laptop:flex">
        <img src="/register.svg" alt="signup-image" />
      </div>
    </>
  );
};

export default SignUp;
