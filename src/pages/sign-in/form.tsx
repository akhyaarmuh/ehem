import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { useState, ChangeEvent, FormEvent } from 'react';
import { useAppDispatch } from '../../redux/hooks';

import { signIn as signInAPI } from '../../api/auth';
import { Input, Button } from '../../components';
import { signIn } from '../../redux/user/userSlice';

const Form = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [errorForm, setErrorForm] = useState({
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [data, setData] = useState({ email: '', password: '' });

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setErrorForm({ ...errorForm, [e.target.name]: '' });
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const token = await signInAPI(data);
      const decoded: any = jwtDecode(token);
      dispatch(signIn(decoded));
      if (decoded.role === 'owner') navigate('/shops');
      if (decoded.role === 'admin') navigate('/dashboard');
      if (decoded.role === 'cashier') navigate('/sales-orders');
    } catch (error: any) {
      if (error.statusCode === 422) setErrorForm({ ...errorForm, ...error.data });
      else setErrorMessage(error.message);
    }

    setIsSubmitting(false);
  };

  return (
    <form className="mt-4 tablet:mt-6" onSubmit={handleSubmit}>
      {/* grid system */}
      <div className="grid gap-6 tablet:grid-cols-2">
        <Input
          name="email"
          label="Email atau Nama pengguna"
          type="text"
          placeholder="nama@email.com"
          disabled={isSubmitting}
          required={true}
          error={errorForm.email}
          value={data.email}
          onChange={handleChangeInput}
        />
        <Input
          name="password"
          label="Katasandi"
          type="password"
          placeholder="*******"
          disabled={isSubmitting}
          required={true}
          autoComplete="off"
          error={errorForm.password}
          value={data.password}
          onChange={handleChangeInput}
        />
        {/* <Input
          name="shop_id"
          label="Id Toko"
          type="text"
          placeholder="0cb76abc-1c88-11ef-9339-1078d2db5daf"
          disabled={isSubmitting}
          autoComplete="off"
          error={errorForm.shop_id}
          value={data.shop_id}
          onChange={handleChangeInput}
        /> */}
      </div>

      {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}

      <Button block size="sm" color="primary" type="submit" loading={isSubmitting}>
        Masuk ke akun anda
      </Button>
    </form>
  );
};

export default Form;
